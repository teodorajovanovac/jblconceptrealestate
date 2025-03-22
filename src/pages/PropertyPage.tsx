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
          setError("Nekretnina nije pronađena");
          setProperty(null);
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Došlo je do greške prilikom učitavanja podataka");
        setProperty(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

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
      "Tip nekretnine": property.subTypeName 
        ? `${property.typeName} + ${property.subTypeName}`
        : property.typeName || 'N/A',
      "Površina": property.area ? `${property.area} m²` : 'N/A',
      "Broj soba": property.roomsNo || 'N/A',
      "Broj kupatila": property.bathroomNO || 'N/A',
      "Sprat": property.floorNoString || 'N/A',
      "Dodatne prostorije": property.spaces || 'N/A',
      "Karakteristike": property.description || 'N/A',
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
          <h2 className="text-2xl font-bold text-red-600 mb-4">Nekretnina nije pronađena</h2>
          <p className="text-gray-600 mb-6">
            {error || "Tražena nekretnina ne postoji ili je uklonjena."}
          </p>
          <Link 
            to="/properties" 
            className="inline-block bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Povratak na listu nekretnina
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
                <TabsTrigger value="description">Opis</TabsTrigger>
                <TabsTrigger value="features">Karakteristike</TabsTrigger>
                <TabsTrigger value="location">Lokacija</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="px-4">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">{property.portalName}</h1>
                  <p className="text-xl font-bold">{formatPrice(property.price)}</p>
                  <div className="prose max-w-none text-gray-700" 
                    dangerouslySetInnerHTML={{ __html: property.realEstateDescription || "" }}>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="px-4">
                <PropertyFeatures 
                  title="Karakteristike" 
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
                  <div className="flex justify-between items-start">
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
                    <div className="text-right">
                      <div className="bg-primary-blue rounded-lg p-4 inline-block">
                        <div className="text-2xl md:text-3xl font-bold text-white">
                          {formatPrice(property.price)}
                        </div>
                        {property.priceM2 && (
                          <div className="text-sm text-white/80 mt-1 flex items-center justify-end">
                            <Euro className="w-4 h-4 mr-1" />
                            {property.priceM2.toLocaleString()} / m²
                          </div>
                        )}
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
                        <span className="text-gray-600">sobe</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Bath className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{property.bathroomNO}</span>{" "}
                        <span className="text-gray-600">kupatila</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Square className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{property.area}</span>{" "}
                        <span className="text-gray-600">m²</span>
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
                  <h2 className="text-2xl font-bold text-primary-blue mb-4">Opis</h2>
                  <div className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: property.realEstateDescription || "" }}>
                  </div>
                </div>

                {/* Property Features */}
                <PropertyFeatures
                  title="Karakteristike"
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
            <Link 
              to={`/contact?property=${property.id}`} 
              className="cta-button inline-block rounded-full"
            >
              <span>{language === 'sr' ? 'Raspitajte se danas' : 'Enquire Today'}</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div ref={footerRef}>
        <FooterTW />
      </div>
    </>
  )
}

