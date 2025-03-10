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

      {/* Contact Form */}
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
        <input
          type="tel"
          placeholder="Your Phone"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
        ></textarea>
        <div className="w-full">
          <button type="submit" className="w-full cta-button">
            <span>Send Message</span>
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}

