"use client"

import { useState } from "react"
import { Heart, Share2, ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import GalleryModal from "./GalleryModal"

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  const handleViewAllPhotos = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4">
        <Link to="/properties" className="flex items-center text-gray-800">
          <ChevronLeft className="h-6 w-6 mr-2" />
          <span>Back</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <Share2 className="h-6 w-6" />
          </button>
          <button className="p-2">
            <Heart className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Gallery Layout - smanjena visina za veće ekrane */}
      <div className="w-full h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] grid grid-cols-1 md:grid-cols-5 gap-2">
        {/* Main large image */}
        <div className="relative md:col-span-3 h-full">
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt="Property main view"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Failed to load image: ${images[currentIndex]}`);
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Right side thumbnails - hidden on mobile */}
        <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-2 h-full">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative cursor-pointer" onClick={() => handleThumbnailClick(index + 1)}>
              <img
                src={image || "/placeholder.svg"}
                alt={`Property view ${index + 2}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`Failed to load thumbnail: ${image}`);
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />

              {/* "All photos" button on the last thumbnail */}
              {index === 3 && (
                <div
                  className="absolute bottom-4 right-4 bg-white rounded-full px-4 py-2 text-sm font-medium shadow-md cursor-pointer"
                  onClick={handleViewAllPhotos}
                >
                  All photos
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile view all photos button */}
        <button
          className="md:hidden absolute bottom-4 right-4 bg-white rounded-full px-4 py-2 text-sm font-medium shadow-md"
          onClick={handleViewAllPhotos}
        >
          All photos
        </button>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        images={images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={currentIndex}
      />
    </>
  )
}

