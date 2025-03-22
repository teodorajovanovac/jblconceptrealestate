"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Bed, Bath, Square, Home, Euro, Tag } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import PropertyGallery from "../components/property/PropertyGallery"
import ContactAgentCard from "../components/property/ContactAgentCard"
import PropertyFeatures from "../components/property/PropertyFeatures"
import PropertyMap from "../components/property/PropertyMap"
import Header from "../components/header/Header"
import FooterTW from "../components/footer/FooterTW"
import Seo from "../services/meta/Seo"
import { useParams, Link } from "react-router-dom"
import realEstate from "../data/realEstate"
import { RealEstateDto, AgentDto } from "../data/models/realEstate"
import Spinner from '../components/ui/Spinner'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { useCmsData } from "../services/CmsProvider"

const defaultAgent: AgentDto = {
  name: "Agent",
  company: "JBL Real Estate Concept",
  title: "Agent",
  email: "contact@jblconcept.rs",
  phone: "+381 00 0000000",
  image: "/placeholder-agent.jpg"
};

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');
  const [property, setProperty] = useState<RealEstateDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useCmsData();
  
  const agentCardRef = useRef<HTMLDivElement>(null);
  const agentCardWrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch property data
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const propertyId = parseInt(id);
        console.log('Fetching property with ID:', propertyId);
        
        const result = await realEstate.getData(propertyId);
        console.log('API Response:', result);

        // Check if result exists and has data
        if (result) {
          // Find the specific property by ID
          setProperty(result);
          setError(null);
        } else {
          setError(t("property-not-found"));
          setProperty(null);
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError(t("property-error"));
        setProperty(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, t]);

  // Handle scroll for sticky elements
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      if (!agentCardRef.current || !agentCardWrapperRef.current || !footerRef.current) return;
      
      const agentCard = agentCardRef.current;
      const wrapper = agentCardWrapperRef.current;
      const footer = footerRef.current;
      
      const wrapperRect = wrapper.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const cardHeight = agentCard.offsetHeight;
      
      if (wrapperRect.top > 80) {
        agentCard.style.position = 'static';
        agentCard.style.top = 'auto';
        agentCard.style.width = 'auto';
      } 
      else if (footerRect.top > cardHeight + 100) {
        agentCard.style.position = 'fixed';
        agentCard.style.top = '100px';
        agentCard.style.width = `${wrapper.offsetWidth}px`;
      } 
      else {
        agentCard.style.position = 'absolute';
        agentCard.style.top = `${footerRect.top - cardHeight - 100}px`;
        agentCard.style.width = `${wrapper.offsetWidth}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper functions
  const formatPrice = (price: number) => {
    return price.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).replace("EUR", "€");
  };

  const formatGalleryImages = () => {
    if (!property?.photos || property.photos.length === 0) {
      return ['/placeholder.svg'];
    }
    return property.photos.map(photo => `https://jblconcept.rs/photos/${photo.name}`);
  };

  const processFeatures = () => {
    if (!property) return {};
    
    // Create initial features object with all properties
    const allFeatures: Record<string, any> = {
      [t("property-type")]: property.subTypeName 
        ? `${property.typeName} + ${property.subTypeName}`
        : property.typeName || 'N/A',
      [t("property-area")]: property.area ? `${property.area} m²` : 'N/A',
      [t("property-rooms")]: property.roomsNo || 'N/A',
      [t("property-bathrooms")]: property.bathroomNO || 'N/A',
      [t("property-floor")]: property.floorNoString || 'N/A',
      [t("property-additional-rooms")]: property.spaces || 'N/A',
      [t("property-characteristics")]: property.description || 'N/A',
    };
    
    // Filter out any properties with 'N/A' values
    const features: Record<string, any> = {};
    Object.entries(allFeatures).forEach(([key, value]) => {
      if (value !== 'N/A') {
        features[key] = value;
      }
    });

    return features;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{t("property-not-found")}</h2>
          <p className="text-gray-600 mb-6">
            {error || t("property-removed")}
          </p>
          <Link 
            to="/properties" 
            className="inline-block bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            {t("property-back-to-list")}
          </Link>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <>
      <Seo title={property.portalName || "Nekretnina"} />
      <Header />
      <div className="bg-gray-50 min-h-screen pb-24 md:pb-0 pt-16">
        {/* Property Gallery */}
        <div className="relative z-0">
          <PropertyGallery 
            images={formatGalleryImages()} 
            propertyId={property.id}
            propertyTitle={property.portalName || "Nekretnina"}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 bg-gray-50">
          {/* Mobile Tabs Navigation */}
          <div className="md:hidden">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full px-2 h-12 grid grid-cols-3 gap-1">
                <TabsTrigger value="description">{t("property-description")}</TabsTrigger>
                <TabsTrigger value="features">{t("property-features")}</TabsTrigger>
                <TabsTrigger value="location">{t("property-location")}</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="px-4">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">{property.portalName}</h1>
                  <div className={`${
                    property.actionName?.toLowerCase().includes('izdavanje') 
                      ? 'bg-primary-gold' 
                      : 'bg-primary-blue'
                  } rounded-lg p-5 inline-block shadow-lg relative w-full`}>
                    {/* Card content */}
                    <div className="relative z-20">
                      {/* Transaction Type Tag */}
                      <div className="flex items-center mb-1">
                        <Tag className={`w-4 h-4 mr-1 ${
                          property.actionName?.toLowerCase().includes('izdavanje') 
                            ? 'text-primary-blue' 
                            : 'text-white'
                        }`} />
                        <span className={`text-xs font-medium uppercase tracking-wider ${
                          property.actionName?.toLowerCase().includes('izdavanje') 
                            ? 'text-primary-blue' 
                            : 'text-white'
                        }`}>
                          {property.actionName || "Prodaja"}
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className={`text-xl font-bold mt-1 ${
                        property.actionName?.toLowerCase().includes('izdavanje') 
                          ? 'text-primary-blue' 
                          : 'text-white'
                      }`}>
                        {formatPrice(property.price)}
                      </div>
                      
                      {/* Price per m² */}
                      {property.priceM2 && (
                        <div className={`text-sm mt-1 flex items-center ${
                          property.actionName?.toLowerCase().includes('izdavanje') 
                            ? 'text-primary-blue/80' 
                            : 'text-white/80'
                        }`}>
                          <Euro className="w-4 h-4 mr-1" />
                          {property.priceM2.toLocaleString()} / m²
                        </div>
                      )}
                      
                      {/* Additional mobile details */}
                      <div className={`pt-3 mt-3 border-t border-black/20 text-sm ${
                        property.actionName?.toLowerCase().includes('izdavanje')
                          ? 'text-primary-blue/90'
                          : 'text-white/90'
                      }`}>
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-2" />
                          <span>{property.area} m² {t("property-area")}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Home className="w-4 h-4 mr-2" />
                          <span>{property.typeName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none text-gray-700" 
                    dangerouslySetInnerHTML={{ __html: property.realEstateDescription || "" }}>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="px-4">
                <PropertyFeatures 
                  title={t("property-features")} 
                  features={processFeatures()} 
                />
              </TabsContent>

              <TabsContent value="location" className="px-4">
                <PropertyMap
                  address={[
                    property.locationArea,
                    property.locationCityName,
                    "Srbija"
                  ].filter(Boolean).join(", ")}
                  location={{ 
                    lat: property.gmapSync === 1 ? 44.786568 : 44.786568,
                    lng: property.gmapSync === 1 ? 20.419649 : 20.419649
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Property Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Property Header */}
                <div>
                  <div className="flex flex-col">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-primary-blue">
                        {property.portalName}
                      </h1>
                      <p className="text-gray-600 mt-1">
                        {[property.locationArea, property.locationCityName].filter(Boolean).join(", ")}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          property.actionName?.toLowerCase().includes('izdavanje') 
                            ? 'bg-primary-gold text-white' 
                            : 'bg-primary-blue text-white'
                        }`}>
                          <Tag className="w-4 h-4 mr-1" />
                          {property.actionName || "Prodaja"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="flex flex-wrap gap-6 mt-4">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Bed className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{property.roomsNo}</span>{" "}
                        <span className="text-gray-600">{t("property-rooms")}</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Bath className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{property.bathroomNO}</span>{" "}
                        <span className="text-gray-600">{t("property-bathrooms")}</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Square className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{property.area}</span>{" "}
                        <span className="text-gray-600">{t("property-area")}</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Home className="h-5 w-5" />
                      </span>
                      <span className="text-gray-600">{property.typeName}</span>
                    </div>
                  </div>
                </div>

                {/* Property Description */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-blue mb-4">{t("property-description")}</h2>
                  <div className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: property.realEstateDescription || "" }}>
                  </div>
                </div>

                {/* Property Features */}
                <PropertyFeatures
                  title={t("property-features")}
                  features={processFeatures()}
                />

                {/* Property Map */}
                <PropertyMap
                  address={[property.locationArea, property.locationCityName].filter(Boolean).join(", ")}
                  location={{ 
                    lat: property.gmapSync === 1 ? 44.786568 : 44.786568,
                    lng: property.gmapSync === 1 ? 20.419649 : 20.419649
                  }}
                />
              </div>

              {/* Right Column - Contact Agent */}
              <div className="lg:col-span-1">
                <div ref={agentCardWrapperRef} className="relative">
                  <div className="mb-6">
                    <div className={`${
                      property.actionName?.toLowerCase().includes('izdavanje') 
                        ? 'bg-primary-gold' 
                        : 'bg-primary-blue'
                    } rounded-lg p-6 shadow-lg relative`}>
                      {/* Card content */}
                      <div className="relative z-20">
                        {/* Transaction Type Tag */}
                        <div className="flex items-center mb-2">
                          <Tag className={`w-5 h-5 mr-2 ${
                            property.actionName?.toLowerCase().includes('izdavanje') 
                              ? 'text-primary-blue' 
                              : 'text-white'
                          }`} />
                          <span className={`text-sm font-medium uppercase tracking-wider ${
                            property.actionName?.toLowerCase().includes('izdavanje') 
                              ? 'text-primary-blue' 
                              : 'text-white'
                          }`}>
                            {property.actionName || "Prodaja"}
                          </span>
                        </div>
                        
                        {/* Price */}
                        <div className={`text-2xl md:text-4xl font-bold mt-2 ${
                          property.actionName?.toLowerCase().includes('izdavanje') 
                            ? 'text-primary-blue' 
                            : 'text-white'
                        }`}>
                          {formatPrice(property.price)}
                        </div>
                        
                        {/* Price per m² */}
                        {property.priceM2 && (
                          <div className={`text-sm mt-2 flex items-center ${
                            property.actionName?.toLowerCase().includes('izdavanje') 
                              ? 'text-primary-blue/80' 
                              : 'text-white/80'
                          }`}>
                            <Euro className="w-4 h-4 mr-1" />
                            {property.priceM2.toLocaleString()} / m²
                          </div>
                        )}
                        
                        {/* Additional Details */}
                        <div className={`pt-3 mt-3 border-t border-black/20 text-sm ${
                          property.actionName?.toLowerCase().includes('izdavanje')
                            ? 'text-primary-blue/90'
                            : 'text-white/90'
                        }`}>
                          <div className="flex items-center">
                            <Square className="w-4 h-4 mr-2" />
                            <span>{property.area} m² {t("property-area")}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Home className="w-4 h-4 mr-2" />
                            <span>{property.typeName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div ref={agentCardRef} className="w-full z-20">
                    <ContactAgentCard agent={{
                      name: "Agent",
                      company: "JBL Real Estate Concept",
                      title: "Agent",
                      email: "contact@jblconcept.rs",
                      phone: "+381 00 0000000",
                      image: "/placeholder-agent.jpg"
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Contact Agent Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
          <div className="w-full">
            <button className="w-full cta-button">
              <span>{t("property-contact-agent")}</span>
              <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div ref={footerRef}>
        <FooterTW />
      </div>
    </>
  )
}

