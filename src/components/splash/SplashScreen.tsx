import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

interface SplashScreenProps {
  finishLoading: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ finishLoading }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Pričekaćemo da animacija loga završi, pa onda zatvoriti splash screen
    // 900ms je tačno koliko traje animacija loga u CSS-u
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 900); // Povećano sa 200ms na 900ms - čeka se da logo završi svoju animaciju

    // Povećavamo i ukupno vreme za završetak učitavanja
    const loadTimer = setTimeout(() => {
      finishLoading();
    }, 1100); // Povećano sa 400ms na 1100ms

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
          transition={{ duration: 0.4, ease: "easeInOut" }} // Povećano sa 0.2s na 0.4s za sporiju izlaznu animaciju
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