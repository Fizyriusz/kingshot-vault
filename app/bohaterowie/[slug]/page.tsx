import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation' // Funkcja do obsługi 404

// Importujemy nasz interfejs "Kokpitu"
import HeroDashboardClient from './HeroDashboardClient'
// Importujemy typ 'Hero', aby TypeScript wiedział, z czym pracuje
import { type Hero } from '../HeroArmory'

// Mówimy Next.js, że 'params' będzie zawierać 'slug'
type PageProps = {
  params: {
    slug: string
  }
}

// -----------------------------------------------------------------
// Główna funkcja strony (Komponent Serwerowy)
// -----------------------------------------------------------------
export default async function HeroPage({ params }: PageProps) {
  
  const { slug } = params // Wyciągamy 'slug' z adresu URL (np. "aleksander")

  // --- SEKCJA POBIERANIA DANYCH ---
  let hero: Hero | null = null;
  let fetchError: string | null = null;

  try {
    if (!slug) throw new Error("Invalid slug");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pobieramy JEDNEGO bohatera, którego 'slug' pasuje do tego z URL
    const { data, error } = await supabase
      .from('heroes')
      .select('*') // Pobieramy wszystkie kolumny
      .eq('slug', slug) // Gdzie kolumna 'slug' jest równa 'slug' z URL
      .single() // Oczekujemy tylko jednego wyniku

    if (error) {
      throw error;
    }
    
    hero = data; 

  } catch (error: any) {
    console.error(`Błąd podczas pobierania bohatera (${slug}):`, error.message);
    fetchError = error.message;
  }
  // --- KONIEC SEKCJI POBIERANIA DANYCH ---


  // --- SEKCJA RENDEROWANIA ---

  // Jeśli wystąpił błąd lub nie znaleziono bohatera, wyświetl stronę 404
  if (fetchError || !hero) {
    console.log(`Nie znaleziono bohatera o slugu: ${slug}`);
    notFound(); 
  }

  // Jeśli wszystko się udało, renderujemy nasz interfejs
  return (
    <>
      {/* Nawigacja */}
      <nav className="bg-brand-surface sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-heading font-bold text-brand-primary">[LOGO]</span>
              <span className="text-xl font-heading font-bold text-white ml-2 hidden sm:block">Kingshot Vault</span>
            </div>
            <div className="hidden md:flex md:space-x-8">
              <a href="/bohaterowie" className="text-brand-primary border-b-2 border-brand-primary px-1 pt-1 text-sm font-medium">Bohaterowie</a>
              <a href="#" className="text-gray-300 hover:text-white px-1 pt-1 text-sm font-medium">Wydarzenia</a>
              <a href="#" className="text-gray-300 hover:text-white px-1 pt-1 text-sm font-medium">Poradniki</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white font-medium text-sm">PL 🇵🇱</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Główna treść strony - nasz komponent kliencki */}
      <main>
        <HeroDashboardClient hero={hero} />
      </main>
      
      {/* Stopka */}
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