import { API_BASE_URL , API_URLS } from "./constant";
import axios from "axios";

export const getAllProducts = async (id : string , typeId?: string) => {
    try {
        let url = `${API_BASE_URL}${API_URLS.GET_PRODUCTS}` + `?categoryId=${id}`;
        
        if (typeId) {
            url += `&typeId=${typeId}`;
        }
        console.log("URL", url);
        const response = await axios.get(url);
        console.log("Response", response?.data);
        return response?.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const getProductBySlug = async (slug: string) => {
    try {
        let url = API_BASE_URL + API_URLS.GET_PRODUCTS + `?slug=${slug}`;
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
}
