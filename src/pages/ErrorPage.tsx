import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Home, Search, FileText, ArrowLeft } from 'lucide-react'
import { useCmsData } from "../services/CmsProvider"


const ErrorPage: React.FC = () => {
  const { t } = useCmsData();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <main className="min-h-screen pt-24 flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary-dark-blue">
            {t("error-title")}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-6 mb-2">
            {t("error-subtitle")}
          </h2>
          
          <p className="text-gray-500 mb-12">
            {t("error-code")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-700">
            {t("error-helpful-links")}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-6 py-3 bg-primary-dark-blue text-white rounded-lg hover:bg-primary-light-blue hover:text-white transition-colors"
            >
              <Home size={18} />
              <span>{t("error-home")}</span>
            </Link>
            
            <Link 
              to="/properties" 
              className="flex items-center gap-2 px-6 py-3 bg-primary-dark-blue text-white rounded-lg hover:bg-primary-light-blue hover:text-white transition-colors"
            >
              <Search size={18} />
              <span>{t("menu-properties")}</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center gap-2 px-6 py-3 bg-primary-dark-blue text-white rounded-lg hover:bg-primary-light-blue hover:text-white transition-colors"
            >
              <FileText size={18} />
              <span>{t("contact")}</span>
            </Link>
          </div>
          
          <button 
            onClick={goBack}
            className="flex items-center gap-2 px-6 py-3 mt-8 mx-auto border border-primary-dark-blue text-primary-dark-blue rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>{t("back")}</span>
          </button>
        </motion.div>
      </div>
    </main>
  )
}

export default ErrorPage;
