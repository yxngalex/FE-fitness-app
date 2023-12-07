import {TrophyDTO} from "@/model/TrophyDTO.ts";

export interface TrophyUserDTO {
    trophy: TrophyDTO;
    dateAchived: Date;
    isAchived: boolean;
}
