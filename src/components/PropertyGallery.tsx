import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Heart } from 'lucide-react'

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        <div className="p-4 flex justify-between items-center text-white">
          <button onClick={() => setShowAllPhotos(false)} className="hover:opacity-70">
            <X size={24} />
          </button>
          <div className="flex gap-4">
            <button className="hover:opacity-70"><Share2 size={24} /></button>
            <button className="hover:opacity-70"><Heart size={24} /></button>
          </div>
        </div>
        <div className="grid gap-4 p-4">
          {images.map((image, index) => (
            <div key={index}>
              <img 
                src={image} 
                alt="" 
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-2 h-[600px]">
        <div className="col-span-2 row-span-2">
          <img 
            src={images[0]} 
            alt="" 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
          />
        </div>
        <div>
          <img 
            src={images[1]} 
            alt="" 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
          />
        </div>
        <div>
          <img 
            src={images[2]} 
            alt="" 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
          />
        </div>
        <div>
          <img 
            src={images[3]} 
            alt="" 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
          />
        </div>
        <div className="relative">
          <img 
            src={images[4]} 
            alt="" 
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
          />
          <button 
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-md shadow-md hover:bg-gray-100"
          >
            All photos
          </button>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex gap-4 z-10">
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Share2 size={20} />
        </button>
        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
          <Heart size={20} />
        </button>
      </div>
    </div>
  )
} 