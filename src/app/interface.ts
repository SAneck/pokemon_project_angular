export interface AllPokemons {
    count: number;
    next: null;
    previous: null;
    results: Array<NamedAPIResource>;
}

export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    cries: {
        latest: string;
        legacy: string;
    };
    forms: NamedAPIResource[];
    game_indices: GameIndice[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: PokemonMove[];
    name: string;
    order: number;
    past_abilities: Ability[];
    past_types: Type[];
    species: NamedAPIResource;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
    weight: number;
}

export interface NamedAPIResource {
    name: string;
    url: string;
}

export interface Ability {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export interface GameIndice {
    game_index: number;
    version: NamedAPIResource;
}

export interface HeldItem {
    item: NamedAPIResource;
    version_details: {
        rarity: number;
        version: NamedAPIResource;
    }[];
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: {
        level_learned_at: number;
        move_learn_method: NamedAPIResource;
        version_group: NamedAPIResource;
    }[];
}

export interface PokemonSprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other?: {
        dream_world?: {
            front_default: string | null;
            front_female: string | null;
        };
        home?: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        "official-artwork"?: {
            front_default: string | null;
            front_shiny: string | null;
        };
    };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface Type {
    slot: number;
    type: NamedAPIResource;
}