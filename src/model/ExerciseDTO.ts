import {CategoryDTO} from "@/model/CategoryDTO.ts";

export interface ExerciseDTO {
    categoryDTO: CategoryDTO;
    exerciseName: string;
    exerciseDescription: string;
    image: string;
}
