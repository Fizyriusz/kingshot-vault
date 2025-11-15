"use client" 

import Link from 'next/link';
import { type Hero, type Skill, type Gear } from '../types'; 

// ... (funkcje tagColor, tierColor, tierBgColor bez zmian) ...
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
        case 'S+': return 'bg-tier-s/20';
        case 'S': return 'bg-tier-s/20';
        case 'A': return 'bg-tier-a/20';
        case 'B': return 'bg-tier-b/20';
        case 'C': return 'bg-tier-c/20';
        default: return 'bg-gray-400/20';
    }
}
// ---

// Komponent dla pojedynczej karty umiejętności
function SkillCard({ skill }: { skill: Skill }) {
    return (
        <div className="bg-brand-background rounded-lg p-4">
            <h4 className="text-xl font-heading font-bold text-brand-primary mb-2">{skill.name}</h4>
            <p className="text-brand-text-secondary text-sm mb-3">{skill.description}</p>
            {skill.upgrade_preview && (
                <div>
                    <h5 className="text-sm font-bold text-white mb-1">Upgrade Preview:</h5>
                    <p className="text-xs text-brand-text-secondary whitespace-pre-line">
                        {skill.upgrade_preview}
                    </p>
                </div>
            )}
        </div>
    )
}

// NOWA FUNKCJA DO KOLORÓW TŁA KARTY
const rarityBorderColor = (rarity: string) => {
    switch (rarity) {
      case 'SSR': return 'border-yellow-500'; // Złoty
      case 'SR': return 'border-purple-500'; // Fioletowy
      case 'R': return 'border-blue-500'; // Niebieski
      default: return 'border-gray-700';
    }
}

