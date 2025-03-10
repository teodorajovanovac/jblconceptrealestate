"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import JblLogo from "../../assets/jblgold.svg"

interface LoadingScreenProps {
  loading: boolean
}

export default function LoadingScreen({ loading }: LoadingScreenProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (!loading) {
      // Add a small delay before starting the exit animation
      const timer = setTimeout(() => {
        setShow(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [loading])

  // Animacija za logo
  const logoVariants = {
    initial: { scale: 0.9, opacity: 0.8 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut"
      }
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-700" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.div 
              className="w-64 h-64 relative"
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              <JblLogo className="w-full h-full" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 