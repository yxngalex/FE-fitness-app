import redaxios from "redaxios";
import {DayDTO} from "@/model/DayDTO.ts";

const BASE_URL = "http://localhost:8080/api/day";
export const getDayByDate = async (date: Date): Promise<DayDTO> => {
    const token = localStorage.getItem('token');

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    try {
        const response = await redaxios.get(`${BASE_URL}/getByDate/`, {
            params: {
                date: formattedDate,
            },
            headers: {
                Authorization: `${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e)
        throw e;
    }
};

export const getClosestDay = async (date: Date): Promise<DayDTO> => {
    const token = localStorage.getItem('token');

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    try {
        const response = await redaxios.get(`${BASE_URL}/getClosestDay/`, {
            params: {
                date: formattedDate,
            },
            headers: {
                Authorization: `${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e)
        throw e;
    }
};

export const getAllDays = async (): Promise<DayDTO[]> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found')
        }

        const response = await redaxios.get(`${BASE_URL}/get`, {
            headers: {
                Authorization: `${token}`
            }
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e)
        throw e;
    }
};

export const autoCreateDays = async () => {
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

        const response = await redaxios.post(`${BASE_URL}/auto`, {}, config);
        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e);
        throw e;
    }
};