// Główny komponent Dashboardu
export default function HeroDashboardClient({ hero, skills, gear }: { hero: Hero, skills: Skill[], gear: Gear | null }) {
    
    const conquestSkills = skills.filter(s => s.skill_type === 'Conquest');
    const expeditionSkills = skills.filter(s => s.skill_type === 'Expedition');

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
                    <div className="lg:sticky lg:top-24 space-y-6"> 
                        
                        {/* Karta 1: Info - TERAZ Z KOLOREM RARITY */}
                        <div className={`bg-brand-surface rounded-lg shadow-lg overflow-hidden border-t-4 ${rarityBorderColor(hero.rarity)}`}>
                            <img src={hero.avatar_url || 'https://placehold.co/600x400/1E1E1E/FFBF00?text=?'} alt={`Portret ${hero.name}`} className="w-full h-auto object-cover"></img>
                            <div className="p-5">
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

                        {/* Karta 4: Spis Treści */}
                        <div className="bg-brand-surface rounded-lg shadow-lg p-5">
                            <h4 className="text-lg font-heading font-bold text-white mb-4">Spis Treści</h4>
                            <ul className="space-y-2">
                                <li><a href="#conquest" className="text-brand-text-secondary hover:text-brand-primary transition-colors">→ Conquest</a></li>
                                <li><a href="#expedition" className="text-brand-text-secondary hover:text-brand-primary transition-colors">→ Expedition</a></li>
                                {/* POKAZUJ TEN LINK TYLKO DLA SSR I JEŚLI MA GEAR */}
                                {hero.rarity === 'SSR' && gear && (
                                    <li><a href="#exclusive-gear" className="text-brand-text-secondary hover:text-brand-primary transition-colors">→ Exclusive Gear</a></li>
                                )}
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

                    {/* Sekcja 1: CONQUEST SKILLS */}
                    <section id="conquest" className="bg-brand-surface rounded-lg shadow-lg p-6 mb-6">
                        <h3 className="text-3xl font-heading font-bold text-white mb-4">Conquest Skills</h3>
                        <div className="space-y-4">
                            {conquestSkills.length > 0 ? (
                                conquestSkills.map(skill => <SkillCard key={skill.id} skill={skill} />)
                            ) : (
                                <p className="text-brand-text-secondary">Brak umiejętności Conquest dla tego bohatera.</p>
                            )}
                        </div>
                    </section>

                    {/* Sekcja 2: EXPEDITION SKILLS */}
                    <section id="expedition" className="bg-brand-surface rounded-lg shadow-lg p-6 mb-6">
                        <h3 className="text-3xl font-heading font-bold text-white mb-4">Expedition Skills</h3>
                        <div className="space-y-4">
                            {expeditionSkills.length > 0 ? (
                                expeditionSkills.map(skill => <SkillCard key={skill.id} skill={skill} />)
                            ) : (
                                <p className="text-brand-text-secondary">Brak umiejętności Expedition dla tego bohatera.</p>
                            )}
                        </div>
                    </section>

                    {/* Sekcja 3: EXCLUSIVE GEAR (Warunkowa) */}
                    {/* POKAZUJ TĘ SEKCJĘ TYLKO DLA SSR I JEŚLI MA GEAR */}
                    {hero.rarity === 'SSR' && gear && (
                        <section id="exclusive-gear" className="bg-brand-secondary border-l-4 border-brand-primary rounded-lg shadow-lg p-6 mb-6">
                            <h3 className="text-3xl font-heading font-bold text-white mb-4">Exclusive Gear: "{gear.gear_name}"</h3>
                            
                            <div className="space-y-4 mb-6">
                                {gear.gear_conquest_skill_name && (
                                    <div className="bg-brand-background rounded-lg p-4">
                                        <h4 className="text-xl font-heading font-bold text-brand-primary mb-2">{gear.gear_conquest_skill_name}</h4>
                                        <p className="text-brand-text-secondary text-sm mb-3">{gear.gear_conquest_skill_desc}</p>
                                        <h5 className="text-sm font-bold text-white mb-1">Upgrade Preview:</h5>
                                        <p className="text-xs text-brand-text-secondary whitespace-pre-line">{gear.gear_conquest_skill_upgrade}</p>
                                    </div>
                                )}
                                {gear.gear_expedition_skill_name && (
                                    <div className="bg-brand-background rounded-lg p-4">
                                        <h4 className="text-xl font-heading font-bold text-brand-primary mb-2">{gear.gear_expedition_skill_name}</h4>
                                        <p className="text-brand-text-secondary text-sm mb-3">{gear.gear_expedition_skill_desc}</p>
                                        <h5 className="text-sm font-bold text-white mb-1">Upgrade Preview:</h5>
                                        <p className="text-xs text-brand-text-secondary whitespace-pre-line">{gear.gear_expedition_skill_upgrade}</p>
                                    </div>
                                )}
                            </div>

                            <h4 className="text-2xl font-heading font-bold text-white mb-4">Max Level Stats</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Power</span><span className="font-bold text-white text-lg">{gear.power?.toLocaleString('pl-PL')}</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Hero Attack</span><span className="font-bold text-white text-lg">{gear.hero_attack}</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Hero Defense</span><span className="font-bold text-white text-lg">{gear.hero_defense}</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Hero Health</span><span className="font-bold text-white text-lg">{gear.hero_health?.toLocaleString('pl-PL')}</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Escort Attack</span><span className="font-bold text-white text-lg">{gear.escort_attack}</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Escort Defense</span><span className="font-bold text-white text-lg">{gear.escort_defense}</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Escort Health</span><span className="font-bold text-white text-lg">{gear.escort_health?.toLocaleString('pl-PL')}</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Infantry Lethality</span><span className="font-bold text-white text-lg">{gear.infantry_lethality}%</span></div>
                                <div className="bg-brand-background p-3 rounded"><span className="block text-brand-text-secondary">Infantry Health</span><span className="font-bold text-white text-lg">{gear.infantry_health}%</span></div>
                            </div>
                        </section>
                    )}

                </main>
            </div>
        </div>
    );
}