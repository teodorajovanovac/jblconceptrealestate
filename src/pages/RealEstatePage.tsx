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
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import realEstate from '../data/realEstate';

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
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const propertiesPerPage = 30;
  const [filters, setFilters] = useState<SearchFilters>({
    transactionType: 'buy',
    searchTerm: '',
    propertyTypes: [],
    rooms: [],
    locations: [],
    priceRange: [0, 1000000],
    areaRange: [0, 500],
    features: [],
    state: [],
    floor: [],
    heating: [],
    parking: []
  });

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

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const result = await realEstate.getAllData();
      if (result.isSuccess && result.data) {
        setProperties(result.data);
        setFilteredProperties(result.data);
        setTotalPages(Math.ceil(result.data.length / propertiesPerPage));
      } else {
        setError("Failed to fetch properties");
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("An error occurred while fetching properties");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    setFilters(filters);
    setCurrentPage(1); // Reset to first page when searching
    
    // Apply filters to properties
    let results = [...properties];
    
    // Filter by transaction type
    if (filters.transactionType === 'buy') {
      results = results.filter(property => 
        property.actionName?.toLowerCase().includes('prodaja') || 
        property.actionName?.toLowerCase().includes('sale')
      );
    } else if (filters.transactionType === 'rent') {
      results = results.filter(property => 
        property.actionName?.toLowerCase().includes('najam') || 
        property.actionName?.toLowerCase().includes('rent')
      );
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter(property => 
        property.description?.toLowerCase().includes(term) ||
        property.typeName?.toLowerCase().includes(term) ||
        property.locationCityName?.toLowerCase().includes(term) ||
        property.locationArea?.toLowerCase().includes(term)
      );
    }
    
    // Filter by property types
    if (filters.propertyTypes.length > 0) {
      results = results.filter(property => 
        filters.propertyTypes.some(type => 
          property.typeName?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }
    
    // Filter by number of rooms
    if (filters.rooms.length > 0) {
      results = results.filter(property => {
        if (!property.roomsNo) return false;
        return filters.rooms.some(room => {
          if (room === '4+') return property.roomsNo >= 4;
          return property.roomsNo === parseInt(room);
        });
      });
    }
    
    // Filter by locations
    if (filters.locations.length > 0) {
      results = results.filter(property => 
        filters.locations.some(location => 
          property.locationArea?.toLowerCase().includes(location.toLowerCase()) ||
          property.locationCityName?.toLowerCase().includes(location.toLowerCase()) ||
          property.locationCountyName?.toLowerCase().includes(location.toLowerCase())
        )
      );
    }
    
    // Filter by price range
    results = results.filter(property => 
      property.price >= filters.priceRange[0] && 
      property.price <= filters.priceRange[1]
    );
    
    // Filter by area range
    results = results.filter(property => 
      property.area >= filters.areaRange[0] && 
      property.area <= filters.areaRange[1]
    );
    
    // Apply other filters as needed
    if (filters.features.length > 0) {
      results = results.filter(property => 
        filters.features.some(feature =>
          property.spaces?.toLowerCase().includes(feature.toLowerCase())
        )
      );
    }
    
    if (filters.state.length > 0) {
      results = results.filter(property => 
        filters.state.some(state =>
          property.status?.toLowerCase().includes(state.toLowerCase())
        )
      );
    }
    
    if (filters.floor.length > 0) {
      results = results.filter(property => 
        filters.floor.some(floor =>
          property.floorNoString?.toLowerCase().includes(floor.toLowerCase())
        )
      );
    }
    
    if (filters.heating.length > 0) {
      results = results.filter(property => 
        filters.heating.some(heating =>
          property.spaces?.toLowerCase().includes(heating.toLowerCase())
        )
      );
    }
    
    if (filters.parking.length > 0) {
      results = results.filter(property => 
        filters.parking.some(parking =>
          property.spaces?.toLowerCase().includes(parking.toLowerCase())
        )
      );
    }
    
    setFilteredProperties(results);
    setTotalPages(Math.ceil(results.length / propertiesPerPage));
  };

  // Get current page properties
  const getCurrentPageProperties = () => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    return filteredProperties.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Determine start and end of visible page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust range to show max visible pages
      if (end - start + 1 < maxVisiblePages - 2) {
        if (start === 2) {
          end = Math.min(totalPages - 1, start + (maxVisiblePages - 3));
        } else if (end === totalPages - 1) {
          start = Math.max(2, end - (maxVisiblePages - 3));
        }
      }
      
      // Add ellipsis before middle pages if needed
      if (start > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis after middle pages if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo 
        title={language === 'sr' ? "Nekretnine" : "Properties"} 
        description={language === 'sr' ? "Pronađite savršenu nekretninu" : "Find your perfect property"}
      />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-blue mb-8">
            {language === 'sr' ? "Pretraga nekretnina" : "Property Search"}
          </h1>
          
          {/* Search Bar Component */}
          <SearchBar onSearch={handleSearch} />
          
          {/* Results Section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {language === 'sr' ? "Rezultati pretrage" : "Search Results"} 
                <span className="ml-2 text-gray-500">({filteredProperties.length})</span>
              </h2>
              
              {/* Sort dropdown could go here */}
            </div>
            
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
              </div>
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
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {getCurrentPageProperties().map((property) => (
                  <motion.div key={property.id} variants={itemVariants}>
                    <Link to={`/property/${property.id}`} className="group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative h-[280px]">
                          <img 
                            src={property.photos && property.photos.length > 0 
                              ? `https://jblconcept.rs/photos/${property.photos[0].name}` 
                              : "/placeholder.svg"} 
                            alt={property.typeName || "Property"} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">
                              {property.subTypeName || property.typeName || "Property"}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-primary-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                              {property.actionName || "For Sale"}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2 text-primary-blue">
                                {property.typeName} {property.locationCityName && `- ${property.locationCityName}`}
                              </h3>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">
                                  {[
                                    property.locationArea, 
                                    property.locationCityName, 
                                    property.locationCountyName
                                  ].filter(Boolean).join(", ")}
                                </span>
                              </div>
                            </div>
                            <span className="text-xl font-bold text-primary-blue">
                              {property.price?.toLocaleString() || "N/A"} €
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Bed className="w-4 h-4 mr-1" />
                              <span className="text-sm">{property.roomsNo || "N/A"}</span>
                            </div>
                            <div className="flex items-center">
                              <Bath className="w-4 h-4 mr-1" />
                              <span className="text-sm">{property.bathroomNO || "N/A"}</span>
                            </div>
                            <div className="flex items-center">
                              <Square className="w-4 h-4 mr-1" />
                              <span className="text-sm">{property.area || "N/A"} m²</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {property.spaces && property.spaces.split(',').slice(0, 3).map((feature: string, index: number) => (
                              <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                                {feature.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            {/* Pagination */}
            {!isLoading && !error && totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary-blue hover:bg-primary-blue/10'}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {getPaginationNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                      className={`px-4 py-2 rounded-md ${
                        page === currentPage 
                          ? 'bg-primary-blue text-white' 
                          : page === '...' 
                            ? 'text-gray-500 cursor-default' 
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary-blue hover:bg-primary-blue/10'}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <FooterTW />
    </div>
  );
} 