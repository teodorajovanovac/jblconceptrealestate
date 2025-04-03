import { Youtube } from "lucide-react";
import { useCmsData } from "../../services/CmsProvider";

const Footer: React.FC = () => {
  const { cmsData } = useCmsData();
  
  return (
    <footer className="bg-primary-blue text-white py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Existing social media links */}
          
          {/* YouTube Link - New addition */}
          <a 
            href="https://www.youtube.com/@conceptrealestatebeograd" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-primary-gold transition-colors"
            aria-label="YouTube Channel"
          >
            <Youtube className="w-6 h-6" />
          </a>
          
          {/* Other social links from cmsData */}
          {cmsData && cmsData["company-socials"] && cmsData["company-socials"].instagram && (
            <a 
              href={cmsData["company-socials"].instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary-gold transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-6 h-6" />
            </a>
          )}
          
          {/* Add other social media links similarly */}
        </div>
        
        {/* ... rest of the footer content */}
      </div>
    </footer>
  );
};

export default Footer; 