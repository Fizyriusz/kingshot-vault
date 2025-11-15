import { createClient } from '@supabase/supabase-js'
import Navbar from '@/components/Navbar' // <--- IMPORTUJEMY NASZ NOWY KOMPONENT

// Typowanie danych - bez zmian
type PatchNote = {
  id: number;
  version: string;
  title: string;
  published_date: string | null;
}

// -----------------------------------------------------------------
// Główna funkcja strony (komponent serwerowy)
// -----------------------------------------------------------------
export default async function HomePage() {

  // --- SEKCJA POBIERANIA DANYCH ---
  let patchNotes: PatchNote[] | null = [];
  let fetchError: string | null = null;

  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Brak kluczy API Supabase w pliku .env.local");
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('patch_notes')
      .select('id, version, title, published_date') 
      .order('published_date', { ascending: false })
      .limit(3); 

    if (error) throw error;
    patchNotes = data; 

  } catch (error: any) {
    console.error('Błąd podczas pobierania patch notes:', error.message);
    fetchError = error.message;
  }
  // --- KONIEC SEKCJI POBIERANIA DANYCH ---


  // --- SEKCJA RENDEROWANIA UI ---
  return (
    <>
      {/* === NAWIGACJA === */}
      <Navbar /> {/* <--- UŻYWAMY NASZEGO NOWEGO KOMPONENTU */}

      {/* === PANEL 1: HERO === */}
      <header className="bg-hero-pattern bg-cover bg-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-[60vh] min-h-[400px] flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white leading-tight">
            KINGSHOT VAULT
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-brand-text-secondary font-medium">
            Wiedza. Narzędzia. Dominacja.
          </p>
          <a href="/bohaterowie" className="mt-8 px-10 py-4 bg-brand-primary text-brand-background font-heading font-bold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105">
            PRZEJDŹ DO ZBROJOWNI
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-12 sm:mt-16">

        {/* === PANEL 2: CENTRUM WYWIADU (INTEL CENTER) === */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Lewa kolumna: Event Globalny (Na razie statyczny) */}
            <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="relative">
                <img src="https://placehold.co/600x300/FF8C00/121212?text=Event+Halloween" alt="Event Halloween" className="w-full h-48 object-cover" />
                <span className="absolute top-4 left-4 bg-brand-primary text-brand-background text-xs font-bold uppercase px-3 py-1 rounded-full">Wydarzenie Globalne</span>
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full animate-pulse">
                  Trwa teraz!
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-3xl font-heading font-bold text-white mb-2">Upiorne Halloween</h2>
                <p className="text-brand-text-secondary mb-6 flex-grow">
                  Zbieraj dynie, walcz z duchami i wymieniaj cukierki na ekskluzywne nagrody. Zobacz nasz pełny poradnik!
                </p>
                <a href="#" className="mt-auto px-6 py-3 bg-brand-primary text-brand-background font-heading font-bold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105">
                  Zobacz Poradnik Eventowy →
                </a>
              </div>
            </div>

            {/* Prawa kolumna: Ostatnie Patch Notes (ZASILANA DANYMI!) */}
            <div className="bg-brand-surface rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Ostatnie Patch Notes</h2>
              
              {patchNotes && patchNotes.length > 0 ? (
                <ul className="space-y-3">
                  {patchNotes.map((note) => (
                    <li key={note.id}>
                      <a href="#" className="group flex items-center p-3 bg-brand-background rounded-md hover:bg-gray-800 transition-colors">
                        <span className="text-lg font-bold text-brand-primary mr-4">v{note.version}</span>
                        <span className="text-white font-bold group-hover:text-brand-primary transition-colors">{note.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-brand-text-secondary">Nie znaleziono żadnych wpisów.</p>
              )}
              
              {fetchError && (
                 <div className="mt-4 bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded">
                    <p className="font-bold">Błąd ładowania danych:</p>
                    <p className="text-sm">{fetchError}</p>
                 </div>
              )}
              
            </div>
          </div>
        </section>

        {/* === PANEL 3: NIEZBĘDNIK GRACZA (TOOLKIT) === */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-white text-center mb-8">Niezbędnik Gracza</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/bohaterowie" className="block p-6 bg-brand-surface rounded-lg shadow-lg border-2 border-brand-surface hover:border-brand-primary hover:shadow-xl transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-heading font-bold text-white mb-2">Interaktywna Zbrojownia</h3>
              <p className="text-brand-text-secondary">Przeglądaj, filtruj i grupuj wszystkich bohaterów w grze.</p>
            </a>
            <a href="#" className="block p-6 bg-brand-surface rounded-lg shadow-lg border-2 border-brand-surface hover:border-brand-primary hover:shadow-xl transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-heading font-bold text-white mb-2">Kalkulator Gemów F2P</h3>
              <p className="text-brand-text-secondary">Oblicz, ile darmowych gemów możesz zdobyć miesięcznie.</p>
            </a>
            <a href="#" className="block p-6 bg-brand-surface rounded-lg shadow-lg border-2 border-brand-surface hover:border-brand-primary hover:shadow-xl transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-heading font-bold text-white mb-2">Słownik Walut</h3>
              <p className="text-brand-text-secondary">Sprawdź, do czego służy każdy przedmiot i zasób w grze.</p>
            </a>
          </div>
        </section>

      </main>

      {/* === PANEL 5: STOPKA / BRANDING SOJUSZU === */}
      <footer className="bg-brand-surface mt-12 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h3 className="text-2xl font-heading font-bold text-white">Strona stworzona przez Sojusz [Nazwa]</h3>
          <p className="mt-2 text-brand-text-secondary max-w-2xl mx-auto">
            Wszystkie strategie, buildy i oceny są testowane w boju przez naszych oficerów i członków.
          </p>
          <a href="#" className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-bold text-sm rounded-lg shadow-lg hover:bg-indigo-500 transition-colors">
            Dołącz do naszego Discorda
          </a>
          <p className="mt-8 text-xs text-gray-500">
            &copy; 2025 Kingshot Vault. Ta strona nie jest powiązana z twórcami gry Kingshot.
          </p>
        </div>
      </footer>
    </>
  )
}