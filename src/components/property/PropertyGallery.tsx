"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Make sure images is an array and has at least one item
  const safeImages = Array.isArray(images) && images.length > 0 ? images : ['/placeholder-image.jpg'];
  const hasEnoughImages = safeImages.length >= 5;

  // Format images for Lightbox
  const slides = safeImages.map((src) => ({ src }));

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    
    // Threshold for swipe detection (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left - go to next image
        nextImage();
      } else {
        // Swipe right - go to previous image
        prevImage();
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? safeImages.length - 1 : prev - 1
    );
  };

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/placeholder-image.jpg'; // Fallback image
    e.currentTarget.onerror = null; // Prevent infinite error loop
  };

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

      {/* Mobile Gallery - Single image with swipe */}
      <div className="md:hidden w-full h-[300px] relative overflow-hidden">
        <div 
          className="h-full w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={safeImages[currentImageIndex]}
            alt={`Property view ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onClick={() => setIndex(currentImageIndex)}
            onError={handleImageError}
          />
          
          {safeImages.length > 1 && (
            <>
              {/* Navigation Controls */}
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-5 w-5 text-primary-blue" />
              </button>
              
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-5 w-5 text-primary-blue" />
              </button>
              
              {/* Image indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                {currentImageIndex + 1} / {safeImages.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Gallery - Conditional rendering based on number of images */}
      <div className="hidden md:block w-full h-[400px] md:h-[600px] lg:h-[700px] relative overflow-hidden">
        {hasEnoughImages ? (
          // Original grid layout for 5+ images
          <div className="grid grid-cols-4 gap-2 h-full p-2">
            {/* Main large image */}
            <div 
              className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group"
              onClick={() => setIndex(0)}
            >
              <img
                src={safeImages[0]}
                alt="Main property view"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>

            {/* Right side thumbnails */}
            {safeImages.slice(1, 5).map((image, idx) => (
              <div 
                key={idx}
                className="relative cursor-pointer overflow-hidden group"
                onClick={() => setIndex(idx + 1)}
              >
                <img
                  src={image}
                  alt={`Property view ${idx + 2}`}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
                {/* "View all photos" button on the last thumbnail */}
                {idx === 3 && safeImages.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 hover:bg-white/90 transition-all duration-300 rounded-lg cursor-pointer">
                    <span className="text-sm font-medium">Sve slike</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Single image slider for fewer than 5 images
          <div className="h-full w-full relative">
            <img
              src={safeImages[currentImageIndex]}
              alt={`Property view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onClick={() => setIndex(currentImageIndex)}
              onError={handleImageError}
            />
            
            {safeImages.length > 1 && (
              <>
                {/* Navigation Controls */}
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="h-6 w-6 text-primary-blue" />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="h-6 w-6 text-primary-blue" />
                </button>
                
                {/* Image indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {safeImages.length}
                </div>
              </>
            )}
          </div>
        )}

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

