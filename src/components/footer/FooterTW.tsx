import { useState, useEffect } from "react"
import { BsEnvelopeFill, BsFillGeoAltFill, BsFillTelephoneFill } from "react-icons/bs"
import { FaFacebookSquare, FaInstagram, FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa"
import { IoDocumentTextOutline } from "react-icons/io5"
import { FaRegQuestionCircle } from "react-icons/fa"
import { MdOutlineInfo } from "react-icons/md"
import ReactLogo from "../../assets/jblgold.svg"
import menuData from "../../assets/data/menu.json"
import { Link } from "react-router-dom"
import { Instagram, Facebook, Twitter, Linkedin, Phone } from "lucide-react"
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

const Footer = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr');

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'sr');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const footerLinks = menuData
    .filter((item) => item.lang === language && item.category === "footer")
    .sort((a, b) => a.order - b.order);

  return (
    <footer className="bg-[#0A0F1C] text-white w-full">
      <div className="w-full">
        <div className="flex flex-col md:flex-row">
          {/* Logo Section */}
          <div className="w-full md:w-1/3 p-8 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center mb-4">
              <ReactLogo className="w-full max-w-[220px]" />
            </div>
            <p className="text-base text-center text-gray-400">
              {language === 'sr' 
                ? 'Ekskluzivni agent za prodaju i iznajmljivanje luksuznih nekretnina u Beogradu i Srbiji' 
                : 'Exclusive agent for sale and rent of luxury properties in Belgrade and Serbia'}
            </p>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-8">
            {/* Quick Links Column */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Brzi linkovi</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/pricing" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <FileText size={18} />
                    Cenovnik
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Briefcase size={18} />
                    Usluge
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <ScrollText size={18} />
                    Opšti uslovi poslovanja
                  </Link>
                </li>
              </ul>
            </div>

            {/* Documents Column */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Dokumenti</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/privacy-policy" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Shield size={18} />
                    Politika privatnosti
                  </Link>
                </li>
                <li>
                  <Link to="/terms-of-use" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <ScrollText size={18} />
                    Uslovi korišćenja
                  </Link>
                </li>
                <li>
                  <Link to="/info" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Info size={18} />
                    Info
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <HelpCircle size={18} />
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://www.google.com/maps/place/Мајке+Јевросиме+47,+Београд/@44.8146524,20.4641472,20.02z/data=!4m6!3m5!1s0x475a7ab1c9677c5f:0xea099311df32f4ce!8m2!3d44.8145671!4d20.4644988!16s%2Fg%2F11dzpqhx8p?hl=sr&entry=ttu&g_ep=EgoyMDI1MDMxNi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-gold group flex justify-center md:justify-start"
                  >
                    <div className="flex items-start gap-3 text-center md:text-left">
                      <MapPin size={18} className="flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-base">CONCEPT REAL ESTATE doo Beograd</div>
                        <div className="text-base text-gray-400">Majke Jevrosime 47, Beograd, Srbija</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:office@jblconcept.rs" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Mail size={18} />
                    office@jblconcept.rs
                  </a>
                </li>
                <li>
                  <a href="tel:+381618027377" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Phone size={18} />
                    +381 66 80 27 377
                  </a>
                </li>
                <li>
                  <a href="tel:+381612299988" className="hover:text-primary-gold flex items-center gap-2 text-base justify-center md:justify-start">
                    <Phone size={18} />
                    +381 61 22 999 88
                  </a>
                </li>
              </ul>

              {/* Social Media Links */}
              <div className="mt-6">
                <h4 className="text-base font-semibold mb-4">Pratite nas</h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a href="https://www.instagram.com/realestateconcept.jbl/" 
                     target="_blank"
                     rel="noopener noreferrer"
                     className="hover:text-primary-gold hover:scale-110 transition-all">
                    <Instagram size={22} />
                  </a>
                  <a href="#" className="hover:text-primary-gold hover:scale-110 transition-all">
                    <Facebook size={22} />
                  </a>
                  <a href="#" className="hover:text-primary-gold hover:scale-110 transition-all">
                    <FaTiktok size={20} />
                  </a>
                  <a href="#" className="hover:text-primary-gold hover:scale-110 transition-all">
                    <Twitter size={22} />
                  </a>
                  <a href="#" className="hover:text-primary-gold hover:scale-110 transition-all">
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
              © 2025 JBL Concept. Sva prava zadržana.
            </p>
            <p className="text-sm text-gray-500 opacity-60">
              Dizajn i izrada <a 
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
    </footer>
  )
}

export default Footer