import { motion } from "framer-motion";
import { Bath, Bed, Heart, MapPin, Square } from "lucide-react";
import { Link } from "react-router-dom";
import { RealEstateDto } from "../../data/models/RealEstate";
import { useFavorites } from "../../hooks/FavoritesContext";
import { TbPremiumRights } from "react-icons/tb";

interface PropertyCardProps {
    property: RealEstateDto;
    index: number; 
    language: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, index, language }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    
    const formatPrice = (price: number) => {
      return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
  
    const getFeatures = () => {
      // Provera da li spaces postoji i da li je string
      const features = property.spaces?.split(',').map(item => item.trim()).filter(Boolean) || [];
      
      // Provera da li description postoji i da li je string
      const tags = property.description?.split(',').map(item => item.trim()).filter(Boolean) || [];
      
      const displayFeatures: string[] = [...tags, ...features ].slice(0, 10);

      // Provera da vidimo šta je dostupno u podacima
      // console.log("Spaces:", property.spaces);
      // console.log("Description:", property.description);
      // console.log("Parsed features:", features);
      // console.log("Parsed tags:", tags);
      
      return (
        <div className="flex flex-wrap gap-1 mt-2">
          {/* Prikazujemo sve features */}
          {displayFeatures.length > 0 && displayFeatures.map((feature: string, index: number) => (
            <span 
              key={`feature-${index}`} 
              className="bg-gray-100 px-3 py-1.5 rounded-full text-sm text-gray-600"
            >
              {feature} 
            </span>
          ))}
        </div>
      );
    };
  
    const getLuxuryBadge = () => {
      if (property.lux === 0) {
        return (
          <div className="absolute bottom-4 left-4 z-20 flex flex-col items-center bg-black/20 backdrop-blur-[2px] px-1.5 py-1 rounded-md">
            <TbPremiumRights className="text-primary-gold w-8 h-8 drop-shadow-md" />
            <span className="text-primary-gold text-xs font-medium tracking-wider drop-shadow-sm">LUX</span>
          </div>
        );
      }
      return null;
    };
  
    const getPropertyTypeBadge = () => {
      if (property.typeName) {
        return (
          <div className="absolute bottom-4 left-4 z-20">
            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {property.typeName} 
            </span>
          </div>
        );
      }
      return null;
    };
  
    const isRental = property.actionShortName?.toLowerCase().includes('i') || 
                     property.actionShortName?.toLowerCase().includes('k');
  
    
    const handleToggleFavorite = (e: React.MouseEvent, propertyId: number) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Dodajemo klasu za animaciju na srce
      const heartIcon = e.currentTarget.querySelector('svg');
      if (heartIcon) {
        heartIcon.classList.add('favorite-animation');
        // Uklanjamo klasu nakon što se animacija završi
        setTimeout(() => {
          heartIcon.classList.remove('favorite-animation');
        }, 600);
      }
      
      toggleFavorite(propertyId);
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
                // src={property.photos && property.photos.length > 0 
                //   ? `https://jblconcept.rs/photos/${property.photos[0].name}` 
                //   : "/placeholder.svg"}
                
                src={property.thumbnail != null  
                  ? `https://jblconcept.rs/photos${property.thumbnail}` 
                  : "/images/placeholder.svg"}
                alt={property.typeName || "*Property"}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/placeholder.svg";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
              
              {/* Action Badge - Top Left */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`${isRental ? 'bg-primary-gold' : 'bg-primary-blue'} text-white px-4 py-2 rounded-full text-base font-semibold shadow-lg`}>
                  {property.actionName || (language === 'sr' ? "*Prodaja" : "*For Sale")} 
                </span>
              </div>
              
              {/* Property Type Badge - Bottom Left */}
              {getPropertyTypeBadge()}
              {getLuxuryBadge()}
              
              {/* Price - Bosttom Right */}
              <div className="absolute bottom-4 right-4">
                <span className="text-white text-[1.8rem] font-bold shadow-lg px-3 py-1 bg-custom-black/50 rounded-lg">
                  {formatPrice(property.price)} €
                </span>
              </div>
            </div>
  
            {/* Favorite Button - Top Right */}
            <button
              onClick={(e) => handleToggleFavorite(e, property.id)}
              className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <Heart 
                className={`h-5 w-5 transition-colors ${isFavorite(property.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} 
              />
            </button>
  
            <div className="p-6">
              {/* Portal Name instead of Property Title */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-primary-blue line-clamp-1">
                  {property.portalName || "*Portal Name"}
                </h3>
                {/* Property location display */}
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.locationArea || property.locationCityName ? (
                    <span className="text-sm">
                      {[property.locationArea, property.locationCityName].filter(Boolean).join(", ")}
                    </span>
                  ) : null}
                </div>
              </div>
  
              {/* Property Stats - only show if the data exists */}
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                {property.area ? (
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.area} m²</span>
                  </div>
                ) : null}
                
                {property.roomsNo ? (
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.roomsNo}</span>
                  </div>
                ) : null}
                
                {property.bathroomNo ? (
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.bathroomNo}</span>
                  </div>
                ) : null}
              </div>
  
              {/* Property Features */}
              {getFeatures()}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };
  
  export default PropertyCard;