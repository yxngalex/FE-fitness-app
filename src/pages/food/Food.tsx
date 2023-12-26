import {useEffect, useState} from "react";
import {getAllDays} from "@/api/day/day.redaxios.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {DayDTO} from "@/model/DayDTO.ts";
import BMRCalculatorCard from "@/components/card/BMRCalculatorCard.tsx";
import DailyNutritionCard from "@/components/card/DailyNutritionCard.tsx";
import DietDailyPlanCard from "@/components/card/DietCard.tsx";
import {Fade} from "react-awesome-reveal";
import Header from "@/components/header/Header.tsx";

interface FoodProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
}

const Food = ({errorMessage, successMessage}: FoodProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [daysLoaded, setDaysLoaded] = useState<DayDTO[]>([]);
    const [currentDay, setCurrentDay] = useState<DayDTO | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

    useEffect(() => {
        loadData();
    }, [refreshTrigger]);

    const loadData = () => {
        getAllDays()
            .then((r) => {
                if (Array.isArray(r) && r.length === 0) {
                    setShowDialog(true);
                } else {
                    console.log(r);
                    setContentLoaded(true);
                    setDaysLoaded(r);

                    const today = new Date();
                    const closestDay = getClosestDay(today, r);

                    setCurrentDay(closestDay);
                }
            })
            .catch((error) => {
                errorMessage(error.message || "An error occurred");
            });
    };

    const getClosestDay = (targetDate: Date, days: DayDTO[]) => {
        const formattedTargetDate = targetDate.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'

        const currentDateLogged = days.some(day => {
            const dayDate = new Date(day.loggedDate);
            return dayDate.toISOString().split('T')[0] === formattedTargetDate;
        });

        if (currentDateLogged) {
            const closestDay = days.find(day => {
                const dayDate = new Date(day.loggedDate);
                return dayDate.toISOString().split('T')[0] === formattedTargetDate;
            });

            return closestDay || null;
        }

        const closestDayBefore = days.reduce((closest: DayDTO | null, day) => {
            const dayDate = new Date(day.loggedDate);

            if (dayDate < targetDate && (!closest || dayDate > new Date(closest.loggedDate))) {
                return day;
            }

            return closest;
        }, null);

        return closestDayBefore || null;
    };

    return (
        <>
            {showDialog && (
                <div className="flex justify-center items-center h-full">
                    <div className="px-4 pb-2 pt-6 bg-white">
                        <div className="text-lg mb-4">
                            <p className="text-2xl font-bold">
                                To log food, it is necessary to initially establish days with designated workout
                                routines.
                            </p>
                            <p>
                                Visit the exercises page to initiate this process.
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <Link to="/exercise">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-400 mt-5 text-white hover:text-white"
                                >
                                    Create days
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {contentLoaded && (
                <div>
                    <Header errorMessage={errorMessage} currentDay={currentDay}
                            setCurrentDay={setCurrentDay} daysLoaded={daysLoaded}/>
                    <Fade direction="down">
                        <div className="flex justify-center items-center w-full my-16 mx-5">
                            {currentDay &&
                                <BMRCalculatorCard data={currentDay?.bmr}
                                                   calories={currentDay?.nutritionDTO?.calories}/>}
                            {currentDay && <DailyNutritionCard calories={currentDay?.nutritionDTO?.calories}
                                                               carbs={currentDay?.nutritionDTO?.carbs}
                                                               fat={currentDay?.nutritionDTO?.fat}
                                                               protein={currentDay?.nutritionDTO?.protein}/>}
                            {currentDay && <DietDailyPlanCard errorMessage={errorMessage}
                                                              day={currentDay}
                                                              refreshTrigger={refreshTrigger}
                                                              setRefreshTrigger={setRefreshTrigger}
                                                              successMessage={successMessage}/>}
                        </div>
                    </Fade>
                </div>
            )}
        </>
    )
}

export default Food;