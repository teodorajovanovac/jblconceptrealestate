import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronDown, Building, Home, Users, TrendingUp, Bed, Bath, Square, ArrowRight, Globe, Clock, Users as UsersIcon, Briefcase } from 'lucide-react'
import './LandingPage.css'
import ReactLogo from '../assets/jblgold.svg';
//import Footer from '../components/footer/Footer';
import Seo from '../services/meta/Seo';
import TagManager from 'react-gtm-module'
import LandingFooter from '../components/landingFooter/LandingFooter';
// Zakomentarisaću stari import za video koji nedostaje
// import videoBackground from '../assets/video za home/video.mp4'
// Otkomentarišem import za video fajl
import videoBackground from '../assets/video za home/video.mp4'
import Header from '../components/header/Header'
import FooterTW from '../components/footer/FooterTW'
import ContactForm from '../components/contact/ContactForm'
import Testimonials from '../components/testimonials/Testimonials'
import FAQ from '../components/faq/FAQ'
import JBLGoldLogo from '../assets/jblgold.svg';  // Import the gold gradient logo
import Spinner from '../components/ui/Spinner';

// Import property images
// import property1Image from '../assets/fotke za home/1.jpg'
// import property2Image from '../assets/fotke za home/2.jpg'
// import property3Image from '../assets/fotke za home/3.jpg'
// import property4Image from '../assets/fotke za home/4.jpg'
// import property5Image from '../assets/fotke za home/5.jpg'
// import property6Image from '../assets/fotke za home/6.jpg'
import realEstate from '../data/realEstate';
import { RealEstateDto } from '../data/models/realEstate';
import { motion } from 'framer-motion';

const tagManagerArgs = {
  dataLayer: {page: 'home'}, dataLayerName: 'PageDataLayer'
}

