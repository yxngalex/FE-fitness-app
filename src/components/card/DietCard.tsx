import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import 'react-circular-progressbar/dist/styles.css';
import {MealDTO} from "@/model/MealDTO.ts";
import {getAllMealsInaDay} from "@/api/meal/meal.redaxios.ts";
import {DayDTO} from "@/model/DayDTO.ts";


interface DietDailyPlanProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
    day: DayDTO;
}


const DietDailyPlanCard = ({errorMessage, successMessage, day}: DietDailyPlanProps) => {
    const [mealList, setMealList] = useState<MealDTO[]>([]);

    useEffect(() => {
        let mounted = true;

        if (day != null) {
            getAllMealsInaDay(day).then(result => {
                if (mounted) {
                    if (result && Array.isArray(result)) {
                        setMealList(result);
                    } else {
                        errorMessage('Invalid meal list value in API response:');
                    }
                    mounted = false;
                }
            });
        }

        console.log(mealList);

    }, []);


    return (
        <Card className="w-[500px] h-[550px] bg-slate-50">
            <CardHeader>
                <CardTitle className="justify-center items-center flex">Diet daily plan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center">
                    {mealList.length > 0 && (
                        <div>
                            {mealList.map((meal, index) => (
                                <div key={index}>
                                    {meal.mealName}
                                    Foods: {meal.foodEntries.length}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default DietDailyPlanCard;