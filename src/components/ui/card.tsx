import { motion } from "framer-motion"

export function Card({ className, children, ...props }: any) {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: any) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: any) {
  return (
    <h3 className={`text-xl font-bold text-primary-blue mb-2 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }: any) {
  return (
    <p className={`text-gray-600 ${className}`} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ className, children, ...props }: any) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
} 