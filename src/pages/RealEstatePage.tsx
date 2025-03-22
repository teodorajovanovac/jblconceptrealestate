import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/header/Header';
import FooterTW from '../components/footer/FooterTW';
import Seo from '../services/meta/Seo';
import SearchBar from '../components/search/SearchBar';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import realEstate from '../data/realEstate';
import { RealEstateDto } from '../data/models/realEstate';
import { IoOptions } from 'react-icons/io5';
import Spinner from '../components/ui/Spinner';
import { PRICE_RANGES, AREA_RANGE, TransactionType } from '../utils/constants';
import FavoritesDrawer from '../components/property/FavoritesDrawer';
import useFavorites from '../hooks/useFavorites';

interface SearchFilters {
  transactionType: 'buy' | 'rent';
  searchTerm: string;
  propertyTypes: string[];
  rooms: string[];
  locations: string[];
  priceRange: number[];
  areaRange: number[];
  features: string[];
  bathrooms: string[];
  floor: string[];
  heating: string[];
  parking: string[];
}

// Kreiranje PropertyCard komponente unutar RealEstatePage
const PropertyCard = ({ property, index, language }: { property: RealEstateDto; index: number; language: string; }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  
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
        <div className="absolute top-4 left-4 z-10">
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
        <div className="absolute bottom-4 left-4 z-10">
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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    // Refresh the page after toggling favorite status
    window.location.reload();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Link to={`/property/${property.id}`} className="block h-full">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative">
          {/* Property Image with Overlays */}
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
            
            {/* Action Badge - Top Left */}
            <div className="absolute top-4 left-4 z-20">
              <span className={`${isRental ? 'bg-primary-gold' : 'bg-primary-blue'} text-white px-4 py-2 rounded-full text-base font-semibold shadow-lg`}>
                {property.actionName || (language === 'sr' ? "Prodaja" : "For Sale")}
              </span>
            </div>
            
            {/* Property Type Badge - Bottom Left */}
            {getPropertyTypeBadge()}
            
            {/* Price - Bottom Right */}
            <div className="absolute bottom-4 right-4">
              <span className="text-white text-[1.8rem] font-bold shadow-lg px-3 py-1 bg-custom-black/50 rounded-lg">
                {formatPrice(property.price)} €
              </span>
            </div>
          </div>

          {/* Favorite Button - Top Right, outside the image container for clear position */}
          <button 
            className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            onClick={handleFavoriteClick}
            aria-label={isFavorite(property.id) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 transition-colors duration-300 ${
                isFavorite(property.id) 
                  ? 'text-red-500 fill-red-500' 
                  : 'hover:text-red-500'
              }`} 
            />
          </button>

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
  if (filters.bathrooms.length > 0) {
    filters.bathrooms.forEach(bathroom => {
      params.append('bathrooms', bathroom);
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

const RealEstatePage: React.FC = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');
  const [properties, setProperties] = useState<RealEstateDto[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<RealEstateDto[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<RealEstateDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const { getFavoritesCount } = useFavorites();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const propertiesPerLoad = 12;
  const additionalPropertiesPerScroll = 6;

  // Create a state for search filters with default values
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    transactionType: 'buy', // Set default to 'buy'
    searchTerm: '',
    propertyTypes: [],
    rooms: [],
    locations: [],
    priceRange: [0, 1000000],
    areaRange: [0, 500],
    features: [],
    bathrooms: [],
    floor: [],
    heating: [],
    parking: []
  });

  // Build initial search query with default 'buy' transaction type
  const initialQuery = buildSearchQuery({
    transactionType: 'buy',
    searchTerm: '',
    propertyTypes: [],
    rooms: [],
    locations: [],
    priceRange: [0, 1000000],
    areaRange: [0, 500],
    features: [],
    bathrooms: [],
    floor: [],
    heating: [],
    parking: []
  });

  // Update favorites count
  useEffect(() => {
    setFavoritesCount(getFavoritesCount());
    
    const handleFavoritesUpdate = () => {
      setFavoritesCount(getFavoritesCount());
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [getFavoritesCount]);

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

  // Učitavanje SVIH nekretnina sa API-ja
  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await realEstate.getAllData();
        
        if (response.isSuccess && response.data && response.data.length > 0) {
          // Log unique property types for debugging
          const uniqueTypes = new Set<string>();
          response.data.forEach(prop => {
            if (prop.typeName) uniqueTypes.add(prop.typeName);
            if (prop.subTypeName) uniqueTypes.add(prop.subTypeName);
          });
          console.log('Unique property types from API:', Array.from(uniqueTypes));
          
          setProperties(response.data);
          
          // Apply default 'buy' filter when page loads
          const defaultFilters: SearchFilters = {
            transactionType: 'buy',
            searchTerm: '',
            propertyTypes: [],
            rooms: [],
            locations: [],
            priceRange: [0, 1000000], 
            areaRange: [0, 500],
            features: [],
            bathrooms: [],
            floor: [],
            heating: [],
            parking: []
          };
          
          // Filter properties for 'buy' transaction type
          const buyProperties = response.data.filter(property => 
            property.actionShortName === 'P'
          );
          
          setFilteredProperties(buyProperties);
          setDisplayedProperties(buyProperties.slice(0, propertiesPerLoad));
          setHasMore(buyProperties.length > propertiesPerLoad);
          
          if (buyProperties.length === 0) {
            setError(language === 'sr' ? 'Nema pronađenih nekretnina' : 'No properties found');
          }
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

  // Updated handleSearch function to properly use the API parameters
  const handleSearch = async (filters: SearchFilters) => {
    setIsLoading(true);
    setError('');

    try {
      console.log('Starting search with filters:', filters);
      console.log('Total properties before filtering:', properties.length);
      
      // Counter variables for diagnostics
      let transactionMatchCount = 0;
      let typeMatchCount = 0;
      let roomMatchCount = 0;
      let locationMatchCount = 0;
      let featureMatchCount = 0;
      let bathroomMatchCount = 0;
      let floorMatchCount = 0;
      let heatingMatchCount = 0;
      let priceMatchCount = 0;
      let areaMatchCount = 0;
      let totalMatchCount = 0;
      
      // Filter properties based on all criteria
      const filteredProperties = properties.filter(property => {
        // Check transaction type match
        const transactionMatches = property.actionShortName === (filters.transactionType === 'buy' ? 'P' : 'I');
        if (transactionMatches) transactionMatchCount++;
        
        // Check property type match
        let typeMatches = true;
        if (filters.propertyTypes.length > 0) {
          typeMatches = filters.propertyTypes.some(selectedType => {
            // Convert property type names to lowercase for comparison
            const propertyType = (property.typeName || '').toLowerCase();
            const subType = (property.subTypeName || '').toLowerCase();
            
            let typeMatches = false;
            
            if (selectedType === 'stan') {
              typeMatches = propertyType.includes('stan') || 
                         propertyType.includes('s.') ||
                         subType.includes('stan') ||
                         subType.includes('s.');
            } 
            else if (selectedType === 'kuca') {
              typeMatches = propertyType.includes('kuća') || 
                         propertyType.includes('kuca') ||
                         subType.includes('kuća') ||
                         subType.includes('kuca');
            }
            else if (selectedType === 'zemljiste') {
              typeMatches = propertyType.includes('zemljište') || 
                         propertyType.includes('zemljiste') ||
                         propertyType.includes('plac') ||
                         subType.includes('zemljište') ||
                         subType.includes('zemljiste') ||
                         subType.includes('plac');
            }
            else if (selectedType === 'poslovni') {
              typeMatches = propertyType.includes('poslovni') || 
                         propertyType.includes('lokal') ||
                         propertyType.includes('kanc') ||
                         subType.includes('poslovni') ||
                         subType.includes('lokal') ||
                         subType.includes('kanc');
            }
            else if (selectedType === 'garaza') {
              typeMatches = propertyType.includes('garaža') || 
                         propertyType.includes('garaza') ||
                         subType.includes('garaža') ||
                         subType.includes('garaza');
            }
            
            console.log(`Property ${property.id} type match for ${selectedType}: ${typeMatches}`, {
              propertyType,
              subType
            });
            
            return typeMatches;
          });
        }
        if (typeMatches) typeMatchCount++;
        
        // Check room count match
        let roomsMatch = true;
        if (filters.rooms.length > 0) {
          const propertyRoomsNo = String(property.roomsNo || '');
          
          // Debug property rooms value
          console.log(`Property ${property.id} room value: ${propertyRoomsNo}`);
          
          // If any of the selected room options match, the property passes this filter
          roomsMatch = filters.rooms.some(roomValue => {
            let matches = false;
            
            // Special case for Garsonjera (0 rooms)
            if (roomValue === '0') {
              matches = propertyRoomsNo === '0' || 
                        propertyRoomsNo === 'Garsonjera' || 
                        propertyRoomsNo === '0.5';
            }
            // Special case for 4+ sobe
            else if (roomValue === '5') {
              matches = parseFloat(propertyRoomsNo) >= 4 || 
                        propertyRoomsNo.includes('4+');
            }
            // Normal case
            else {
              matches = propertyRoomsNo === roomValue || 
                        propertyRoomsNo.startsWith(roomValue + ' ') || 
                        propertyRoomsNo.includes(roomValue);
            }
            
            console.log(`Room match check for property ${property.id}, room value ${roomValue}: ${matches}`);
            return matches;
          });
        }
        if (roomsMatch) roomMatchCount++;
        
        // Check location match
        let locationMatches = true;
        if (filters.locations.length > 0) {
          // Capture all location-related data for comparison
          const propertyLocationArea = (property.locationArea || '').toLowerCase();
          const propertyLocationCity = (property.locationCityName || '').toLowerCase();
          const propertyLocationCounty = (property.locationCountyName || '').toLowerCase();
          
          // If any of the selected locations match, the property passes this filter
          locationMatches = filters.locations.some(selectedLocation => {
            const location = selectedLocation.toLowerCase();
            
            // Check if any property location fields contain the selected location
            const matches = 
              propertyLocationArea.includes(location) || 
              propertyLocationCity.includes(location) ||
              propertyLocationCounty.includes(location);
            
            console.log(`Location match check for property ${property.id}, location '${selectedLocation}': ${matches}`);
            
            return matches;
          });
        }
        if (locationMatches) locationMatchCount++;
        
        // Check feature match
        let featuresMatch = true;
        if (filters.features.length > 0 && property.spaces) {
          const propertyFeatures = property.spaces.toLowerCase().split(',').map(f => f.trim());
          
          // If the property has any of the selected features, it passes this filter
          featuresMatch = filters.features.some(selectedFeature => {
            const feature = selectedFeature.toLowerCase();
            const matches = propertyFeatures.some(propFeature => propFeature.includes(feature));
            
            console.log(`Feature match check for property ${property.id}, feature '${selectedFeature}': ${matches}`);
            return matches;
          });
        }
        if (featuresMatch) featureMatchCount++;
        
        // Check bathroom match
        let bathroomsMatch = true;
        if (filters.bathrooms.length > 0) {
          const propertyBathrooms = property.bathroomNO || 0;
          
          // If the property has any of the selected bathroom counts, it passes this filter
          bathroomsMatch = filters.bathrooms.some(selectedBathroom => {
            let matches = false;
            
            // Extract the number from bathroom option (e.g., "2 kupatila" -> 2)
            const bathroomCount = parseInt(selectedBathroom.split(' ')[0]);
            
            if (selectedBathroom.includes('4+')) {
              matches = propertyBathrooms >= 4;
            } else {
              matches = propertyBathrooms === bathroomCount;
            }
            
            console.log(`Bathroom match check for property ${property.id}, bathroom count '${selectedBathroom}': ${matches}`);
            return matches;
          });
        }
        if (bathroomsMatch) bathroomMatchCount++;
        
        // Check floor match
        let floorMatches = true;
        if (filters.floor.length > 0 && property.floorNoString) {
          const propertyFloor = property.floorNoString.toLowerCase();
          
          // If the property floor matches any of the selected floors, it passes this filter
          floorMatches = filters.floor.some(selectedFloor => {
            const floor = selectedFloor.toLowerCase();
            const matches = propertyFloor.includes(floor);
            
            console.log(`Floor match check for property ${property.id}, floor '${selectedFloor}': ${matches}`);
            return matches;
          });
        }
        if (floorMatches) floorMatchCount++;
        
        // Check heating match
        let heatingMatches = true;
        if (filters.heating.length > 0 && property.spaces) {
          const propertySpaces = property.spaces.toLowerCase();
          
          // If the property has any of the selected heating types, it passes this filter
          heatingMatches = filters.heating.some(selectedHeating => {
            const heating = selectedHeating.toLowerCase();
            const matches = propertySpaces.includes(heating);
            
            console.log(`Heating match check for property ${property.id}, heating '${selectedHeating}': ${matches}`);
            return matches;
          });
        }
        if (heatingMatches) heatingMatchCount++;
        
        // Check price range match
        const priceMatches = 
          property.price >= filters.priceRange[0] && 
          property.price <= filters.priceRange[1];
        if (priceMatches) priceMatchCount++;
        
        // Check area range match
        const areaMatches = 
          !property.area || 
          (property.area >= filters.areaRange[0] && 
           property.area <= filters.areaRange[1]);
        if (areaMatches) areaMatchCount++;
        
        // Return true only if all conditions match
        const allMatches = transactionMatches && 
                typeMatches && 
                roomsMatch && 
                locationMatches && 
                featuresMatch &&
                bathroomsMatch &&
                floorMatches &&
                heatingMatches &&
                priceMatches && 
                areaMatches;
                
        if (allMatches) totalMatchCount++;
        
        return allMatches;
      });

      // Update log filter success rates
      console.log('Filter results summary:', {
        total: properties.length,
        transactionMatches: transactionMatchCount,
        typeMatches: typeMatchCount,
        roomMatches: roomMatchCount,
        locationMatches: locationMatchCount,
        featureMatches: featureMatchCount,
        bathroomMatches: bathroomMatchCount,
        floorMatches: floorMatchCount,
        heatingMatches: heatingMatchCount,
        priceMatches: priceMatchCount,
        areaMatches: areaMatchCount,
        finalMatches: totalMatchCount
      });
      
      console.log('Filtered properties count:', filteredProperties.length);

      // Update state with filtered results
      setFilteredProperties(filteredProperties);
      setDisplayedProperties(filteredProperties.slice(0, propertiesPerLoad));
      setHasMore(filteredProperties.length > propertiesPerLoad);

      // Set error message if no properties found
      if (filteredProperties.length === 0) {
        setError(language === 'sr' 
          ? 'Nema pronađenih nekretnina koje odgovaraju vašim kriterijumima' 
          : 'No properties found matching your criteria');
      }
    } catch (err) {
      console.error('Error during search:', err);
      setError(language === 'sr' 
        ? 'Došlo je do greške prilikom pretrage'
        : 'An error occurred during search');
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

          {/* Favorites Button */}
          {favoritesCount > 0 && (
          <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="fixed left-4 top-28 z-30"
            >
              <button
                onClick={() => setIsFavoritesDrawerOpen(true)}
                className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span className="font-medium text-gray-800">
                  {favoritesCount} {language === 'sr' ? 'omiljene' : 'favorites'}
                </span>
              </button>
          </motion.div>
          )}

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
      
      {/* Favorites Drawer */}
      <FavoritesDrawer 
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
      />
      
      <FooterTW />
    </div>
  );
} 

export default RealEstatePage; 