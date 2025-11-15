import { createClient } from '@supabase/supabase-js'
import HeroArmory from './HeroArmory'
import { type Hero } from './types' // <--- NAPRAWIONY IMPORT
import Navbar from '@/components/Navbar' 

// Komponent serwerowy (Page)
export default async function BohaterowiePage() {

  // --- SEKCJA POBIERANIA DANYCH ---
  let heroes: Hero[] = []; 
  let fetchError: string | null = null;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('heroes')
      .select('*') 
      .order('name', { ascending: true }); 

    if (error) throw error;
    heroes = data || []; 

  } catch (error: any) {
    console.error('Błąd podczas pobierania bohaterów (lista):', error.message);
    fetchError = error.message;
  }
  // --- KONIEC SEKCJI POBIERANIA DANYCH ---

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12">
        <h1 className="text-4xl lg:text-5xl font-heading font-black text-white mb-8">
          Interaktywna Zbrojownia
        </h1>
        
        {fetchError ? (
            <div className="bg-red-800 text-red-100 p-4 rounded-lg">
              <p className="font-bold">Błąd połączenia z bazą:</p>
              <p>{fetchError}</p>
            </div>
          ) : (
            <HeroArmory heroes={heroes} />
          )
        }
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