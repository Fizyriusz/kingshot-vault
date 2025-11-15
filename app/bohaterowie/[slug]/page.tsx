import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import HeroDashboardClient from './HeroDashboardClient'
// Importujemy nasze centralne typy
import { type Hero, type Skill, type Gear } from '../types' 
import Navbar from '@/components/Navbar'

// Typ 'params' (bez zmian)
type PageParams = { slug: string }
type BuggyPageProps = { params: Promise<PageParams> | PageParams }

// -----------------------------------------------------------------
// Główna funkcja strony (Komponent Serwerowy)
// -----------------------------------------------------------------
export default async function HeroPage({ params }: BuggyPageProps) {
  
  const resolvedParams = await params;
  const { slug } = resolvedParams; 
  
  // --- SEKCJA POBIERANIA DANYCH (ZAKTUALIZOWANA) ---
  let hero: Hero | null = null;
  let skills: Skill[] = [];
  let gear: Gear | null = null;
  let fetchError: string | null = null;

  try {
    if (!slug || slug === 'undefined') {
      throw new Error("Invalid slug provided (after await)");
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('heroes')
      .select(`
        *, 
        skills (*),
        exclusive_gear (*)
      `) 
      .eq('slug', slug)
      .single()

    if (error) throw error;
    
    // === TUTAJ BYŁ BŁĄD ===
    // 'exclusive_gear' jest obiektem, a nie tablicą.
    const { skills: fetchedSkills, exclusive_gear: fetchedGearObject, ...restOfHero } = data;
    
    hero = restOfHero as Hero;
    skills = fetchedSkills as Skill[];
    gear = fetchedGearObject as Gear || null; // <--- NAPRAWIONA LOGIKA

  } catch (error: any) {
    console.error(`Błąd podczas pobierania bohatera (${slug}):`, error.message);
    fetchError = error.message;
  }
  // --- KONIEC SEKCJI POBIERANIA DANYCH ---

  // --- SEKCJA RENDEROWANIA ---
  if (fetchError || !hero) {
    console.log(`Nie znaleziono bohatera o slugu: ${slug}`);
    notFound(); 
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Przekazujemy wszystkie pobrane dane do komponentu klienckiego */}
        <HeroDashboardClient hero={hero} skills={skills} gear={gear} />
      </main>
      <footer className="bg-brand-surface mt-12 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="mt-8 text-xs text-gray-500">
            &copy; 2025 Kingshot Vault.
          </p>
        </div>
      </footer>
    </>
  )
}