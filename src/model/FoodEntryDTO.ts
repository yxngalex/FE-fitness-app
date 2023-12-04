import {FoodDTO} from "@/model/FoodDTO.ts";

export interface FoodEntryDTO {
    mealName: string;
    foods: FoodDTO[];
}
