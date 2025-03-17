import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RECard from "../components/realestate/RECard"
import type { PropertyData } from "../types/property"
import Header from '../components/header/Header';
import FooterTW from '../components/footer/FooterTW';
import Seo from '../services/meta/Seo';
import SearchBar from '../components/search/SearchBar'
import { properties } from '../data/propertyData';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

interface SearchFilters {
  transactionType: 'buy' | 'rent';
  searchTerm: string;
  propertyTypes: string[];
  rooms: string[];
  locations: string[];
  priceRange: number[];
  areaRange: number[];
  features: string[];
  state: string[];
  floor: string[];
  heating: string[];
  parking: string[];
}

export default function RealEstatePage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')
  const [filteredProperties, setFilteredProperties] = useState(properties)

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

  const handleSearch = (filters: SearchFilters) => {
    let filtered = properties.filter(property => {
      // Filter by transaction type
      if (property.transactionType !== filters.transactionType) return false;

      // Filter by search term
      if (filters.searchTerm && !property.address.fullAddress.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
        return false;
      }

      // Filter by property type
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.features.propertyType)) {
        return false;
      }

      // Filter by number of rooms
      if (filters.rooms.length > 0) {
        const propertyRooms = property.features.beds.toString() + ' sobe';
        if (!filters.rooms.some(room => {
          if (room === 'Garsonjera') return property.features.beds === 0;
          const numRooms = parseFloat(room.split(' ')[0]);
          return property.features.beds === numRooms;
        })) {
          return false;
        }
      }

      // Filter by location
      if (filters.locations.length > 0 && !filters.locations.some(loc => 
        property.address.fullAddress.includes(loc)
      )) {
        return false;
      }

      // Filter by price range
      if (property.price.amount < filters.priceRange[0] || property.price.amount > filters.priceRange[1]) {
        return false;
      }

      // Filter by area range
      if (property.features.sqft < filters.areaRange[0] || property.features.sqft > filters.areaRange[1]) {
        return false;
      }

      // Filter by features
      if (filters.features.length > 0) {
        const propertyFeatures = property.exteriorFeatures.exteriorAmenities.split(', ');
        if (!filters.features.some(feature => propertyFeatures.includes(feature))) {
          return false;
        }
      }

      // Filter by heating
      if (filters.heating.length > 0 && !filters.heating.includes(property.interiorFeatures.heatingDescription)) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
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
            <SearchBar onSearch={handleSearch} />
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
                <Link to={`/property/${property.id}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative h-[280px]">
                      <img 
                        src={property.images[0]}
                        alt={property.address.street}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                          {property.transactionType === 'rent' 
                            ? `${property.price.amount} €/mesečno`
                            : `${property.price.amount.toLocaleString()} €`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary-blue mb-2">
                        {property.address.street}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.address.fullAddress}</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.features.beds}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.features.baths}</span>
                        </div>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.features.sqft} m²</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {property.exteriorFeatures.exteriorAmenities.split(', ').slice(0, 3).map((feature, index) => (
                          <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
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