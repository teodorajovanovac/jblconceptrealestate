import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RECard from "../components/realestate/RECard"
import type { Property } from "../types/property"
import Header from '../components/header/Header';
import FooterTW from '../components/footer/FooterTW';
import Seo from '../services/meta/Seo';
import SearchBar from '../components/search/SearchBar'

const dummyProperties: Property[] = [
  {
    id: 1,
    title: {
      sr: "Moderna planinska vila",
      en: "Modern Mountain Villa"
    },
    price: 450000,
    location: {
      sr: "Zlatibor, Srbija",
      en: "Zlatibor, Serbia"
    },
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
    features: {
      sr: ["Parking", "Bazen", "Pogled na planinu"],
      en: ["Parking", "Pool", "Mountain View"]
    },
    type: {
      sr: "Vila",
      en: "Villa"
    },
    description: {
      sr: "Luksuzna vila sa modernim dizajnom...",
      en: "Luxury villa with modern design..."
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
      // Add more image URLs
    ],
  },
  {
    id: 2,
    title: {
      sr: "Luksuzni penthouse",
      en: "Luxury Penthouse"
    },
    price: 850000,
    location: {
      sr: "Novi Beograd, Srbija",
      en: "New Belgrade, Serbia"
    },
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
    features: {
      sr: ["Garaža", "Terasa", "Pogled na reku"],
      en: ["Garage", "Terrace", "River View"]
    },
    type: {
      sr: "Stan",
      en: "Apartment"
    },
    description: {
      sr: "Luksuzni penthouse sa modernim dizajnom...",
      en: "Luxury penthouse with modern design..."
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
      // Add more image URLs
    ],
  },
  {
    id: 3,
    title: {
      sr: "Elegantna vila sa bazenom",
      en: "Elegant Villa with Pool"
    },
    price: 750000,
    location: {
      sr: "Dedinje, Beograd",
      en: "Dedinje, Belgrade"
    },
    bedrooms: 6,
    bathrooms: 4,
    area: 450,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
    features: {
      sr: ["Bazen", "Vrt", "Obezbeđenje"],
      en: ["Pool", "Garden", "Security"]
    },
    type: {
      sr: "Vila",
      en: "Villa"
    },
    description: {
      sr: "Elegantna vila sa bazenom i modernim dizajnom...",
      en: "Elegant villa with pool and modern design..."
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
      // Add more image URLs
    ],
  }
]

export default function RealEstatePage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')
  const [filteredProperties, setFilteredProperties] = useState(dummyProperties)

  // Izračunaj min i max cene iz postojećih nekretnina
  const minPrice = Math.min(...dummyProperties.map(p => p.price)) / 1000000 // konvertuj u milione
  const maxPrice = Math.max(...dummyProperties.map(p => p.price)) / 1000000

  // Izračunaj min i max površine
  const minArea = Math.min(...dummyProperties.map(p => p.area))
  const maxArea = Math.max(...dummyProperties.map(p => p.area))

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'sr');
    };

    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleSearch = (searchParams: any) => {
    // implementacija pretrage
    setFilteredProperties(dummyProperties)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Seo title={language === 'sr' ? 'Ponuda nekretnina' : 'Property Listings'} />
      <Header />
      <main className="w-full min-w-full px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-blue mb-4">
              {language === 'sr' ? 'Pronađite svoj savršeni dom' : 'Find Your Perfect Home'}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {language === 'sr' 
                ? 'Istražite našu ekskluzivnu kolekciju nekretnina i pronađite dom koji odgovara vašem stilu života.' 
                : 'Explore our exclusive collection of properties and find a home that matches your lifestyle.'}
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <SearchBar 
              minPrice={minPrice}
              maxPrice={maxPrice}
              minArea={minArea}
              maxArea={maxArea}
            />
          </motion.div>

          {/* Properties Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <RECard 
                  property={{
                    ...property,
                    title: property.title[language as 'sr' | 'en'],
                    location: property.location[language as 'sr' | 'en'],
                    features: property.features[language as 'sr' | 'en'],
                    type: property.type[language as 'sr' | 'en']
                  }} 
                />
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredProperties.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl text-gray-600">
                {language === 'sr' 
                  ? 'Nema rezultata za zadatu pretragu' 
                  : 'No results found for your search'}
              </h3>
            </motion.div>
          )}
        </div>
      </main>
      <FooterTW />
    </div>
  )
} 