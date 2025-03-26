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
      // Odmah počinjemo exit animaciju kada se loading završi
      setShow(false)
    }
  }, [loading])

  // Animacija za logo - usporena i povećana
  const logoVariants = {
    initial: { scale: 0.85, opacity: 0.8 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.9, // Povećano sa 0.6s na 0.9s za sporiju animaciju
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
          transition={{ duration: 0.4, ease: "easeInOut" }} // Povećano sa 0.25s na 0.4s za sporiju animaciju
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark-blue to-primary-light-blue" />
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.div 
              className="w-[16rem] h-[16rem] md:w-[32rem] md:h-[32rem] relative"
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