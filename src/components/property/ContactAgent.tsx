import { useState, useEffect } from "react"

interface ContactAgentProps {
  property: Property
}

export default function ContactAgent({ property }: ContactAgentProps) {
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

  const translations = {
    sr: {
      phone: 'Mobilni telefon',
      email: 'Email',
      name: 'Vaše ime',
      yourEmail: 'Vaš email',
      yourPhone: 'Vaš telefon',
      contact: 'Kontaktirajte agenta'
    },
    en: {
      phone: 'Mobile number',
      email: 'Email',
      name: 'Your name',
      yourEmail: 'Your email',
      yourPhone: 'Your phone',
      contact: 'Contact agent'
    }
  }

  const t = translations[language as 'sr' | 'en']

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg?height=50&width=50"
            alt="Agent logo"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div>
            <h3 className="font-semibold text-primary-blue">Berkshire Hathaway</h3>
            <p className="text-sm text-gray-600">Calcagno & Hamilton</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {t.phone}
            </span>
            <span className="font-medium text-primary-blue">805-565-4000</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t.email}</span>
            <span className="font-medium text-primary-blue">info@homesinsantabarbara.com</span>
          </div>
        </div>

        <form className="space-y-4">
          <input
            placeholder={t.name}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
          <input
            placeholder={t.yourEmail}
            type="email"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
          <input
            placeholder={t.yourPhone}
            type="tel"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
          <button className="w-full bg-primary-blue text-white py-2 rounded-lg hover:bg-secondary-blue transition duration-300">
            {t.contact}
          </button>
        </form>
      </div>
    </div>
  )
} 