import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

type Testimonial = {
  id: number
  quote: {
    sr: string
    en: string
  }
  name: string
  location: {
    sr: string
    en: string
  }
  imageUrl: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: {
      sr: "JBL Concept je nadmašio sva moja očekivanja. Njihov tim je bio profesionalan, posvećen i učinio je ceo proces prodaje moje nekretnine potpuno bezbrižnim.",
      en: "JBL Concept exceeded all my expectations. Their team was professional, dedicated, and made the entire process of selling my property completely carefree."
    },
    name: "Marija Petrović",
    location: {
      sr: "Novi Beograd, Srbija",
      en: "New Belgrade, Serbia"
    },
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    quote: {
      sr: "Zahvaljujući JBL Conceptu, pronašli smo savršenu kuću za našu porodicu. Njihovo duboko razumevanje tržišta i lični pristup napravili su veliku razliku.",
      en: "Thanks to JBL Concept, we found the perfect home for our family. Their deep understanding of the market and personal approach made a huge difference."
    },
    name: "Stefan Jovanović",
    location: {
      sr: "Dedinje, Beograd",
      en: "Dedinje, Belgrade"
    },
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    quote: {
      sr: "Iz inostranstva smo tražili investicionu nekretninu u Beogradu. JBL tim je bio izuzetno responzivan, detaljan i pružio nam je sigurnost u svakom koraku.",
      en: "We were looking for an investment property in Belgrade from abroad. The JBL team was extremely responsive, detailed, and provided us with security at every step."
    },
    name: "Ana Vuksanović",
    location: {
      sr: "London, Velika Britanija",
      en: "London, Great Britain"
    },
    imageUrl: "https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
  }
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)

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

  // Autoplay functionality
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplayEnabled]);

  // Pause autoplay when user interacts with testimonials
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplayEnabled(false);
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplayEnabled(true), 10000);
  };

  const translations = {
    sr: {
      title: "UTISCI KLIJENATA",
      subtitle: "Šta kažu naši klijenti",
    },
    en: {
      title: "CLIENT TESTIMONIALS",
      subtitle: "What our clients say",
    }
  }

  const t = translations[language as 'sr' | 'en']

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
          <h3 className="text-lg md:text-xl font-medium tracking-wider text-primary-blue mb-3">{t.title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{t.subtitle}</h2>
        </motion.div>
        
        <div className="relative">
          {/* Desktop view - show all testimonials */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  language={language as 'sr' | 'en'} 
                />
              </motion.div>
            ))}
          </div>
          
          {/* Mobile view - show one testimonial at a time */}
          <div className="md:hidden">
            <motion.div
              key={testimonials[activeIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard 
                testimonial={testimonials[activeIndex]} 
                language={language as 'sr' | 'en'} 
              />
            </motion.div>
            
            {/* Pagination dots for mobile */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex 
                      ? "w-8 h-2 bg-primary-blue" 
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ 
  testimonial, 
  language 
}: { 
  testimonial: Testimonial
  language: 'sr' | 'en'
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