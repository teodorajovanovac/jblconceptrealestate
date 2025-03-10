import { useState, useEffect } from "react"
import { BsEnvelopeFill, BsFillGeoAltFill, BsFillTelephoneFill } from "react-icons/bs"
import { FaFacebookSquare, FaGoogle, FaLinkedin } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa6"
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
    <footer className="bg-primary-blue text-primary-white mt-auto">
      <div className="px-8 py-12">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-2/4 px-4 mb-8 md:mb-0">
            <ReactLogo className="w-52" />
          </div>
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <ul className="space-y-2">
              {footerLinks.map((item) => (
                <li key={item.link}>
                  <Link 
                    to={item.link} 
                    className="hover:text-menu-hover transition-colors"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {item.caption}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <div className="space-y-4">
              <a
                className="flex items-start space-x-2 hover:text-menu-hover transition-colors"
                href="https://maps.app.goo.gl/1U59uo5KpuqW3RMk7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsFillGeoAltFill className="text-primary-gold mt-1" />
                <div>
                  <p className="font-semibold">CONCEPT REAL ESTATE doo Beograd</p>
                  <p>{language === 'sr' ? 'Majke Jevrosime 47, 11000 Beograd' : 'Majke Jevrosime 47, 11000 Belgrade'}</p>
                </div>
              </a>
              <a
                className="flex items-center space-x-2 hover:text-menu-hover transition-colors"
                href="mailto:jasnabajiclg@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsEnvelopeFill className="text-primary-gold" />
                <p>jasnabajiclg@gmail.com</p>
              </a>
              <a
                className="flex items-center space-x-2 hover:text-menu-hover transition-colors"
                href="tel:+1234567890"
              >
                <BsFillTelephoneFill className="text-primary-gold" />
                <p>+381 61 2299988</p>
              </a>
              <a
                className="flex items-center space-x-2 hover:text-menu-hover transition-colors"
                href="tel:+1234567890"
              >
                <BsFillTelephoneFill className="text-primary-gold" />
                <p>+381 61 2299988</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-blue">
        <div className="px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-4">
            <div className="flex space-x-4">
              <a
                className="text-2xl hover:text-menu-hover transition-colors"
                href="https://www.instagram.com/realestateconcept.jbl/?api=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                className="text-2xl hover:text-menu-hover transition-colors"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
              <a
                className="text-2xl hover:text-menu-hover transition-colors"
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGoogle />
              </a>
              <a
                className="text-2xl hover:text-menu-hover transition-colors"
                href="https://rs.linkedin.com/in/jasna-baji%C4%87-ljubi%C4%8Di%C4%87-5176b534"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="text-base md:text-lg font-medium">
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