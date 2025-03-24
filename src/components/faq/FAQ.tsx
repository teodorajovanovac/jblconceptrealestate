import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom";

interface FaqItems {
  question: string;
  answer: string;
}

interface FaqData {
  faqList: FaqItems[];
  faqTitle: string;
  faqSubTitle: string;
  faqFooterText?: string;
  faqFooterButtonTitle?: string;
}

interface FAQProps {
  data: FaqData;
}

const Faq: React.FC<FAQProps> = ( { data  } ) => {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  }


  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h3 className="text-lg md:text-xl font-medium tracking-wider text-primary-blue mb-3">{data.faqTitle}</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{data.faqSubTitle}</h2>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {data.faqList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <div 
                className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden"
              >
                <div 
                  onClick={() => toggleItem(index)}
                  className="p-6 cursor-pointer flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedId === index ? (
                      <ChevronUp className="w-5 h-5 text-primary-blue" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-primary-blue" />
                    )}
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedId === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed pt-4">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            {data.faqFooterText}
          </p>

            <Link to="/contact" className="cta-button rounded-full">
                <span>{data.faqFooterButtonTitle}</span>
            </Link>
        </motion.div>
      </div>
    </section>
  )
} 

export default Faq;