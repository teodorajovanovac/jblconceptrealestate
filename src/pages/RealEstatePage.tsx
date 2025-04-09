import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Seo from '../services/meta/Seo';
import TagManager from 'react-gtm-module';
import SearchBar from '../components/search/SearchBar';

import { Heart } from 'lucide-react';
import realEstate from '../data/RealEstateData';
import { RealEstateDto } from '../data/models/RealEstate';

import Spinner from '../components/ui/Spinner';

import FavoritesDrawer from '../components/property/FavoritesDrawer';
import { useFavorites } from "../hooks/FavoritesContext";
import PropertyCard from '../components/property/ProperyCard';
import { useCmsData } from '../services/CmsProvider';
import { SearchFilters, SearchFiltersEmpty } from '../data/models/SearchFilters'
import { ApiRequest } from '../data/models/ApiResponse'



const RealEstatePage: React.FC = () => {
  const {t, currentLanguage, loadingCmsData } = useCmsData();
  const [properties, setProperties] = useState<RealEstateDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchBarReady, setIsSearchBarReady] = useState(false);

  const defaultFilters = () => {
    const emptyFilter = SearchFiltersEmpty;
    emptyFilter.actionName = 'P';
    return emptyFilter;
  };
  
  // Initialize searchFilters from sessionStorage or default
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(() => {
    const savedState = sessionStorage.getItem('realEstateSearchState');
    if (savedState) {
      // const { filters, page } = JSON.parse(savedState);
      // setCurrentPage(page || 1);

      const { filters } = JSON.parse(savedState);
      return filters;
    }
    return defaultFilters();
  });

  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  
  
  const { favoritesCount } = useFavorites();
  
  const [error, setError] = useState<string | null>(null);
  
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
//  const loaderRef = useRef<HTMLDivElement>(null);

  const pageSize = 6;
  // Додајемо useEffect за скроловање на врх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'pageview',
        path: window.location.pathname,
        page: 'realestate-search-page', 
      },
    };
  
    TagManager.dataLayer(tagManagerArgs);
  }, []);

  useEffect(() => {
    // Only fetch properties if SearchBar is ready
    if (isSearchBarReady && !loadingCmsData && currentLanguage) {
      //console.log("3 - useEffect - currentPage:", currentLanguage);
      fetchProperties();
    }
  }, [currentPage, currentLanguage, loadingCmsData, isSearchBarReady]);

  
  const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);
       
      const searchParams: ApiRequest<SearchFilters> = {
        data: searchFilters, 
        pageNumber: currentPage,
        pageSize: pageSize
      };

      //console.log("Fetching page:", currentPage);
      const response = await realEstate.getSearchData(currentLanguage, searchParams);
        
        if (response.isSuccess && response.data && response.data.length > 0) {
        setTotalPages(response.totalPages!);
        setProperties(prevProperties => 
          currentPage === 1 
            ? response.data || [] 
            : [...prevProperties, ...(response.data || [])]
        );
        } else {
        setError(t('realestate-error-not-found'));
        }
      } catch (err) {
        console.error('Error loading properties:', err);
        setError(t('realestate-error-loading'));
        } finally {
        setIsLoading(false);
      }
    };

  // Intersection Observer za infinite scroll
  useEffect(() => {
   // if (!loaderRef.current || isLoading) return;
   //console.log("4 - observer - isLoading " + isLoading)
    if (isLoading || currentPage > totalPages) return;
    // const options = {
    //   root: null,
    //   rootMargin: '200px',
    //   threshold: 0.1
    // };
    
    // const observer = new IntersectionObserver((entries) => {
    //   const [entry] = entries;
    //   if (entry.isIntersecting && hasMore) {
    //     loadMoreProperties();
    //   }
    // }, options);
    
    // observer.observe(loaderRef.current);
    //console.log("5 - observer -" + isLoading)
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoading && currentPage < totalPages) {
          //console.log("Observer triggering page increment from:", currentPage); // Debug log
          setCurrentPage(prev => {
            //console.log("Incrementing page to:", prev + 1); // Debug log
            return prev + 1;
          });
        }
      },
      { threshold: 0.1 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }
    
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [isLoading, currentPage, totalPages]);

  // Modified handleSearch function
  const handleSearch = async (filters: SearchFilters) => {
    try {
      //console.log("handleSearch - filters:", filters);
      setSearchFilters(filters);
      setIsLoading(true);
      setError(null);
      setCurrentPage(1);
      setTotalPages(1);
      setProperties([]); // Clear existing properties before new search
      
      const searchParams: ApiRequest<SearchFilters> = {
        data: filters,
        pageNumber: 1,
        pageSize: pageSize
      };

      // Save search state to 
      
      sessionStorage.setItem('realEstateSearchState', JSON.stringify({
        filters,
        page: 1
      }));

      //console.log("Fetching properties for page:", filters);
      const response = await realEstate.getSearchData(currentLanguage, searchParams);
      
      if (response.isSuccess && response.data && response.data.length > 0) {
        setTotalPages(response.totalPages!);
        setProperties(response.data);
        
        // If there was a last viewed property, scroll to it
        // const lastViewedProperty = sessionStorage.getItem('lastViewedProperty');
        // if (lastViewedProperty) {
        //   const propertyId = parseInt(lastViewedProperty);
        //   setTimeout(() => {
        //     const propertyElement = document.getElementById(`property-${propertyId}`);
        //     if (propertyElement) {
        //       propertyElement.scrollIntoView({ behavior: 'smooth' });
        //     }
        //   }, 100);
        // }
      } else {
        setProperties([]);
        setError(t('realestate-error-not-found-criteria'));
      }
    } catch (err) {
      console.error('Error during search:', err);
      setError(t('action-search-property-error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Add effect to update sessionStorage when page changes
  useEffect(() => {
    if (currentPage > 1) {
      const savedState = sessionStorage.getItem('realEstateSearchState');
      if (savedState) {
        const state = JSON.parse(savedState);
        sessionStorage.setItem('realEstateSearchState', JSON.stringify({
          ...state,
          page: currentPage
        }));
      }
    }
  }, [currentPage]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // console.log('RealEstatePage render - full state:', {
  //   favoritesCount,
  //   favoritesLength: favorites?.length,
  //   hasHook: !!useFavorites
  // });

  // useEffect(() => {
  //   console.log('Favorites array changed:', favorites?.length);
  // }, [favorites]);

  // useEffect(() => {
  //   console.log('FavoritesCount changed:', favoritesCount);
  // }, [favoritesCount]);

  // Додајемо лог при сваком рендеровању
  //PROVERI KASNIJE
  //console.log('RealEstatePage rendering with favoritesCount:', favoritesCount);

  return (
    <>
      <Seo 
        title={currentLanguage === 'sr' ? "Nekretnine" : "Properties"} 
        description={currentLanguage === 'sr' ? "Pronađite savršenu nekretninu" : "Find your perfect property"}
        url={window.location.href}
      />
      
      
      <main className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary-blue mb-2">
              {t('realestate-title')}
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t('realestate-description')}
            </p>
          </motion.div>

          
          <div className="fixed left-4 top-28 z-30">
            {favoritesCount > 0 ? (
          <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <button
                onClick={() => setIsFavoritesDrawerOpen(true)}
                  className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-shadow hidden md:flex"
              >
                  <Heart className={`h-5 w-5 ${favoritesCount > 0 ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                <span className="font-medium text-gray-800">
                    {favoritesCount} {t("favorites-title")}
                </span>
              </button>
          </motion.div>
            ) : (
              <div></div>
          )}
          </div>

          {/* Search Bar Component */}
          <SearchBar 
            onSearch={handleSearch} 
            defaultFilters={searchFilters}
            onReady={() => setIsSearchBarReady(true)}
          />
          
          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center py-4">
              {/* PRVO UČITANJE SPINNER */}
              <Spinner size="sm" />
            </div>
          )}
          
          {/* Results Section */}
          <div className="mt-8">
            {/* Prikazujemo error ako postoji */}
            {error && (
              <div className="text-center text-red-500 py-10">
                {error}
              </div>
            )}
            
            {/* Prikazujemo poruku ako nema rezultata */}
            {!error && properties.length === 0 && !isLoading && (
              <div className="text-center text-gray-500 py-10">
                {t("property-search-nodata")}
              </div>
            )}
            
            {/* Grid sa nekretninama */}
            {properties.length > 0 && (
          <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
                >
                {properties.map((property, index) => (
                    <PropertyCard 
                      key={`${property.id}-${index}`} 
                      property={property} 
                      index={index} 
                      language={currentLanguage}
                      containerProps={{ id: `property-${property.id}` }}
                    />
            ))}
          </motion.div>
            )}
            
            {/* Loader za infinite scroll */}
            <div ref={observerRef} className="flex justify-center py-4 mt-4">
              {isLoading && 
                <Spinner/>
              }
              {!isLoading && currentPage >= totalPages && (
                <p className="text-gray-500">
                  {t("property-search-nomoredata")}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Favorites Drawer */}
      <FavoritesDrawer 
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
      />
    </>
  );
} 

export default RealEstatePage; 