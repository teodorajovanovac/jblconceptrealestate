import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Building2, Key, Shield, Calculator, FileText, Search, Star, Phone, CheckCircle2, ClipboardCheck, Home, Users } from "lucide-react"
import Header from '../components/header/Header'
import FooterTW from '../components/footer/FooterTW'
import Seo from '../services/meta/Seo'
import { Link } from "react-router-dom"

const services = [
  {
    name: {
      sr: "Posredovanje pri zakupu",
      en: "Rental Brokerage"
    },
    icon: Key,
    description: {
      sr: "Kompletna usluga posredovanja pri zakupu nekretnina, uključujući:",
      en: "Complete rental brokerage service, including:"
    },
    features: {
      sr: [
        "Pronalaženje idealne nekretnine prema vašim zahtevima",
        "Organizacija pregleda nekretnine",
        "Priprema i pregled ugovora o zakupu",
        "Pravna podrška tokom celog procesa",
        "Pomoć pri primopredaji nekretnine"
      ],
      en: [
        "Finding the ideal property based on your requirements",
        "Organizing property viewings",
        "Preparing and reviewing lease agreements",
        "Legal support throughout the process",
        "Assistance with property handover"
      ]
    }
  },
  {
    name: {
      sr: "Posredovanje pri kupoprodaji",
      en: "Sales Brokerage"
    },
    icon: Building2,
    description: {
      sr: "Profesionalno posredovanje pri kupoprodaji nekretnina:",
      en: "Professional real estate sales brokerage:"
    },
    features: {
      sr: [
        "Detaljna analiza tržišta",
        "Procena vrednosti nekretnine",
        "Marketing i prezentacija nekretnine",
        "Pregovori sa potencijalnim kupcima",
        "Kompletna pravna podrška"
      ],
      en: [
        "Detailed market analysis",
        "Property valuation",
        "Marketing and property presentation",
        "Negotiations with potential buyers",
        "Complete legal support"
      ]
    }
  },
  {
    name: {
      sr: "Procena vrednosti nekretnina",
      en: "Property Valuation"
    },
    icon: Calculator,
    description: {
      sr: "Stručna procena tržišne vrednosti vaše nekretnine:",
      en: "Professional property market value assessment:"
    },
    features: {
      sr: [
        "Detaljna analiza lokacije",
        "Procena stanja nekretnine",
        "Analiza tržišnih trendova",
        "Komparativna analiza cena",
        "Pisani izveštaj sa procenom"
      ],
      en: [
        "Detailed location analysis",
        "Property condition assessment",
        "Market trend analysis",
        "Comparative price analysis",
        "Written valuation report"
      ]
    }
  },
  {
    name: {
      sr: "Menadžment nekretnina",
      en: "Property Management"
    },
    icon: Shield,
    description: {
      sr: "Kompletno upravljanje vašom nekretninom:",
      en: "Complete property management services:"
    },
    features: {
      sr: [
        "Redovno održavanje nekretnine",
        "Upravljanje odnosima sa zakupcima",
        "Kontrola plaćanja i troškova",
        "Mesečni izveštaji o stanju",
        "24/7 podrška za hitne slučajeve"
      ],
      en: [
        "Regular property maintenance",
        "Tenant relationship management",
        "Payment and cost control",
        "Monthly status reports",
        "24/7 emergency support"
      ]
    }
  },
  {
    name: {
      sr: "Konsalting usluge",
      en: "Consulting Services"
    },
    icon: Search,
    description: {
      sr: "Stručno savetovanje za optimalan plasman i kupovinu nekretnina:",
      en: "Expert consulting for optimal property placement and purchase:"
    },
    features: {
      sr: [
        "Analiza tržišnih prilika",
        "Strategija pozicioniranja",
        "Investiciono savetovanje",
        "Optimizacija cene",
        "Due diligence podrška"
      ],
      en: [
        "Market opportunity analysis",
        "Positioning strategy",
        "Investment consulting",
        "Price optimization",
        "Due diligence support"
      ]
    }
  },
  {
    name: {
      sr: "Pravne usluge",
      en: "Legal Services"
    },
    icon: FileText,
    description: {
      sr: "Kompletna pravna podrška za nekretnine:",
      en: "Complete legal support for real estate:"
    },
    features: {
      sr: [
        "Priprema predugovora",
        "Izrada kupoprodajnih ugovora",
        "Ugovori o zakupu",
        "Pravno savetovanje",
        "Podrška pri uknjižbi"
      ],
      en: [
        "Preliminary contract preparation",
        "Purchase agreement drafting",
        "Lease agreements",
        "Legal consulting",
        "Registration support"
      ]
    }
  }
]

