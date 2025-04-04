import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Facebook, Instagram, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import Seo from '../services/meta/Seo'
import { useCmsData } from "../services/CmsProvider"
import getCmsData from "../data/Cms"
import { Agent } from "../data/models/Agents"

const AgentPage: React.FC = () => {
  const { t, currentLanguage } = useCmsData()
  const [agents, setAgents] = useState<Agent[]>([]);
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])


  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await getCmsData().getAgentData();
        setAgents(data.agents); // Assuming 'agents' is a property in your AgentsResponse
      } catch (err) {
        //setError("Failed to load agents data.");
      } finally {
        //setLoading(false);
      }
    };
    fetchAgents();
  }, [currentLanguage]);
  
  // Find agent by id
  const agent = agents.find(a => a.id === Number(id))

  // If agent not found, redirect to about page
  if (!agent) {
    navigate('/about-us')
    return null
  }

  return (
    <>
      <Seo 
        title={`${agent.name} - ${agent.title[currentLanguage]}`} 
        />

      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Agent Name as Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-primary-blue mb-16 text-center"
          >
            {agent.name}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-12 lg:grid-cols-[1fr,1.5fr]"
          >
            <div className="space-y-8">
              <motion.div 
                className="aspect-[2/3] w-full overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={agent.images[1]} 
                  alt={agent.name} 
                  className="h-full w-full object-cover" 
                />
              </motion.div>

              {/* Social Links */}
              {/* <motion.div 
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {['facebook', 'instagram', 'linkedin'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full border border-primary-dark-blue p-2 text-primary-dark-blue hover:bg-gold-color hover:text-primary-dark-blue transition-colors"
                  >
                    {social === 'facebook' && <Facebook className="h-5 w-5" />}
                    {social === 'instagram' && <Instagram className="h-5 w-5" />}
                    {social === 'linkedin' && <Linkedin className="h-5 w-5" />}
                  </motion.a>
                ))}
              </motion.div> */}

              {/* Contact Info */}
              <motion.div 
                className="bg-gray-50 p-8 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-primary-blue">{agent.name}</h2>
                  <p className="text-sm uppercase tracking-widest text-gray-500">{agent.title[currentLanguage as keyof typeof agent.title]}</p>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-widest">
                      <a href={`tel:${agent.contact.phone}`} className="text-primary-dark-blue hover:text-gold-color">
                        {t("agent-call")}
                      </a>
                      {" | "}
                      <a href={`mailto:${agent.contact.email}`} className="text-primary-dark-blue hover:text-gold-color">
                        {t("agent-email")}
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bio */}
            <motion.div 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {agent.bio[currentLanguage as 'sr' | 'en'].split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed mb-6">
                  {paragraph.trim()}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  )
} 

export default AgentPage