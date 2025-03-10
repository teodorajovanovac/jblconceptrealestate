import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

interface SplashScreenProps {
  finishLoading: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ finishLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash screen for 2.2 seconds before starting fade out
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    // Wait for fade out animation to complete before finishing loading
    const loadTimer = setTimeout(() => {
      finishLoading();
    }, 3000);

    // Clean up timers
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(loadTimer);
    };
  }, [finishLoading]);

  // U React-u najpouzdaniji način je importovati sliku direktno
  // Korisnik treba da kopira jbllogo.svg u public folder
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="logo-container">
            <img
              src="/jbllogo.svg"
              alt="JBL Concept Logo"
              className="logo-image"
              onError={(e) => {
                // Fallback ako slika nije pronađena
                console.error("Logo nije pronađen");
                // Možemo postaviti fallback sliku
                // e.currentTarget.src = "/fallback-image.png";
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 