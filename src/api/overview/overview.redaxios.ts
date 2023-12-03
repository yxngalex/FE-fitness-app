import redaxios from "redaxios";

const BASE_URL = "http://localhost:8080/api/overview";

export const getOverviewNutrition = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No authentication token found')
        }
        const response = await redaxios.get(`${BASE_URL}/getNutrition`, {
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

export const getFoodEntries = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found')
        }

        const response = await redaxios.get(`${BASE_URL}/getFoodEntries`, {
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
