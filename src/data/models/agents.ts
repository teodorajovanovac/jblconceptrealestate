export interface AgentContact {
  phone: string;
  email: string;
}

export interface Agent {
  id: number;
  name: string;
  title: { [key: string]: string }; 
  images: string[];
  shortbio: { [key: string]: string };
  bio: { [key: string]: string }; 
  licence: string,
  contact: AgentContact;
}

export interface AgentsResponse {
  agents: Agent[];
}
