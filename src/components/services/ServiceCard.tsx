import { ReactNode } from "react"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  icon?: ReactNode
  content: ReactNode
}

export function ServiceCard({ title, icon, content }: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
    >
      <div className="flex items-center gap-3 text-2xl font-semibold mb-6">
        <span className="text-primary-gold text-3xl">
          {icon}
        </span>
        <h3 className="text-primary-blue">{title}</h3>
      </div>
      <div className="space-y-4 text-gray-700">
        {content}
      </div>
    </motion.div>
  )
} 