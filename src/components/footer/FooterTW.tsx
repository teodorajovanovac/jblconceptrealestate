import { useState, useEffect } from "react"
import { BsEnvelopeFill, BsFillGeoAltFill, BsFillTelephoneFill } from "react-icons/bs"
import { FaFacebookSquare, FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa"
import { IoDocumentTextOutline } from "react-icons/io5"
import { FaRegQuestionCircle } from "react-icons/fa"
import { MdOutlineInfo } from "react-icons/md"
import ReactLogo from "../../assets/jblgold.svg"
import menuData from "../../assets/data/menu.json"
import { Link } from "react-router-dom"
import { Instagram, Facebook, Twitter, Linkedin, Phone, Search } from "lucide-react"
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
import PropertySearch from "../property/PropertySearch"

const Footer = () => {
  const { t, currentLanguage } = useCmsData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // useEffect(() => {
  //   const handleLanguageChange = () => {
  //     // Ova funkcija se poziva kad se promeni jezik
  //   };

  //   window.addEventListener('languageChange', handleLanguageChange);
  //   return () => window.removeEventListener('languageChange', handleLanguageChange);
  // }, []);

  const footerLinks = menuData
    .filter((item) => item.lang === currentLanguage && item.category === "footer")
    .sort((a, b) => a.order - b.order);

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
                {/* <li>
                  <Link to="/#faq" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <HelpCircle size={18} />
                    {t("footer-faq")}
                  </Link>
                </li> */}
                <li>
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="w-full hover:text-gold flex gap-2 text-base  md:justify-start text-left"
                  >
                    <Search size={18} />
                    {t("action-buttons-search")}
                  </button>
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
                  {/* <Link to="/privacy-policy" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Shield size={18} />
                    {t("footer-privacy-policy")}
                  </Link> */}
                </li>
                {/*<li>
                  <Link to="/terms-of-use#top" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <ScrollText size={18} />
                    {t("footer-terms-of-use")}
                  </Link>
                </li>*/}
                {/*<li>
                  <Link to="/info#top" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Info size={18} />
                    {t("footer-info")}
                  </Link>
                </li>*/}
                <li>
                  <a href="/Ugovor o posredovanju_dvojezični_CONCEPT (1).pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
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
                    href="https://www.google.com/maps/place/Мајке+Јевросиме+47,+Београд/@44.8146524,20.4641472,20.02z/data=!4m6!3m5!1s0x475a7ab1c9677c5f:0xea099311df32f4ce!8m2!3d44.8145671!4d20.4644988!16s%2Fg%2F11dzpqhx8p?hl=sr&entry=ttu&g_ep=EgoyMDI1MDMxNi4wIKXMDSoASAFQAw%3D%3D"
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
                  <a href="mailto:office@jblconcept.rs" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Mail size={18} />
                    office@jblconcept.rs
                  </a>
                </li>
                <li>
                  <a href="tel:+381618027377" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Phone size={18} />
                    +381 66 80 27 377
                  </a>
                </li>
                <li>
                  <a href="tel:+381612299988" className="hover:text-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Phone size={18} />
                    +381 61 22 999 88
                  </a>
                </li>
              </ul>

              {/* Social Media Links */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">{t("footer-follow-us")}</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="https://www.instagram.com/realestateconcept.jbl/" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:text-gold hover:scale-110 transition-all">
                    <Instagram size={22} />
                  </a>
                  {/*<a href="#" className="hover:text-gold hover:scale-110 transition-all">
                    <Facebook size={22} />
                  </a>*/}
                  <a href="https://www.tiktok.com/@realestate_concept" className="hover:text-gold hover:scale-110 transition-all">
                    <FaTiktok size={20} />
                  </a>
                  {/*<a href="#" className="hover:text-gold hover:scale-110 transition-all">
                    <Twitter size={22} />
                  </a>*/}
                  <a href="https://www.linkedin.com/in/jasna-baji%C4%87-ljubi%C4%8Di%C4%87-5176b534/" className="hover:text-gold hover:scale-110 transition-all">
                    <Linkedin size={22} />
                  </a>
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
                href="https://ajsasoft.com" 
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
      <PropertySearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </footer>
  )
}

export default Footer