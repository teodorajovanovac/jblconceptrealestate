import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Define the type for the context
interface CmsContextType {
  t: (key: string) => string;
  changeLanguage: (langCode: string) => void;
  currentLanguage: string;
}

const CmsDataContext = createContext<CmsContextType | undefined>(undefined);

interface CmsDataProviderProps {
  defaultLang: string;
  children: React.ReactNode;
}

export const CmsDataProvider: React.FC<CmsDataProviderProps> = ({
  defaultLang,
  children,
}) => {
  const [cmsData, setCmsData] = useState<Record<string, string>>({});
  const [currentLanguage, setCurrentLanguage] = useState<string>(defaultLang);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);


  // useEffect(() => {
  //   const loadSettings = async () => {
  //     try {
  //       const response = await axios.get("/cms/settings.json");
  //       setAvailableLanguages(response.data.availableLanguages);
  //       console.log("availableLanguages - ok");
  //     } catch (error) {
  //       console.error("Error loading settings:", error);
  //       setAvailableLanguages([defaultLang]); // Fallback to default language
  //     }
  //   };
  
  //   loadSettings();
  // }, [defaultLang]); // This ensures that it only runs once, when the component mounts.

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await axios.get("/cms/settings.json");
        setAvailableLanguages(response.data.availableLanguages);
        console.log("availableLanguages - ok");
      } catch (error) {
        console.error("Error loading settings:", error);
        setAvailableLanguages([defaultLang]); // Fallback to default language
      }
    };

    const fetchUserLanguage = async () => {
      const storedLang = localStorage.getItem("language");

      if (storedLang) {
        setCurrentLanguage(storedLang);
        return;
      }

      try {
        const response = await axios.get("https://geolocation-db.com/json/");
        const countryCode = response.data.country_code.toLowerCase();

        // Example country-to-language mapping
        const countryToLang: { [key: string]: string } = {
          us: "en",
          gb: "en",
          es: "es",
          mx: "es",
          fr: "fr",
          de: "de",
        };

        const detectedLang = countryToLang[countryCode] || defaultLang;

        if (availableLanguages.length === 0) {
          await loadSettings(); // Ensure availableLanguages is loaded
        }

        if (availableLanguages.includes(detectedLang)) {
          setCurrentLanguage(detectedLang);
          localStorage.setItem("language", detectedLang);
        } else {
          setCurrentLanguage(defaultLang);
        }
      } catch (error) {
        console.error("Error detecting user language:", error);
        setCurrentLanguage(defaultLang);
      }
    };

    // Load settings and user language detection only once
    loadSettings().then(fetchUserLanguage);
  }, [defaultLang]);

  useEffect(() => {
    const loadCmsData = async () => {
      try {
        const response = await axios.get(`/cms/${currentLanguage}.json`);
        setCmsData(response.data);
        console.log("loadCmsData - ok:"+response.data.length);
      } catch (error) {
        console.error("Error loading cmsData file:", error);
      }
    };

    if (currentLanguage) {
      loadCmsData();
    }
  }, [currentLanguage]);

  const t = (key: string): string => {
    return key.split(".").reduce((obj: any, i) => (obj ? obj[i] : key), cmsData);
  };

  const changeLanguage = (lang: string) => {
    if (availableLanguages.includes(lang)) {
      localStorage.setItem("language", lang); // Store language in localStorage
      setCurrentLanguage(lang);
    } else {
      console.warn(`Language ${lang} is not available.`);
    }
  };

  return (
    <CmsDataContext.Provider value={{ t, changeLanguage, currentLanguage }}>
      {children}
    </CmsDataContext.Provider>
  );
};

// This is where we make sure to correctly type `useCmsData`
export const useCmsData = (): CmsContextType => {
  const context = useContext(CmsDataContext);
  if (!context) {
    throw new Error("useCmsData must be used within a CmsDataProvider");
  }
  return context;
};
