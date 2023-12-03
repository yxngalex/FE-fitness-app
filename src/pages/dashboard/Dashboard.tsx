import {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Apple, Drumstick, Flame, Pizza} from "lucide-react";
import {Link} from "react-router-dom";
import {getOverviewNutrition} from "@/api/overview/overview.redaxios.ts";
import {getUserGoal} from "@/api/goal/goal.redaxios.ts";
import {GoalDTO} from "@/model/GoalDTO.ts";

interface DashboardProps {
    username: string
}

const Dashboard = ({username}: DashboardProps) => {
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
            console.log(r);
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

            <div className="flex w-full justify-around">

                <Link to="/food">
                    <Card className="flex items-center justify-center bg-red-100 mx-4 shadow-red-500 w-72">
                        <CardContent className="flex items-center justify-center h-full py-3">
                            <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                                <Flame className="w-8 h-8 text-red-500"/>
                            </div>
                            <div className="ml-4 flex flex-col">
                                <div className="text-black text-xl">
                                    {calories != null ? calories : 0}
                                </div>
                                <div className="text-slate-500 text-sm">
                                    Avg. calories
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link to="/food">
                    <Card className="flex items-center justify-center bg-blue-100 mx-4 shadow-blue-400 w-72">
                        <CardContent className="flex items-center justify-center h-full py-3">
                            <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                                <Drumstick className="w-8 h-8 text-blue-500"/>
                            </div>
                            <div className="ml-4 flex flex-col">
                                <div className="text-black text-xl">
                                    {protein != null ? protein : 0}
                                </div>
                                <div className="text-slate-500 text-sm">
                                    Avg. proteins
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link to="/food">
                    <Card className="flex items-center justify-center bg-yellow-100 mx-4 shadow-yellow-400 w-72">
                        <CardContent className="flex items-center justify-center h-full py-3">
                            <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                                <Apple className="w-8 h-8 text-yellow-500"/>
                            </div>
                            <div className="ml-4 flex flex-col">
                                <div className="text-black text-xl">
                                    {carbs != null ? carbs : 0}
                                </div>
                                <div className="text-slate-500 text-sm">
                                    Avg. carbs
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link to="/food">
                    <Card className="flex items-center justify-center bg-pink-100 mx-4 shadow-pink-400 w-72">
                        <CardContent className="flex items-center justify-center h-full py-3">
                            <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                                <Pizza className="w-8 h-8 text-pink-500"/>
                            </div>
                            <div className="ml-4 flex flex-col">
                                <div className="text-black text-xl">
                                    {fat != null ? fat : 0}
                                </div>
                                <div className="text-slate-500 text-sm">
                                    Avg. fat
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard;