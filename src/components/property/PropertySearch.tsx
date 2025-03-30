import React, { useEffect, useState } from "react";
import { X, Search, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
//import { RealEstateDto } from "../../data/models/realEstate";
import realEstate from "../../data/RealEstateData";
import OtpInput from "react-otp-input";
import { useCmsData } from "../../services/CmsProvider";

interface PropertySearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({ isOpen, onClose }) => {
  const { t } = useCmsData();
  const [propertyId, setPropertyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect (() =>{
    setPropertyId("");
  }, [isOpen])

  const handleChange = (value: string) => {
    setPropertyId(value);
    console.log(propertyId);
    if (value.length == 4) 
      {
        handleSearch(value);
      } else {
        setError("")
      }
  }

  const handleSearch = async (value: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Pretvaramo string u broj
      const id = parseInt(value, 10);
      if (isNaN(id)) {
        throw new Error("ID mora biti broj");
      }

      const result = await realEstate.getData(id);
      if (result) {
        // Direktno preusmeravanje na stranicu nekretnine
        navigate(`/property/${id}`);
        onClose(); // Zatvaramo drawer
      } else {
        setError(t("action-search-property-not-found"));
      }
    } catch (error) {
      console.error("Error searching property:", error);
      setError(t("action-search-property-error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-custom-black/40 z-[30]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-full sm:w-96 bg-white shadow-xl z-40 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-primary-blue mr-2" />
                <h3 className="text-lg font-semibold text-primary-dark-blue" >{t("action-buttons-search")}</h3>
              </div>
              <button 
                onClick={onClose}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors text-primary-dark-blue"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Search Input */}
            <div className="p-4 border">
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("action-search-property-enter")}
                </label>
                <div className="w-full flex justify-center mt-6">
                  <OtpInput
                    value={propertyId}
                    onChange={handleChange}
                    numInputs={4}
                    inputType={"tel"}
                    renderSeparator={<span className="w-2"></span>}
                    renderInput={(props: React.InputHTMLAttributes<HTMLInputElement>) => (
                      <input {...props} inputMode="numeric" pattern="[0-9]*" type="tel" />
                    )}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      fontSize: "1.5rem",
                      borderRadius: "0.375rem",
                      border: "1px solid #D1D5DB",
                      textAlign: "center",
                      color: "#000000",
                      backgroundColor: "#ffffff"
                    }}
                    containerStyle="flex justify-between gap-2"
                    shouldAutoFocus
                  />
                </div>
              </div>
              
              {error && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{error}</span>
                </div>
              )}
              
              {/* <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full mt-4 bg-primary-blue hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">Pretraga...</span>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <Search className="h-5 w-5 mr-2" />
                    <span>Pretraži</span>
                  </div>
                )}
              </button> */}
            </div>
            
            {/* Results - sada nam nije potreban prikaz rezultata jer odmah preusmeravamo */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
                </div>
              ) : !error && (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">{t("action-search-property-enter")}</p>
                  <p className="text-sm text-gray-400 mt-1">
                   {t("action-search-property-enter-desc")}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PropertySearch; 