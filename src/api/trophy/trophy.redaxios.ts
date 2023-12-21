import redaxios from "redaxios";
import {TrophyUserDTO} from "@/model/TrophyUserDTO.ts";

const BASE_URL = "http://localhost:8080/api/trophy";
export const welcomeTrophy = async (): Promise<TrophyUserDTO> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const config = {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await redaxios.post(`${BASE_URL}/welcome`, {}, config);
        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e);
        throw e;
    }
};