import {DayDTO} from "@/model/DayDTO.ts";
import {FoodDTO} from "@/model/FoodDTO.ts";
import {NutritionDTO} from "@/model/NutritionDTO.ts";

export interface MealDTO {
    day: DayDTO;
    foodEntries: FoodDTO[];
    nutritionDTO: NutritionDTO;
    mealName: string;
}
