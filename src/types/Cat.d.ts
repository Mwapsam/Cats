export interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: Breed[];
    categories: Category[];
    favorite_count: number;
    created_at: string;
    original_filename: string;
    sub_id?: string;
    user_id?: string;
  }
  
  export interface Breed {
    url(url: any): unknown;
    id: string;
    name: string;
    origin: string;
    temperament: string;
    description: string;
    life_span: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    grooming: number;
    intelligence: number;
    health_issues: number;
    social_needs: number;
    stranger_friendly: number;
    wikipedia_url: string;
    country_code: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  