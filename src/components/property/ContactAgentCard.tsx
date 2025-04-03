import { useState, useEffect } from "react"
import { Phone, Mail, X, User } from "lucide-react"
import { useCmsData } from "../../services/CmsProvider"
import { RealEstateDto } from "../../data/models/RealEstate"
import agentService from "../../data/Agents"
import { Agent } from "../../data/models/Agents"

interface ContactAgentCardProps {
  property?: RealEstateDto
  agentId?: number
  fullWidth?: boolean
}

export default function ContactAgentCard({ property, agentId, fullWidth = false }: ContactAgentCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agent, setAgent] = useState<Agent | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { t, currentLanguage } = useCmsData()

  // Podrazumevane informacije za kontakt
  const defaultContactInfo = {
    phone: "+381 66 80 27 377",
    email: "office@jblconcept.rs"
  }

  // Učitavanje podataka o agentu
  useEffect(() => {
    const fetchAgentData = async () => {
      setIsLoading(true)
      try {
        // Ako imamo agentId kao prop, koristimo ga
        if (agentId) {
          const agentData = await agentService.getAgentById(agentId, currentLanguage)
          setAgent(agentData)
        } 
        // Ako imamo agentDto u property objektu, mapiramo te podatke
        else if (property?.agents && property.agents.length > 0) {
          const agentDto = property.agents[0]
          const mappedAgent = agentService.mapAgentDtoToAgent(agentDto, currentLanguage)
          setAgent(mappedAgent)
        }
      } catch (error) {
        console.error("Greška pri učitavanju podataka o agentu:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgentData()
  }, [agentId, property, currentLanguage])

  // Određivanje kontakt informacija
  const contactInfo = {
    phone: agent?.contact?.phone || defaultContactInfo.phone,
    email: agent?.contact?.email || defaultContactInfo.email,
    name: agent?.name || ""
  }

  // Provera da li agent ima ime ili sliku
  const hasAgentName = agent?.name && agent.name.trim().length > 0;
  const hasAgentImage = agent?.images && agent.images.length > 0;
  const shouldShowAgent = hasAgentName || hasAgentImage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementacija slanja forme
    // Logika za slanje poruke agentu...
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsFormOpen(false)
      // Reset forme
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      })
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${fullWidth ? 'w-full' : ''} p-5`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-dark-blue"></div>
        </div>
      </div>
    )
  }

  // Direktno korišćenje stringova kao fallback za slučaj da prevod nije dostupan
  const contactAgentText = t("agent-contact-agent") || "Kontaktirajte agenta";
  const phoneText = t("agent-phone") || "Broj telefona";
  const emailText = t("agent-email") || "Email";
  const contactText = t("agent-contact") || "Kontaktiraj agenta";
  const yourNameText = t("agent-your-name") || "Vaše ime";
  const yourEmailText = t("agent-your-email") || "Vaš email";
  const yourPhoneText = t("agent-your-phone") || "Vaš broj telefona";
  const yourMessageText = t("agent-your-message") || "Vaša poruka";
  const sendText = t("agent-send") || "Pošalji";
  const propertyInfoText = t("agent-contact-property-info") || "Kontaktirate našeg agenta u vezi sledećeg oglasa:";
  const propertyGenericText = t("agent-property-generic") || "Nekretnina";
  const messageSentText = t("agent-message-sent") || "Poruka uspešno poslata!";
  const messageConfirmationText = t("agent-message-confirmation") || "Naš agent će vas kontaktirati u najkraćem mogućem roku.";
  const privacyNoticeText = t("agent-privacy-notice") || "Vaši lični podaci biće korišćeni samo u svrhu odgovora na vaš upit i neće biti deljeni sa trećim licima.";

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${fullWidth ? 'w-full' : ''}`}>
      {!isFormOpen ? (
        // Početni prikaz
        <div className="p-5 space-y-4">
          <h3 className="text-lg font-semibold mb-4">{contactAgentText}</h3>

          {/* Prikaz agenta samo ako postoji ime ili slika */}
          {shouldShowAgent && (
            <div className="flex items-center space-x-3 mb-4">
              {hasAgentImage ? (
                <img 
                  src={agent!.images![0]} 
                  alt={agent?.name || "Agent"}
                  className="h-16 w-16 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder-agent.svg"
                  }}
                />
              ) : hasAgentName && (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
              )}
              <div>
                {hasAgentName && (
                  <p className="font-medium text-primary-dark-blue">{agent!.name}</p>
                )}
                {agent?.licence && (
                  <p className="text-sm text-gray-500">
                    {t("agent-licence") || "Licenca"}: {agent.licence}
                  </p>
                )}
                {agent?.title?.[currentLanguage] && (
                  <p className="text-sm text-gray-500">
                    {agent.title[currentLanguage] || agent.title?.['sr']}
                  </p>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {contactInfo.phone && contactInfo.phone !== "0" && (
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Phone className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-500">{phoneText}</div>
                  <a href={`tel:${contactInfo.phone}`} className="text-base font-semibold hover:text-primary-blue transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            )}
            
            {contactInfo.email && contactInfo.email !== "0" && (
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <Mail className="h-5 w-5 text-gray-600" />
          <div>
                  <div className="text-sm text-gray-500">{emailText}</div>
                  <a href={`mailto:${contactInfo.email}`} className="text-base font-semibold hover:text-primary-blue transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full cta-button rounded-full"
          >
            <span>{contactText}</span>
            <Phone className="icon" />
          </button>
        </div>
      ) : (
        // Otvorena forma
        <div className={`p-6 ${fullWidth ? 'max-h-[calc(100vh-70px)] overflow-y-auto' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{contactAgentText}</h3>
            <button 
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* Informativni tekst o nekretnini */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
            <p>
              {propertyInfoText}
              <span className="font-semibold block mt-1">
                {property?.portalName || property?.typeName || propertyGenericText}
                {property?.locationArea && `, ${property.locationArea}`}
                {property?.locationCityName && `, ${property.locationCityName}`}
              </span>
            </p>
          </div>

          {/* Forma za kontakt */}
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="rounded-full bg-green-100 p-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
      </div>
              <p className="text-green-800 font-medium">{messageSentText}</p>
              <p className="text-green-600 text-sm mt-1">{messageConfirmationText}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
                placeholder={yourNameText}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            required
          />
              
          <input
            type="email"
                placeholder={yourEmailText}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            required
          />
              
          <input
            type="tel"
                placeholder={yourPhoneText}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue"
            required
          />
              
              <textarea
                placeholder={yourMessageText}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue resize-none"
                rows={3}
                required
              />

          <button 
            type="submit" 
                className="w-full send-button"
              >
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>{sendText}</span>
          </button>
            </form>
          )}

          {/* Footer informacije - privatnost */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            {privacyNoticeText}
          </div>
        </div>
      )}
    </div>
  )
}

// Dodatne komponente za UX enhancements
// strokeWidth="2"
const CheckCircle2 = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

