import axios from "axios";
import {API_AUTHENTICATION_URL, getHeadersToken} from "~/api/constant"

export const getUserDetailInfo = async () => {
    const url = API_AUTHENTICATION_URL + '/user/profile';
    try {
        const response = await axios(url , {
            method: "GET",
            headers : getHeadersToken()
        })
        return response?.data;
    } catch (error) {
        console.error("Error fetching userInfo:", error);
        throw error;
    }
}