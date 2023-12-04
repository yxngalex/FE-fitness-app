import {NutritionDTO} from "@/model/NutritionDTO.ts";

export interface FoodDTO {
    nutritionDTO: NutritionDTO;
    foodName: string;
    foodGroup: string;
    serving: number;
}
