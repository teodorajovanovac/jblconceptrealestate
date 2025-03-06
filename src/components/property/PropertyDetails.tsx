import { useState, useEffect } from "react"

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
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
      title: 'Karakteristike i pogodnosti',
      interior: 'Unutrašnje karakteristike',
      exterior: 'Spoljašnje karakteristike',
      stories: 'Spratova',
      bedrooms: 'Spavaćih soba',
      bathrooms: 'Kupatila',
      appliances: 'Uređaji',
      floor: 'Podovi',
      fireplace: 'Kamin',
      lotSize: 'Veličina placa',
      features: 'Karakteristike',
      style: 'Stil',
      security: 'Obezbeđenje'
    },
    en: {
      title: 'Features & Amenities',
      interior: 'Interior Features',
      exterior: 'Exterior Features',
      stories: 'Stories',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      appliances: 'Appliances',
      floor: 'Floor Description',
      fireplace: 'Fireplace',
      lotSize: 'Lot Size',
      features: 'Features',
      style: 'Architectural Style',
      security: 'Security'
    }
  }

  const t = translations[language as 'sr' | 'en']

  return (
    <section id="features" className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-primary-blue">
        {t.title}
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary-blue">
            {t.interior}
          </h3>
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              <tr className="border-t">
                <td className="py-4 font-medium text-gray-700">{t.stories}</td>
                <td className="py-4 text-gray-600">2</td>
              </tr>
              {/* ... other rows */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
} 