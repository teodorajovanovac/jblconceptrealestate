import axios from "axios";
import { AgentsResponse } from "./models/agents";

const getCmsData = () => ({
    getAgentData: async (): Promise<AgentsResponse> => {
        try {
            const response = await axios.get<AgentsResponse>('/cms/agents.json'); 
            return response.data;
        } catch (error) {
            console.error("Error fetching agent data:", error);
            throw error;  
        }
    }
});

export default getCmsData;
