import {DayDTO} from "@/model/DayDTO.ts";
import {FoodDTO} from "@/model/FoodDTO.ts";
import {NutritionDTO} from "@/model/NutritionDTO.ts";

export interface MealDTO {
    dayDTO: DayDTO;
    foodList: FoodDTO[];
    nutrition: NutritionDTO | null;
    mealName: string;
}