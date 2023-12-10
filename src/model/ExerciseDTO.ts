import {CategoryDTO} from "@/model/CategoryDTO.ts";

export interface ExerciseDTO {
    category: CategoryDTO;
    exerciseName: string;
    exerciseDescription: string;
    image: string;
}
