import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ArrowLeft, Bed, Bath, Home, Calendar, Share2, Heart, Square, Phone, Mail, Building } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import PropertyGallery from "../components/property/PropertyGallery"
import PropertyDetails from "../components/property/PropertyDetails"
import ContactAgent from "../components/property/ContactAgent"
import Header from "../components/header/Header"
import FooterTW from "../components/footer/FooterTW"
import { Property } from "../types/property"
import AgentContactCard from '../components/property/AgentContactCard'

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY' // Zameni sa svojim ključem

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
}

const defaultCenter = {
  lat: 44.787197, // Belgrade coordinates
  lng: 20.457273
}

const propertyData = {
  title: "1084 Golf Road",
  location: "MONTECITO CA, 93108",
  price: "$33,500,000",
  pricePerSqft: "$3,826.38 per sqft",
  status: "Active",
  beds: 8,
  baths: 10,
  sqft: "8,755",
  type: "Residential",
  yearBuilt: "1923",
  description: `At Villa Cascina lies an exquisite piece of Montecito's history. Resting on a private lane in a prestigious Montecito neighborhood, this magnificent 1920s estate underwent an extensive renovation in 2016, ensuring the preservation of its timeless charm while embracing contemporary comforts. Nestled in the iconic Lower Village, this gated property boasts breathtaking views of the surrounding mountains and ocean, while sitting in close proximity to Coast Village Road's famed restaurants and boutiques. As you enter through the gated main drive, you'll be greeted by 3 acres of lush gardens and mature landscaping, setting the tone for the grandeur that awaits. The 7,299-square-foot main residence features 6 bedrooms, an office, and 6 full bathrooms (plus an additional two half-bathrooms), all exquisitely appointed with fine finishes. The main level is welcoming with a bright and open floor plan, highlighted by a grand foyer, beamed ceilings, and hardwood floors. Elegant Moroccan-style archways and steel doors and windows lead to a central courtyard adorned with antique tiles and a grand outdoor fireplace. Enjoy a fully equipped gourmet kitchen, formal dining and living rooms, and a dedicated media room. The generously sized primary suite finishes out the ground floor and is equipped with a luxurious bathroom and grand walk-in closet. Upstairs, four spacious and private ensuite bedrooms await. The lower level houses a sizable wine cellar perfect for the wine aficionado.

Amenities abound outside, including a swimmer's pool and cabana, sauna, and a North/South championship tennis court. Multiple additional structures on the 3-acre parcel form intentional spaces for all of life's necessities—a separate two-bedroom, one-bath guest house offers privacy and comfort for visitors, a large gym space provides wellness, and spacious four-car garages provide ample parking.`,
  images: [
    "/assets/probne slike za sajt/1.jpg",
    "/assets/probne slike za sajt/2.jpg",
    "/assets/probne slike za sajt/3.jpg",
    "/assets/probne slike za sajt/4.jpg",
    "/assets/probne slike za sajt/5.jpg"
  ],
  details: {
    interior: {
      totalStories: "2",
      bedrooms: "8",
      totalBathrooms: "10",
      fullBathrooms: "8",
      halfBathrooms: "2",
      appliances: [
        "Refrigerator", "Dishwasher", "Disposal", "Double Oven",
        "Dryer", "Gas Stove", "Rev Osmosis", "Washer", "Wtr Softener/Owned"
      ],
      laundry: "Gas Hookup, Laundry Room",
      floor: "Hardwood, Stone",
      fireplace: "Living Room, Primary Bedroom, Other, Patio",
      cooling: "Central Air",
      heating: "Forced Air, Radiant"
    },
    exterior: {
      lotSize: "3.16 Acres",
      features: [
        "Tennis Court(s)", "Pool", "Pool House", "Patio Open",
        "Patio Covered", "SPA-Outside", "Hot Tub", "Sauna",
        "Lawn", "Fruit Trees", "Fenced: ALL"
      ],
      style: "Medit, Spanish",
      roof: "Tile",
      security: "Monitored, Gate:Elec, Security Camera, Security System, Smoke Detector(s)"
    }
  }
}

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'sr');
    };

    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true)
      try {
        // Simulacija API poziva
        const dummyProperty = {
          id: parseInt(id!),
          title: {
            sr: "Moderna planinska vila",
            en: "Modern Mountain Villa"
          },
          price: 450000,
          location: {
            sr: "Zlatibor, Srbija",
            en: "Zlatibor, Serbia",
            coordinates: {
              lat: 44.787197,
              lng: 20.457273
            }
          },
          bedrooms: 4,
          bathrooms: 3,
          area: 220,
          description: {
            sr: "Luksuzna vila sa modernim dizajnom, smeštena u srcu planine. Prostrana i svetla, sa velikim prozorima koji pružaju spektakularan pogled na okolnu prirodu. Vila poseduje prostranu dnevnu sobu sa kaminom, potpuno opremljenu kuhinju, trpezariju, 4 spavaće sobe, 3 kupatila, teretanu i veliku terasu. Spoljašnji prostor uključuje uređeno dvorište sa bazenom, prostor za roštilj i parking za više vozila.",
            en: "Luxury villa with modern design, nestled in the heart of the mountain. Spacious and bright, with large windows offering spectacular views of the surrounding nature. The villa features a spacious living room with fireplace, fully equipped kitchen, dining room, 4 bedrooms, 3 bathrooms, gym, and a large terrace. The exterior includes a landscaped yard with swimming pool, barbecue area, and parking for multiple vehicles."
          },
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
          images: [
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png",
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jeqr4Kb14sEljgx7TsA4eA1OXekHNu.png"
          ],
          features: {
            sr: ["Parking", "Bazen", "Pogled na planinu"],
            en: ["Parking", "Pool", "Mountain View"]
          },
          type: {
            sr: "Vila",
            en: "Villa"
          },
          yearBuilt: "1923",
          // Add more property details as needed
        }
        setProperty(dummyProperty)
      } catch (error) {
        console.error('Error fetching property:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  if (!property) {
    return <div>Property not found</div>
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <PropertyGallery images={property.images} language={language} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Basic Info */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{property.title[language as 'sr' | 'en']}</h1>
              <p className="text-gray-600 mb-4">{property.location[language as 'sr' | 'en']}</p>
              <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-gray-400" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-gray-400" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-gray-400" />
                  <span>{property.area} sqft</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-gray-400" />
                  <span>{property.type[language as 'sr' | 'en']}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span>Built in {propertyData.yearBuilt}</span>
                </div>
              </div>
              <p className="text-2xl font-bold mb-2">{property.price}</p>
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-12">
              <p>{property.description[language as 'sr' | 'en']}</p>
            </div>

            {/* Property Details */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Property Details</h2>
              
              {/* Interior Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Interior Features</h3>
                <div className="grid grid-cols-2 gap-6">
                  {property.features[language as 'sr' | 'en'].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary-blue" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exterior Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Exterior Features</h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* ... exterior features mapping */}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap
                  mapContainerClassName="w-full h-[400px] rounded-lg"
                  center={property.location.coordinates}
                  zoom={15}
                >
                  <Marker position={property.location.coordinates} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AgentContactCard
              language={language}
              agentName={property.agent?.name}
              agentPhone={property.agent?.phone}
              agentEmail={property.agent?.email}
              brokerageLogo={property.agent?.logo}
              brokerageName={property.agent?.company}
            />
          </div>
        </div>
      </div>

      <FooterTW />
    </div>
  )
} 