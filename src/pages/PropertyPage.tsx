"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { propertyData } from "../data/propertyData"
import PropertyGallery from "../components/property/PropertyGallery"
import ContactAgentCard from "../components/property/ContactAgentCard"
import PropertyFeatures from "../components/property/PropertyFeatures"
import PropertyMap from "../components/property/PropertyMap"
import Header from "../components/header/Header"
import FooterTW from "../components/footer/FooterTW"
import Seo from "../services/meta/Seo"

export default function PropertyPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const agentCardRef = useRef<HTMLDivElement>(null);
  const agentCardWrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
      <Seo title={propertyData.address.street} />
      <Header />
      <div className="bg-gray-50 min-h-screen pb-24 md:pb-0 pt-0">
        {/* Property Gallery */}
        <PropertyGallery images={propertyData.images} />

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
                <h1 className="text-2xl font-bold">{propertyData.address.street}</h1>
                <p className="text-xl font-bold">{formatPrice(propertyData.price.amount)}</p>
                <p className="text-gray-600">{propertyData.description}</p>
              </div>
            </TabsContent>

            <TabsContent value="features" className="px-4">
              <PropertyFeatures title="Interior Features" features={propertyData.interiorFeatures} />
              <PropertyFeatures title="Exterior Features" features={propertyData.exteriorFeatures} />
            </TabsContent>

            <TabsContent value="details" className="px-4">
              <PropertyFeatures title="Other Property Details" features={propertyData.otherDetails} />
              <PropertyFeatures title="School Information" features={propertyData.schoolInfo} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2">
              {/* Property Header */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h1 className="text-3xl font-bold text-primary-blue">{propertyData.address.street}</h1>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary-blue">{formatPrice(propertyData.price.amount)}</p>
                    <p className="text-gray-600">${propertyData.price.perSqft.toLocaleString()} per sqft</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {propertyData.address.city} {propertyData.address.state}, {propertyData.address.zip}
                </p>

                {/* Property Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-2">{propertyData.features.beds}</span>
                    <span className="text-gray-600">Beds</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-2">{propertyData.features.baths}</span>
                    <span className="text-gray-600">Baths</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-2">{propertyData.features.sqft.toLocaleString()}</span>
                    <span className="text-gray-600">sqft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg mr-2">{propertyData.features.propertyType}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600">Built in {propertyData.features.yearBuilt}</span>
                  </div>
                </div>

                {/* Status and Listing Info */}
                <div className="flex flex-wrap gap-6 py-4 border-t border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span>{propertyData.status}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">MLS</span>
                    <span className="font-medium">{propertyData.listingInfo.mlsId}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-600 mr-2">LISTED</span>
                    <span className="font-medium">{propertyData.listingInfo.listedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-600 mr-2">UPDATED</span>
                    <span className="font-medium">{propertyData.listingInfo.updatedDate}</span>
                  </div>
                </div>
              </div>

              {/* Property Description */}
              <div className="mb-8">
                <p className="whitespace-pre-line text-gray-800 leading-relaxed">{propertyData.description}</p>
              </div>

              {/* Property Map */}
              <PropertyMap address={propertyData.address.fullAddress} location={propertyData.mapLocation} />

              {/* Interior Features */}
              <PropertyFeatures
                title="Interior Features"
                features={{
                  "Total Stories": propertyData.interiorFeatures.totalStories,
                  Bedrooms: propertyData.interiorFeatures.bedrooms,
                  "Total Bathrooms": propertyData.interiorFeatures.totalBathrooms,
                  "Full Bathrooms": propertyData.interiorFeatures.fullBathrooms,
                  "Half Bathrooms": propertyData.interiorFeatures.halfBathrooms,
                  Appliances: propertyData.interiorFeatures.appliances,
                  "Laundry Description": propertyData.interiorFeatures.laundry,
                  "Floor Description": propertyData.interiorFeatures.flooring,
                  Fireplace: propertyData.interiorFeatures.fireplace,
                  "Fireplace Description": propertyData.interiorFeatures.fireplaceDescription,
                  Cooling: propertyData.interiorFeatures.cooling,
                  "Cooling Description": propertyData.interiorFeatures.coolingDescription,
                  Heating: propertyData.interiorFeatures.heating,
                  "Heating Description": propertyData.interiorFeatures.heatingDescription,
                }}
              />

              {/* Exterior Features */}
              <PropertyFeatures
                title="Exterior/Building Features"
                features={{
                  "Lot Size": propertyData.exteriorFeatures.lotSize,
                  "Exterior Features": propertyData.exteriorFeatures.exteriorAmenities,
                  "Lot Features": propertyData.exteriorFeatures.lotFeatures,
                  "Architectural Style": propertyData.exteriorFeatures.architecturalStyle,
                  Roof: propertyData.exteriorFeatures.roof,
                  Sewer: propertyData.exteriorFeatures.sewer,
                  "Patio And Porch": propertyData.exteriorFeatures.patioAndPorch,
                  Security: propertyData.exteriorFeatures.security,
                }}
              />

              {/* School Information */}
              <PropertyFeatures
                title="School Information"
                features={{
                  "High School": propertyData.schoolInfo.highSchool,
                  "Elementary School": propertyData.schoolInfo.elementarySchool,
                }}
              />

              {/* Other Property Details */}
              <PropertyFeatures
                title="Other Property Details"
                features={{
                  "Area Name": propertyData.otherDetails.areaName,
                  "Days on Market": propertyData.otherDetails.daysOnMarket,
                  Garage: propertyData.otherDetails.garage,
                  Parking: propertyData.otherDetails.parking,
                  View: propertyData.otherDetails.view,
                  "View Description": propertyData.otherDetails.viewDescription,
                  County: propertyData.otherDetails.county,
                  "Water Source": propertyData.otherDetails.waterSource,
                  Pool: propertyData.otherDetails.pool,
                  Utilities: propertyData.otherDetails.utilities,
                  Zoning: propertyData.otherDetails.zoning,
                }}
              />

              {/* Disclaimer */}
              <div className="mt-8 p-6 bg-gray-100 rounded-lg text-sm text-gray-600">
                <p className="mb-2">
                  Listed by <span className="text-primary-blue">The Agency</span>,{" "}
                  <span className="text-primary-blue">{propertyData.listingInfo.agent.name}</span>,
                </p>
                <p className="mb-2">
                  Listing Contact: <span className="text-primary-blue">{propertyData.listingInfo.agent.email}</span>
                </p>
                <p className="mb-4">{propertyData.disclaimer}</p>
                <p>©2025 Santa Barbara Association of REALTORS. All rights reserved.</p>
                <p>{propertyData.lastUpdated}</p>
                <div className="mt-4">
                  <img src="/placeholder.svg?height=30&width=100" alt="MLS Logo" className="w-[100px] h-[30px]" />
                </div>
              </div>

              {/* Powered by */}
              <div className="mt-4 text-sm text-gray-500">
                Powered by <span className="text-primary-blue">JBL Concept</span>
              </div>
            </div>

            {/* Right Column - Contact Agent Card */}
            <div className="lg:col-span-1 hidden lg:block" ref={agentCardWrapperRef}>
              <div ref={agentCardRef} style={{ zIndex: 40 }}>
                <ContactAgentCard agent={propertyData.listingInfo.agent} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Contact Agent Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t md:hidden">
          <button className="w-full bg-primary-blue text-white py-3 rounded-md font-medium">Contact Agent</button>
        </div>
      </div>
      
      {/* Referenca za footer */}
      <div ref={footerRef}>
        <FooterTW />
      </div>
    </>
  )
}

