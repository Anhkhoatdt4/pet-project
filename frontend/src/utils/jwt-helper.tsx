import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem("authToken") || null;
}

export const saveToken = (token : string) => {
    localStorage.setItem("authToken", token);
}

export const logOut = () => {
    localStorage.removeItem("authToken");
}

export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
    try{
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds
        // Check if the token is expired
        if (decodedToken.exp && decodedToken.exp < currentTime){
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }

}
