import React, { useState, useEffect } from "react";
import { X, Facebook, Twitter, Mail, Copy, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { useCmsData } from "../../services/CmsProvider";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sendUrl?: string;
  title: string;
  description: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, sendUrl, title, description }) => {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState('');
  const { t } = useCmsData();

  useEffect(() => {
    setUrl(sendUrl || window.location.href);
  }, [sendUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${title}&body=${makeEmailBody()} `;  
        break;
      case 'instagram':
        // Instagram nema direktan URL za deljenje, pa ćemo kopirati link
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      default:
        break;
    }

    window.open(shareUrl, '_blank');
  };

  const makeEmailBody = () => {
    return `<p>Pogledajte ovu nekretninu na linku:</p><a href=${url}> ${title}</a><p> ${description} </p>`;
  };  

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          {/* Overlay - blokira klik na pozadini */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative z-[10000]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary-blue">{t('share-title')}</h2>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            {/* Copy link section */}
            <div className="mb-6">
              <div className="flex items-center">
                <input 
                  type="text" 
                  readOnly 
                  value={url} 
                  className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-blue"
                />
                <button 
                  onClick={handleCopyLink}
                  className="bg-primary-blue text-white py-2 px-4 rounded-r-md hover:bg-primary-dark-blue transition-colors flex items-center"
                >
                  {copied ? (
                    <span className="text-sm">{t('share-copied')}</span>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      <span className="text-sm">{t('share-copy-link')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {/* Share buttons */}
            <div>
              <div className="flex justify-between px-6">
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-transform hover:-translate-y-1"
                  aria-label={t('share-facebook')}
                >
                  <Facebook className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-sky-500 text-white hover:bg-sky-600 transition-transform hover:-translate-y-1"
                  aria-label={t('share-twitter')}
                >
                  <Twitter className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleShare('email')}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-transform hover:-translate-y-1"
                  aria-label={t('share-email')}
                >
                  <Mail className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleShare('instagram')}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 text-white hover:opacity-90 transition-transform hover:-translate-y-1"
                  aria-label={t('share-instagram')}
                >
                  <svg 
                    className="h-5 w-5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal; 