import { API_AUTHENTICATION_URL, API_BASE_URL } from "../constant";

export const signInWithFacebook = () => {
    window.location.href =  `${API_AUTHENTICATION_URL}/oauth2/authorization/facebook`;
}