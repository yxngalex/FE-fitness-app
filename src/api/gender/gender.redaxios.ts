import redaxios from "redaxios";

const BASE_URL = "http://localhost:8080/api/enum";
export const getGenders =  async (): Promise<void> => {
    try {
        const response = await redaxios.get(`${BASE_URL}/gender`);
        console.log(response.data)
    } catch (error) {
        console.error(error)
        throw error;
    }
}
