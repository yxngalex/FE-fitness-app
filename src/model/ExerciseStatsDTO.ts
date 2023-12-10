import {ExerciseDTO} from "@/model/ExerciseDTO.ts";

export interface ExerciseStatsDTO {

    set: number;
    reps: number;
    exerciseWeight: number;
    exerciseDTO: ExerciseDTO;
}