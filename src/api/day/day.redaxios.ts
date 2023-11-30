import redaxios from "redaxios";

const BASE_URL = "http://localhost:8080/api/day";
export const getDayByDate = async (date: Date) => {
    const isoDateString = date.toISOString();

    try {
        const response = await redaxios.get(`${BASE_URL}/getDayByDate/getDayByDate`, {
            params: {
                date: isoDateString,
            }
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e)
        throw e;
    }
};
