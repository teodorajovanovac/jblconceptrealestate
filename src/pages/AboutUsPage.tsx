import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Header from "../components/header/Header"
import FooterTW from "../components/footer/FooterTW"
import Seo from '../services/meta/Seo'

export default function AboutUsPage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'sr');
    };

    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Jasna Bajić-Ljubičić",
      title: language === 'sr' ? "DIREKTOR" : "DIRECTOR",
      image: "/slike od jasne/jasna close up smile.jpg",
      license: "01499736",
      shortBio: language === 'sr' 
        ? "Stručnost u analizi i rešavanju imovinsko-pravnih pitanja." 
        : "Expertise in analysis and resolving property-legal matters."
    },
    {
      id: 2,
      name: "Maja Počivalšek Lazić",
      title: language === 'sr' ? "ADMINISTRATOR" : "ADMINISTRATOR",
      image: "/slike od jasne/maja close up.jpg",
      license: "01499737",
      shortBio: language === 'sr'
        ? "Harizma, efikasnost i odlučnost u komunikaciji sa klijentima."
        : "Charisma, efficiency and determination in client communication."
    }
  ]

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Seo title={language === 'sr' ? 'O nama' : 'About Us'} />
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-primary-blue mb-12 text-center"
            >
              {language === 'sr' ? 'Naš Tim' : 'Our Team'}
            </motion.h1>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 max-w-4xl mx-auto">
              {teamMembers.map((member) => (
                <motion.div 
                  key={member.id} 
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to={`/about-us/${member.id}`} className="block">
                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-md">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
                        <div className="border border-white px-6 py-2 text-sm tracking-widest text-white">
                          {language === 'sr' ? 'SAZNAJ VIŠE' : 'LEARN MORE'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <h2 className="font-serif text-xl tracking-wide text-primary-blue">{member.name}</h2>
                      <p className="text-sm uppercase tracking-widest text-gray-500">{member.title}</p>
                      <p className="text-sm uppercase tracking-widest text-gray-500">
                        {language === 'sr' ? 'LICENCA' : 'LICENSE'}: {member.license}
                      </p>
                      <p className="font-serif italic text-gray-600 text-sm">{member.shortBio}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterTW />
    </div>
  )
} 