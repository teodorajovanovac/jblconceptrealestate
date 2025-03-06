import { useState, useEffect } from "react"
import { Dialog } from "../ui/Dialog"

interface PropertyMapProps {
  property: Property
}

export default function PropertyMap({ property }: PropertyMapProps) {
  const [isOpen, setIsOpen] = useState(false)
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

  return (
    <section id="map" className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-primary-blue">
        {language === 'sr' ? 'Mapa' : 'Map'}
      </h2>

      <div 
        className="relative h-[400px] rounded-lg overflow-hidden cursor-pointer" 
        onClick={() => setIsOpen(true)}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(173)-IyWAuTemDYli7Tig5SpMyfPPXR3Z0Z.png"
          alt="Property location map"
          className="object-cover w-full h-full"
        />
      </div>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="relative aspect-video">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(173)-IyWAuTemDYli7Tig5SpMyfPPXR3Z0Z.png"
            alt="Property location map"
            className="object-contain w-full h-full"
          />
        </div>
      </Dialog>

      <div>
        <h3 className="font-semibold mb-2 text-primary-blue">465 Hot Springs Road</h3>
        <p className="text-gray-600">MONTECITO CA, 93108</p>
      </div>
    </section>
  )
} 