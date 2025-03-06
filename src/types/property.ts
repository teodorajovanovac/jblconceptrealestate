export interface Property {
  id: number
  title: {
    sr: string
    en: string
  }
  price: number
  location: {
    sr: string
    en: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  bedrooms: number
  bathrooms: number
  area: number
  description: {
    sr: string
    en: string
  }
  image: string
  images: string[]
  features: {
    sr: string[]
    en: string[]
  }
  type: {
    sr: string
    en: string
  }
  yearBuilt: string
  agent?: {
    name?: string;
    phone?: string;
    email?: string;
    logo?: string;
    company?: string;
  };
}

// Note: The actual data structure will have translations, but the component
// will receive the already translated version for simplicity 