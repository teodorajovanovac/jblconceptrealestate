import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Globe, Clock, Users as UsersIcon, Briefcase } from 'lucide-react'
import './LandingPage.css'
//import ReactLogo from '../assets/jblgold.svg';
//import Footer from '../components/footer/Footer';
import Seo from '../services/meta/Seo';
import TagManager from 'react-gtm-module'
//import LandingFooter from '../components/landingFooter/LandingFooter';
// Zakomentarisaću stari import za video koji nedostaje
// import videoBackground from '../assets/video za home/video.mp4'
// Otkomentarišem import za video fajl
//import videoBackground from '../assets/video/video.mp4'
import ContactForm from '../components/contact/ContactForm'
import Testimonials from '../components/testimonials/Testimonials'
import JBLGoldLogo from '../assets/jblgold.svg';  
import Spinner from '../components/ui/Spinner';
import { useCmsData } from "../services/CmsProvider"
import realEstate from '../data/RealEstateData';
import { RealEstateDto } from '../data/models/RealEstate';
//import { motion } from 'framer-motion';
import Faq from '../components/faq/Faq';
import PropertyCard from '../components/property/ProperyCard';

const tagManagerArgs = {
  dataLayer: {page: 'home'}, dataLayerName: 'PageDataLayer'
}

// Add PropertyCard component definition before the main LandingPage component

const LandingPage: React.FC = () => {
    const { t, currentLanguage, loadingCmsData } = useCmsData();
    TagManager.dataLayer(tagManagerArgs)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log("before getRealEstateFeatured:",currentLanguage); 
        const result = await realEstate.getRealEstateFeatured(currentLanguage);
        console.log("after getRealEstateFeatured:",currentLanguage); 

        if (result.length>0) {
          // const sortedProperties = [...result.data]
          //   .sort((a, b) => (b.price || 0) - (a.price || 0))
          //   .slice(0, 6);
          const maxProperties = Number(t("landing-featuredProperties-max")) || 6;
          const sortedProperties = [...result].slice(0,maxProperties);
          setFeaturedProperties(sortedProperties);
        } else {
          setError("Failed to fetch property data");
          setFeaturedProperties([]);
        }
      } catch (err) {
        console.error("Error fetching featured properties:", err);
        setError("An error occurred while fetching property data");
        setFeaturedProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      if (!loadingCmsData && currentLanguage) {
        fetchData();
      }
    }, [loadingCmsData, currentLanguage]);