const highlights = [
  {
    title: { sr: "Profesionalna Usluga", en: "Professional Service" },
    description: { 
      sr: "Naš tim stručnjaka pruža vrhunsku uslugu u svim aspektima poslovanja sa nekretninama",
      en: "Our team of experts provides top-tier service in all aspects of real estate business"
    },
    icon: Star
  },
  {
    title: { sr: "Dostupnost 24/7", en: "24/7 Availability" },
    description: {
      sr: "Uvek smo dostupni za naše klijente, bilo kada da nas trebate",
      en: "We're always available for our clients, whenever you need us"
    },
    icon: Phone
  }
]

export default function ServicesPage() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'sr')

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'sr');
    };

    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChange', handleLanguageChange);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Seo title={language === 'sr' ? 'Usluge' : 'Services'} />
      <Header />
      <main id="top" className="content-wrapper">
        <div className="w-full">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {language === 'sr' ? 'Naše Usluge' : 'Our Services'}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {language === 'sr' 
                    ? 'Sveobuhvatne usluge u oblasti nekretnina prilagođene vašim potrebama u Srbiji'
                    : 'Comprehensive real estate services tailored to your needs in Serbia'}
                </p>
              </div>

              {/* Services We Provide Section */}
              <div className="border-0 shadow-lg rounded-lg bg-white">
                <div className="bg-primary/5 border-b p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      {language === 'sr' 
                        ? 'USLUGE KOJE PRUŽAMO KLIJENTIMA'
                        : 'SERVICES WE PROVIDE TO CLIENTS'}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4 text-base leading-relaxed">
                    {language === 'sr' ? (
                      <>
                        <p>Aktivno posredovanje pri izboru, zakupu i/ili prodaji nekretnina, prvenstveno poslovnih prostora i luksuznih nekretnina u Srbiji, posebno u Beogradu i okolini.</p>
                        <p>Konsultantske usluge i razvoj strategije pregovora za zakup i/ili kupovinu nekretnina.</p>
                        <p>Konsultacije tokom izbora/zakupa/prodaje nekretnina.</p>
                        <p>Istraživanje tržišta nekretnina na zahtev klijenta.</p>
                        <p>Saradnja sa renomiranim advokatima, pružanje pomoći pri registraciji, legalizaciji i svim pitanjima vezanim za nekretnine.</p>
                      </>
                    ) : (
                      <>
                        <p>Active brokerage in the selection, lease and/or sale of real estate, primarily commercial spaces and luxury properties in Serbia, especially in Belgrade and its surroundings.</p>
                        <p>Consulting services and negotiation strategy development for leasing and/or purchasing real estate.</p>
                        <p>Consulting during the selection/lease/sale of real estate.</p>
                        <p>Real estate market research upon client request.</p>
                        <p>Cooperation with renowned lawyers, providing assistance in registration, legalization, and all property-related matters.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Management Section */}
              <div className="border-0 shadow-lg rounded-lg bg-white">
                <div className="bg-primary/5 border-b p-6">
                  <div className="flex items-center gap-3">
                    <Home className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      {language === 'sr' ? 'MENADŽMENT NEKRETNINA' : 'PROPERTY MANAGEMENT'}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 list-disc pl-6 text-base leading-relaxed">
                    {language === 'sr' ? (
                      <>
                        <li>Posredovanje pri izdavanju nekretnina.</li>
                        <li>Kontrola plaćanja tekućih troškova od strane zakupaca.</li>
                        <li>Manje popravke i nadzor majstora u konsultaciji sa vlasnikom.</li>
                        <li>Praćenje zakupa i redovnih plaćanja.</li>
                        <li>Izdavanje mesečnih izveštaja o potrošnji, zakupninama i neizmirenim obavezama.</li>
                        <li>Bilo koja vrsta usluge vezana za nekretninu koja se izdaje, kao što je organizovanje opremanja, krečenja, izdavanja, vraćanja u prvobitno stanje i sl.</li>
                      </>
                    ) : (
                      <>
                        <li>Brokerage in leasing properties.</li>
                        <li>Control of tenant payments of ongoing expenses.</li>
                        <li>Minor repairs and supervision of craftsmen in consultation with the owner.</li>
                        <li>Monitoring of the lease and regular payments.</li>
                        <li>Issuing monthly reports on consumption, rents, and outstanding payments.</li>
                        <li>Any type of service related to the property that is being leased, such as organizing furnishing, painting, letting, returning to its original condition, etc.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Handover Section */}
              <div className="border-0 shadow-lg rounded-lg bg-white">
                <div className="bg-primary/5 border-b p-6">
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      {language === 'sr' ? 'PRIMOPREDAJA ZAKUPLJENE NEKRETNINE' : 'HANDOVER OF THE LEASED PROPERTY'}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4 text-base leading-relaxed">
                    {language === 'sr' ? (
                      <>
                        <p>
                          Uz izdavanje nekretnine možemo ponuditi izradu zapisnika o primopredaji koji se razlikuje od liste inventara. U zavisnosti od opremljenosti i namene nekretnine možemo ponuditi izradu dokumenata koji prate Ugovor o zakupu, a odnose se na stanje nekretnine pre početka zakupa, kao i stanje prilikom raskida zakupa.
                        </p>
                        <p>
                          Naša dokumentacija sadrži sve elemente vezane za pravilno korišćenje nekretnine i inventara i u potpunosti je usklađena sa Ugovorom o zakupu.
                        </p>
                        <ul className="space-y-3 list-disc pl-6 mt-4">
                          <li>Mogućnost izrade dvojezičnog zapisnika na srpskom i engleskom jeziku.</li>
                          <li>Mogućnost izrade zapisnika o primopredaji za klijente koji nisu koristili naše usluge posredovanja pri izdavanju.</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>
                          Along with leasing the property, we can offer the preparation of a handover report, which differs from an inventory list. Depending on the equipment and purpose of the property, we can offer the preparation of documents that accompany the Lease Agreement, relating to the condition of the property before the beginning of the lease, as well as its condition upon termination of the lease.
                        </p>
                        <p>
                          Our documentation contains all elements related to the proper use of the property and inventory and fully complies with the Lease Agreement.
                        </p>
                        <ul className="space-y-3 list-disc pl-6 mt-4">
                          <li>Possibility of creating a bilingual report in Serbian and English.</li>
                          <li>Possibility of creating a handover report for clients who did not use our brokerage services for leasing.</li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Consultation Section */}
              <div className="border-0 shadow-lg rounded-lg bg-white">
                <div className="bg-primary/5 border-b p-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-semibold">
                      {language === 'sr' ? 'KONSULTACIJE' : 'CONSULTATION'}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-base leading-relaxed">
                    {language === 'sr' 
                      ? 'Pružanje svih savetodavnih usluga vezanih za proces zakupa ili kupoprodaje, počevši od izbora nekretnine, advokata, javnog beležnika i tako dalje.'
                      : 'Providing all advisory services related to the leasing or buying and selling process, starting from the selection of property, lawyer, notary public, and so on.'}
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gray-50 rounded-lg p-8 text-center mt-12">
                <h2 className="text-2xl font-semibold mb-3">
                  {language === 'sr' ? 'Spremni da sarađujemo?' : 'Ready to work with us?'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === 'sr'
                    ? 'Kontaktirajte naš tim stručnjaka da razgovaramo o vašim potrebama za nekretninama u Srbiji.'
                    : 'Contact our team of experts to discuss your real estate needs in Serbia.'}
                </p>
                <Link
                  to="/contact"
                  className="cta-button rounded-full"
                >
                  <span>{language === 'sr' ? 'Kontaktirajte nas' : 'Contact Us'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterTW />
    </div>
  )
}
