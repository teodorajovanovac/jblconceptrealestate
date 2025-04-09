import React, { useState, useEffect } from "react";
import { Mail, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCmsData } from "../../services/CmsProvider";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon
} from "react-share";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  sendUrl?: string;
  title?: string;
  description?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, sendUrl, title, description }) => {
  const { t, currentLanguage } = useCmsData();
  const [copied, setCopied] = useState(false);
  const [copiedApp, setCopiedApp] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Set the URL to use for sharing
    setUrl(sendUrl || window.location.href);
    
    // Reset copy status when modal opens
    setCopied(false);
    setCopiedApp('');
  }, [isOpen, sendUrl]);

  // Handle for copying link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setCopiedApp('');
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setCopiedApp(platform);
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopied(false);
        setCopiedApp('');
      }, 3000);
    });
  };

  const makeEmailBody = () => {
    const propertyTitle = title || t('share-property-title') || "Property listing";
    const propertyDesc = description || '';
    
    // Use a default message if translation is missing
    const emailIntro = t('share-email-check-out') !== "share-email-check-out" 
      ? t('share-email-check-out') 
      : "Pogledaj ovu nekretninu:";
    
    return `${emailIntro}\n${url}\n\n${propertyTitle}${propertyDesc ? '\n\n' + propertyDesc : ''}`;
  };

  const handleEmailShare = () => {
    const propertyTitle = title || t('share-property-title') || "Property listing";
    const emailBody = makeEmailBody();
    
    // Create the mailto link
    const mailtoLink = `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open the link in a new window/tab to avoid interrupting the current page
    window.open(mailtoLink, '_blank');
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
                {/* Facebook share button */}
                <FacebookShareButton
                  url={url}
                  hashtag="#realestate"
                  className="transition-transform hover:-translate-y-1"
                >
                  <FacebookIcon size={48} round />
                </FacebookShareButton>
                
                {/* WhatsApp share button (replacing Instagram) */}
                <WhatsappShareButton
                  url={url}
                  title={`${title || t('share-property-title')}${description ? ': ' + description : ''}`}
                  separator=" - "
                  className="transition-transform hover:-translate-y-1"
                >
                  <WhatsappIcon size={48} round />
                </WhatsappShareButton>
                
                {/* Email share button */}
                <button
                  onClick={handleEmailShare}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition-transform hover:-translate-y-1"
                  aria-label={t('share-email') || "Share via Email"}
                >
                  <Mail className="h-5 w-5" />
                </button>
                
                {/* Viber share button */}
                <ViberShareButton
                  url={url}
                  title={`${title || t('share-property-title')}${description ? ': ' + description : ''}`}
                  className="transition-transform hover:-translate-y-1"
                >
                  <ViberIcon size={48} round />
                </ViberShareButton>
              </div>
              
              {/* Copy notification toast */}
              <AnimatePresence>
                {copied && copiedApp && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-4 bg-green-100 text-green-800 p-3 rounded-md text-center text-sm"
                  >
                    {t('share-copied-to-clipboard') || "Link copied to clipboard!"} 
                    {t('share-paste-into') || "Now paste into"} {copiedApp}.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal; 