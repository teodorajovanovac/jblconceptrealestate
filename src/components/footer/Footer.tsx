import ReactLogo from "../../assets/jblgold.svg"
import menuData from "../../assets/data/menu.json"
import { Link } from "react-router-dom"
import { FaTiktok } from "react-icons/fa"
import { Instagram, Facebook, Twitter, Linkedin, Phone, Search, Youtube } from "lucide-react"
import { 
  FileText, 
  Briefcase, 
  ScrollText, 
  Info, 
  Shield, 
  HelpCircle, 
  MapPin, 
  Mail 
} from "lucide-react"
import { useCmsData } from "../../services/CmsProvider"
import { useEffect, useState } from "react"

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  tiktok?: string;
  twitter?: string;
  pinterest?: string;
  googlelocation?: string;
}


const Footer = () => {
  const { t, currentLanguage } = useCmsData();
  const [socialLinksData, setSocialLinksData] = useState<SocialLinks>({});
  const [companyPhones, setcompanyPhones] = useState<string[]>([]);


  useEffect(() => {
    const response = t("company-socials","object") as SocialLinks;
    setSocialLinksData(response);

    const responsePhones = t("company-phones","object") as {phone:string[]};
    setcompanyPhones(responsePhones.phone)  

  },[t, currentLanguage])

  return (
    <footer className="bg-primary-dark-blue text-white w-full">
      <div className="w-full">
        <div className="flex flex-col md:flex-row">
          {/* Logo Section */}
          <div className="w-full md:w-1/3 p-8 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center mb-4">
              <ReactLogo className="w-full max-w-[220px]" />
            </div>
            <p className="text-base text-center text-gray-400">
              {t("footer-tagline")}
            </p>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-8">
            {/* Quick Links Column */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">{t("footer-quick-links")}</h3>
              <ul className="space-y-3">
                <li>
                  
                </li>
                <li>
                  <Link to="/service" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Briefcase size={18} />
                    {t("footer-services")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Documents Column */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">{t("footer-documents")}</h3>
              <ul className="space-y-3">
              <li>
                  <Link to="/pricing" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <FileText size={18} />
                    {t("footer-pricing")}
                  </Link>
            </li>
            <li>
                  <Link to="/terms" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <ScrollText size={18} />
                    {t("footer-terms")}
                  </Link>
                </li>
                <li>
                  
                  <a href="/documents/contract.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <FileText size={18} />
                    {t("footer-agreement")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">{t("footer-contact")}</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={socialLinksData.googlelocation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold group flex justify-center md:justify-start"
                  >
                    <div className="flex items-start gap-3 text-center md:text-left">
                      <MapPin size={18} className="flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-base">{t("footer-company-name")}</div>
                        <div className="text-base text-gray-400">{t("footer-company-address")}</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${t("company-email")}`} className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Mail size={18} />
                    {t("company-email")}
                  </a>
                </li>

                {companyPhones?.length > 0 && (
                  companyPhones.map((phone, index) => (
                    <li key={index}>
                      <a 
                        href={`tel:${phone}`} 
                        className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start"
                      >
                      <Phone size={18} />
                      {phone}
                      </a>
                    </li>
                  ))
                )}
                <li>
                  <p className="text-base text-gray-400">{t("footer-company-regnumber")}</p>
                </li>
              </ul>

              {/* Social Media Links */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">{t("footer-follow-us")}</h4>
                
                  <div className="flex justify-center md:justify-start space-x-4">
                    {socialLinksData.instagram && (
                      <a href={socialLinksData.instagram} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold hover:scale-110 transition-all">
                        <Instagram size={22} />
                      </a>
                    )}
                    {socialLinksData.facebook && (
                      <a href={socialLinksData.facebook} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold hover:scale-110 transition-all">
                        <Facebook size={22} />
                      </a>
                    )}
                    {socialLinksData.tiktok && (
                      <a href={socialLinksData.tiktok} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold hover:scale-110 transition-all">
                        <FaTiktok size={20} />
                      </a>
                    )}
                      {socialLinksData.linkedin && (
                      <a href={socialLinksData.linkedin} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold hover:scale-110 transition-all">
                        <Linkedin size={22} />
                      </a>
                    )}
                      {socialLinksData.twitter && (
                      <a href={socialLinksData.twitter} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold hover:scale-110 transition-all">
                        <Twitter size={22} />
                      </a>
                      )}
                    {socialLinksData.youtube && (
                      <a 
                        href={socialLinksData.youtube} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold hover:scale-110 transition-all"
                        aria-label="YouTube Channel"
                      >
                        <Youtube size={22} />
                      </a>
                    )}
                  </div>
                
                
                
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-0">
          <div className="w-full px-4 py-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-base text-gray-400 mb-2 md:mb-0">
              {t("footer-copyright")}
            </p>
            <p className="text-sm text-gray-500 opacity-60">
              {t("footer-design-by")} <a 
                href="https://ajsasoft.rs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                AjsaSoft
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Property Search Drawer Component */}
      {/* <PropertySearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} /> */}
    </footer>
  )
}

export default Footer