import redaxios from "redaxios";

const BASE_URL = "http://localhost:8080/api/day";
export const getDayByDate = async (date: Date) => {
    const token = localStorage.getItem('token');
    const isoDateString = date.toISOString();

    try {
        const response = await redaxios.get(`${BASE_URL}/getDayByDate/getDayByDate`, {
            params: {
                date: isoDateString,
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

export const getAllDays = async () => {
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
