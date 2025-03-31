import axios from "axios";
import { AgentsResponse } from "./models/Agents";
import { TestimonialResponse } from "./models/Testimonial";

const getCmsData = () => ({
    getAgentData: async (): Promise<AgentsResponse> => {
        try {
            var filename = "/cms/agents.json";
            const response = await axios.get<AgentsResponse>(filename); 
            return response.data;
        } catch (error) {
            console.error("Error fetching agent data:", error);
            throw error;  
        }
    },

    getTestimonialData: async (): Promise<TestimonialResponse> => {
        try {
            var filename = "/cms/testimonials.json";
            const response = await axios.get<TestimonialResponse>(filename); 
            //console.log("Ok - getTestimonialData", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;  
        }
    }

});

export default getCmsData;
