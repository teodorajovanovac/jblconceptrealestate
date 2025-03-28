import React, { useState, useEffect } from "react";
import { Plus, X, Search, Heart, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useCmsData } from "../../services/CmsProvider";
import PropertySearch from "../property/PropertySearch";
import FavoritesDrawer from "../property/FavoritesDrawer";
import { useFavorites } from "../../hooks/FavoritesContext";
import "./ActionButtons.css";

const ActionButtons: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { t } = useCmsData();
  const navigate = useNavigate();
  const { favoritesCount } = useFavorites();
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);

  // Check screen size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Check if we're on the home page and if we've scrolled
  useEffect(() => {
    const isHome = window.location.pathname === '/' || window.location.pathname === '/landing';
    setIsHomePage(isHome);

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close expanded menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside the action buttons area
      if (isExpanded && !target.closest('.action-buttons-container')) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    // Pratimo promene favoritesCount
    if (favoritesCount > 0) {
      // Pokreni animaciju srca
      setShowFloatingHearts(true);
      
      // Zaustavi animaciju nakon 5 sekundi
      const timer = setTimeout(() => {
        setShowFloatingHearts(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [favoritesCount]);

  // Dodatna funkcija za praćenje promene favoritesCount
  useEffect(() => {
    let previousCount = 0;
    
    // Funkcija koja će se pozvati kada se ažurira favoritesCount
    const handleFavoritesUpdate = () => {
      // Ako je novi broj favorita veći od prethodnog, korisnik je upravo lajkovao novu nekretninu
      if (favoritesCount > previousCount) {
        setShowFloatingHearts(true);
        
        // Zaustavi animaciju nakon 5 sekundi
        setTimeout(() => {
          setShowFloatingHearts(false);
        }, 5000);
      }
      
      previousCount = favoritesCount;
    };
    
    // Slušaj događaj za ažuriranje favorita
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [favoritesCount]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsExpanded(false);
  };

  const handleFavoritesClick = () => {
    setIsFavoritesOpen(true);
    setIsExpanded(false);
  };

  const handleContactClick = () => {
    navigate('/contact');
    // Scroll to top after navigation
    window.scrollTo(0, 0);
    // Close the action buttons after navigation
    setIsExpanded(false);
  };

  const buttonVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      y: 0
    },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      y: -80 * custom,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    })
  };

  const mainButtonVariants = {
    initial: { rotate: 0 },
    expanded: { rotate: 135 }
  };

  // Adjust position based on screen size
  const containerPosition = isMobile 
    ? "fixed bottom-4 left-4 z-150 action-buttons-container"
    : "fixed bottom-6 left-6 z-150 action-buttons-container";

  // Adjust button sizes based on screen size - Increased by 30%
  const mainButtonSize = isMobile ? "w-16 h-16" : "w-18 h-18"; // Increased from w-12/w-14
  const actionButtonSize = isMobile ? "w-12 h-12" : "w-14 h-14"; // Increased from w-10/w-12
  const iconSize = isMobile ? "w-5 h-5" : "w-6 h-6"; // Increased from w-4/w-5
  const mainIconSize = isMobile ? "w-6 h-6" : "w-7 h-7"; // Increased from w-5/w-6

  // Glavno dugme će uvek biti tamno plavo kao i ostala dugmad
  const mainButtonColor = "bg-primary-dark-blue";
  const mainButtonTextColor = "text-white";

  return (
    <>
      {/* Main fixed container for the buttons */}
      <div className={containerPosition}>
        {/* Action buttons that appear when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Search Button */}
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit={{ 
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.1 }
                }}
                custom={3}
                onClick={handleSearchClick}
                className={`absolute bottom-2 left-[10%] transform -translate-x-1/2 ${actionButtonSize} 
                  rounded-full bg-primary-dark-blue text-white 
                  flex items-center justify-center shadow-lg 
                  hover:bg-primary-dark-blue/90 transition-colors`}
                aria-label={t("action-buttons-search")}
              >
                <Search className={`${iconSize} mx-auto`} />
              </motion.button>

              {/* Favorites Button */}
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit={{ 
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.1 }
                }}
                custom={2}
                onClick={handleFavoritesClick}
                className={`absolute bottom-2 left-[10%] transform -translate-x-1/2 ${actionButtonSize} 
                  rounded-full bg-primary-dark-blue text-white 
                  flex items-center justify-center shadow-lg 
                  hover:bg-primary-dark-blue/90 transition-colors`}
                aria-label={t("action-buttons-favorites")}
              >
                <Heart className={`${favoritesCount > 0 ? 'w-7 h-7' : iconSize} mx-auto ${favoritesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
                {favoritesCount > 0 && (
                  <span className="absolute text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-50">
                    {favoritesCount}
                  </span>
                )}
              </motion.button>

              {/* Contact Button */}
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                exit={{ 
                  scale: 0,
                  opacity: 0,
                  transition: { duration: 0.1 }
                }}
                custom={1}
                onClick={handleContactClick}
                className={`absolute bottom-2 left-[10%] transform -translate-x-1/2 ${actionButtonSize} 
                  rounded-full bg-primary-dark-blue text-white 
                  flex items-center justify-center shadow-lg 
                  hover:bg-primary-dark-blue/90 transition-colors`}
                aria-label={t("action-buttons-contact")}
              >
                <Phone className={`${iconSize} mx-auto`} />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <motion.button
          variants={mainButtonVariants}
          initial="initial"
          animate={isExpanded ? "expanded" : "initial"}
          transition={{ duration: 0.3 }}
          
          onClick={toggleExpand}
          className={`${mainButtonSize} 
            rounded-full ${mainButtonColor} ${mainButtonTextColor} 
            flex items-center justify-center shadow-lg 
            opacity-75
            border-primary-light-blue border-4
            hover:opacity-100
            focus:ring-2 focus:ring-primary-dark-blue focus:ring-offset-2 
            transition-all duration-300 main-action-button ${!isExpanded ? (favoritesCount > 0 ? 'favorite-pulse' : 'animate-soft-pulse') : ''}`}
        >
          {/* Mala srca koja se pojavljuju samo kada ima omiljenih nekretnina i kada je showFloatingHearts true */}
          {favoritesCount > 0 && showFloatingHearts && !isExpanded && (
            <>
              <Heart className="floating-heart w-4 h-4" />
              <Heart className="floating-heart w-3 h-3" />
              <Heart className="floating-heart w-4 h-4" />
              <Heart className="floating-heart w-3 h-3" />
            </>
          )}
          
          {isExpanded ? <X className={mainIconSize} /> : <Plus className={mainIconSize} />}
        </motion.button>
      </div>

      {/* Property Search Drawer */}
      <PropertySearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
      />
    </>
  );
};

export default ActionButtons; 