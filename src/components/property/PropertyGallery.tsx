"use client"

import { useState } from "react"
import { Heart, Share2, ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/thumbnails.css"

interface PropertyGalleryProps {
  images: string[]
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [index, setIndex] = useState(-1);

  // Format images for Lightbox
  const slides = images.map((src) => ({ src }));

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4">
        <Link to="/properties" className="flex items-center text-gray-800">
          <ChevronLeft className="h-6 w-6 mr-2" />
          <span>Nazad</span>
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

      {/* Gallery Grid */}
      <div className="w-full h-[400px] md:h-[600px] lg:h-[700px] relative overflow-hidden">
        <div className="grid grid-cols-4 gap-2 h-full p-2">
          {/* Main large image */}
          <div 
            className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group"
            onClick={() => setIndex(0)}
          >
            <img
              src={images[0]}
              alt="Main property view"
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            
            {/* Mobile view all photos button */}
            <button
              className="md:hidden absolute bottom-4 right-4 bg-white/90 hover:bg-white rounded-full px-6 py-2.5 text-sm font-medium shadow-lg z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(0);
              }}
            >
              Pogledaj sve slike
            </button>
          </div>

          {/* Right side thumbnails */}
          {images.slice(1, 5).map((image, idx) => (
            <div 
              key={idx}
              className="relative cursor-pointer overflow-hidden group"
              onClick={() => setIndex(idx + 1)}
            >
              <img
                src={image}
                alt={`Property view ${idx + 2}`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              
              {/* "View all photos" button on the last thumbnail */}
              {idx === 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 hover:bg-white/90 transition-all duration-300 rounded-lg cursor-pointer">
                  <span className="text-sm font-medium">Sve slike</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Share and Like buttons - desktop */}
        <div className="hidden md:flex absolute top-4 right-4 space-x-2">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <Share2 className="h-5 w-5" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        carousel={{
          spacing: 0,
          padding: 0,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, .9)",
          },
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  )
}

