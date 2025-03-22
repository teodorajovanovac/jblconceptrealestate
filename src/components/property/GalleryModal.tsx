"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Share2, Heart } from "lucide-react"

interface GalleryModalProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function GalleryModal({ images, isOpen, onClose, initialIndex = 0 }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  if (!isOpen) return null

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fixed inset-0 bg-custom-black z-50 flex flex-col">
      {/* Header */}
      <div className="relative h-16 flex items-center justify-between px-4 bg-custom-black/90">
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X className="h-6 w-6" />
        </button>
        <div className="text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <div className="flex gap-4">
          <button className="text-white hover:text-gray-300">
            <Share2 className="h-6 w-6" />
          </button>
          <button className="text-white hover:text-gray-300">
            <Heart className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className="flex-1 relative">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Property image ${currentIndex + 1}`}
          className="object-contain w-full h-full"
        />

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-custom-black/50 p-2 rounded-full text-white hover:bg-custom-black/75"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-custom-black/50 p-2 rounded-full text-white hover:bg-custom-black/75"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="h-20 bg-custom-black/90 overflow-x-auto">
        <div className="flex gap-2 p-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden ${
                index === currentIndex ? "ring-2 ring-white" : ""
              }`}
            >
              <img 
                src={image || "/placeholder.svg"} 
                alt={`Thumbnail ${index + 1}`} 
                className="object-cover w-full h-full" 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

