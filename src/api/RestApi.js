import { api } from "./AxiosInterceptors";
const VITE_API_BASE_URL =  import.meta.env.VITE_APP_API_URL
console.log(VITE_API_BASE_URL)
export const getVendorSeverityCount = async (url) => {
    try {
        const response = await api.get(`${VITE_API_BASE_URL}/api/vendor-severity-count?url=${url}`);
        
        if (response.data && response.statusText === "OK") {
            
           return response.data;
        }
    } catch (error) {
        throw new Error(Error.status.toString())
    }
    return false;
}
export const getMonthCount = async (url) => {
   
    try {
        const response = await api.get(`${VITE_API_BASE_URL}/api/month-count?url=${url}`);
        
        if (response.data && response.statusText === "OK") {
            
           return response.data;
        }
    } catch (error) {
        throw new Error(Error.status.toString())
    }
    return false;
}
export const getTechnologyCount = async (url) => {
   
    try {
        const response = await api.get(`${VITE_API_BASE_URL}/api/technology-count?url=${url}`);
        
        if (response.data && response.statusText === "OK") {
            
           return response.data;
        }
    } catch (error) {
        throw new Error(Error.status.toString())
    }
    return false;
}
export const getVendorCount = async (url) => {
   
    try {
        const response = await api.get(`${VITE_API_BASE_URL}/api/vendor-count?url=${url}`);
        
        if (response.data && response.statusText === "OK") {
            
           return response.data;
        }
    } catch (error) {
        throw new Error(Error.status.toString())
    }
    return false;
}
export const getSeverityCount = async (url) => {
   
    try {
        const response = await api.get(`${VITE_API_BASE_URL}/api/severity-count?url=${url}`);
        
        if (response.data && response.statusText === "OK") {
            
           return response.data;
        }
    } catch (error) {
        throw new Error(Error.status.toString())
    }
    return false;
}




