"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Bed, Bath, Square, Home } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { properties } from "../data/propertyData"
import PropertyGallery from "../components/property/PropertyGallery"
import ContactAgentCard from "../components/property/ContactAgentCard"
import PropertyFeatures from "../components/property/PropertyFeatures"
import PropertyMap from "../components/property/PropertyMap"
import Header from "../components/header/Header"
import FooterTW from "../components/footer/FooterTW"
import Seo from "../services/meta/Seo"
import { useParams, Link } from "react-router-dom"

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');
  const agentCardRef = useRef<HTMLDivElement>(null);
  const agentCardWrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Find the property by ID or use the first property as fallback
  const currentProperty = properties.find(p => p.id === id) || properties[0];
  
  // If no property is found, show an error message
  if (!currentProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Nekretnina nije pronađena</h2>
          <p className="text-gray-600 mb-6">
            Tražena nekretnina ne postoji ili je uklonjena.
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      
      // Iznad početne pozicije kartice
      if (wrapperRect.top > 80) {
        agentCard.style.position = 'static';
        agentCard.style.top = 'auto';
        agentCard.style.width = 'auto';
      } 
      // Između početne pozicije i footera
      else if (footerRect.top > cardHeight + 100) {
        agentCard.style.position = 'fixed';
        agentCard.style.top = '100px';
        agentCard.style.width = `${wrapper.offsetWidth}px`;
      } 
      // Blizu footera
      else {
        agentCard.style.position = 'absolute';
        agentCard.style.top = `${footerRect.top - cardHeight - 100}px`;
        agentCard.style.width = `${wrapper.offsetWidth}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Inicijalno pozicioniranje
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })
  }

  return (
    <>
      <Seo title={currentProperty.address?.street || "Nekretnina"} />
      <Header />
      <div className="bg-gray-50 min-h-screen pb-24 md:pb-0 pt-16">
        {/* Property Gallery with z-index */}
        <div className="relative z-0">
          <PropertyGallery images={currentProperty.images || []} />
        </div>

        {/* Main Content with higher z-index */}
        <div className="relative z-10 bg-gray-50">
          {/* Mobile Tabs Navigation */}
          <div className="md:hidden">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full px-2 h-12 grid grid-cols-3 gap-1">
                <TabsTrigger value="description" className="px-1 text-xs whitespace-normal">
                  Property Description
                </TabsTrigger>
                <TabsTrigger value="features" className="px-1 text-xs whitespace-normal">
                  Features & Amenities
                </TabsTrigger>
                <TabsTrigger value="details" className="px-1 text-xs whitespace-normal">
                  Other Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="px-4">
                {/* Property Description Content */}
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">{currentProperty.address?.street || ""}</h1>
                  <p className="text-xl font-bold">{formatPrice(currentProperty.price?.amount || 0)}</p>
                  <p className="text-gray-600">{currentProperty.description || ""}</p>
                </div>
              </TabsContent>

              <TabsContent value="features" className="px-4">
                <PropertyFeatures title="Interior Features" features={currentProperty.interiorFeatures || {}} />
                <PropertyFeatures title="Exterior Features" features={currentProperty.exteriorFeatures || {}} />
              </TabsContent>

              <TabsContent value="details" className="px-4">
                <PropertyFeatures title="Other Property Details" features={currentProperty.otherDetails || {}} />
                <PropertyFeatures title="School Information" features={currentProperty.schoolInfo || {}} />
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
                        {currentProperty.address?.street || ""}
                      </h1>
                      <p className="text-gray-600 mt-1">
                        {currentProperty.address?.fullAddress || ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl md:text-3xl font-bold text-primary-blue">
                        {formatPrice(currentProperty.price?.amount || 0)}
                      </div>
                      {currentProperty.transactionType === "rent" && (
                        <span className="text-gray-600 text-sm">/mesečno</span>
                      )}
                    </div>
                  </div>

                  {/* Property Features */}
                  <div className="flex flex-wrap gap-6 mt-4">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Bed className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{currentProperty.features?.beds || 0}</span>{" "}
                        <span className="text-gray-600">sobe</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Bath className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{currentProperty.features?.baths || 0}</span>{" "}
                        <span className="text-gray-600">kupatila</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Square className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="font-medium">{currentProperty.features?.sqft || 0}</span>{" "}
                        <span className="text-gray-600">m²</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">
                        <Home className="h-5 w-5" />
                      </span>
                      <span className="text-gray-600">{currentProperty.features?.propertyType || ""}</span>
                    </div>
                  </div>
                </div>

                {/* Property Description */}
                <div>
                  <h2 className="text-2xl font-bold text-primary-blue mb-4">Opis</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p>{currentProperty.description || ""}</p>
                  </div>
                </div>

                {/* Property Features */}
                <PropertyFeatures
                  title="Enterijer"
                  features={currentProperty.interiorFeatures || {}}
                />

                <PropertyFeatures
                  title="Eksterijer"
                  features={currentProperty.exteriorFeatures || {}}
                />

                <PropertyFeatures
                  title="Ostali detalji"
                  features={currentProperty.otherDetails || {}}
                />

                {/* Property Map */}
                <PropertyMap
                  address={currentProperty.address?.fullAddress || ""}
                  location={currentProperty.mapLocation || { lat: 44.786568, lng: 20.419649 }}
                />

                {/* Disclaimer */}
                <div className="text-xs text-gray-500 mt-8">
                  <p>{currentProperty.disclaimer || ""}</p>
                  <p className="mt-2">{currentProperty.lastUpdated || ""}</p>
                </div>
              </div>

              {/* Right Column - Contact Agent */}
              <div className="lg:col-span-1">
                <div ref={agentCardWrapperRef} className="relative">
                  <div ref={agentCardRef} className="w-full z-20">
                    <ContactAgentCard agent={currentProperty.listingInfo?.agent || {
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
              <span>Contact Agent</span>
              <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Referenca za footer */}
      <div ref={footerRef}>
        <FooterTW />
      </div>
    </>
  )
}

