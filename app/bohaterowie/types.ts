// Ten typ jest teraz centralny i używany w wielu miejscach
export type Hero = {
  id: number;
  name: string;
  avatar_url: string | null;
  title: string | null;
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
  rarity: string; // <--- NOWA, KLUCZOWA LINIA
}

// Nasz nowy typ dla umiejętności
export type Skill = {
// ... (bez zmian)
  id: number;
  hero_id: number;
  skill_type: string;
  name: string;
  description: string | null;
  upgrade_preview: string | null;
}

// Nasz nowy typ dla ekwipunku
export type Gear = {
// ... (bez zmian)
  id: number;
  hero_id: number;
  gear_name: string;
  power: number | null;
  hero_attack: number | null;
  hero_defense: number | null;
  hero_health: number | null;
  escort_attack: number | null;
  escort_defense: number | null;
  escort_health: number | null;
  infantry_lethality: number | null;
  infantry_health: number | null;
  gear_conquest_skill_name: string | null;
  gear_conquest_skill_desc: string | null;
  gear_conquest_skill_upgrade: string | null;
  gear_expedition_skill_name: string | null;
  gear_expedition_skill_desc: string | null;
  gear_expedition_skill_upgrade: string | null;
}