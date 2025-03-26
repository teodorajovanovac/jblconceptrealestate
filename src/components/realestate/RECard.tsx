import { Bed, Bath, Square, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

interface RECardProps {
  property: {
    id: number
    title: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    area: number
    image: string
    features: string[]
    type: string
  }
}

export default function RECard({ property }: RECardProps) {
  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="relative h-[300px]">
          <img 
            src={property.image || "/images/placeholder.svg"} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">{property.type}</span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary-blue">{property.title}</h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
            <span className="text-xl font-bold text-primary-blue">{property.price.toLocaleString()} €</span>
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
  )
} 