import { useState } from 'react'
import { Share2, Heart } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
  language: string
}

export default function PropertyGallery({ images, language }: PropertyGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  return (
    <div className="relative w-full h-[600px] grid grid-cols-4 grid-rows-2 gap-1">
      {/* Main large image */}
      <div className="col-span-2 row-span-2 relative">
        <img 
          src={images[0]} 
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side images */}
      <div className="relative">
        <img src={images[1]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative">
        <img src={images[2]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative">
        <img src={images[3]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative">
        <img src={images[4]} alt="" className="w-full h-full object-cover" />
        <button 
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded text-sm hover:bg-gray-100"
        >
          {language === 'sr' ? 'Sve fotografije' : 'All photos'}
        </button>
      </div>

      {/* Share and Save buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <Share2 className="h-5 w-5" />
        </button>
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <Heart className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
} 