import axios from 'axios';
import { API_AUTHENTICATION_URL } from '../constant';
import { data } from 'react-router-dom';

export const loginAPI = async (userName: string, password: string) => {
    try {
        let url = `${API_AUTHENTICATION_URL}/auth/login`;
        const response = await axios.post(url, {
            userName,
            password,
        });
        return response?.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

export const registerAPI = async (body : any) => {
    try {
        let url = `${API_AUTHENTICATION_URL}/auth/register`;
        const response = await axios.post(url, body);
        console.log('Response', response?.data);
        return response?.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
}

export const verifyAPI = async (body : any) => {
    let url = `${API_AUTHENTICATION_URL}/auth/verify`;
    try {
        console.log('body', body);
        const response = await axios.post(url, body);
        console.log('Response', response?.data);
        return response?.data;
    }
    catch (error) {
        console.error('Error verifying:', error);
        throw error;
    }
}