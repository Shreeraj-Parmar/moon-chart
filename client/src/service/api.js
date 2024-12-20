import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


export const getDataAccFilter = async (data) => {
    try {
        const response = await api.get(`/api?active=${data.active}`);
        return response;
    } catch (error) {
        console.error("Error while Calling getAllData & error Is", error.message);
        // throw error;
    }
};