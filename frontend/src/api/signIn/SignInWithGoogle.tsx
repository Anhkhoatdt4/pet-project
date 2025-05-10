import { API_AUTHENTICATION_URL, API_BASE_URL } from "../constant";

export const signInWithGoogle = () => {
    window.location.href = API_AUTHENTICATION_URL + "/oauth2/authorization/google";
};
