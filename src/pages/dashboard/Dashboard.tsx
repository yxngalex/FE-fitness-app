import {useEffect, useState} from "react";
import {getOverviewNutrition} from "@/api/overview/overview.redaxios.ts";
import {getUserGoal} from "@/api/goal/goal.redaxios.ts";
import {GoalDTO} from "@/model/GoalDTO.ts";
import NutritionCard from "@/components/card/NutritionCard.tsx";
import GoalCard from "@/components/card/GoalCard.tsx";

interface DashboardProps {
    username: string,
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
}

const Dashboard = ({username, errorMessage, successMessage}: DashboardProps) => {
    const [greeting, setGreeting] = useState('');
    const [calories, setCalories] = useState(0);
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [goal, setGoal] = useState<GoalDTO | undefined>(undefined);

    useEffect(() => {
        const getCurrentTimeOfDay = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 5 && currentHour < 12) {
                setGreeting('Good Morning');
            } else if (currentHour >= 12 && currentHour < 18) {
                setGreeting('Good Afternoon');
            } else {
                setGreeting('Good Evening');
            }
        };

        getCurrentTimeOfDay();
    }, []);

    useEffect(() => {
        getOverviewNutrition().then(r => {
                console.log(r);
                setCalories(r.calories);
                setProtein(r.protein);
                setCarbs(r.carbs);
                setFat(r.fat);
            }
        ).catch(e => {
            console.log("Overview nutrition error: ", e);
        });
    }, []);

    useEffect(() => {
        getUserGoal().then(r => {
            const newGoalData: GoalDTO = {
                weightGoal: r.weightGoal,
                bodyTypeGoal: r.bodyTypeGoal,
                weeklyExercise: r.weeklyExercise
            }

            setGoal(newGoalData);
        })

    }, [])

    return (
        <div>
            <div className="p-8 block">
                <span className="text-4xl flex pb-6">{greeting} {username}</span>
                <span className="flex-1">Let's see your stats!</span>
            </div>
            <NutritionCard calories={calories} protein={protein} carbs={carbs} fat={fat}/>
            <div className="mx-8 my-9">
                {goal && <GoalCard bodyTypeGoal={goal!.bodyTypeGoal} weeklyExercise={goal!.weeklyExercise}
                                   weightGoal={goal!.weightGoal} errorMessage={errorMessage}
                                   successMessage={successMessage}/>}
            </div>
        </div>
    )
}

export default Dashboard;