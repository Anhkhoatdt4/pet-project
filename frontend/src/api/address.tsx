import axios from "axios";
import { API_BASE_URL, getHeadersToken } from "./constant";

export const addAddressAPI = async (data : any)=>{
    const url = API_BASE_URL + '/api/address';
    try{
        const response = await axios(url,{
            method:"POST",
            data:data,
            headers: getHeadersToken()
        });
        return response?.data;
    }
    catch(error){
        console.error("Error fetching add Address:", error);
        throw error;
    }
}

export const deleteAddressAPI = async (id : string)=>{
    const url = API_BASE_URL + `/api/address/${id}`;
    try{
        const response = await axios(url,{
            method:"DELETE",
            headers: getHeadersToken()
        });
        return response?.data;
    }
    catch(err){
        throw err;
    }
}