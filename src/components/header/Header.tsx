import { useState, useEffect } from "react"
import ReactLogo from "../../assets/jblgold.svg"
import menuData from "../../assets/data/menu.json"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [language, setLanguage] = useState(localStorage.getItem('language') || "sr")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLanguage = () => {
    const newLanguage = language === "sr" ? "en" : "sr";
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    // Dispatch custom event
    window.dispatchEvent(new Event('languageChange'));
  }

  // Filter menu items based on current language and sort by order
  const menuItems = menuData
    .filter((item) => item.lang === language && item.category === "nav")
    .sort((a, b) => a.order - b.order)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "bg-primary-blue text-primary-white" : "bg-transparent text-secondary-blue"
      }`}
    >
      <div className="w-full px-8 py-2 flex justify-between items-center">
        <a href="/" className="z-30">
          <ReactLogo className="w-24 h-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          {menuItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className={`relative transition-colors px-4 group ${
                isScrolled 
                  ? "hover:text-menu-hover" 
                  : "hover:text-menu-hover-dark"
              }`}
            >
              <span className="relative">
                {item.caption}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-current origin-left transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:origin-left group-hover:transition-all"></span>
              </span>
            </a>
          ))}
          <button 
            onClick={toggleLanguage} 
            className={`relative transition-colors px-4 group ${
              isScrolled 
                ? "hover:text-menu-hover" 
                : "hover:text-menu-hover-dark"
            }`}
          >
            <span className="relative">
              {language === "sr" ? "EN" : "SR"}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-current origin-left transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:origin-left group-hover:transition-all"></span>
            </span>
          </button>
        </nav>

        {/* Burger Menu Button */}
        <button
          className="md:hidden w-10 h-10 relative focus:outline-none z-30"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                isMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                isMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`fixed top-0 left-0 w-full h-screen bg-primary-blue text-primary-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="w-full px-8 py-20">
          <ul className="flex flex-col space-y-6 text-2xl">
            {menuItems.map((item) => (
              <li key={item.link}>
                <a
                  href={item.link}
                  className="hover:text-primary-gold transition-colors"
                  onClick={toggleMenu}
                >
                  {item.caption}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  toggleLanguage()
                  toggleMenu()
                }}
                className="hover:text-primary-gold transition-colors"
              >
                {language === "sr" ? "EN" : "SR"}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header

