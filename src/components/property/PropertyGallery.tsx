"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, Share2, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Link } from "react-router-dom"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css" 
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/thumbnails.css"

import ShareModal from "./ShareModal"
import { useFavorites } from "../../hooks/FavoritesContext";
import { VideoDto } from "../../data/models/RealEstate"
import { useCmsData } from "../../services/CmsProvider"
interface PropertyGalleryProps {
  images: string[];
  propertyId?: number;
  propertyTitle?: string;
  video?: VideoDto;
}

export default function PropertyGallery({ images, propertyId = 0, propertyTitle = "Nekretnina", video }: PropertyGalleryProps) {
  const { t, currentLanguage, loadingCmsData } = useCmsData();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [index, setIndex] = useState(-1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  //const location = useLocation();
  
  // Make sure images is an array and has at least one item
  const safeImages = Array.isArray(images) && images.length > 0 ? images : [`${t("placeholder-image-path")}`];
  const hasEnoughImages = safeImages.length >= 5;

  // Format images for Lightbox
  const slides = safeImages.map((src) => ({ src }));

  // Get YouTube video ID if video exists
  const getYoutubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = video?.name ? getYoutubeVideoId(video.link) : null;
  
  // Get current URL for sharing
  const currentUrl = window.location.href;

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

  // Toggle share modal
  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareModalOpen(true);
  };

  // Toggle favorite
  const handleToggleFavorite = (e: React.MouseEvent, propertyId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Dodajemo klasu za animaciju na srce
    const heartIcon = e.currentTarget.querySelector('svg');
    if (heartIcon) {
      heartIcon.classList.add('favorite-animation');
      // Uklanjamo klasu nakon što se animacija završi
      setTimeout(() => {
        heartIcon.classList.remove('favorite-animation');
      }, 600);
    }
    
    toggleFavorite(propertyId);
  };

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    //console.log("Image error:"+t("placeholder-image-path") );
    e.currentTarget.src = t("placeholder-image-path"); // Fallback image
    e.currentTarget.onerror = null; // Prevent infinite error loop
  };

  useEffect(() => {

  }, [loadingCmsData, currentLanguage]);
  
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4">
        <Link to="/properties" className="flex items-center text-gray-800">
          <ChevronLeft className="h-6 w-6 mr-2" />
          <span>{t("button-back")}</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300" 
            onClick={handleShareClick}
            aria-label="Share property"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button 
            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300" 
            onClick={(e) => handleToggleFavorite(e, propertyId)}
            aria-label={isFavorite(propertyId) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 ${isFavorite(propertyId) ? 'text-red-500 fill-red-500' : ''}`} 
            />
          </button>
        </div>
      </div>

      {/* Mobile Gallery - Single image with swipe */}
      <div className="md:hidden w-full h-[300px] md:h-[350px] relative overflow-hidden">
        <div 
          className="h-full w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
        {videoId && currentImageIndex === 0 ? (
          //<div className="h-full w-full bg-black flex items-center justify-center">

            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
              className="w-full h-full"
              allowFullScreen
              title={propertyTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            
          //</div>
        ) : (  
            <img
              src={safeImages[videoId ? currentImageIndex - 1 : currentImageIndex]}
              alt={`Property view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onClick={() => setIndex(videoId ? currentImageIndex - 1 : currentImageIndex)}
              onError={handleImageError}
            />
        )}
          {(videoId ? safeImages.length + 1 : safeImages.length) > 1 && (
              <>
                {/* Navigation Controls */}
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="h-5 w-5 text-primary-dark-blue" />
                </button>
                
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="h-5 w-5 text-primary-dark-blue" />
                </button>
                
                {/* Image indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-custom-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {videoId ? safeImages.length + 1 : safeImages.length}
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
            {/* Main large image - Video or Image */}
            <div 
              className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden group"
              //onClick={() => videoId ? window.open(video?.link, '_blank') : setIndex(0)}
            >
              {videoId ? (
                <div className="w-full h-full relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                    title={propertyTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                  {/* <div className="absolute inset-0 bg-custom-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" /> */}
                </div>
              ) : (
                <>
                  <img
                    src={safeImages[0]}
                    alt="Main property view"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-custom-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </>
              )}
            </div>

            {/* Right side thumbnails */}
            {safeImages.slice(videoId ? 0 : 1, videoId ? 4 : 5).map((image, idx) => (
              <div 
                key={idx}
                className="relative cursor-pointer overflow-hidden group"
                onClick={() => setIndex(videoId ? idx : idx + 1)}
              >
                <img
                  src={image}
                  alt={`Property view ${idx + 2}`}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-custom-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                
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
            {videoId && currentImageIndex === 0 ? (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                  className="w-full h-full"
                  allowFullScreen
                  title={propertyTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            ) : (
              <img
                src={safeImages[videoId ? currentImageIndex - 1 : currentImageIndex]}
                alt={`Property view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onClick={() => setIndex(videoId ? currentImageIndex - 1 : currentImageIndex)}
                onError={handleImageError}
              />
            )}
            
            {(videoId ? safeImages.length + 1 : safeImages.length) > 1 && (
              <>
                {/* Navigation Controls */}
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className="h-6 w-6 text-primary-dark-blue" />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className="h-6 w-6 text-primary-dark-blue" />
                </button>
                
                {/* Image indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-custom-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {videoId ? safeImages.length + 1 : safeImages.length}
                </div>
              </>
            )}
          </div>
        )}

        {/* Share and Like buttons - desktop */}
        <div className="hidden md:flex absolute top-4 left-4 space-x-2">
          <Link 
            to="/properties" 
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            aria-label="Back to properties"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>
        <div className="hidden md:flex absolute top-4 right-4 space-x-2">
          
          <button 
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            onClick={handleShareClick}
            aria-label="Share property"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button 
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors group"
            onClick={(e) => handleToggleFavorite(e, propertyId)}
            aria-label={isFavorite(propertyId) ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              className={`h-5 w-5 transition-colors duration-300 ${
                isFavorite(propertyId) 
                  ? 'text-red-500 fill-red-500' 
                  : 'group-hover:text-red-500'
              }`} 
            />
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
      />

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        sendUrl={currentUrl}
        title={propertyTitle}
      />
    </>
  )
}

