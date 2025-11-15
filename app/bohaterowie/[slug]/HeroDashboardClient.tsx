"use client" // Niezbędne dla interaktywności (useState)

import { useState } from 'react';
import Link from 'next/link';
// Importujemy nasz główny typ 'Hero' z pliku Zbrojowni
import { type Hero } from '../HeroArmory';

// Definicja kolorów dla tagów
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

// Definicja kolorów dla ocen (tiers)
const tierColor = (tier: string) => {
    switch (tier.toUpperCase()) {
        case 'S+': return 'text-tier-s';
        case 'S': return 'text-tier-s';
        case 'A': return 'text-tier-a';
        case 'B': return 'text-tier-b';
        case 'C': return 'text-tier-c';
        default: return 'text-gray-400';
    }
}
const tierBgColor = (tier: string) => {
     switch (tier.toUpperCase()) {
        case 'S+': return 'bg-tier-s/20'; // Dodana przezroczystość
        case 'S': return 'bg-tier-s/20';
        case 'A': return 'bg-tier-a/20';
        case 'B': return 'bg-tier-b/20';
        case 'C': return 'bg-tier-c/20';
        default: return 'bg-gray-400/20';
    }
}


export default function HeroDashboardClient({ hero }: { hero: Hero }) {
    // Stan do zarządzania aktywną zakładką (dla umiejętności)
    const [activeTab, setActiveTab] = useState('skill-1');

    // Lista zakładek (na razie statyczna, później z bazy)
    const tabs = [
        { id: 'skill-1', label: 'Skill 1' },
        { id: 'skill-2', label: 'Skill 2' },
        { id: 'skill-3', label: 'Skill 3' },
        { id: 'skill-4', label: 'Skill 4' },
        { id: 'awakening', label: 'Przebudzenie' },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
            {/* Ścieżka (Breadcrumbs) */}
            <div className="text-sm text-brand-text-secondary mb-4">
                <Link href="/" className="hover:text-brand-primary">Home</Link> &gt; 
                <Link href="/bohaterowie" className="hover:text-brand-primary">Bohaterowie</Link> &gt; 
                <span className="text-white">{hero.name}</span>
            </div>

            {/* Główny układ (Grid) */}
            <div className="lg:flex lg:space-x-8">

                {/* === LEWA KOLUMNA (STICKY INFO-BOX) === */}
                <aside className="w-full lg:w-1/3 xl:w-1/4">
                    <div className="lg:sticky lg:top-24 space-y-6"> {/* top-24 = 16 (wysokość nav) + 8 (margines) */}
                        
                        {/* Karta 1: Info */}
                        <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden">
                            <img src={hero.avatar_url || 'https://placehold.co/600x400/1E1E1E/FFBF00?text=?'} alt={`Portret ${hero.name}`} className="w-full h-auto object-cover"></img>
                            <div className="p-5 border-t border-gray-700">
                                <h3 className="text-lg font-heading font-bold text-white">{hero.name}</h3>
                                <p className="text-brand-text-secondary text-sm">"{hero.title || 'Brak tytułu'}"</p>
                            </div>
                        </div>

                        {/* Karta 2: Ocena Sojuszu */}
                        <div className="bg-brand-surface rounded-lg shadow-lg p-5">
                            <h4 className="text-lg font-heading font-bold text-white mb-4">Ocena Sojuszu</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">PvP:</span>
                                    <span className={`text-2xl font-heading font-black px-2 rounded-md ${tierColor(hero.tier_pvp)} ${tierBgColor(hero.tier_pvp)}`}>
                                        {hero.tier_pvp}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">PvE (Bear Hunt):</span>
                                    <span className={`text-2xl font-heading font-black px-2 rounded-md ${tierColor(hero.tier_pve)} ${tierBgColor(hero.tier_pve)}`}>
                                        {hero.tier_pve}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">Inwestycja F2P:</span>
                                    <span className={`text-lg font-heading font-bold ${hero.is_f2p ? 'text-tier-b' : 'text-tier-a'}`}>
                                        {hero.is_f2p ? 'POLECANA' : 'WYSOKA (P2W)'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Karta 3: Tagi */}
                        <div className="bg-brand-surface rounded-lg shadow-lg p-5">
                            <h4 className="text-lg font-heading font-bold text-white mb-4">Tagi</h4>
                            <div className="flex flex-wrap gap-2">
                                {hero.tags?.map(tag => (
                                    <span key={tag} className={`text-white text-xs font-bold px-3 py-1 rounded-full ${tagColor(tag)}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Karta 4: Spis Treści (Nawigacja) */}
                        <div className="bg-brand-surface rounded-lg shadow-lg p-5">
                            <h4 className="text-lg font-heading font-bold text-white mb-4">Spis Treści</h4>
                            <ul className="space-y-2">
                                <li><a href="#analiza-umiejetnosci" className="text-brand-text-secondary hover:text-brand-primary transition-colors">→ Analiza Umiejętności</a></li>
                                <li><a href="#synergie-i-pary" className="text-brand-text-secondary hover:text-brand-primary transition-colors">→ Synergie i Pary</a></li>
                                <li><a href="#drzewka-talentow" className="text-brand-text-secondary hover:text-brand-primary transition-colors">→ Drzewka Talentów</a></li>
                                <li><a href="#werdykt-inwestycyjny" className="text-brand-text-secondary hover:text-brand-primary transition-colors">→ Werdykt Inwestycyjny</a></li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* === PRAWA KOLUMNA (GŁĘBOKA ANALIZA) === */}
                <main className="w-full lg:w-2/3 xl:w-3/4 mt-8 lg:mt-0">
                    
                    {/* Tytuł i Wstęp */}
                    <div className="bg-brand-surface rounded-lg shadow-lg p-6 mb-6">
                        <h1 className="text-4xl lg:text-5xl font-heading font-black text-white">{hero.name}</h1>
                        <h2 className="text-xl lg:text-2xl font-heading font-bold text-brand-primary mb-4">"{hero.title || 'Brak tytułu'}"</h2>
                        <p className="text-brand-text-secondary leading-relaxed">
                            {/* TODO: Dodać pole 'description' do bazy danych */}
                            Tutaj znajdzie się szczegółowy opis bohatera i ogólna ocena sojuszu...
                        </p>
                    </div>

                    {/* Sekcja 1: Analiza Umiejętności */}
                    <section id="analiza-umiejetnosci" className="bg-brand-surface rounded-lg shadow-lg p-6 mb-6">
                        <h3 className="text-3xl font-heading font-bold text-white mb-4">Analiza Umiejętności</h3>
                        
                        {/* Nawigacja Zakładek (Tabs) */}
                        <div className="border-b border-gray-700 mb-4">
                            <nav className="flex space-x-4 -mb-px" aria-label="Tabs">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            ${activeTab === tab.id
                                                ? 'text-brand-primary border-brand-primary'
                                                : 'text-brand-text-secondary border-transparent hover:text-white'}
                                            whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm
                                        `}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Treść Zakładek */}
                        <div>
                            {/* TODO: Wypełnić danymi o umiejętnościach z bazy */}
                            <div className={activeTab === 'skill-1' ? 'block' : 'hidden'}>
                                <h4 className="text-2xl font-heading font-bold text-brand-primary mb-2">Umiejętność 1 (Aktywna)</h4>
                                <p className="text-brand-text-secondary">Opis umiejętności 1...</p>
                            </div>
                            <div className={activeTab === 'skill-2' ? 'block' : 'hidden'}>
                                <h4 className="text-2xl font-heading font-bold text-brand-primary mb-2">Umiejętność 2 (Pasywna)</h4>
                                <p className="text-brand-text-secondary">Opis umiejętności 2...</p>
                            </div>
                            <div className={activeTab === 'skill-3' ? 'block' : 'hidden'}>
                                <h4 className="text-2xl font-heading font-bold text-brand-primary mb-2">Umiejętność 3 (Pasywna)</h4>
                                <p className="text-brand-text-secondary">Opis umiejętności 3...</p>
                            </div>
                            <div className={activeTab === 'skill-4' ? 'block' : 'hidden'}>
                                <h4 className="text-2xl font-heading font-bold text-brand-primary mb-2">Umiejętść 4 (Pasywna)</h4>
                                <p className="text-brand-text-secondary">Opis umiejętności 4...</p>
                            </div>
                            <div className={activeTab === 'awakening' ? 'block' : 'hidden'}>
                                <h4 className="text-2xl font-heading font-bold text-brand-primary mb-2">Przebudzenie (Ekspercka)</h4>
                                <p className="text-brand-text-secondary">Opis umiejętności przebudzenia...</p>
                            </div>
                        </div>
                    </section>

                    {/* Sekcja 2: Synergie i Pary (Placeholder) */}
                    <section id="synergie-i-pary" className="bg-brand-surface rounded-lg shadow-lg p-6 mb-6">
                        <h3 className="text-3xl font-heading font-bold text-white mb-4">Synergie i Pary</h3>
                        {/* TODO: Wypełnić danymi o parach */}
                        <p className="text-brand-text-secondary">Wkrótce tutaj pojawi się analiza najlepszych par dla {hero.name}...</p>
                    </section>

                    {/* Sekcja 3: Drzewka Talentów (Placeholder) */}
                    <section id="drzewka-talentow" className="bg-brand-surface rounded-lg shadow-lg p-6 mb-6">
                        <h3 className="text-3xl font-heading font-bold text-white mb-4">Drzewka Talentów</h3>
                        {/* TODO: Wypełnić obrazkami drzewek */}
                        <p className="text-brand-text-secondary">Rekomendowane buildy talentów pojawią się tutaj wkrótce...</p>
                    </section>

                </main>
            </div>
        </div>
    );
}