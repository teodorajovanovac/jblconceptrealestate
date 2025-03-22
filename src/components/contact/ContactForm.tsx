import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Send, MessageSquare, ArrowRight, Phone } from "lucide-react"

export default function ContactForm() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')

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

  const translations = {
    sr: {
      title: "Pošaljite nam poruku",
      subtitle: "Imate pitanje ili želite da saznate više o našim uslugama?",
      emailPlaceholder: "Vaša email adresa",
      buttonText: "Pošalji poruku",
      contactHeading: "Kontaktirajte nas",
      contactText: "Naš tim je uvek spreman da vam pomogne i odgovori na sva vaša pitanja o nekretninama. Ostavite nam svoju email adresu i uskoro ćemo vas kontaktirati.",
      successTitle: "Hvala na poruci!",
      successMessage: "Uspešno ste poslali poruku. Naš tim će vas kontaktirati u najkraćem mogućem roku.",
      trustBadge1: "Brz odgovor",
      trustBadge2: "Stručna pomoć",
      trustBadge3: "Dostupni 24/7",
      callToAction: "Posetite našu kancelariju",
      preferPhone: "Radije biste telefonirali?",
      phoneNumber: "+381 61 2299988",
      contactEmail: "office@jblconcept.rs",
      email: "Email:"
    },
    en: {
      title: "Send us a message",
      subtitle: "Have a question or want to learn more about our services?",
      emailPlaceholder: "Your email address",
      buttonText: "Send message",
      contactHeading: "Contact us",
      contactText: "Our team is always ready to help you and answer all your questions about real estate. Leave us your email address and we will contact you soon.",
      successTitle: "Thank you for your message!",
      successMessage: "You have successfully sent a message. Our team will contact you as soon as possible.",
      trustBadge1: "Fast response",
      trustBadge2: "Expert help",
      trustBadge3: "Available 24/7",
      callToAction: "Visit our office",
      preferPhone: "Prefer to call?",
      phoneNumber: "+381 (0)61 22 999 88",
      contactEmail: "office@jblconcept.rs",
      email: "Email:"
    }
  }

  const t = translations[language as 'sr' | 'en']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!email) return
    if (!/^\S+@\S+\.\S+$/.test(email)) return
    
    // In a real implementation, you would send the form data to your backend
    // For now, just show a thank you message
    setIsSubmitted(true)
    setEmail("")
    
    // Reset form after 8 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 8000)
  }

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-blue mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Contact form or success message */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 relative h-full flex flex-col"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="text-green-600 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{t.successTitle}</h3>
                <p className="text-gray-600">{t.successMessage}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center mr-4">
                    <MessageSquare className="h-6 w-6 text-primary-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{t.contactHeading}</h3>
                </div>
                
                <p className="text-gray-600 mb-8">{t.contactText}</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-10 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div className="w-full">
                    <button 
                      type="submit" 
                      className="cta-button w-full"
                    >
                      <span>{language === 'sr' ? 'Pošalji poruku' : 'Send Message'}</span>
                      <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
                      </svg>
                    </button>
                  </div>
                </form>
                
                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-primary-blue text-sm font-medium">{t.trustBadge1}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary-blue text-sm font-medium">{t.trustBadge2}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary-blue text-sm font-medium">{t.trustBadge3}</div>
                  </div>
                </div>
                
                {/* Contact Information - phone numbers only */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 mb-2 text-sm font-medium">{t.preferPhone}</p>
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-primary-blue mr-2" />
                    <a href="tel:+381612299988" className="text-lg font-bold text-primary-blue hover:text-secondary-blue transition-colors">
                      {t.phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center mb-4">
                    <Phone className="h-5 w-5 text-primary-blue mr-2" />
                    <a href="tel:+381612299988" className="text-lg font-bold text-primary-blue hover:text-secondary-blue transition-colors">
                      {t.phoneNumber}
                    </a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
          
          {/* Right column - Office image and address */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="rounded-3xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 h-72 md:h-80">
              <img 
                src="/slike od jasne/office jbl full pic.jpg" 
                alt="Our office" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/slike od jasne/office jbl full pic.jpg';
                }}
              />
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t.callToAction}</h3>
              <p className="text-gray-600 mb-6">
                JBL Concept Real Estate<br />
                Majke Jevrosime 47<br />
                11000 Beograd
              </p>
              
              <div className="flex items-center mt-2">
                <Mail className="h-5 w-5 text-primary-blue mr-2" />
                <a href={`mailto:${t.contactEmail}`} className="text-lg font-bold text-primary-blue hover:text-secondary-blue transition-colors">
                  {t.contactEmail}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 