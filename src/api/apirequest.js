import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL || 'https://admin.aventuras.co.in'; // Replace with your API URL

export const API = axios.create({
    baseURL: baseURL,
});
