import type { PropertyData } from "../../types/property"

interface ContactAgentCardProps {
  agent: PropertyData["listingInfo"]["agent"]
}

export default function ContactAgentCard({ agent }: ContactAgentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <img
          src="/placeholder.svg?height=50&width=100"
          alt={agent.company}
          className="w-[100px] h-[50px] mr-3"
        />
        <div>
          <h3 className="text-sm font-bold">{agent.company}</h3>
        </div>
      </div>

      <div className="space-y-5 mb-8">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-500">Mobile number</label>
          <p className="text-sm font-medium">{agent.phone}</p>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-500">Email</label>
          <p className="text-sm font-medium">{agent.email}</p>
        </div>
      </div>

      <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
        Contact agent
      </button>
    </div>
  )
}

