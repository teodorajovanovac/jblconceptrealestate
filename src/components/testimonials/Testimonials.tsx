import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { useCmsData } from "../../services/CmsProvider"
import getCmsData from "../../data/cms"
import { Testimonial } from "../../data/models/Testimonial"

export default function Testimonials() {
  const { t, currentLanguage } = useCmsData()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const touchStartXRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Visible testimonials za desktop prikaz (uvek 3)
  const getVisibleTestimonials = () => {
    if (testimonials.length <= 3) return testimonials;
    return [
      testimonials[activeIndex % testimonials.length],
      testimonials[(activeIndex + 1) % testimonials.length],
      testimonials[(activeIndex + 2) % testimonials.length]
    ];
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getCmsData().getTestimonialData();
        setTestimonials(data.testimonials); 
      } catch (err) {
        console.error("Failed to load testimonials data:", err);
      }
    };
    fetchTestimonials();
  }, []);

  // Autoplay funkcionalnost za oba prikaza (mobile i desktop)
  useEffect(() => {
    if (!autoplayEnabled || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplayEnabled, testimonials.length]);

  // Hendlovanje klika na tačkice
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplayEnabled(false);
    
    // Nastavak autoplay-a nakon 10 sekundi neaktivnosti
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  // Navigacija kroz testimoniale
  const goToPrevious = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  // Touch gestures za mobilni prikaz
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;
    
    // Swipe threshold
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe levo, idi na sledeći
        goToNext();
      } else {
        // Swipe desno, idi na prethodni
        goToPrevious();
      }
    }
    
    touchStartXRef.current = null;
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h3 className="text-lg md:text-xl font-medium tracking-wider text-primary-blue mb-3">
            {t("testimonials-title")}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {t("testimonials-subtitle")}
          </h2>
        </motion.div>
        
        {/* Desktop View - 3 testimonials sa bočnom animacijom */}
        <div 
          className="hidden md:block relative" 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-3 gap-8">
            <AnimatePresence initial={false} mode="popLayout">
              {testimonials.length > 0 && getVisibleTestimonials().map((testimonial, idx) => (
                <motion.div
                  key={`desktop-${testimonial.id}-${idx}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <TestimonialCard 
                    testimonial={testimonial} 
                    language={currentLanguage} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Desktop navigacija */}
          <div className="mt-10 flex justify-center items-center space-x-4">
            <button 
              onClick={goToPrevious}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-primary-blue transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex % testimonials.length 
                      ? "w-8 h-2 bg-primary-blue" 
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-primary-blue transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile View */}
        <div 
          className="md:hidden relative" 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${testimonials[activeIndex % testimonials.length].id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard 
                  testimonial={testimonials[activeIndex % testimonials.length]} 
                  language={currentLanguage} 
                />
              </motion.div>
            </AnimatePresence>
          )}
          
          {/* Mobile navigacija */}
          <div className="mt-10 flex justify-center items-center space-x-4">
            <button 
              onClick={goToPrevious}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-primary-blue transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex % testimonials.length 
                      ? "w-8 h-2 bg-primary-blue" 
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-primary-blue transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, language}: { 
  testimonial: Testimonial
  language: string
}) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 relative h-full flex flex-col transform hover:-translate-y-1">
      <div className="text-primary-blue opacity-15 absolute top-6 left-6">
        <Quote size={24} />
      </div>
      
      <div className="pt-8 flex-grow">
        <p className="text-lg text-gray-700 leading-relaxed mb-8 relative z-10">
          "{testimonial.quote[language]}"
        </p>
      </div>
      
      <div className="flex items-center mt-auto pt-6 border-t border-gray-200">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-primary-blue/10">
          <img
            src={testimonial.imageUrl}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/images/avatar-placeholder.jpg';
            }}
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-gray-500 text-sm">{testimonial.location[language]}</p>
        </div>
      </div>
    </div>
  )
} 