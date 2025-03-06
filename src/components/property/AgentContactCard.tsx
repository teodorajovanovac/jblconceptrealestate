import { useState } from 'react'
import Image from 'next/image'

interface AgentContactCardProps {
  language: string;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  brokerageLogo?: string;
  brokerageName?: string;
}

export default function AgentContactCard({ language }: AgentContactCardProps) {
  const [email, setEmail] = useState('info@homesinsantabarbara.com')
  const [phone, setPhone] = useState('805-565-4000')

  return (
    <div className="sticky top-24 bg-white rounded-lg border shadow-sm p-6 space-y-4">
      <div className="flex items-center gap-4">
        <img 
          src="/assets/images/berkshire-logo.png" 
          alt="Berkshire Hathaway"
          className="h-8"
        />
        <div>
          <h3 className="text-lg">Berkshire Hathaway</h3>
          <p className="text-sm text-gray-600">Calcagno & Hamilton</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-600">Mobile number</label>
          <p className="font-medium">{phone}</p>
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <p className="font-medium">{email}</p>
        </div>
      </div>

      <button className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors">
        Contact agent
      </button>
    </div>
  )
} 