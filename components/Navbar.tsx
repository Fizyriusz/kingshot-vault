"use client" // Niezbędne, aby użyć haka usePathname

import Link from 'next/link'
import { usePathname } from 'next/navigation' // Importujemy hak

export default function Navbar() {
  // Ten hak zwraca aktualny URL, np. "/bohaterowie"
  const pathname = usePathname()

  // Funkcja pomocnicza do ustawiania klasy 'active'
  const getLinkClass = (path: string) => {
    // Jeśli jesteśmy na stronie /bohaterowie/aleksander, 
    // chcemy też podświetlić link /bohaterowie
    const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));
    
    return isActive
      ? 'text-brand-primary border-b-2 border-brand-primary px-1 pt-1 text-sm font-medium'
      : 'text-gray-300 hover:text-white px-1 pt-1 text-sm font-medium transition-colors'
  }

  return (
    <nav className="bg-brand-surface sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - teraz link do strony głównej */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-heading font-bold text-brand-primary">[LOGO]</span>
            <span className="text-xl font-heading font-bold text-white ml-2 hidden sm:block">Kingshot Vault</span>
          </Link>

          {/* Menu - teraz z poprawnymi linkami i klasami 'active' */}
          <div className="hidden md:flex md:space-x-8">
            <Link href="/bohaterowie" className={getLinkClass('/bohaterowie')}>
              Bohaterowie
            </Link>
            <a href="#" className={getLinkClass('/wydarzenia')}>
              Wydarzenia
            </a>
            <a href="#" className={getLinkClass('/poradniki')}>
              Poradniki
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white font-medium text-sm">PL 🇵🇱</button>
          </div>
        </div>
      </div>
    </nav>
  )
}