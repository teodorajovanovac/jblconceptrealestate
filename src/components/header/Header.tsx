import React, { useState, useEffect } from "react"
import menuData from "../../assets/data/menu.json"
import { useCmsData } from "../../services/CmsProvider"
import { Link, NavLink, useLocation } from "react-router-dom"

const Header: React.FC = () => {
  const { changeLanguage, currentLanguage } = useCmsData();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHomePage, setIsHomePage] = useState(false)
  const location = useLocation()
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "sr" ? "en" : "sr";
    changeLanguage(newLanguage);
  }

  // Filter menu items based on current language and sort by order
  const menuItems = menuData
    .filter((item) => item.lang === currentLanguage && item.category === "nav")
    .sort((a, b) => a.order - b.order)

  useEffect(() => {
    // Detektuj da li je trenutna stranica početna
    setIsHomePage(location.pathname === "/" || location.pathname === "/landing");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [location.pathname])

  // Odredi boju teksta na osnovu stranice i skrola
  const getTextColorClass = () => {
    if (isScrolled) {
      return "bg-primary-dark-blue text-primary-white";
    } else if (isHomePage) {
      return "bg-transparent text-white";
    } else {
      return "bg-transparent text-primary-dark-blue";
    }
  }

  // Odredi hover boju na osnovu stranice i skrola
  const getHoverColorClass = () => {
    if (isScrolled) {
      return "hover:text-menu-hover";
    } else if (isHomePage) {
      return "hover:text-gray-300";
    } else {
      return "hover:text-primary-light-blue";
    }
  }

  // Odredi boju linije ispod linkova
  const getUnderlineColorClass = () => {
    if (isScrolled) {
      return "bg-menu-hover";
    } else if (isHomePage) {
      return "bg-gray-300";
    } else {
      return "bg-primary-light-blue";
    }
  }

  // Логика за приказ логоа
  const renderLogo = () => {
    // На почетној страни када није скроловано, не приказујемо лого
    if (isHomePage && !isScrolled) {
      return null;
    }
    // Када је навбар плав (скроловано), користимо златни лого
    if (isScrolled) {
      return <img src="/assets/jbl_log_gold_hr.svg" alt="JBL Logo" className="h-8 md:h-10" />;
    }
    // На осталим страницама са транспарентним навбаром, користимо тамни лого
    return <img src="/assets/jbl_log_dark_hr.svg" alt="JBL Logo" className="h-8 md:h-10" />;
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 ${
        getTextColorClass()
      }`}
    >
      <div className="w-full flex items-center justify-between py-3 md:py-4">
        {/* Лого уз леву ивицу */}
        <div className="ml-4 md:ml-8">
          <Link to="/" className="flex items-center">
            {renderLogo()}
          </Link>
        </div>

        {/* Десктоп навигација скроз десно */}
        <div className="hidden md:block mr-4 md:mr-8">
          <div className="flex items-center">
            <nav>
            {menuItems.map((item) => (
              <NavLink 
                key={item.link}
                to={item.link}
                className={`relative mx-3 group transition-colors text-[1.1em] ${getHoverColorClass()}`}
              >
                <span className="relative">
                  {item.caption}
                  <span className={`absolute bottom-[-2px] left-0 w-0 h-[1px] ${getUnderlineColorClass()} origin-left transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:origin-left group-hover:transition-all`}></span>
                </span>
              </NavLink >
            ))}
            </nav>
            <button 
              onClick={toggleLanguage} 
              className={`relative transition-colors mx-3 group text-[1.1em] ${getHoverColorClass()}`}
            >
              <span className="relative">
                {currentLanguage === "sr" ? "EN" : "SR"}
                <span className={`absolute bottom-[-2px] left-0 w-0 h-[1px] ${getUnderlineColorClass()} origin-left transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:origin-left group-hover:transition-all`}></span>
              </span>
            </button>
          </div>
        </div>

        {/* Бургер мени дугме на мобилним уређајима */}
        <button
          className="md:hidden mr-4 w-10 h-10 relative focus:outline-none z-30"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                isMenuOpen 
                  ? "rotate-45 bg-white"
                  : `-translate-y-1.5 ${isScrolled || !isHomePage ? "bg-current" : "bg-white"}`
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                isMenuOpen 
                  ? "opacity-0 bg-white"
                  : `${isScrolled || !isHomePage ? "bg-current" : "bg-white"}`
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                isMenuOpen 
                  ? "-rotate-45 bg-white"
                  : `translate-y-1.5 ${isScrolled || !isHomePage ? "bg-current" : "bg-white"}`
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 left-0 w-full h-screen bg-primary-dark-blue text-primary-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="w-full px-8 py-20">
          <ul className="flex flex-col space-y-6 text-2xl">
            {menuItems.map((item) => (
              <li key={item.link}>
                <Link
                  to={item.link}
                  className="hover:text-gold transition-colors text-[1.1em] md:text-[2.2em]"
                  onClick={toggleMenu}
                >
                  {item.caption}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  toggleLanguage()
                  toggleMenu()
                }}
                className="hover:text-gold transition-colors text-[1.1em] md:text-[2.2em]"
              >
                {currentLanguage === "sr" ? "EN" : "SR"}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header

