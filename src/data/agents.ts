import axios from 'axios';
import { ApiAgents, ApiAgentById } from './api';
import { ApiResponse } from './models/apiResponse';
import { AgentDto } from './models/RealEstate';
import { Agent } from './models/agents';

class AgentService {
  // Dobavljanje svih agenata
  async getAllAgents(langCode: string = 'sr'): Promise<Agent[]> {
    try {
      const response = await axios.get(`${ApiAgents}?lang=${langCode}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  }

  // Dobavljanje agenta po ID-u
  async getAgentById(id: number, langCode: string = 'sr'): Promise<Agent | null> {
    try {
      const response = await axios.get(`${ApiAgentById(id)}?lang=${langCode}`);
      return response.data.data || null;
    } catch (error) {
      console.error(`Error fetching agent with ID ${id}:`, error);
      return null;
    }
  }

  // Pretvaranje AgentDto u Agent format
  mapAgentDtoToAgent(agentDto: AgentDto, langCode: string = 'sr'): Agent | null {
    if (!agentDto || agentDto.name === 0) return null;
    
    return {
      id: 1, // Pretpostavka da ovo dobijamo sa servera
      name: typeof agentDto.name === 'string' ? `${agentDto.name} ${agentDto.surname || ''}` : '',
      title: { 
        sr: 'Konsultant za nekretnine', 
        en: 'Real Estate Consultant' 
      },
      images: typeof agentDto.image === 'string' ? [agentDto.image] : [],
      shortbio: {
        sr: 'Konsultant za nekretnine',
        en: 'Real Estate Consultant'
      },
      bio: {
        sr: 'Iskusni konsultant za nekretnine sa dugogodišnjim iskustvom.',
        en: 'Experienced real estate consultant with years of expertise.'
      },
      licence: typeof agentDto.licence === 'string' ? agentDto.licence : '',
      contact: {
        phone: typeof agentDto.phone === 'string' ? agentDto.phone : 
               (typeof agentDto.mobile === 'string' ? agentDto.mobile : ''),
        email: typeof agentDto.email === 'string' ? agentDto.email : ''
      }
    };
  }
}

export default new AgentService(); 