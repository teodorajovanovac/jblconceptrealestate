import { useState, useEffect, useRef } from "react"
import { Building2, User, Mail, Phone, Home, FileText, Settings, HelpCircle, X, Key, Calculator, Shield, Search, ClipboardCheck, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Header from '../components/header/Header'
import FooterTW from '../components/footer/FooterTW'
import Seo from '../services/meta/Seo'

type ServiceType = 
  | 'buying' 
  | 'selling' 
  | 'rental' 
  | 'property-management' 
  | 'valuation' 
  | 'consulting' 
  | 'legal' 
  | 'handover' 
  | 'market-research' 
  | 'other';

export default function ContactPage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')
  const [formType, setFormType] = useState<ServiceType>('buying')
  const [showServiceModal, setShowServiceModal] = useState(false)
  const serviceButtonRef = useRef<HTMLButtonElement>(null)

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

  useEffect(() => {
    const currentLanguage = localStorage.getItem('language');
    if (currentLanguage) {
      setLanguage(currentLanguage);
    }
  }, [localStorage.getItem('language')]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showServiceModal && 
        serviceButtonRef.current && 
        !serviceButtonRef.current.contains(event.target as Node)
      ) {
        // Check if the click is on the dropdown itself
        const dropdown = document.getElementById('service-dropdown');
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setShowServiceModal(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showServiceModal]);

  const services = {
    buying: {
      icon: Home,
      title: {
        sr: 'Kupovina nekretnine',
        en: 'Buying a property'
      },
      description: {
        sr: 'Želim da kupim nekretninu',
        en: 'I want to purchase a property'
      }
    },
    selling: {
      icon: Building2,
      title: {
        sr: 'Prodaja nekretnine',
        en: 'Selling a property'
      },
      description: {
        sr: 'Želim da prodam nekretninu',
        en: 'I want to list my property for sale'
      }
    },
    rental: {
      icon: Key,
      title: {
        sr: 'Posredovanje pri zakupu',
        en: 'Rental Brokerage'
      },
      description: {
        sr: 'Želim da iznajmim ili izdam nekretninu',
        en: 'I want to rent or lease a property'
      }
    },
    'property-management': {
      icon: Shield,
      title: {
        sr: 'Menadžment nekretnina',
        en: 'Property management'
      },
      description: {
        sr: 'Želim uslugu vođenja nekretnine',
        en: 'I need property management services'
      }
    },
    valuation: {
      icon: Calculator,
      title: {
        sr: 'Procena vrednosti nekretnina',
        en: 'Property Valuation'
      },
      description: {
        sr: 'Potrebna mi je procena vrednosti nekretnine',
        en: 'I need a property value assessment'
      }
    },
    consulting: {
      icon: Users,
      title: {
        sr: 'Konsalting usluge',
        en: 'Consulting services'
      },
      description: {
        sr: 'Potreban mi je savet oko nekretnina',
        en: 'I need real estate consulting'
      }
    },
    legal: {
      icon: FileText,
      title: {
        sr: 'Pravne usluge',
        en: 'Legal Services'
      },
      description: {
        sr: 'Potrebna mi je pravna pomoć oko nekretnine',
        en: 'I need legal assistance with real estate'
      }
    },
    handover: {
      icon: ClipboardCheck,
      title: {
        sr: 'Primopredaja nepokretnosti',
        en: 'Property handover'
      },
      description: {
        sr: 'Potrebna mi je pomoć oko primopredaje',
        en: 'I need assistance with property handover'
      }
    },
    'market-research': {
      icon: Search,
      title: {
        sr: 'Istraživanje tržišta',
        en: 'Market research'
      },
      description: {
        sr: 'Želim analizu tržišta nekretnina',
        en: 'I need real estate market analysis'
      }
    },
    other: {
      icon: HelpCircle,
      title: {
        sr: 'Ništa od navedenog',
        en: 'Other inquiry'
      },
      description: {
        sr: 'Imam drugačiji zahtev',
        en: 'I have a different request'
      }
    }
  }

  // Order of services to display in dropdown
  const serviceOrder: ServiceType[] = [
    'buying',
    'selling',
    'rental',
    'property-management',
    'valuation',
    'consulting',
    'legal',
    'handover',
    'market-research',
    'other'
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const ServiceIcon = services[formType].icon;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Seo title={language === 'sr' ? 'Kontakt' : 'Contact'} />
      <Header />
      <main className="w-full min-w-full px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="overflow-hidden rounded-xl border bg-white shadow-lg"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-primary-blue">
                    {language === 'sr' ? 'Kontaktirajte nas' : 'Contact us'}
                  </h1>
                  <p className="text-gray-600">
                    {language === 'sr' 
                      ? "Naš stručni tim je tu da vam pomogne u svim aspektima vezanim za nekretnine - od kupovine i prodaje, preko menadžmenta nekretnina do konsaltinga i istraživanja tržišta. Kontaktirajte nas i odgovorićemo vam u roku od 2 sata."
                      : "Our expert team is here to help you with all aspects of real estate - from buying and selling to property management, consulting, and market research. Contact us and we will respond within 2 hours."}
                  </p>
                </div>

                <form className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {language === 'sr' ? 'Ime' : 'First name'}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'sr' ? 'Unesite vaše ime' : 'Enter your first name'}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        {language === 'sr' ? 'Prezime' : 'Last name'}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'sr' ? 'Unesite vaše prezime' : 'Enter your last name'}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        placeholder={language === 'sr' ? 'Unesite vašu email adresu' : 'Enter your email'}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {language === 'sr' ? 'Broj telefona' : 'Phone number'}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        placeholder="+381 60 123 4567"
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <label className="text-sm font-medium text-gray-700">
                      {language === 'sr' ? 'Zainteresovan/a sam za' : 'I\'m interested in'}
                    </label>
                    <button
                      ref={serviceButtonRef}
                      type="button"
                      onClick={() => setShowServiceModal(!showServiceModal)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue"
                    >
                      <span className="flex items-center gap-2">
                        <ServiceIcon className="h-5 w-5 text-primary-blue" />
                        <span>{services[formType].title[language as 'sr' | 'en']}</span>
                      </span>
                      <span className="text-gray-400">{showServiceModal ? '▲' : '▼'}</span>
                    </button>
                    
                    {/* Service dropdown */}
                    <AnimatePresence>
                      {showServiceModal && (
                        <motion.div
                          id="service-dropdown"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                          style={{ maxHeight: '350px', overflowY: 'auto' }}
                        >
                          <div className="px-3 py-2 border-b border-gray-100">
                            <h4 className="text-sm font-medium text-gray-500">
                              {language === 'sr' ? 'Izaberite uslugu' : 'Choose a service'}
                            </h4>
                          </div>
                          <div className="py-1">
                            {serviceOrder.map((serviceKey, index) => {
                              const service = services[serviceKey];
                              const ServiceIcon = service.icon;
                              const isOther = serviceKey === 'other';
                              
                              return (
                                <div key={serviceKey}>
                                  {isOther && (
                                    <div className="mx-3 my-2 border-t border-gray-100"></div>
                                  )}
                                  <div
                                    className={`px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
                                      formType === serviceKey ? 'bg-blue-50 text-primary-blue' : ''
                                    } ${isOther ? 'mt-1' : ''}`}
                                    onClick={() => {
                                      setFormType(serviceKey);
                                      setShowServiceModal(false);
                                    }}
                                  >
                                    <ServiceIcon className={`h-4 w-4 flex-shrink-0 ${isOther ? 'text-gray-500' : 'text-primary-blue'}`} />
                                    <div>
                                      <div className={`text-sm font-medium ${isOther ? 'text-gray-700' : ''}`}>
                                        {service.title[language as 'sr' | 'en']}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {service.description[language as 'sr' | 'en']}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {language === 'sr' ? 'Vaša poruka' : 'Your message'}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={language === 'sr' ? 'Opišite vaš zahtev...' : 'Describe your request...'}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary-blue text-white py-3 rounded-lg hover:bg-secondary-blue transition-colors text-lg font-medium"
                  >
                    {language === 'sr' ? 'Pošaljite poruku' : 'Send message'}
                  </motion.button>
                </form>
              </div>

              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10" />
                <img
                  src="/assets/images/2.jpg"
                  alt="Modern luxury interior"
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
                  <blockquote className="space-y-4">
                    <p className="text-lg font-light italic">
                      {language === 'sr' 
                        ? "JBL Concept je vaš pouzdan partner za sve vrste usluga vezanih za nekretnine. Pružamo kompletnu podršku - od posredovanja i konsaltinga do menadžmenta nekretnina i pravne pomoći. Naš tim stručnjaka je tu da vam pomogne da ostvarite svoje ciljeve na tržištu nekretnina."
                        : "JBL Concept is your trusted partner for all types of real estate services. We provide complete support - from brokerage and consulting to property management and legal assistance. Our team of experts is here to help you achieve your real estate goals."}
                    </p>
                    <footer className="text-sm">
                      <p className="font-medium">JBL Concept</p>
                      <p>Premium Real Estate</p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <FooterTW />
    </div>
  )
} 