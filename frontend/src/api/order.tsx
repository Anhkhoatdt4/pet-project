import axios from "axios";
import {API_AUTHENTICATION_URL, getHeadersToken} from "~/api/constant"

export const getUserDetailInfo = async () => {
    const url = API_AUTHENTICATION_URL + '/user/profile';
    try {
        const response = await axios(url , {
            method: "POST",
            
        })
        return response?.data;
    } catch (error) {
        console.error("Error fetching userInfo:", error);
        throw error;
    }
}

export const sendOrderRequest = async (data : any) => {
    const url = API_AUTHENTICATION_URL + '/order';
    try {
        const response = await axios(url , {
            method: "POST",
            data: data,
            headers: getHeadersToken()
        });
        return response.data;
    }
    catch(error){
        console.error("Error fetching sendOrderRequest:", error);
        throw error;
    }
}

export const confirmPaymentAPI = async (data : any)=>{
    const url = API_AUTHENTICATION_URL + '/order/update-payment';
    try {
        console.log("confirmPaymentAPI");
        
        const response = await axios(url,{
            method:"POST",
            data: data,
            headers: getHeadersToken()
        });
        return response?.data;
    }
    catch(error){
        console.error("Error fetching confirmPaymentAPI:", error);
        throw error;
    }
}

export const fetchOrderApi = async () => {
    const url = API_AUTHENTICATION_URL + `/order/user`;
    try {
        const response = await axios (url, {
            method: "GET",
            headers : getHeadersToken()
        });
        return response?.data;
    } catch (error) {
        console.error("Error fetching fetchOrderApi:", error);
        throw error;
    }
}

export const cancelOrderAPI = async (id : string) => {
    const url = API_AUTHENTICATION_URL + `/order/cancel?id=${id}`;
    try{
        const response = await axios (url , {
            method: 'POST',
            headers: getHeadersToken()
        })
        return response.data;
    }
    catch (error) {
        console.error("Error fetching cancelOrderAPI:", error);
        throw error;
    }
};