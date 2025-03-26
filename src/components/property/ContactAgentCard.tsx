import { useState } from "react"
import { Phone, Mail, X } from "lucide-react"
import { useCmsData } from "../../services/CmsProvider"
import { RealEstateDto } from "../../data/models/realEstate"

interface Agent {
  name: string
  company: string
  title: string
  email: string
  phone: string
  image: string
}

interface ContactAgentCardProps {
  agent?: Agent
  property?: RealEstateDto
  fullWidth?: boolean
}

export default function ContactAgentCard({ agent, property, fullWidth = false }: ContactAgentCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { t } = useCmsData();

  // Podrazumevane informacije za kontakt
  const contactInfo = {
    phone: "+381 66 80 27 377",
    email: "office@jblconcept.rs"
  };

  // Odredi kontakt informacije na osnovu prosledjenih parametara
  const agentPhone = agent?.phone || contactInfo.phone;
  const agentEmail = agent?.email || contactInfo.email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
    }, 3000);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${fullWidth ? 'w-full' : ''}`}>
      {!isFormOpen ? (
        // Početni prikaz
        <div className="p-5 space-y-4">
          <h3 className="text-lg font-semibold mb-4">{t("agent-contact-agent")}</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Phone className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">{t("agent-phone")}</div>
                <div className="text-base font-semibold">{agentPhone}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">{t("agent-email")}</div>
                <div className="text-base font-semibold">{agentEmail}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full cta-button rounded-full"
          >
            <span>{t("agent-contact")}</span>
            <Phone className="icon" />
          </button>
        </div>
      ) : (
        // Otvorena forma
        <div className={`p-6 ${fullWidth ? 'max-h-[calc(100vh-70px)]' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{t("agent-contact-agent")}</h3>
            <button 
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder={t("agent-your-name")}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
            
            <input
              type="email"
              placeholder={t("agent-your-email")}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
            
            <input
              type="tel"
              placeholder={t("agent-your-phone")}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
            
            <textarea
              placeholder={t("agent-your-message")}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
              rows={2}
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
              <span>{t("agent-send")}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

