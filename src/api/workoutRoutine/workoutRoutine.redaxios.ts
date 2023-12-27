import redaxios from "redaxios";
import {WorkoutRoutineDTO} from "@/model/WorkoutRoutineDTO.ts";

const BASE_URL = "http://localhost:8080/api/routine";


export const updateWorkoutRoutine = async (updatedWorkoutRoutine: WorkoutRoutineDTO): Promise<string> => {
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

        const response = await redaxios.post(`${BASE_URL}/update`, updatedWorkoutRoutine, config);
        return response.data;
    } catch (e) {
        console.error('Error fetching data:', e);
        throw e;
    }
};

