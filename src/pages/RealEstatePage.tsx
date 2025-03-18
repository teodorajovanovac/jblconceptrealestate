import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/header/Header';
import FooterTW from '../components/footer/FooterTW';
import Seo from '../services/meta/Seo';
import SearchBar from '../components/search/SearchBar';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import realEstate from '../data/realEstate';
import { RealEstateDto } from '../data/models/realEstate';
import { IoOptions } from 'react-icons/io5';
import Spinner from '../components/ui/Spinner';

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

// Kreiranje PropertyCard komponente unutar RealEstatePage
const PropertyCard = ({ property, index, language }: { property: RealEstateDto; index: number; language: string; }) => {
  const formatPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getFeatures = () => {
    if (!property.spaces) return [];
    return property.spaces.split(',')
      .map(feature => feature.trim())
      .filter(feature => feature.length > 0);
  };

  const getLuxuryBadge = () => {
    if (property.lux === 1) {
      return (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Premium
          </span>
        </div>
      );
    }
    return null;
  };

  const getPropertyTypeBadge = () => {
    if (property.typeName) {
      return (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {property.typeName}
          </span>
        </div>
      );
    }
    return null;
  };

  const isRental = property.actionName?.toLowerCase().includes('izdavanje') || 
                   property.actionName?.toLowerCase().includes('rent');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Link to={`/property/${property.id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative">
          {/* Action Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`${isRental ? 'bg-primary-gold' : 'bg-primary-blue'} text-white px-4 py-2 rounded-full text-base font-semibold shadow-lg`}>
              {property.actionName || (language === 'sr' ? "Prodaja" : "For Sale")}
            </span>
          </div>
          
          {/* Property Type Badge */}
          {getPropertyTypeBadge()}

          {/* Property Image */}
          <div className="relative h-[280px] overflow-hidden">
            <img 
              src={property.photos && property.photos.length > 0 
                ? `https://jblconcept.rs/photos/${property.photos[0].name}` 
                : "/placeholder.svg"}
              alt={property.typeName || "Property"}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
            <div className="absolute bottom-4 right-4">
              <span className="text-white text-[1.8rem] font-bold shadow-lg px-3 py-1 bg-black/50 rounded-lg">
                {formatPrice(property.price)} €
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Portal Name instead of Property Title */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-primary-blue line-clamp-1">
                {property.portalName || "Portal Name"}
              </h3>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-primary-blue" />
                <span className="text-base font-medium line-clamp-1">
                  {[
                    property.locationArea, 
                    property.locationCityName, 
                    property.locationCountyName
                  ].filter(Boolean).join(", ")}
                </span>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-y border-gray-100 py-4">
              <div className="flex items-center gap-2">
                <Square className="w-5 h-5 text-primary-blue" />
                <span className="font-semibold">{property.area} m²</span>
              </div>
              <div className="flex items-center gap-2 border-x border-gray-100 px-2">
                <Bed className="w-5 h-5 text-primary-blue" />
                <span className="font-semibold">{property.roomsNo || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-primary-blue" />
                <span className="font-semibold">{property.bathroomNO || "N/A"}</span>
              </div>
            </div>

            {/* Property Features */}
            <div className="flex flex-wrap gap-2">
              {property.floorNoString && (
                <span className="bg-blue-50 text-primary-blue px-3 py-1.5 rounded-full text-sm font-medium">
                  {property.floorNoString}
                </span>
              )}
              {getFeatures().slice(0, 3).map((feature, index) => (
                <span key={index} className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Dodajemo funkciju za kreiranje search query parametara
const buildSearchQuery = (filters: SearchFilters) => {
  const params = new URLSearchParams();
  
  // Dodajemo transactionType parametar
  if (filters.transactionType === 'buy') {
    params.append('actionName', 'Prodaja');
  } else if (filters.transactionType === 'rent') {
    params.append('actionName', 'Izdavanje');
  }
  
  // Dodajemo traženi tekst (searchTerm)
  if (filters.searchTerm) {
    params.append('searchTerm', filters.searchTerm);
  }
  
  // Dodajemo tipove nekretnina (propertyTypes)
  if (filters.propertyTypes.length > 0) {
    filters.propertyTypes.forEach(type => {
      params.append('propertyTypes', type);
    });
  }
  
  // Dodajemo sobe (rooms)
  if (filters.rooms.length > 0) {
    filters.rooms.forEach(room => {
      const roomValue = room === 'Garsonjera' ? '1' : room.split(' ')[0];
      params.append('roomsNo', roomValue);
    });
  }
  
  // Dodajemo lokacije (locations)
  if (filters.locations.length > 0) {
    filters.locations.forEach(location => {
      params.append('locations', location);
    });
  }
  
  // Dodajemo cenovni raspon (priceRange)
  if (filters.priceRange.length === 2) {
    if (filters.priceRange[0] > 0) {
      params.append('minPrice', filters.priceRange[0].toString());
    }
    if (filters.priceRange[1] < (filters.transactionType === 'buy' ? 1000000 : 3000)) {
      params.append('maxPrice', filters.priceRange[1].toString());
    }
  }
  
  // Dodajemo raspon površine (areaRange)
  if (filters.areaRange.length === 2) {
    if (filters.areaRange[0] > 0) {
      params.append('minArea', filters.areaRange[0].toString());
    }
    if (filters.areaRange[1] < 500) {
      params.append('maxArea', filters.areaRange[1].toString());
    }
  }
  
  // Dodajemo dodatne karakteristike (features)
  if (filters.features.length > 0) {
    filters.features.forEach(feature => {
      params.append('features', feature);
    });
  }
  
  // Dodajemo stanje nekretnine (state)
  if (filters.state.length > 0) {
    filters.state.forEach(state => {
      params.append('state', state);
    });
  }
  
  // Dodajemo sprat (floor)
  if (filters.floor.length > 0) {
    filters.floor.forEach(floor => {
      params.append('floor', floor);
    });
  }
  
  // Dodajemo grejanje (heating)
  if (filters.heating.length > 0) {
    filters.heating.forEach(heating => {
      params.append('heating', heating);
    });
  }
  
  // Dodajemo parking opcije (parking)
  if (filters.parking.length > 0) {
    filters.parking.forEach(parking => {
      params.append('parking', parking);
    });
  }
  
  return params.toString();
};

export default function RealEstatePage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');
  const [properties, setProperties] = useState<RealEstateDto[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<RealEstateDto[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<RealEstateDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const propertiesPerLoad = 12; // Changed from 30 to 12 for better grid layout
  const additionalPropertiesPerScroll = 6; // Changed from 10 to 6 for better grid layout

  // Funkcija za učitavanje više nekretnina
  const loadMoreProperties = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    const currentLength = displayedProperties.length;
    const nextBatch = filteredProperties.slice(
      currentLength, 
      currentLength + additionalPropertiesPerScroll
    );
    
    if (nextBatch.length > 0) {
      setDisplayedProperties(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + nextBatch.length < filteredProperties.length);
    } else {
      setHasMore(false);
    }
  }, [displayedProperties, filteredProperties, isLoading, hasMore]);

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

  // Učitavanje SVIH nekretnina sa API-ja
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await realEstate.getAllData();
        
        if (response.isSuccess && response.data && response.data.length > 0) {
          setProperties(response.data);
          setFilteredProperties(response.data);
          setDisplayedProperties(response.data.slice(0, propertiesPerLoad));
          setHasMore(response.data.length > propertiesPerLoad);
        } else {
          setError(language === 'sr' ? 'Nema pronađenih nekretnina' : 'No properties found');
        }
      } catch (err) {
        console.error('Error loading properties:', err);
        setError(language === 'sr' ? 'Greška prilikom učitavanja nekretnina' : 'Error loading properties');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProperties();
  }, [language, propertiesPerLoad]);

  // Intersection Observer za infinite scroll
  useEffect(() => {
    if (!loaderRef.current || isLoading) return;
    
    const options = {
      root: null,
      rootMargin: '200px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        loadMoreProperties();
      }
    }, options);
    
    observer.observe(loaderRef.current);
    
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadMoreProperties]);

  // Ažurirana funkcija handleSearch koja sada koristi API za filtriranje
  const handleSearch = async (filters: SearchFilters) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const queryString = buildSearchQuery(filters);
      
      // Pozivamo API sa filterima
      const response = await realEstate.search(queryString);
      
      if (response.isSuccess && response.data) {
        setProperties(response.data);
        setFilteredProperties(response.data);
        setDisplayedProperties(response.data.slice(0, propertiesPerLoad));
        setHasMore(response.data.length > propertiesPerLoad);
      } else {
        setFilteredProperties([]);
        setDisplayedProperties([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error during search:", err);
      setError(language === 'sr' ? 'Greška prilikom pretrage' : 'Error during search');
      setFilteredProperties([]);
      setDisplayedProperties([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Seo 
        title={language === 'sr' ? "Nekretnine" : "Properties"} 
        description={language === 'sr' ? "Pronađite savršenu nekretninu" : "Find your perfect property"}
      />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-2">
              {language === 'sr' ? "Pronađite svoju idealnu nekretninu" : "Find your ideal property"}
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {language === 'sr' 
                ? "Istražite našu ekskluzivnu kolekciju premium nekretnina i pronađite savršen dom ili investiciju." 
                : "Explore our exclusive collection of premium properties and find the perfect home or investment."}
            </p>
          </motion.div>
          
          {/* Search Bar Component */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Results Section */}
          <div className="mt-8">
            {isLoading && (
              <Spinner size="lg" />
            )}
            
            {error && (
              <div className="text-center text-red-500 py-10">
                {error}
              </div>
            )}
            
            {!isLoading && !error && filteredProperties.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                {language === 'sr' 
                  ? 'Nema pronađenih nekretnina koje odgovaraju vašoj pretrazi.' 
                  : 'No properties found matching your search criteria.'
                }
              </div>
            )}
            
            {!isLoading && !error && filteredProperties.length > 0 && (
              <>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {displayedProperties.map((property, index) => (
                    <PropertyCard 
                      key={`${property.id}-${index}`} 
                      property={property} 
                      index={index} 
                      language={language} 
                    />
                  ))}
                </motion.div>

                {/* Loader for infinite scroll */}
                {hasMore && (
                  <div ref={loaderRef}>
                    <Spinner size="sm" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <FooterTW />
    </div>
  );
} 