// Add PropertyCard component definition before the main LandingPage component
const PropertyCard = ({ property, index, language }: { property: RealEstateDto; index: number; language: string; }) => {
  const formatPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getFeatures = () => {
    if (!property.spaces) return [];
    return property.spaces.split(',')
      .map(feature => feature.trim())
      .filter(feature => feature.length > 0);
  };

  const getLuxuryBadge = () => {
    if (property.lux === 1) {
      return (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Premium
          </span>
        </div>
      );
    }
    return null;
  };

  const getPropertyTypeBadge = () => {
    if (property.typeName) {
      return (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {property.typeName}
          </span>
        </div>
      );
    }
    return null;
  };

  const isRental = property.actionName?.toLowerCase().includes('izdavanje') || 
                   property.actionName?.toLowerCase().includes('rent');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Link to={`/property/${property.id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative">
          {/* Action Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className={`${isRental ? 'bg-primary-gold' : 'bg-primary-blue'} text-white px-4 py-2 rounded-full text-base font-semibold shadow-lg`}>
              {property.actionName || (language === 'sr' ? "Prodaja" : "For Sale")}
            </span>
          </div>
          
          {/* Property Type Badge */}
          {getPropertyTypeBadge()}

          {/* Property Image */}
          <div className="relative h-[280px] overflow-hidden">
            <img 
              src={property.photos && property.photos.length > 0 
                ? `https://jblconcept.rs/photos/${property.photos[0].name}` 
                : "/placeholder.svg"}
              alt={property.typeName || "Property"}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24" />
            <div className="absolute bottom-4 right-4">
              <span className="text-white text-[1.8rem] font-bold shadow-lg px-3 py-1 bg-black/50 rounded-lg">
                {formatPrice(property.price)} €
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Portal Name instead of Property Title */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-primary-blue line-clamp-1">
                {property.portalName || "Portal Name"}
              </h3>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-primary-blue" />
                <span className="text-base font-medium line-clamp-1">
                  {[
                    property.locationArea, 
                    property.locationCityName, 
                    property.locationCountyName
                  ].filter(Boolean).join(", ")}
                </span>
              </div>
            </div>

            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-y border-gray-100 py-4">
              <div className="flex items-center gap-2">
                <Square className="w-5 h-5 text-primary-blue" />
                <span className="font-semibold">{property.area} m²</span>
              </div>
              <div className="flex items-center gap-2 border-x border-gray-100 px-2">
                <Bed className="w-5 h-5 text-primary-blue" />
                <span className="font-semibold">{property.roomsNo || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-primary-blue" />
                <span className="font-semibold">{property.bathroomNO || "N/A"}</span>
              </div>
            </div>

            {/* Property Features */}
            <div className="flex flex-wrap gap-2">
              {property.floorNoString && (
                <span className="bg-blue-50 text-primary-blue px-3 py-1.5 rounded-full text-sm font-medium">
                  {property.floorNoString}
                </span>
              )}
              {getFeatures().slice(0, 3).map((feature, index) => (
                <span key={index} className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
    TagManager.dataLayer(tagManagerArgs)
    const [language, setLanguage] = useState<'sr' | 'en'>(localStorage.getItem('language') as 'sr' | 'en' || 'sr')
    const [scrollPosition, setScrollPosition] = useState(0);
    const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const handleLanguageChange = () => {
        setLanguage(localStorage.getItem('language') as 'sr' | 'en' || 'sr');
      };
      
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };
  
      window.addEventListener('storage', handleLanguageChange);
      window.addEventListener('languageChange', handleLanguageChange);
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('storage', handleLanguageChange);
        window.removeEventListener('languageChange', handleLanguageChange);
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await realEstate.getRealEstateFeatured();
        if (result.isSuccess && result.data) {
          const sortedProperties = [...result.data]
            .sort((a, b) => (b.price || 0) - (a.price || 0))
            .slice(0, 6);
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
      fetchData();
    }, []);

    const translations = {
      sr: {
        tagline: 'EKSKLUZIVNE NEKRETNINE U VAŠEM KRAJU',
        headline: 'PRONAĐITE SVOJ DOM IZ SNOVA',
        subheading: 'Vrhunska usluga i stručni saveti u svakom koraku vašeg putovanja kroz nekretnine',
        searchButton: 'Nekretnine',
        featuredProperties: 'Izdvojene nekretnine',
        viewAllProperties: 'Sve nekretnine',
        aboutUs: 'O nama',
        meetOurTeam: 'Upoznajte naš tim',
        // About section
        clients: 'Klijenata',
        experience: 'Godina iskustva',
        team: 'Zaposlenih',
        locations: 'Lokacija',
        aboutTitle: 'Sigurnost, Elegancija, Ekskluzivnost',
        aboutDescription: 'JBL Concept Real Estate predstavlja jedinstveni spoj inovativnosti, visokog profesionalizma i savremenog dizajna u sektoru nekretnina. Kao renomirana agencija sa sedištem u Beogradu, pružamo premium usluge u kupovini, prodaji i investiranju u nekretnine. Naš tim stručnjaka se posvećuje pronalaženju savršenih nekretnina za naše klijente, bilo da kupuju ili prodaju.',
        aboutFeature1: 'Personalizovana usluga',
        aboutFeature2: 'Stručni saveti',
        aboutFeature3: 'Dugoročna partnerstva'
      },
      en: {
        tagline: 'PREMIUM PROPERTIES IN YOUR AREA',
        headline: 'FIND YOUR DREAM HOME ',
        subheading: 'Unparalleled service and expert advice at every step of your real estate journey',
        searchButton: 'Properties',
        featuredProperties: 'Featured Properties',
        viewAllProperties: 'View All',
        aboutUs: 'About Us',
        meetOurTeam: 'Meet Our Team',
        // About section
        clients: 'Clients',
        experience: 'Years Experience',
        team: 'Team Members',
        locations: 'Locations',
        aboutTitle: 'Exclusivity, Elegance, Reliability',
        aboutDescription: 'JBL Concept Real Estate represents a unique blend of innovation, high professionalism, and modern design in the real estate sector. As a renowned agency based in Belgrade, we provide premium services in buying, selling, and investing in real estate. Our team of experts is dedicated to finding the perfect properties for our clients, whether buying or selling.',
        aboutFeature1: 'Personalized service',
        aboutFeature2: 'Expert advice',
        aboutFeature3: 'Long-term partnerships'
      }
    }

    const t = translations[language as 'sr' | 'en']

    // Helper function to format property data
    const formatPropertyForDisplay = (property: RealEstateDto) => {
      return {
        id: property.id,
        title: property.locationArea || language === 'sr' ? "Premium nekretnina" : "Premium Property",
        price: property.price,
        location: `${property.locationCityName}${property.locationArea ? `, ${property.locationArea}` : ''}`,
        bedrooms: property.roomsNo,
        bathrooms: property.bathroomNO,
        area: property.area,
        image: property.photos && property.photos.length > 0 
          ? `https://jblconcept.rs/photos/${property.photos[0].name}` 
          : "/placeholder.svg",
        features: property.spaces ? property.spaces.split(',').map(s => s.trim()) : [],
        type: property.typeName || "Property"
      };
    };

    return( 
      <div className="landing-page flex flex-col min-h-screen w-full overflow-hidden">
        <Seo title={language === 'sr' ? "JBL Concept Nekretnine" : "JBL Concept Real Estate"}/>
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <video
              src={videoBackground}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
          </div>
        </div>

        {/* Header with transparent background and white text */}
        <div className="relative z-30">
          <Header />
        </div>

        <div className="relative z-10 flex flex-col">
          {/* Main Content - Updated Hero Section */}
          <main className="flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center text-white">
            <div className="max-w-6xl mx-auto">
              <div className="w-full max-w-[600px] mx-auto mb-12 logo-animation">
                <JBLGoldLogo className="w-full h-auto" />
              </div>
              
              <div className="w-36 h-1 bg-gold mx-auto mb-3"></div>
              
              <p className="mb-6 max-w-3xl mx-auto text-2xl md:text-3xl font-light leading-relaxed">
                {language === 'sr' 
                  ? (
                    <>
                      Ekskluzivne nekretnine, vrhunska usluga.<br />
                      Vaša sigurna investicija u luksuz.
                    </>
                  )
                  : (
                    <>
                      Exclusive properties, premium service.<br />
                      Your secure investment in luxury.
                    </>
                  )}
              </p>
            </div>
          </main>

          {/* Featured Properties Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-start mb-12">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold text-primary-blue mb-4">
                    {language === 'sr' ? 'Izdvojene nekretnine' : 'Featured Properties'}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {language === 'sr' 
                      ? 'Otkrijte našu ekskluzivnu selekciju premium nekretnina. Svaka nekretnina je pažljivo odabrana da zadovolji najviše standarde kvaliteta i luksuza.'
                      : 'Discover our exclusive selection of premium properties. Each property is carefully selected to meet the highest standards of quality and luxury.'}
                  </p>
                </div>
                <Link
                  to="/properties"
                  className="inline-flex items-center px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-all duration-200 font-medium"
                >
                  {language === 'sr' ? 'Pogledaj sve nekretnine' : 'View all properties'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  <div className="col-span-full">
                    <Spinner size="lg" />
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
                      language={language}
                    />
                  ))
                )}
              </div>
            </div>
          </section>

          {/* About Team Section */}
          <div className="w-full bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-blue mb-6">{t.aboutUs}</h2>
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
                  {t.aboutTitle}
                </p>
              </div>
              
              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-primary-blue">
                    <Globe className="h-12 w-12" />
                  </div>
                  <h3 className="text-5xl font-bold text-primary-blue mb-2">1</h3>
                  <p className="text-gray-600 font-medium">{t.locations}</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-primary-blue">
                    <Clock className="h-12 w-12" />
                  </div>
                  <h3 className="text-5xl font-bold text-primary-blue mb-2">15+</h3>
                  <p className="text-gray-600 font-medium">{t.experience}</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-primary-blue">
                    <Briefcase className="h-12 w-12" />
                  </div>
                  <h3 className="text-5xl font-bold text-primary-blue mb-2">100+</h3>
                  <p className="text-gray-600 font-medium">{t.clients}</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-primary-blue">
                    <UsersIcon className="h-12 w-12" />
                  </div>
                  <h3 className="text-5xl font-bold text-primary-blue mb-2">10+</h3>
                  <p className="text-gray-600 font-medium">{t.team}</p>
                </div>
              </div>
              
              {/* About Text and CTA */}
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="md:w-1/2">
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    {t.aboutDescription}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <span className="text-primary-blue mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{t.aboutFeature1}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-blue mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{t.aboutFeature2}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-blue mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{t.aboutFeature3}</span>
                    </li>
                  </ul>
                  <div className="flex">
                    <Link to="/about-us">
                      <button className="cta-button">
                        <span>{t.meetOurTeam}</span>
                        <Users className="icon" />
                      </button>
                    </Link>
                  </div>
                </div>
                
                {/* Grid sa slikama */}
                <div className="md:w-1/2">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-7 aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                      <img 
                        src="/slike od jasne/knez miletina biblioteka.jpg" 
                        alt="Knez Miletina biblioteka" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:col-span-5 aspect-[3/4] overflow-hidden rounded-xl shadow-xl md:mt-12">
                      <img 
                        src="/slike od jasne/dedinje 2 uvecana.jpg" 
                        alt="Dedinje" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
          <FAQ />
        </div>

        {/* Footer */}
        <div className="relative z-20 w-full mt-auto">
          <FooterTW />
        </div>
      </div>
    );
}

export default LandingPage