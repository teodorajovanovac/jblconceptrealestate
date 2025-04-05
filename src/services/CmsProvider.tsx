import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { GeoInfo } from "../data/models/GeoInfo";

interface CmsContextType {
  t: {
    (key: string): string;
    (key: string, returnType: "object"): object;
  };
  changeLanguage: (langCode: string) => void;
  currentLanguage: string;
  geoInfo: GeoInfo; // Add geoInfo to the context type
  loadingCmsData: boolean; // Loading state for async operations
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
  const [staticCmsData, setStaticCmsData] = useState<Record<string, string>>({});
  const [currentLanguage, setCurrentLanguage] = useState<string>(defaultLang);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(["rs","en"]);
  const [settings, setSettings] = useState<any>({});
  const [geoInfo, setGeoInfo] = useState<any>(null); // Initialize geoInfo state
  const [loadingCmsData, setLoading] = useState(true); // Loading state for async operations
  const [loadingStaticData, setLoadingStatic] = useState(true); // Loading state for async operations

  const staticDataLoaded = useRef(false);
  const initialLoad = useRef(true);

  
  useEffect(() => {
    const loadStaticData = async () => {
      // Skip if static data is already loaded or not initial load
      if (staticDataLoaded.current || !initialLoad.current) return;
      
      try {

        console.log("Loading Static files - Initial load");
        setLoadingStatic(true); 
        setLoading(true); 

        const geoPromise = axios.get("https://geolocation-db.com/json/");

        const [cmsResponse, settingsResponse] = await Promise.all([
            axios.get("/cms/cmsdata.json"),
            axios.get("/cms/settings.json"),
        ]);      
        
        //const cmsResponse = await axios.get("/cms/cmsdata.json");
        setStaticCmsData(cmsResponse.data); 
        
        //const geoResponse = await axios.get("https://geolocation-db.com/json/");
        //setGeoInfo(geoResponse.data);
        
        //const settingsResponse = await axios.get("/cms/settings.json");
        setSettings(settingsResponse.data);
        setAvailableLanguages(settingsResponse.data.availableLanguages);
        
        const storedLang = localStorage.getItem("language");
        const finalLang = storedLang || defaultLang;
        
        // Always load CMS data for the initial language
        const cmsDataResponse = await axios.get(`/cms/${finalLang}.json`);
        setCmsData(cmsDataResponse.data);
        
        
        if (storedLang) {
          handleChangeLanguage(storedLang, settingsResponse.data.availableLanguages);
          geoPromise
            .then(response => setGeoInfo(response.data))
            .catch(error => {
            console.warn("Geolocation failed or slow", error);
            setGeoInfo(null); // optional fallback
        });

        } else {

          geoPromise
            .then(res => {
              setGeoInfo(res.data)
              const countryCode = res.data.country_code.toLowerCase();
              const countryToLang: { [key: string]: string } = {
                us: "en",
                gb: "en",
                es: "es",
                mx: "es",
                fr: "fr",
                de: "de",
                rs: "sr"
              };
              const detectedLang = countryToLang[countryCode] || defaultLang;
              if (availableLanguages.includes(detectedLang)) {
                handleChangeLanguage(detectedLang, settingsResponse.data.availableLanguages);
              } else {
                handleChangeLanguage(defaultLang, settingsResponse.data.availableLanguages);
              }
            })
            .catch(error => {
              console.warn("Geolocation failed or slow", error);
              setGeoInfo(null); // optional fallback
              handleChangeLanguage(defaultLang, settingsResponse.data.availableLanguages);
            });
          // const countryToLang: { [key: string]: string } = {
          //   us: "en",
          //   gb: "en",
          //   es: "es",
          //   mx: "es",
          //   fr: "fr",
          //   de: "de",
          //   rs: "sr"
          // };
          // const detectedLang = countryToLang[countryCode] || defaultLang;
          // if (availableLanguages.includes(detectedLang)) {
          //   handleChangeLanguage(detectedLang, settingsResponse.data.availableLanguages);
          // } else {
          //   handleChangeLanguage(defaultLang, settingsResponse.data.availableLanguages);
          // }
        }
        
        // Mark static data as loaded and initial load as complete
        staticDataLoaded.current = true;
        initialLoad.current = false;
      } catch (error) {
        console.error("Error loading static data:", error);
      } finally {
        setLoadingStatic(false); 
        setLoading(false); 
      }
    };

    loadStaticData();
    
  }, []); // Empty dependency array ensures this only runs once

  const handleChangeLanguage = (lang: string, tempAvailableLanguages?: string[]) => {
    console.log("Changing language from:", currentLanguage, "to:", lang);
    if (currentLanguage !== lang) {
      const checkAvailableLanguages: string[] = availableLanguages || tempAvailableLanguages;
      if (checkAvailableLanguages.includes(lang)) {
        setCurrentLanguage(lang);
        localStorage.setItem("language", lang);
      } else {
        console.warn(`Language ${lang} is not available.`);
      }
    }
  }

  useEffect(() => {
    const loadCmsData = async () => {
      try {
        if (!loadingStaticData && currentLanguage) {
          setLoading(true);
          const response = await axios.get(`/cms/${currentLanguage}.json`);
          setCmsData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading cmsData file:", error);
        setLoading(false);
      }
    };

    if (currentLanguage && !initialLoad.current) {
      loadCmsData();
    }
  }, [currentLanguage, loadingStaticData]);

  function t(key: string): string;
  function t(key: string, returnType: "object"): object;
  function t(key: string, returnType?: "object"): string | object {
    const result = key.split(".").reduce((obj: any, i) => (obj ? obj[i] : key), {
      ...staticCmsData, // Merge static data for easier access
      ...cmsData, // Dynamic data
      ...settings // Settings
    });

    if (returnType === "object" && typeof result === "object") {
      return result;
    }
    return typeof result === "string" ? result : key;
  }

  const changeLanguage = (lang: string) => {
    handleChangeLanguage(lang);
  };

  return (
    <CmsDataContext.Provider value={{ t, changeLanguage, currentLanguage, geoInfo, loadingCmsData }}>
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
