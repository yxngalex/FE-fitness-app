import redaxios from "redaxios";
import {CategoryDTO} from "@/model/CategoryDTO.ts";

const BASE_URL = "http://localhost:8080/api/category";

export const getAllCategories = async (): Promise<Array<CategoryDTO>> => {
    const token = localStorage.getItem('token');

    try {
        const response = await redaxios.get(`${BASE_URL}/getAll`, {
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
