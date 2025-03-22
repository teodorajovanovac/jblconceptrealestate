import React, { useState, useEffect } from "react";
import { X, Copy, Facebook, Twitter, Mail, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
    });
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      bgColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      bgColor: "bg-sky-500",
      hoverColor: "hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      bgColor: "bg-gray-600",
      hoverColor: "hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this property: ${url}`)}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-auto overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Podelite nekretninu</h3>
              <button 
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-4 space-y-4">
              {/* Copy Link Section */}
              <div className="relative flex items-center space-x-2 border rounded-lg bg-gray-50 p-2">
                <LinkIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-700 flex-1">
                  {url}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="rounded-lg px-3 py-1 bg-primary-blue text-white hover:bg-primary-blue/90 transition-colors text-sm flex items-center"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {isCopied ? "Kopirano!" : "Kopiraj"}
                </button>
              </div>
              
              {/* Social Share Options */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Podeli na:</p>
                <div className="grid grid-cols-3 gap-2">
                  {shareOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${option.bgColor} ${option.hoverColor} text-white rounded-lg py-2 px-3 flex items-center justify-center transition-colors`}
                    >
                      {option.icon}
                      <span className="ml-2 text-sm">{option.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal; 