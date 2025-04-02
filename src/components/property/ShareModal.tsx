import React, { useState, useEffect } from "react";
import { Facebook, Mail, Copy, Share2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCmsData } from "../../services/CmsProvider";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sendUrl?: string;
  title?: string;
  description?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, sendUrl, title, description }) => {
  const [copied, setCopied] = useState(false);
  const [copiedApp, setCopiedApp] = useState("");
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

  const copyToClipboard = (text: string, app: string) => {
    navigator.clipboard.writeText(text);
    setCopiedApp(app);
    
    // Show toast
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setCopiedApp("");
    }, 2000);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    const propertyTitle = title || t('share-property-title') || "Property listing";
    const propertyDesc = description || '';
    const shareMessage = `${propertyTitle}${propertyDesc ? ': ' + propertyDesc : ''}\n${url}`;
    
    // Always copy the message to clipboard first for convenience
    copyToClipboard(shareMessage, platform);
    
    switch (platform) {
      case 'facebook':
        // Facebook sharing URL - properly encoded
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareMessage)}`;
        window.open(shareUrl, '_blank');
        break;
        
      case 'viber':
        // Try to open Viber app using deep link
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          // Mobile - use deep link
          window.location.href = `viber://forward?text=${encodeURIComponent(shareMessage)}`;
        } else {
          // Desktop - try to use direct chat URL
          window.open(`viber://chat?text=${encodeURIComponent(shareMessage)}`, '_blank');
          // Also open Viber web as fallback
          setTimeout(() => {
            window.open('https://account.viber.com/en/', '_blank');
          }, 500);
        }
        break;
        
      case 'instagram':
        // Instagram doesn't support direct link sharing, 
        // so we can only open the app and rely on clipboard
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          window.location.href = 'instagram://camera';
        } else {
          window.open('https://www.instagram.com/direct/inbox/', '_blank');
        }
        break;
        
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(makeEmailBody())}`;
        window.open(shareUrl, '_blank');
        break;
        
      default:
        break;
    }
  };

  const makeEmailBody = () => {
    const propertyTitle = title || t('share-property-title') || "Property listing";
    const propertyDesc = description || '';
    
    // Use a default message if translation is missing
    const emailIntro = t('share-email-check-out') !== "share-email-check-out" 
      ? t('share-email-check-out') 
      : "Proverite ovu nekretninu:";
    
    return `${emailIntro}\n${url}\n\n${propertyTitle}${propertyDesc ? '\n\n' + propertyDesc : ''}`;
  };  

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          {/* Overlay */}
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
                <span className="h-5 w-5 text-gray-500 font-bold">✕</span>
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
                  {copied && !copiedApp ? (
                    <span className="text-sm">{t('share-copied') || "Copied!"}</span>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      <span className="text-sm">{t('share-copy-link') || "Copy link"}</span>
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
                  aria-label={t('share-facebook') || "Share on Facebook"}
                >
                  <Facebook className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleShare('viber')}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-600 text-white hover:bg-purple-700 transition-transform hover:-translate-y-1"
                  aria-label={t('share-viber') || "Share on Viber"}
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleShare('email')}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-transform hover:-translate-y-1"
                  aria-label={t('share-email') || "Share via Email"}
                >
                  <Mail className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => handleShare('instagram')}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 text-white hover:opacity-90 transition-transform hover:-translate-y-1"
                  aria-label={t('share-instagram') || "Share on Instagram"}
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
              
              {/* Copy notification toast */}
              {copied && copiedApp && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-2 bg-green-100 text-green-800 rounded-md text-center"
                >
                  {copiedApp === 'instagram' 
                    ? (t('share-instagram-copy') || "Content copied! Paste in Instagram to share") 
                    : copiedApp === 'viber'
                    ? (t('share-viber-copy') || "Content copied! Paste in Viber to share")
                    : (t('share-copied') || "Content copied to clipboard!")}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal; 