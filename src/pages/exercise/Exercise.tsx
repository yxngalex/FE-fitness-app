import {useEffect, useState} from "react";
import {autoCreateDays, getAllDays} from "@/api/day/day.redaxios.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import Routine from "@/components/routine/Routine.tsx";
import Header from "@/components/header/Header.tsx";
import {DayDTO} from "@/model/DayDTO.ts";
import WorkoutRoutineCard from "@/components/card/WorkoutRoutineCard.tsx";

interface ExercisesProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
}

const Exercise = ({errorMessage, successMessage}: ExercisesProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);
    const [currentDay, setCurrentDay] = useState<DayDTO | null>(null);
    const [daysLoaded, setDaysLoaded] = useState<DayDTO[]>([]);

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
                    const closestDay = getClosestDay(today, r);

                    setCurrentDay(closestDay);
                }
            })
            .catch((error) => {
                errorMessage(error.message || "An error occurred");
            });
    }


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

            if (dayDate <= targetDate && (!closest || dayDate > new Date(closest.loggedDate))) {
                return day;
            }

            return closest;
        }, null);

        const closestDayAfter = days.reduce((closest: DayDTO | null, day) => {
            const dayDate = new Date(day.loggedDate);

            if (dayDate > targetDate && (!closest || dayDate < new Date(closest.loggedDate))) {
                return day;
            }

            return closest;
        }, null);

        return closestDayBefore || closestDayAfter || null;
    };


    const handleAutoCreation = () => {
        autoCreateDays().then(r => {
            successMessage(r);
            setShowDialog(false);
            setContentLoaded(true);
        }).catch(error => {
            errorMessage(error.data);
        }).finally(() => {
            loadData();
        })
    }

    return (
        <>
            {showDialog && (
                <div className="flex justify-center items-center h-full">
                    <div className="px-4 pb-2 pt-6 bg-white">
                        <div className="text-lg mb-4">
                            <p className="text-2xl font-bold">
                                It appears that you haven't created any workout plans yet.
                            </p>
                            <p>
                                Would you like to automatically generate workout schedules or
                                prefer to create them manually?
                            </p>
                        </div>
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-slate-500 hover:bg-slate-400 text-white mr-2 hover:text-white"
                                    >
                                        Create Manual Plan
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] lg:max-w-[750px]">
                                    <DialogHeader>
                                        <DialogTitle>Create a Workout Routine.</DialogTitle>
                                        <DialogDescription>
                                            To create a day with a workout routine you need to fill out the form.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Routine successMessage={successMessage} errorMessage={errorMessage}
                                             setShowDialog={setShowDialog}
                                             loadData={loadData} setContentLoaded={setContentLoaded}/>
                                </DialogContent>
                            </Dialog>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-400 text-white hover:text-white"
                                onClick={handleAutoCreation}
                            >
                                Auto Generate Plan
                            </Button>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium mt-10">
                                Note: The system generates days with workout routines based on your preferences,
                                factoring in your desired
                                weekly exercise, weight goal, and primary fitness objective.
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {contentLoaded && (
                <div>
                    <Header errorMessage={errorMessage} currentDay={currentDay} setCurrentDay={setCurrentDay}
                            daysLoaded={daysLoaded}/>
                    <div className="w-full relative flex items-center justify-center mb-9">
                    </div>
                    <WorkoutRoutineCard errorMessage={errorMessage} successMessage={successMessage}
                                        currentDay={currentDay} loadData={loadData} setContentLoaded={setContentLoaded}
                                        setShowDialog={setShowDialog}/>
                </div>
            )}
        </>
    )

}

export default Exercise;