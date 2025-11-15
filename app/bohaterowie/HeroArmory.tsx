"use client" // Niezbędne dla interaktywności

import React, { useState, useMemo } from 'react';
import Link from 'next/link'; // Importujemy Link

// Definicja typu Bohatera
// MUSI być wyeksportowany (export type) i zawierać 'slug'
export type Hero = {
  id: number;
  name: string;
  avatar_url: string | null;
  title: string | null; // Dodajemy title dla kokpitu
  tier_pvp: string;
  tier_pve: string;
  is_f2p: boolean;
  generation: number;
  unit_type: string | null;
  role: string | null;
  use_case: string | null;
  acquisition: string | null;
  tags: string[] | null;
  slug: string; 
}

// Mapowanie ocen na wartości liczbowe do sortowania
const tierMap: { [key: string]: number } = { 'S+': 5, 'S': 4, 'A': 3, 'B': 2, 'C': 1, 'D': 0 };

// Propsy, które komponent przyjmuje
type HeroArmoryProps = {
  heroes: Hero[];
}

export default function HeroArmory({ heroes }: HeroArmoryProps) {
  // === STANY (States) ===
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [groupBy, setGroupBy] = useState('none');
  const [filterF2P, setFilterF2P] = useState(false);
  const [filterInfantry, setFilterInfantry] = useState(false);
  const [filterCavalry, setFilterCavalry] = useState(false);
  const [filterArchers, setFilterArchers] = useState(false);

  // === MEMOIZACJA ===
  const filteredAndSortedHeroes = useMemo(() => {
    let filtered = [...heroes];

    // 1. Filtrowanie
    filtered = filtered.filter(hero => {
      const nameMatch = hero.name.toLowerCase().includes(searchTerm.toLowerCase());
      const f2pMatch = !filterF2P || hero.is_f2p;
      const unitMatch = (!filterInfantry && !filterCavalry && !filterArchers) ||
                        (filterInfantry && hero.unit_type === 'Piechota') ||
                        (filterCavalry && hero.unit_type === 'Konnica') ||
                        (filterArchers && hero.unit_type === 'Łucznicy');
      
      return nameMatch && f2pMatch && unitMatch;
    });

    // 2. Sortowanie
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'tier-pvp-desc':
          return (tierMap[b.tier_pvp] || 0) - (tierMap[a.tier_pvp] || 0);
        case 'tier-pve-desc':
          return (tierMap[b.tier_pve] || 0) - (tierMap[a.tier_pve] || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [heroes, searchTerm, sortBy, filterF2P, filterInfantry, filterCavalry, filterArchers]);

  // === GRUPOWANIE ===
  const groupedHeroes = useMemo(() => {
    if (groupBy === 'none') {
      return { 'all': filteredAndSortedHeroes };
    }

    const groups: { [key: string]: Hero[] } = {};
    const groupKey = groupBy as keyof Hero; 

    filteredAndSortedHeroes.forEach(hero => {
      let key = hero[groupKey] as string | number;
      
      if (!key) {
        key = 'Inne';
      }
      if (groupKey === 'generation') {
        key = `Generacja ${key}`;
      }

      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(hero);
    });

    return groups;
  }, [filteredAndSortedHeroes, groupBy]);

  // === RENDEROWANIE ===
  return (
    <>
      {/* === PANEL FILTROWANIA I SORTOWANIA === */}
      <div className="bg-brand-surface rounded-lg shadow-lg p-4 mb-8 sticky top-[72px] z-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Wyszukiwarka */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-brand-text-secondary">Szukaj</label>
            <input
              type="text"
              id="search"
              placeholder="Wpisz imię..."
              className="form-control w-full mt-1 px-3 py-2 text-sm bg-gray-700 border-gray-600 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Sortowanie */}
          <div>
            <label htmlFor="sort-by" className="block text-sm font-medium text-brand-text-secondary">Sortuj wg</label>
            <select
              id="sort-by"
              className="form-control w-full mt-1 px-3 py-2 text-sm bg-gray-700 border-gray-600 rounded"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">Nazwa (A-Z)</option>
              <option value="name-desc">Nazwa (Z-A)</option>
              <option value="tier-pvp-desc">Ocena PvP (S+ → C)</option>
              <option value="tier-pve-desc">Ocena PvE (S+ → C)</option>
            </select>
          </div>

          {/* Grupowanie (Twoje pomysły!) */}
          <div>
            <label htmlFor="group-by" className="block text-sm font-medium text-brand-text-secondary">Grupuj wg</label>
            <select
              id="group-by"
              className="form-control w-full mt-1 px-3 py-2 text-sm bg-gray-700 border-gray-600 rounded"
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="none">Brak Grupowania</option>
              <option value="generation">Generacja</option>
              <option value="unit_type">Typ Jednostek</option>
              <option value="acquisition">Sposób Zdobycia</option>
              <option value="role">Rola</option>
              <option value="use_case">Zastosowanie</option>
            </select>
          </div>

          {/* Filtry Checkbox */}
          <div>
            <label className="block text-sm font-medium text-brand-text-secondary">Szybkie Filtry</label>
            <div className="flex flex-wrap space-x-4 mt-2 pt-1">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="form-checkbox-filter mr-1" checked={filterF2P} onChange={(e) => setFilterF2P(e.target.checked)} /> F2P
              </label>
              <label className="flex items-center text-sm">
                <input type="checkbox" className="form-checkbox-filter mr-1" checked={filterInfantry} onChange={(e) => setFilterInfantry(e.target.checked)} /> Piechota
              </label>
              <label className="flex items-center text-sm">
                <input type="checkbox" className="form-checkbox-filter mr-1" checked={filterCavalry} onChange={(e) => setFilterCavalry(e.target.checked)} /> Konnica
              </label>
              <label className="flex items-center text-sm">
                <input type="checkbox" className="form-checkbox-filter mr-1" checked={filterArchers} onChange={(e) => setFilterArchers(e.target.checked)} /> Łucznicy
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* === KONTENER NA KARTY BOHATERÓW === */}
      <div id="hero-grid-container" className="transition-all duration-300">
        {Object.keys(groupedHeroes).sort().map(groupName => (
          <section key={groupName} className="mb-12">
            
            {groupName !== 'all' && (
              <h2 className="text-2xl font-heading font-bold text-white border-b-2 border-brand-primary pb-2 mb-6 uppercase">
                {groupName}
              </h2>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {groupedHeroes[groupName].length > 0 ? (
                groupedHeroes[groupName].map(hero => (
                  <HeroCard key={hero.id} hero={hero} />
                ))
              ) : (
                <p className="col-span-full text-brand-text-secondary">Brak bohaterów pasujących do tej grupy.</p>
              )}
            </div>
          </section>
        ))}
        {filteredAndSortedHeroes.length === 0 && (
          <p className="text-center text-brand-text-secondary text-lg">Nie znaleziono bohaterów pasujących do Twoich filtrów.</p>
        )}
      </div>
    </>
  )
}

// === KOMPONENT KARTY BOHATERA ===
function HeroCard({ hero }: { hero: Hero }) {
  const tierColor = {
    'S+': 'bg-tier-s', 'S': 'bg-tier-s',
    'A': 'bg-tier-a', 'B': 'bg-tier-b',
    'C': 'bg-tier-c', 'D': 'bg-gray-500'
  }[hero.tier_pvp] || 'bg-gray-700';
  
  const tagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'piechota': return 'bg-blue-600';
      case 'konnica': return 'bg-red-600';
      case 'łucznicy': return 'bg-green-600';
      case 'pvp': return 'bg-purple-600';
      case 'pve': return 'bg-yellow-600';
      case 'garnizon': return 'bg-teal-600';
      case 'f2p': return 'bg-green-700';
      default: return 'bg-gray-600';
    }
  }

  return (
    // Używamy 'hero.slug' bezpośrednio z bazy danych
    <Link 
      href={`/bohaterowie/${hero.slug}`} 
      className="hero-card block bg-brand-surface rounded-lg shadow-lg overflow-hidden relative transition-transform transform hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={`${tierColor} absolute top-2 right-2 text-white font-heading font-black text-lg px-2 py-0.5 rounded-md z-10`}>
        {hero.tier_pvp}
      </div>
      
      <img src={hero.avatar_url || 'https://placehold.co/200x200/1E1E1E/333?text=?'} alt={hero.name} className="w-full h-40 sm:h-48 object-cover" />
      
      <div className="p-4">
        <h3 className="text-xl font-heading font-bold text-white truncate">{hero.name}</h3>
        <div className="flex flex-wrap gap-1.5 mt-2 h-10 overflow-hidden">
          {hero.tags?.map(tag => (
            <span key={tag} className={`text-xs font-bold text-white px-2 py-0.5 rounded-full ${tagColor(tag)}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}