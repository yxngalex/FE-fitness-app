import {NutritionDTO} from "@/model/NutritionDTO.ts";
import {WorkoutRoutineDTO} from "@/model/WorkoutRoutineDTO.ts";

export interface DayDTO {
    nutritionDTO: NutritionDTO | null;
    workoutRoutineDTO: WorkoutRoutineDTO;
    loggedDate: Date;
    bmr: number | null;
}