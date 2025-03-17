import { useState } from "react"
import { Phone, Mail } from "lucide-react"

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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isInterestedInProperty: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Handle form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex flex-col items-center">
      {/* Contact Info */}
      <div className="space-y-4 mb-6 w-full">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Phone className="h-5 w-5 text-primary-gold mr-3" />
          <div>
            <label className="text-sm font-medium text-gray-600">Broj telefona</label>
            <p className="text-sm font-bold text-primary-blue">{agent.phone}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Mail className="h-5 w-5 text-primary-gold mr-3" />
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <span className="text-sm font-bold text-primary-blue">{agent.email}</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div className="relative">
          <input
            type="text"
            placeholder="Vaše ime"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 pl-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold transition-all"
            required
          />
        </div>
        <div className="relative">
          <input
            type="email"
            placeholder="Vaš email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 pl-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold transition-all"
            required
          />
        </div>
        <div className="relative">
          <input
            type="tel"
            placeholder="Vaš broj telefona"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 pl-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold/50 focus:border-primary-gold transition-all"
            required
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isInterestedInProperty}
            onChange={(e) => setFormData({...formData, isInterestedInProperty: e.target.checked})}
            className="w-4 h-4 text-primary-gold rounded border-gray-300 focus:ring-primary-gold"
          />
          <span className="text-sm text-gray-600">
            Želim da me kontaktirate u vezi ove nekretnine
          </span>
        </label>

        {/* Success Message */}
        {isSubmitted && (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <span className="text-sm font-medium">Uspešno ste poslali poruku!</span>
          </div>
        )}

        <div className="w-full">
          <button 
            type="submit" 
            className="w-full bg-primary-gold hover:bg-primary-gold/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <span>Pošaljite poruku</span>
          </button>
        </div>
      </form>
    </div>
  )
}

