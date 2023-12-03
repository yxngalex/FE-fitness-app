import redaxios from "redaxios";

const BASE_URL = "http://localhost:8080/api/goal";
export const getUserGoal = async () => {
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
