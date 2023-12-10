import {GoalDTO} from "@/model/GoalDTO.ts";
import {CategoryDTO} from "@/model/CategoryDTO.ts";
import {ExerciseStatsDTO} from "@/model/ExerciseStatsDTO.ts";
export interface WorkoutRoutineDTO {
    exerciseStatsDTO: ExerciseStatsDTO;
    dateStart: Date;
    dateFinish: Date;
    categoryDTO: CategoryDTO;
    goalDTO: GoalDTO;
}
