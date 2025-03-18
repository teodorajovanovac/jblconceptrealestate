import { useState, useEffect } from "react"
import { BsEnvelopeFill, BsFillGeoAltFill, BsFillTelephoneFill } from "react-icons/bs"
import { FaFacebookSquare, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { IoDocumentTextOutline } from "react-icons/io5"
import { FaRegQuestionCircle } from "react-icons/fa"
import { MdOutlineInfo } from "react-icons/md"
import ReactLogo from "../../assets/jblgold.svg"
import menuData from "../../assets/data/menu.json"
import { Link } from "react-router-dom"

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
    <footer className="bg-primary-blue text-primary-white">
      {/* Glavni deo footera */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo i tekst */}
          <div className="md:col-span-1">
            <ReactLogo className="w-40 mb-4" />
            <p className="text-sm">
              {language === 'sr' 
                ? 'Ekskluzivni agent za prodaju i iznajmljivanje luksuznih nekretnina u Beogradu i Srbiji' 
                : 'Exclusive agent for sale and rent of luxury properties in Belgrade and Serbia'}
            </p>
          </div>

          {/* Brzi linkovi */}
          <div className="md:col-span-1">
            <h3 className="text-base font-bold mb-4">
              {language === 'sr' ? 'Brzi linkovi' : 'Quick links'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((item) => (
                <li key={item.link}>
                  <Link 
                    to={item.link} 
                    className="text-sm hover:text-menu-hover transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    • {item.caption}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dokumenti */}
          <div className="md:col-span-1">
            <h3 className="text-base font-bold mb-4">
              {language === 'sr' ? 'Dokumenti' : 'Documents'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="flex items-center text-sm hover:text-menu-hover transition-colors">
                  <IoDocumentTextOutline className="mr-2 text-primary-gold" />
                  {language === 'sr' ? 'Politika privatnosti' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center text-sm hover:text-menu-hover transition-colors">
                  <IoDocumentTextOutline className="mr-2 text-primary-gold" />
                  {language === 'sr' ? 'Uslovi korišćenja' : 'Terms of Use'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center text-sm hover:text-menu-hover transition-colors">
                  <MdOutlineInfo className="mr-2 text-primary-gold" />
                  {language === 'sr' ? 'Info' : 'Info'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center text-sm hover:text-menu-hover transition-colors">
                  <FaRegQuestionCircle className="mr-2 text-primary-gold" />
                  {language === 'sr' ? 'FAQ' : 'FAQ'}
                </Link>
              </li>
            </ul>

            {/* Pratite nas */}
            <div className="mt-6">
              <h3 className="text-base font-bold mb-3">
                {language === 'sr' ? 'Pratite nas' : 'Follow us'}
              </h3>
              <div className="flex space-x-4">
                <a
                  className="text-xl hover:text-menu-hover transition-colors"
                  href="https://www.instagram.com/realestateconcept.jbl/?api=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  className="text-xl hover:text-menu-hover transition-colors"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  className="text-xl hover:text-menu-hover transition-colors"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  className="text-xl hover:text-menu-hover transition-colors"
                  href="https://rs.linkedin.com/in/jasna-baji%C4%87-ljubi%C4%8Di%C4%87-5176b534"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Kontakt */}
          <div className="md:col-span-1">
            <h3 className="text-base font-bold mb-4">
              {language === 'sr' ? 'Kontakt' : 'Contact'}
            </h3>
            <div className="space-y-4">
              <a
                className="flex items-start space-x-2 hover:text-menu-hover transition-colors"
                href="https://maps.app.goo.gl/1U59uo5KpuqW3RMk7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFillGeoAltFill className="text-primary-gold mt-1" />
                <div>
                  <p className="font-semibold text-sm">CONCEPT REAL ESTATE doo Beograd</p>
                  <p className="text-sm">{language === 'sr' ? 'Majke Jevrosime 47, 11000 Beograd' : 'Majke Jevrosime 47, 11000 Belgrade'}</p>
                </div>
              </a>
              <a
                className="flex items-center space-x-2 hover:text-menu-hover transition-colors"
                href="mailto:jasnabajiclg@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsEnvelopeFill className="text-primary-gold" />
                <p className="text-sm">jasnabajiclg@gmail.com</p>
              </a>
              <a
                className="flex items-center space-x-2 hover:text-menu-hover transition-colors"
                href="tel:+38161229998"
              >
                <BsFillTelephoneFill className="text-primary-gold" />
                <p className="text-sm">+381 61 2299988</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer donji deo */}
      <div className="border-t border-secondary-blue">
        <div className="px-6 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs gap-2">
            <div className="text-sm">
              {language === 'sr' ? '© 2025 JBL Concept. Sva prava zadržana.' : '© 2025 JBL Concept. All rights reserved.'}
            </div>
            
            <div className="text-xs opacity-60 transition-opacity flex items-center">
              {language === 'sr' ? 'Dizajn i izrada' : 'Web design & coding by'}
              <a
                className="ml-1 text-primary-gold hover:text-menu-hover"
                href="http://ajsasoft.rs"
                target="_blank"
                rel="noopener noreferrer"
              >
                AjsaSoft
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer