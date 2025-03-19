import { useState } from "react"
import { Phone, Mail, X } from "lucide-react"

interface Agent {
  name: string
  company: string
  title: string
  email: string
  phone: string
  image: string
}

interface ContactAgentCardProps {
  agent: Agent
}

export default function ContactAgentCard({ agent }: ContactAgentCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {!isFormOpen ? (
        // Početni prikaz
        <div className="p-5 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Kontaktirajte agenta</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Phone className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">Broj telefona</div>
                <div className="text-base font-semibold">{agent.phone}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="text-base font-semibold">{agent.email}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mt-4"
          >
            Contact agent
          </button>
        </div>
      ) : (
        // Otvorena forma
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Kontaktirajte agenta</h3>
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
              placeholder="Vaše ime"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
            
            <input
              type="email"
              placeholder="Vaš email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
            
            <input
              type="tel"
              placeholder="Vaš broj telefona"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              required
            />
            
            <textarea
              placeholder="Vaša poruka"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
              rows={2}
              required
            />

            <button 
              type="submit" 
              className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Send message
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

