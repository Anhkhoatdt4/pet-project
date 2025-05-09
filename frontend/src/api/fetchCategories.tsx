import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}${API_URLS.GET_CATEGORIES}`);
        console.log("Categories fetched successfully22:", response.data);
        
        return response?.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}