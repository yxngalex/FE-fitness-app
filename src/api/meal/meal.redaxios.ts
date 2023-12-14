import redaxios from "redaxios";
import {DayDTO} from "@/model/DayDTO.ts";
import {MealDTO} from "@/model/MealDTO.ts";

const BASE_URL = "http://localhost:8080/api/meal";

export const getAllMealsInaDay = async (day: DayDTO): Promise<MealDTO[]> => {
    try {
        const token = localStorage.getItem('token');

        const response = await redaxios.post(`${BASE_URL}/getAllMealsInADay/`, {
            day: day,
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        if (response.status === 404) {
            return [];
        }

        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e)
        throw e;
    }
};
