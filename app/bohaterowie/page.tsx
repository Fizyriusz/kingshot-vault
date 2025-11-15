import { createClient } from '@supabase/supabase-js'
// Importujemy nasz interaktywny komponent i typ 'Hero'
import HeroArmory, { type Hero } from './HeroArmory'

// -----------------------------------------------------------------
// Komponent serwerowy (Page)
// -----------------------------------------------------------------
export default async function BohaterowiePage() {

  // --- SEKCJA POBIERANIA DANYCH ---
  let heroes: Hero[] = []; 
  let fetchError: string | null = null;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pobieramy WSZYSTKIE kolumny, aby mieć 'slug'
    const { data, error } = await supabase
      .from('heroes')
      .select('*') // Pobieramy wszystko
      .order('name', { ascending: true }); 

    if (error) {
      throw error;
    }
    
    heroes = data || []; 

  } catch (error: any) {
    console.error('Błąd podczas pobierania bohaterów (lista):', error.message);
    fetchError = error.message;
  }
  // --- KONIEC SEKCJI POBIERANIA DANYCH ---


  // --- SEKCJA RENDEROWANIA UI ---
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

      {/* Główna treść strony */}
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
            // Przekazujemy 'heroes' (z 'slug') do komponentu klienckiego
            <HeroArmory heroes={heroes} />
          )
        }
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