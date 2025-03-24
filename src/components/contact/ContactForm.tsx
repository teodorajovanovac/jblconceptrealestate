import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, MessageSquare, ArrowRight, Phone } from "lucide-react"
import { useCmsData } from "../../services/CmsProvider"
import { Link, useNavigate } from "react-router-dom"

export default function ContactForm() {
  const { t } = useCmsData()
  const navigate = useNavigate()

  const handleContactClick = () => {
    navigate('/contact')
    // Скролујемо на врх након навигације
    window.scrollTo(0, 0)
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
          <h2 className="text-3xl md:text-5xl font-bold text-primary-dark-blue mb-4">{t("contactform-title")}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t("contactform-subtitle")}</p>
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
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-dark-blue/10 flex items-center justify-center mr-4">
                <MessageSquare className="h-6 w-6 text-primary-dark-blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{t("contactform-heading")}</h3>
            </div>
            
            <p className="text-gray-600 mb-8">{t("contactform-text")}</p>
            
            <button 
              onClick={handleContactClick}
              className="send-button w-full"
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
              <span className="ml-2">{t("contactform-button-text")}</span>
            </button>
            
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-primary-dark-blue text-sm font-medium">{t("contactform-trust-badge1")}</div>
              </div>
              <div className="text-center">
                <div className="text-primary-dark-blue text-sm font-medium">{t("contactform-trust-badge2")}</div>
              </div>
              <div className="text-center">
                <div className="text-primary-dark-blue text-sm font-medium">{t("contactform-trust-badge3")}</div>
              </div>
            </div>
            
            {/* Contact Information - phone numbers only */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 mb-2 text-sm font-medium">{t("contactform-prefer-phone")}</p>
              <div className="flex items-center mb-2">
                <Phone className="h-5 w-5 text-primary-dark-blue mr-2" />
                <a href="tel:+381612299988" className="text-lg font-bold text-primary-dark-blue hover:text-gold-color transition-colors">
                  {t("contactform-phone-number")}
                </a>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="h-5 w-5 text-primary-dark-blue mr-2" />
                <a href="tel:+381612299988" className="text-lg font-bold text-primary-dark-blue hover:text-gold-color transition-colors">
                  {t("contactform-phone-number")}
                </a>
              </div>
            </div>
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
              <h3 className="text-xl font-bold text-gray-800 mb-3">{t("contactform-cta")}</h3>
              <p className="text-gray-600 mb-6">
                JBL Concept Real Estate<br />
                Majke Jevrosime 47<br />
                11000 Beograd
              </p>
              
              <div className="flex items-center mt-2">
                <Mail className="h-5 w-5 text-primary-dark-blue mr-2" />
                <a href={`mailto:${t("contactform-email")}`} className="text-lg font-bold text-primary-dark-blue hover:text-gold-color transition-colors">
                  {t("contactform-email")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 