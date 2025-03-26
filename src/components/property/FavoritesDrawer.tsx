import React, { useEffect, useState } from "react";
import { X, Heart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { RealEstateDto } from "../../data/models/realEstate";
import realEstate from "../../data/realEstate";
import { useCmsData } from "../../services/CmsProvider";
import { useFavorites } from "../../hooks/FavoritesContext";

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ isOpen, onClose }) => {
  const [favorites, setFavorites] = useState<RealEstateDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentLanguage } = useCmsData();
  const { clearAllFavorites } = useFavorites();

  useEffect(() => {
    if (isOpen) {
      loadFavorites();
    }
  }, [isOpen]);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      // Get favorites from localStorage
      const favoritesIds = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
      
      if (favoritesIds.length === 0) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }
      
      // Fetch all properties to filter favorites
      //const result = await realEstate.getAllData();
      const result = await realEstate.getRealEstateList(currentLanguage, favoritesIds);
      
      if (result) {
        // Filter only favorites
        // const favoriteProperties = result.data.filter((property: RealEstateDto) => 
        //   favoritesIds.includes(property.id)
        // );
        //const favoriteProperties = result
        setFavorites(result);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = (propertyId: number) => {
    // Get current favorites
    const favoritesIds = JSON.parse(localStorage.getItem("favoriteProperties") || "[]");
    
    // Remove the property ID
    const updatedFavorites = favoritesIds.filter((id: number) => id !== propertyId);
    
    // Save updated favorites
    localStorage.setItem("favoriteProperties", JSON.stringify(updatedFavorites));
    
    // Update state
    setFavorites(favorites.filter(property => property.id !== propertyId));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
    
    // Refresh the page
    window.location.reload();
  };

  const formatPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-custom-black/40 z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-full sm:w-96 bg-white shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2 fill-current" />
                <h3 className="text-lg font-semibold">Omiljene nekretnine</h3>
              </div>
              {favorites.length > 0 && (
                <button
                  onClick={() => {
                    clearAllFavorites();
                    setFavorites([]);
                  }}
                  className="rounded-full p-2 hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
                  //title="Обриши све"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
              <button 
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">Još uvek nemate omiljene nekretnine</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Kada pronađete nekretninu koja vam se sviđa, kliknite na ikonicu srca
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((property) => (
                    <div 
                      key={property.id} 
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex">
                        {/* Property Image */}
                        <div className="w-1/3 h-24 overflow-hidden">
                          <Link to={`/property/${property.id}`} onClick={onClose}>
                            <img 
                              src={property.thumbnail != null  
                                ? `https://jblconcept.rs/photos/${property.thumbnail}` 
                                : "images/placeholder.svg"}
                              alt={property.typeName || "Property"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "images/placeholder.svg";
                              }}
                            />
                          </Link>
                        </div>
                        
                        {/* Property Info */}
                        <div className="w-2/3 p-3">
                          <Link to={`/property/${property.id}`} onClick={onClose}>
                            <h4 className="font-medium text-primary-blue text-sm truncate">
                              {property.portalName}
                            </h4>
                          </Link>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-primary-blue font-bold">
                              {formatPrice(property.price)} €
                            </span>
                            {property.area && (
                              <span className="text-xs text-gray-500 ml-2">
                                {property.area} m²
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500 truncate max-w-[70%]">
                              {[
                                property.locationArea, 
                                property.locationCityName
                              ].filter(Boolean).join(", ")}
                            </span>
                            <button 
                              onClick={() => removeFavorite(property.id)}
                              className="text-red-500 hover:text-red-600 p-1"
                              title="Ukloni iz omiljenih"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FavoritesDrawer; 