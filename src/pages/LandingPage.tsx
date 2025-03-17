import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

// Import property images
import property1Image from '../assets/fotke za home/1.jpg'
import property2Image from '../assets/fotke za home/2.jpg'
import property3Image from '../assets/fotke za home/3.jpg'
import property4Image from '../assets/fotke za home/4.jpg'
import property5Image from '../assets/fotke za home/5.jpg'
import property6Image from '../assets/fotke za home/6.jpg'

const tagManagerArgs = {
  dataLayer: {page: 'home'}, dataLayerName: 'PageDataLayer'
}

// Sample featured properties data
const featuredProperties = [
  {
    id: 1,
    title: 'Moderna planinska vila',
    price: '450.000 €',
    location: 'Zlatibor, Srbija',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    image: property1Image,
    features: ['Parking', 'Bazen', 'Pogled na planinu']
  },
  {
    id: 2,
    title: 'Luksuzni penthouse',
    price: '850.000 €',
    location: 'Novi Beograd, Srbija',
    bedrooms: 5,
    bathrooms: 4,
    area: 280,
    image: property2Image,
    features: ['Garaža', 'Terasa', 'Pogled na reku']
  },
  {
    id: 3,
    title: 'Elegantna vila sa bazenom',
    price: '750.000 €',
    location: 'Dedinje, Beograd',
    bedrooms: 6,
    bathrooms: 4,
    area: 450,
    image: property3Image,
    features: ['Bazen', 'Vrt', 'Obezbeđenje']
  },
  {
    id: 4,
    title: 'Prostran porodični dom',
    price: '380.000 €',
    location: 'Voždovac, Beograd',
    bedrooms: 5,
    bathrooms: 3,
    area: 220,
    image: property4Image,
    features: ['Garaža', 'Dvorište', 'Renovirano']
  },
  {
    id: 5,
    title: 'Premium stan u centru',
    price: '320.000 €',
    location: 'Stari Grad, Beograd',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: property5Image,
    features: ['Lift', 'Parking', 'Renovirano']
  },
  {
    id: 6,
    title: 'Moderna kuća sa vrtom',
    price: '420.000 €',
    location: 'Zemun, Beograd',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    image: property6Image,
    features: ['Bazen', 'Garaža', 'Smart home']
  }
];

const LandingPage: React.FC = () => {
    TagManager.dataLayer(tagManagerArgs)
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
      const handleLanguageChange = () => {
        setLanguage(localStorage.getItem('language') || 'sr');
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
        aboutTitle: 'Ekskluzivnost, Elegancija, Pouzdanost',
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
              
              <div className="mt-12 animate-fade-in-up">
                <p className="text-xs tracking-[0.2em] font-light" style={{ color: 'rgba(248,241,140,0.9)' }}>
                  {language === 'sr' ? 'SKROLUJTE ZA VIŠE' : 'SCROLL DOWN TO SEE MORE'}
                </p>
                <div className="mt-2 animate-bounce-subtle">
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="rgba(248,241,140,0.9)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mx-auto"
                  >
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </main>

          {/* Featured Properties Section */}
          <div className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-blue">{t.featuredProperties}</h2>
                <Link to="/properties" className="cta-button">
                  <span>{t.viewAllProperties}</span>
                  <ArrowRight className="icon" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <Link to={`/property/${property.id}`} key={property.id} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative h-[280px]">
                        <img 
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                            {property.price}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-primary-blue mb-2 group-hover:text-secondary-blue transition-colors">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 mb-4">
                          <div className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.area} m²</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {property.features.map((feature, index) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

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
                  <h3 className="text-5xl font-bold text-primary-blue mb-2">3</h3>
                  <p className="text-gray-600 font-medium">{t.locations}</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-primary-blue">
                    <Clock className="h-12 w-12" />
                  </div>
                  <h3 className="text-5xl font-bold text-primary-blue mb-2">5+</h3>
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
                
                <div className="md:w-1/2 grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={property1Image} 
                      alt="Office" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mt-8">
                    <img 
                      src={property2Image} 
                      alt="Team" 
                      className="w-full h-full object-cover"
                    />
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