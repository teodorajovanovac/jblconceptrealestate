import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Seo from '../services/meta/Seo'
import TagManager from 'react-gtm-module';
import { useCmsData } from "../services/CmsProvider"
import getCmsData from "../data/Cms"
import { Agent } from "../data/models/Agents"
import Spinner from '../components/ui/Spinner'


const AboutUsPage: React.FC = () => {
  const { t, currentLanguage, loadingCmsData } = useCmsData();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Додајемо useEffect за скроловање на врх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const tagManagerArgs = {
      dataLayer: {
        event: 'pageview',
        path: window.location.pathname,
        page: 'about-us-page', 
      },
    };
  
    TagManager.dataLayer(tagManagerArgs);
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const data = await getCmsData().getAgentData();
        setAgents(data.agents); // Assuming 'agents' is a property in your AgentsResponse
      } catch (err) {
        setError("Failed to load agents data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [currentLanguage]);

  if (loadingCmsData || loading) {
    return (
      <div className="flex items-center justify-center h-screen inset-0">
        <Spinner size="lg" className="text-primary-blue "/>
      </div>
    );
  }
  if (error) return <div className="text-center p-4">{error}</div>;

  return (

     <>
    
    <Seo 
      title={currentLanguage === 'sr' ? 'O nama' : 'About Us'} 
      description={currentLanguage === 'sr' ? 'O nama - Concept Real Estate' : 'About Us - Concept Real Estate'}
      url={window.location.href}
      />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-12 pt-24">
     
        <div className="max-w-6xl mx-auto">
          <div className="mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-primary-blue mb-12 text-center"
            >
              {t("about-title")}
            </motion.h1>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 max-w-4xl mx-auto">
              {agents.map((member) => (
                <motion.div 
                  key={member.id} 
                  className="group relative"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to={`/about-us/${member.id}`} className="block">
                    <div className="relative group overflow-hidden rounded-lg">
                      <img
                        src={member.images[0]}
                        //alt={member.name}
                        //alt={member.images[0]}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-custom-black/0 opacity-0 transition-all duration-300 group-hover:bg-custom-black/60 group-hover:opacity-100">
                        <div className="flex space-x-4">
                          <div className="border border-white px-6 py-2 text-sm tracking-widest text-white">
                            {t("about-team-learn-more")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1">
                      <h2 className="font-serif text-xl tracking-wide text-primary-blue">{member.name}</h2>
                      <p className="text-sm uppercase tracking-widest text-gray-500">{member.title[currentLanguage]}</p>
                      <p className="text-sm uppercase tracking-widest text-gray-500">
                        {(member.licence && member.licence.length > 0) ? t("agent-licence") + ":" + member.licence : ""}
                        
                        
                      </p>
                      <p className="font-serif italic text-gray-600 text-sm">{member.shortbio[currentLanguage]}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      </>
  )
} 

export default AboutUsPage;