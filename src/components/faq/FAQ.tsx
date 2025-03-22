import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

type FAQItem = {
  id: number
  question: {
    sr: string
    en: string
  }
  answer: {
    sr: string
    en: string
  }
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: {
      sr: "Koje vrste nekretnina JBL Concept nudi?",
      en: "What types of properties does JBL Concept offer?"
    },
    answer: {
      sr: "JBL Concept nudi širok spektar premium nekretnina, uključujući luksuzne stanove, kuće, vile, poslovne prostore i ekskluzivne investicione nekretnine u najatraktivnijim lokacijama. Naša ponuda obuhvata i nekretnine u Srbiji i druge atraktivne lokacije širom regiona.",
      en: "JBL Concept offers a wide range of premium properties, including luxury apartments, houses, villas, commercial spaces, and exclusive investment properties in the most attractive locations. Our portfolio includes properties in Serbia and other desirable locations throughout the region."
    }
  },
  {
    id: 2,
    question: {
      sr: "Kako izgleda proces kupovine nekretnine preko JBL Concept-a?",
      en: "What does the property buying process look like with JBL Concept?"
    },
    answer: {
      sr: "Proces počinje inicijalnom konsultacijom gde definišemo vaše potrebe i želje. Zatim vam predstavljamo pažljivo odabrane nekretnine koje odgovaraju vašim kriterijumima. Kada pronađete idealnu nekretninu, naš tim vas vodi kroz kompletan proces od pregovora, pravne dokumentacije do finalnog zatvaranja kupovine, pružajući ekspertizu na svakom koraku.",
      en: "The process begins with an initial consultation where we define your needs and desires. We then present carefully selected properties that match your criteria. When you find the ideal property, our team guides you through the complete process from negotiations, legal documentation to the final closing of the purchase, providing expertise at every step."
    }
  },
  {
    id: 3,
    question: {
      sr: "Koje usluge su uključene pri prodaji moje nekretnine?",
      en: "What services are included when selling my property?"
    },
    answer: {
      sr: "Naše usluge prodaje uključuju profesionalno fotografisanje i pripremu marketinškog materijala, procenu tržišne vrednosti, strateško pozicioniranje nekretnine, ciljani marketing prema kvalifikovanim kupcima, organizaciju i vođenje poseta, pregovaranje u vaše ime, i kompletnu administrativnu i pravnu podršku do finalnog prenosa vlasništva.",
      en: "Our selling services include professional photography and preparation of marketing materials, market value assessment, strategic property positioning, targeted marketing to qualified buyers, organization and management of viewings, negotiation on your behalf, and complete administrative and legal support until the final transfer of ownership."
    }
  },
  {
    id: 4,
    question: {
      sr: "Da li JBL Concept radi sa klijentima iz inostranstva?",
      en: "Does JBL Concept work with international clients?"
    },
    answer: {
      sr: "Apsolutno! Imamo bogato iskustvo u radu sa međunarodnim klijentima i možemo pružiti sveobuhvatnu podršku na više jezika. Razumemo specifične zahteve klijenata koji ne žive u Srbiji i možemo koordinisati ceo proces na daljinu, uz transparentnu komunikaciju i efikasnu administraciju.",
      en: "Absolutely! We have extensive experience working with international clients and can provide comprehensive support in multiple languages. We understand the specific requirements of clients who don't live in Serbia and can coordinate the entire process remotely, with transparent communication and efficient administration."
    }
  },
  {
    id: 5,
    question: {
      sr: "Koje su prednosti angažovanja JBL Concept-a umesto direktne kupovine/prodaje?",
      en: "What are the advantages of engaging JBL Concept instead of direct buying/selling?"
    },
    answer: {
      sr: "Angažovanjem JBL Concept-a dobijate pristup našoj ekskluzivnoj mreži kontakata, stručnost u pregovaranju najboljih uslova, detaljno poznavanje tržišta nekretnina i pravnih propisa, uštede vremena kroz efikasno vođenje procesa, i značajno smanjenje stresa kroz profesionalno upravljanje svim administrativnim i pravnim aspektima transakcije.",
      en: "By engaging JBL Concept, you gain access to our exclusive network of contacts, expertise in negotiating the best terms, detailed knowledge of the real estate market and legal regulations, time savings through efficient process management, and significant stress reduction through professional handling of all administrative and legal aspects of the transaction."
    }
  }
]

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
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
      title: "ČESTA PITANJA",
      subtitle: "Sve što treba da znate o našim uslugama",
      contact: "Niste pronašli odgovor? ",
      contactLink: "Kontaktirajte nas"
    },
    en: {
      title: "FREQUENTLY ASKED QUESTIONS",
      subtitle: "Everything you need to know about our services",
      contact: "Couldn't find your answer? ",
      contactLink: "Contact us"
    }
  }

  const t = translations[language as 'sr' | 'en']

  const toggleItem = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h3 className="text-lg md:text-xl font-medium tracking-wider text-primary-blue mb-3">{t.title}</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{t.subtitle}</h2>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden"
              >
                <div 
                  onClick={() => toggleItem(item.id)}
                  className="p-6 cursor-pointer flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.question[language as 'sr' | 'en']}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedId === item.id ? (
                      <ChevronUp className="w-5 h-5 text-primary-blue" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary-blue" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {item.answer[language as 'sr' | 'en']}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600">
            {t.contact}
            <a href="/contact" className="text-primary-blue hover:text-secondary-blue font-medium transition-colors">
              {t.contactLink}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
} 