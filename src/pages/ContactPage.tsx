import { useState, useEffect, useRef } from "react"
import { Building2, User, Mail, Phone, Home, FileText, Settings, HelpCircle, X, Key, Calculator, Shield, Search, ClipboardCheck, Users, CheckCircle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Header from '../components/header/Header'
import FooterTW from '../components/footer/FooterTW'
import Seo from '../services/meta/Seo'
import { useCmsData } from "../services/CmsProvider"

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

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage: React.FC =() => {
  const [formType, setFormType] = useState<ServiceType>('buying')
  const [showServiceModal, setShowServiceModal] = useState(false)
  const serviceButtonRef = useRef<HTMLButtonElement>(null)
  const { t, currentLanguage } = useCmsData();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Додајемо useEffect за скроловање на врх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        sr: 'Imam specifičan zahtev koji nije naveden',
        en: 'I have a specific request not listed above'
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
  
  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Odmah uklanjamo grešku kada korisnik počne da kuca
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  }

  
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    // Jednostavnija validacija - samo proverimo da li su obavezna polja popunjena
    if (!formData.firstName.trim()) {
      newErrors.firstName = t("validate-form-required")
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t("validate-form-required")
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t("validate-form-required")
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    

    

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
        setFormType('buying');
      }, 5000);
    }, 1000);
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* <Seo title={t("contactform-title")f} /> */}
      
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
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                      {t("message-send-success")}
                    </h2>
                    <p className="text-center text-gray-600 max-w-md">
                      {t("message-send-postinfo")}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <h1 className="text-3xl font-bold text-primary-blue">
                          {t("contact-header")}
                      </h1>
                      <p className="text-gray-600">
                          {t("contact-form-text")}
                      </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="flex items-center text-sm font-medium text-gray-700">
                            {t("form-enter-name")}
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder={errors.firstName 
                              ? t("validate-form-fillme") 
                              : t("form-enter-name")}
                            className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            {t("form-enter-lastname")}
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder={errors.lastName 
                              ? t("validate-form-fillme") 
                              : t("form-enter-lastname")}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          Email <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={errors.email 
                              ? t("validate-form-fillme") 
                              : t("form-enter-email")}
                            className={`w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          {t("form-enter-phone")}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={errors.phone 
                              ? t("validate-form-fillme") 
                              : t("form-enter-phone")}
                            className={`w-full pl-10 pr-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2 relative">
                        <label className="text-sm font-medium text-gray-700">
                          {t("contactform-choose-service")}
                        </label>
                        <button
                          ref={serviceButtonRef}
                          type="button"
                          onClick={() => setShowServiceModal(!showServiceModal)}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-left flex items-center justify-between hover:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        >
                          <span className="flex items-center gap-2">
                            <ServiceIcon className="h-5 w-5 text-primary-blue" />
                            <span>{services[formType].title[currentLanguage as 'sr' | 'en']}</span>
                          </span>
                          <span className="text-gray-400">{showServiceModal ? '▲' : '▼'}</span>
                        </button>
                        
                        {/* Service dropdown */}
                        <AnimatePresence>
                          {showServiceModal && (
                            <motion.div
                              id="service-dropdown"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full z-50 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                              style={{ maxHeight: '350px', overflowY: 'auto' }}
                            >
                              <div className="px-3 py-2 border-b border-gray-100">
                                <h4 className="text-sm font-medium text-gray-500">
                                  {t("contactform-choose-service")}
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
                                        <div className="mx-3 my-2 border-t border-gray-100 pt-2">
                                          <p className="text-xs font-bold text-primary-blue px-3 pb-1">
                                            {t("contactform-other-inquiries")}
                                          </p>
                                        </div>
                                      )}
                                      <div
                                        className={`px-3 py-2 cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
                                          formType === serviceKey ? 'bg-blue-50 text-primary-blue' : ''
                                        } ${isOther ? 'bg-blue-100 hover:bg-blue-50/70' : ''}`}
                                        onClick={() => {
                                          setFormType(serviceKey);
                                          setShowServiceModal(false);
                                        }}
                                      >
                                        <ServiceIcon className={`h-4 w-4 flex-shrink-0 ${isOther ? 'text-primary-blue' : 'text-primary-blue'}`} />
                                        <div>
                                          <div className={`text-sm font-medium ${isOther ? 'text-primary-blue font-bold' : ''}`}>
                                          
                                            {service.title[currentLanguage as 'sr' | 'en']}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {service.description[currentLanguage as 'sr' | 'en']}
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
                          {t("form-enter-message")}
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder={t("form-request-placeholder")}
                          className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent`}
                        />
                      </div>

                      <button 
                        type="submit"
                        className="send-button w-full"
                        disabled={isSubmitting}
                      >
                        <div className="svg-wrapper-1">
                          <div className="svg-wrapper">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path
                                fill="currentColor"
                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span>{t("form-sending")}</span>
                          </div>
                        ) : (
                          <span className="ml-2">{t("form-send-button")}</span>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/80 via-black/50 to-black/30 z-10" />
                <img
                  src="/images/office_jbl_close_up.jpeg"
                  alt="Modern luxury interior"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
                  <blockquote className="space-y-4">
                    <p className="text-lg font-light italic">
                      {/* {t("contact-text")} */}
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

export default ContactPage;