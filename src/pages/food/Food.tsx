import {useEffect, useState} from "react";
import {getAllDays, getClosestDay, getDayByDate} from "@/api/day/day.redaxios.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {DayDTO} from "@/model/DayDTO.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import BMRCalculatorCard from "@/components/card/BMRCalculatorCard.tsx";
import DailyNutritionCard from "@/components/card/DailyNutritionCard.tsx";
import DietDailyPlanCard from "@/components/card/DietCard.tsx";

interface FoodProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
}

const Food = ({errorMessage, successMessage}: FoodProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [daysLoaded, setDaysLoaded] = useState<DayDTO[]>([]);
    const [currentDay, setCurrentDay] = useState<DayDTO | null>(null);

    useEffect(() => {
        loadData();
    }, []);

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

                    getDayByDate(today)
                        .then((todayDay) => {
                            setCurrentDay(todayDay);
                        })
                        .catch(() => {
                            getClosestDay(today).then((closestDay) => {
                                setCurrentDay(closestDay);
                            }).catch((error) => {
                                errorMessage(error.message || "An error occurred");
                            });
                        });
                }
            })
            .catch((error) => {
                errorMessage(error.message || "An error occurred");
            });
    };

    const handlePreviousDay = async () => {
        if (currentDay) {
            const currentDayDate = new Date(currentDay.loggedDate);
            const previousDayDate = new Date(currentDayDate);
            previousDayDate.setDate(previousDayDate.getDate() - 1);

            try {
                const response = await getDayByDate(previousDayDate);

                if (response !== null) {
                    setCurrentDay(response);
                } else {
                    errorMessage("No more previous days in history.");
                }
            } catch (error) {
                errorMessage("No more previous days in history.");
            }
        }
    };

    const handleNextDay = async () => {
        if (currentDay) {
            const currentDayDate = new Date(currentDay.loggedDate);
            const nextDayDate = new Date(currentDayDate);
            nextDayDate.setDate(nextDayDate.getDate() + 1);

            try {
                const response = await getDayByDate(nextDayDate);

                if (response !== null) {
                    setCurrentDay(response);
                } else {
                    errorMessage("Visit exercises page to create more days.");
                }
            } catch (error) {
                errorMessage("Visit exercises page to create more days.");
            }
        }
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
                    <div className="p-8 block">
                        <div className="flex justify-between items-center">
                            <span className="text-4xl pb-6 font-bold">
                                {currentDay && new Date(currentDay.loggedDate).toDateString() === new Date().toDateString()
                                    ? 'Today'
                                    : currentDay
                                        ? new Date(currentDay.loggedDate).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                        })
                                        : ''}
                            </span>
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePreviousDay}
                                >
                                    <ArrowLeft/>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextDay}>
                                    <ArrowRight/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full my-16 mx-5">
                        {currentDay &&
                            <BMRCalculatorCard data={currentDay?.bmr} calories={currentDay?.nutritionDTO?.calories}/>}
                        {currentDay && <DailyNutritionCard calories={currentDay?.nutritionDTO?.calories}
                                                           carbs={currentDay?.nutritionDTO?.carbs}
                                                           fat={currentDay?.nutritionDTO?.fat}
                                                           protein={currentDay?.nutritionDTO?.protein}/>}
                        {currentDay && <DietDailyPlanCard errorMessage={errorMessage}
                                                          day={currentDay}
                                                          successMessage={successMessage}/>}
                    </div>
                </div>
            )}
        </>
    )
}

export default Food;