"use client"

import { useState, useEffect, useRef } from "react"
import { Bed, Bath, Square, Home, Euro, Tag } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import PropertyGallery from "../components/property/PropertyGallery"
import ContactAgentCard from "../components/property/ContactAgentCard"
import PropertyFeatures from "../components/property/PropertyFeatures" //STA JE OVO
import PropertyMap from "../components/property/PropertyMap"
import Seo from "../services/meta/Seo"
import TagManager from 'react-gtm-module';
import { useParams, Link } from "react-router-dom"
import realEstate from "../data/RealEstateData"
import { RealEstateDto, AgentDto } from "../data/models/RealEstate"
import Spinner from '../components/ui/Spinner' //ZASTO NE OVO
import { useCmsData } from "../services/CmsProvider"
import { stripHtml } from "string-strip-html";



export default function PropertyPage() {
  const { t, currentLanguage, loadingCmsData } = useCmsData();
  const { id } = useParams<{ id: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  
  const [property, setProperty] = useState<RealEstateDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  
  const agentCardRef = useRef<HTMLDivElement>(null);
  const agentCardWrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const fetchPropertyDetails = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const propertyId = parseInt(id);
      const result = await realEstate.getData(propertyId, currentLanguage);
      if (result) {
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        path: location.pathname,
        page: 'product-page',
        productId: id,
      },
    })
  }, [id]) 
  // Fetch property data
  useEffect(() => {
    if (!loadingCmsData && currentLanguage) {
      fetchPropertyDetails();
    }
  }, [id, currentLanguage, loadingCmsData]);

  
  // Handle scroll for sticky elements
  useEffect(() => {
    const handleScroll = () => {
      if (!agentCardRef.current || !agentCardWrapperRef.current) return;
      
      const wrapperRect = agentCardWrapperRef.current.getBoundingClientRect();
      const cardRect = agentCardRef.current.getBoundingClientRect();
      
      // Check if the card is about to leave its wrapper
      if (wrapperRect.top <= 100) {
        agentCardRef.current.style.position = 'fixed';
        agentCardRef.current.style.top = '100px';
        agentCardRef.current.style.width = `${agentCardWrapperRef.current.offsetWidth}px`;
      } else {
        agentCardRef.current.style.position = 'relative';
        agentCardRef.current.style.top = 'auto';
        agentCardRef.current.style.width = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
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
      return [`${t("property-image-placeholder")}`];
    }

    

    return property.photos.map(photo => `${t("property-image-path")}/${photo.name}`);
  };

  const processFeatures = () => {
    if (!property) return {};
    
    // Create initial features object with all properties
    const generalFeatures: Record<string, any> = {
      [t("property-type")]: [property.subTypeName 
        ? `${property.typeName} + ${property.subTypeName}`
        : property.typeName || 'N/A', " + "],
      [t("property-area")]: [property.area ? `${property.area} m²` : 'N/A',""],
      [t("property-rooms")]: [property.roomsNo || 'N/A',""],
      [t("property-bathrooms")]: [property.bathroomNo || 'N/A',""],
      [t("property-bedroom-no")]: [property.bedroomNo || 'N/A',""],
      [t("property-floor")]: [property.floorNoString || 'N/A',","],
      [t("property-additional-rooms")]: [property.spaces || 'N/A',","],
      [t("property-characteristics")]: [property.description || 'N/A',","],
      [t("property-ceiling-height")]: [property.ceilingHeight ? `${property.ceilingHeight} cm` : 'N/A',""],
      [t("property-energy-efficiency-class")]: [property.energyEfficiencyClass || 'N/A',""],
      [t("property-condition-name")]: [property.propertyConditionName || 'N/A',","],
      [t("property-moving-in")]: [property.yearAdapted || 'N/A',""],
      [t("property-actual-age")]: [property.actualAge || 'N/A',""],
      [t("property-price-supplement")]: [property.priceSupplement || 'N/A',""],
      [t("property-luxury-class")]: [property.lux || 'N/A',""],
      [t("property-adress")]: [property.locationArea || 'N/A',""],
      [t("property-transportation")]: [property.transportation || 'N/A',","],
      [t("property-position")]: [property.positionName || 'N/A',""],
      [t("property-joinery")]: [property.joinery || 'N/A',""],
      [t("property-heating")]: [property.heating || 'N/A',""],
      [t("property-equipment")]: [property.equipment || 'N/A',","],
      [t("property-orientation")]: [property.orientation || 'N/A',""],
      [t("property-infrastructure")]: [property.infrastructure || 'N/A',""],
      [t("property-speciality")]: [property.speciality || 'N/A',""],
      [t("property-access")]: [property.access || 'N/A',","],
      [t("property-center")]: [property.center || 'N/A',""],
      [t("property-adress")]: [property.adress || 'N/A',""],
      [t("property-type")]: [property.typeName || 'N/A',""],
    };
    
    // Filter out any properties with 'N/A' values
    const features: Record<string, any> = {};
    Object.entries(generalFeatures).forEach(([key, value]) => {
      if (value[0] !== 'N/A') {
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

  const cleanDescription = stripHtml(property.realEstateDescription || "").result;
  const shortDescription = cleanDescription.slice(0, 200);
  // Main render
  return (
    <>
      <Seo 
        title={property.portalName || "Nekretnina"}
        image={`${window.location.origin}${t("property-thumb-path")}${property.thumbnail}`} 
        description={shortDescription}
        url={window.location.href}
        />

      <div className="bg-gray-50 min-h-screen pb-24 md:pb-0 pt-16">
        {/* Property Gallery */}
        <div className="relative">
          <PropertyGallery 
            images={formatGalleryImages()} 
            propertyId={property.id}
            propertyTitle={property.portalName || "Nekretnina"}
            video={property.videos && property.videos.length > 0 ? property.videos[0] : undefined}
          />
        </div>

        {/* Main Content */}
        <div className="relative bg-gray-50">
          {/* Mobile Tabs Navigation */}
          <div className="md:hidden">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full px-2 h-12 grid grid-cols-3 gap-1">
                <TabsTrigger value="description">{t("property-description")}</TabsTrigger>
                <TabsTrigger value="features2">{t("property-features")}</TabsTrigger>
                <TabsTrigger value="location">{t("property-location")}</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="px-4">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">{property.portalName}</h1>
                  

                  <div className={`${
                      property.actionShortName?.toLowerCase().includes('i') 
                        ? 'bg-primary-gold' 
                        : 'bg-primary-blue'
                    } rounded-lg px-5 pb-4 pt-2 mb-6 shadow-lg inline-block w-full text-right`}>
                    <div className={`text-2xl font-bold mt-1 ${
                      property.actionShortName?.toLowerCase().includes('i') 
                        ? 'text-primary-blue' 
                        : 'text-white'
                       }`}>
                      ID:{property.id}
                    </div>
                  </div>

                  <div className={`${
                    property.actionName?.toLowerCase().includes('izdavanje') 
                      ? 'bg-primary-gold' 
                      : 'bg-primary-blue'
                  } rounded-lg p-5 inline-block shadow-lg relative w-full`}>
                    {/* Card content */}
                    <div className="relative ">
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

              <TabsContent value="features1" className="px-4">
                <PropertyFeatures 
                  title={t("property-features")} 
                  features={processFeatures()} 
                />
              </TabsContent>

              <TabsContent value="features2" className="px-4">
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
                        <span className="font-medium">{property.bathroomNo}</span>{" "}
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
                
                <div className="relative">
                  <div className="mb-6">
                  <div className={`${
                      property.actionShortName?.toLowerCase().includes('i') 
                        ? 'bg-primary-gold' 
                        : 'bg-primary-blue'
                    } rounded-lg px-6 pb-5 pt-3 mb-6 shadow-lg relative`}>
                    <div className={`w-full text-right text-2xl md:text-4xl font-bold mt-2 ${
                      property.actionShortName?.toLowerCase().includes('i') 
                        ? 'text-primary-blue' 
                        : 'text-white'
                       }`}>
                      ID:{property.id}
                    </div>
                </div>

                    <div className={`${
                      property.actionShortName?.toLowerCase().includes('i') 
                        ? 'bg-primary-gold' 
                        : 'bg-primary-blue'
                    } rounded-lg p-6 shadow-lg relative`}>
                      {/* Card content */}
                      <div className="relative">
                        {/* Transaction Type Tag */}
                        <div className="flex items-center mb-2">
                          <Tag className={`w-5 h-5 mr-2 ${
                            property.actionShortName?.toLowerCase().includes('i') 
                              ? 'text-primary-blue' 
                              : 'text-white'
                          }`} />
                          <span className={`text-sm font-medium uppercase tracking-wider ${
                            property.actionShortName?.toLowerCase().includes('i') 
                              ? 'text-primary-blue' 
                              : 'text-white'
                          }`}>
                            {property.actionName || "Prodaja"}
                          </span>
                        </div>

                       

                        {/* Price */}
                        <div className={`text-2xl md:text-4xl font-bold mt-2 ${
                          property.actionShortName?.toLowerCase().includes('i') 
                            ? 'text-primary-blue' 
                            : 'text-white'
                        }`}>
                          {formatPrice(property.price)}
                        </div>

                      
                        
                        {/* Price per m² */}
                        {property.priceM2 && (
                          <div className={`text-sm mt-2 flex items-center ${
                            property.actionShortName?.toLowerCase().includes('i') 
                              ? 'text-primary-blue/80' 
                              : 'text-white/80'
                          }`}>
                            <Euro className="w-4 h-4 mr-1" />
                            {property.priceM2.toLocaleString()} / m²
                          </div>
                        )}
                        
                        {/* Additional Details */}
                        <div className={`pt-3 mt-3 border-t border-black/20 text-sm ${
                          property.actionShortName?.toLowerCase().includes('i')
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
                  <div ref={agentCardWrapperRef}></div>
                  <div ref={agentCardRef} className="w-full z-20">
                    <ContactAgentCard 
                      property={property} 
                      fullWidth={true} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Contact Agent Button */}
        {/* <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
          <div className="w-full">
            <button className="w-full cta-button">
              <span>{t("property-contact-agent")}</span>
              <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div> */}

        {/* Fiksno dugme za kontakt agenta na mobilnom prikazu */}
        {/* bg-transparent border-t border-gray-200 p-3 shadow-lg 
        border-[0.5px] border-white/50 border-solid
        */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-transparent">
          <button 
            className="w-full cta-button rounded-full h-18 border border-transparent shadow-[0_0_6px_rgba(255,255,255,0.5)]"
            onClick={() => setShowContactForm(true)}
          >
            <span>{t("agent-contact-agent")}</span>
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="white"/>
            </svg>
          </button>
        </div>

        {/* Modal za prikaz kontakt forme preko celog ekrana na mobilnom prikazu */}
        {showContactForm && (
          <div className="md:hidden fixed inset-0 z-[9999] bg-white flex flex-col">
            <div className="bg-primary-blue text-white px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("agent-contact-agent")}</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="p-2 rounded-full hover:bg-primary-dark-blue/20"
              >
                {/* strokeWidth="2" */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <ContactAgentCard 
                property={property} 
                fullWidth={true} 
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

