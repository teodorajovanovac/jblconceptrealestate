import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { useCmsData } from "../../services/CmsProvider"
import getCmsData from "../../data/cms"
import { Testimonial } from "../../data/models/Testimonial"

export default function Testimonials() {
  const { t, currentLanguage } = useCmsData()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0)
  //const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  
  

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getCmsData().getTestimonialData();
        //console.log("Fetched testimonials:", data.testimonials);
        setTestimonials(data.testimonials); 
        //console.log("Fetched testimonials:", testimonials);
      } catch (err) {
          //setError("Failed to load agents data.");
      } finally {
        //setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Autoplay functionality
  // useEffect(() => {
  //   if (!autoplayEnabled) return;
    
  //   const interval = setInterval(() => {
  //     setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  //   }, 5000);
    
  //   return () => clearInterval(interval);
  // }, [autoplayEnabled]);

  // // Pause autoplay when user interacts with testimonials
  // const handleDotClick = (index: number) => {
  //   setActiveIndex(index);
  //   setAutoplayEnabled(false);
    
  //   // Resume autoplay after 10 seconds of inactivity
  //   setTimeout(() => setAutoplayEnabled(true), 10000);
  // };



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
          <h3 className="text-lg md:text-xl font-medium tracking-wider text-primary-blue mb-3">{t("testimonials-title")}</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{t("testimonials-subtitle")}</h2>
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
                  language={currentLanguage} 
                />
              </motion.div>
            ))}
          </div>
          
          {/* Mobile view - show one testimonial at a time */}
          <div className="md:hidden">
            
           {testimonials.length > 0 && ( <motion.div
              key={testimonials[activeIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard 
                testimonial={testimonials[activeIndex]} 
                language={currentLanguage} 
              />
            </motion.div>)}
            
            {/* Pagination dots for mobile */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  //onClick={() => handleDotClick(index)}
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

function TestimonialCard({ testimonial, language}: { 
  testimonial: Testimonial
  language: string
}) 

{
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