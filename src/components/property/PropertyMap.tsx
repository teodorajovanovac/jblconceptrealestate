import { Maximize } from "lucide-react"

interface PropertyMapProps {
  address: string
  location: {
    lat: number
    lng: number
  }
}

export default function PropertyMap({ address, location }: PropertyMapProps) {
  const [street, cityStateZip] = address.split(",")

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Map</h2>
      <div className="relative h-[300px] w-full rounded-lg overflow-hidden mb-4">
        <img 
          src="/placeholder.svg?height=300&width=800" 
          alt="Property location map" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all">
            <Maximize className="h-4 w-4 text-gray-800" />
          </button>
        </div>
      </div>
      <div>
        <p className="font-bold">{street}</p>
        <p>{cityStateZip}</p>
      </div>
    </div>
  )
}