//loadingCmsData

      // Додајемо useEffect за скроловање на врх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    // Helper function to format property data
    const formatPropertyForDisplay = (property: RealEstateDto) => {
      return {
        id: property.id,
        title: property.locationArea,
        price: property.price,
        location: `${property.locationCityName}${property.locationArea ? `, ${property.locationArea}` : ''}`,
        bedrooms: property.roomsNo,
        //bathrooms: property.bathroomNO,
        area: property.area,
        image: property.photos && property.photos.length > 0 
          ? `t("property-thumb-path")/${property.photos[0].name}` 
          : t("property-thumb-placeholder"),
        features: property.spaces ? property.spaces.split(',').map(s => s.trim()) : [],
        type: property.typeName || "Property"
      };
    };


    //Read - faqData 
    const getFaqData = () =>{
      const obj = t("faq-list", "object");// as Record<string, string>;
      const faqData = {
        faqTitle: t("faq-title"),
        faqSubTitle: t("faq-subtitle"),
        faqList: Array.isArray(obj)
          ? obj.map((item) => ({
          question: item.question, 
          answer: item.answer,
        }))
      : [],
        faqFooterText: t("faq-contact-text"),
        faqFooterButtonTitle: t("faq-contact-link")
      };
      return faqData
    }
    
    

    return( 
      <div className="landing-page flex flex-col min-h-screen w-full overflow-hidden">
        <Seo title="JBL Concept Real Estate" />
        
        {/* Video Background i Hero Section - 100vh */}
        <div className="h-screen w-full relative flex flex-col">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
            <video
              src={t("video-background")}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-custom-black/40 z-0"></div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 text-center text-white">
            <div className="w-full max-w-[470px] mx-auto mb-12 logo-animation">
              <JBLGoldLogo className="w-full h-auto" />
            </div>
            
            <div className="w-36 h-1 bg-gold mx-auto mb-3"></div>
            
            <p className="mb-6 max-w-3xl mx-auto text-2xl md:text-3xl font-light leading-relaxed">
              {t("landing-hero-tagline1")}<br />
              {t("landing-hero-tagline2")}
            </p>
          </div>
        </div>
        
        {/* Scroll indicator at bottom of hero */}
        <div className="relative z-10 w-full flex justify-center items-center pb-8">
          <button 
            onClick={() => {
              document.getElementById('featured-properties')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="flex flex-col items-center text-white hover:text-gold transition-colors duration-300 animate-pulse"
          >
            <span className="mb-2 text-sm font-light">
              {t("landing-scroll-for-more")}
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                //strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Ostatak sadržaja */}
      <div className="relative z-10 flex flex-col">
        {/* Featured Properties Section */}
        <section id="featured-properties" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-12">
              <div className="max-w-2xl mb-6 md:mb-0">
                <h2 className="text-3xl font-bold text-primary-blue mb-4 text-center md:text-left">
                  {t("landing-featuredProperties")}
                </h2>
                <p className="text-gray-600 text-lg text-center md:text-left">
                  {t("landing-featured-description")}
                </p>
              </div>
              <div className="text-center md:mt-0 flex justify-center md:justify-end">
                <Link
                  to="/properties"
                  className="hidden md:inline-flex cta-button rounded-full"
                >
                  <span>{t("landing-viewAllProperties")}</span>
                  <ArrowRight className="icon" />
                </Link>
                
                {/* Mobilno kružno dugme sa lupom */}
                <Link
                  to="/properties"
                  className="md:hidden inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-dark-blue text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  aria-label={t("landing-viewAllProperties")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <div className="col-span-full">
                  <div className="flex items-center justify-center">
                    <Spinner size="lg" />
                  </div>  
                </div>
              ) : error ? (
                <div className="col-span-full text-center text-red-500 py-10">
                  {error}
                </div>
              ) : (
                featuredProperties.map((property, index) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={index}
                    language={currentLanguage}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        {/* About Team Section */}
        <div className="w-full bg-gray-50 py-2">
          <div className="max-w-7xl mx-auto px-4 pb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-6">{t("landing-aboutUs")}</h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                {t("landing-aboutTitle")}
              </p>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-primary-blue">
                  <Globe className="h-12 w-12" />
                </div>
                <h3 className="text-5xl font-bold text-primary-blue mb-2">1</h3>
                <p className="text-gray-600 font-medium">{t("landing-locations")}</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-primary-blue">
                  <Clock className="h-12 w-12" />
                </div>
                <h3 className="text-5xl font-bold text-primary-blue mb-2">15+</h3>
                <p className="text-gray-600 font-medium">{t("landing-experience")}</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-primary-blue">
                  <Briefcase className="h-12 w-12" />
                </div>
                <h3 className="text-5xl font-bold text-primary-blue mb-2">100+</h3>
                <p className="text-gray-600 font-medium">{t("landing-clients")}</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-primary-blue">
                  <UsersIcon className="h-12 w-12" />
                </div>
                <h3 className="text-5xl font-bold text-primary-blue mb-2">10+</h3>
                <p className="text-gray-600 font-medium">{t("landing-team")}</p>
              </div>
            </div>
            
            {/* About Text and CTA */}
            <div className="flex flex-col md:flex-row gap-16 items-center">
              {/* Text section - now visible on mobile above the image */}
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg leading-relaxed mb-8 md:hidden text-center px-4">
                  {t("landing-aboutDescription")}
                </p>
                <div className="hidden md:block">
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {t("landing-aboutDescription")}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <span className="text-primary-blue mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{t("landing-aboutFeature1")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-blue mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{t("landing-aboutFeature2")}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-blue mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{t("landing-aboutFeature3")}</span>
                    </li>
                  </ul>
                  <div className="flex">
                    <Link to="/about-us" className="cta-button rounded-full">
                      <span>{t("landing-meetOurTeam")}</span>
                      <Users className="icon" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Images section */}
              <div className="md:w-1/2 relative">
                {/* Mobile overlay content - moved directly over the first image */}
                <div className="md:hidden absolute inset-0 z-10 flex flex-col justify-center items-center p-6 text-white">
                  <ul className="space-y-3 mb-8 text-center">
                    <li className="flex items-center justify-center">
                      <span className="text-white mr-2">✓</span>
                      <span>{t("landing-aboutFeature1")}</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="text-white mr-2">✓</span>
                      <span>{t("landing-aboutFeature2")}</span>
                    </li>
                    <li className="flex items-center justify-center">
                      <span className="text-white mr-2">✓</span>
                      <span>{t("landing-aboutFeature3")}</span>
                    </li>
                  </ul>
                  <Link to="/about-us" className="mt-auto cta-button rounded-full">
                    <span className="text-white">{t("landing-meetOurTeam")}</span>
                    <Users className="icon" />
                  </Link>
                </div>

                {/* Image grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-0">
                  <div className="md:col-span-7 aspect-[4/3] overflow-hidden rounded-xl shadow-xl relative">
                    {/* Gradient only shows on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/90 via-[#0A0F1C]/50 to-transparent md:hidden"></div>
                    <img 
                      src="/images/knez_miletina_biblioteka.jpg" 
                      alt="Knez Miletina biblioteka" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Second image - hidden on mobile */}
                  <div className="hidden md:block md:col-span-5 aspect-[3/4] overflow-hidden rounded-xl shadow-xl">
                    <img 
                      src="/images/zen_place.jpg" 
                      alt="Zen" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 opacity-85"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <ContactForm />

        {/* Testimonials Section */}
        <Testimonials />
        
        {/* FAQ Section */}
        {/* <FAQ /> */}
        <span id="faq"></span>
        <Faq data={getFaqData()} />
      </div>
    </div>
  );
}

export default LandingPage