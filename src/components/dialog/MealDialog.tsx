import {MealDTO} from "@/model/MealDTO.ts";
import {DayDTO} from "@/model/DayDTO.ts";

interface MealDialogProps {
    meal: MealDTO | null;
    day: DayDTO | null;
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
    refreshTrigger: boolean;
    setRefreshTrigger: (value: boolean) => void;
}

const MealDialog = ({meal, day, errorMessage, successMessage, refreshTrigger, setRefreshTrigger}: MealDialogProps) => {
    return (
        <div></div>
    )

}

export default MealDialog;