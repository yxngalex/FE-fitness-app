import redaxios from "redaxios";

const BASE_URL = "http://localhost:8080/api/enum";
export const getBodyType = async () => {
    const response = await redaxios.get(`${BASE_URL}/bodyType`);
    return response.data;
};
