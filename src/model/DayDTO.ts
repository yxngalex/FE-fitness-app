import {NutritionDTO} from "@/model/NutritionDTO.ts";
import {WorkoutRoutineDTO} from "@/model/WorkoutRoutineDTO.ts";

export interface DayDTO {
    nutritionDTO: NutritionDTO;
    workoutRoutineDTO: WorkoutRoutineDTO;
    loggedDate: Date;
    bmr: number;
}