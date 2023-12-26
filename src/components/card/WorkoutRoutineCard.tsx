import {DayDTO} from "@/model/DayDTO.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import ImageDecoder from "@/util/ImageDecoder.tsx";

interface WorkoutRoutineCardProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
    currentDay: DayDTO | null;
}

const WorkoutRoutineCard = ({errorMessage, successMessage, currentDay}: WorkoutRoutineCardProps) => {

    const formatDate = (date: Date | null | undefined) => {
        const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'short', year: 'numeric'};
        return date ? new Date(date).toLocaleDateString(undefined, options) : '';
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <Card className="w-[800px] h-[700px] bg-slate-50 relative">
                    <CardHeader>
                        <CardTitle className="justify-center items-center flex">Workout Plan</CardTitle>
                        <CardDescription className="justify-center items-center flex pt-2">Your workout plan
                            activities.</CardDescription>
                    </CardHeader>
                    <CardContent className="overflow-y-auto">
                        <div className="text-xl p-1">
                            Workout type: <span
                            className="font-bold">{currentDay?.workoutRoutineDTO?.categoryDTO?.categoryName}</span>
                        </div>
                        {currentDay?.workoutRoutineDTO?.dateFinish && (
                            <div className="flex space-x-1.5 text-lg p-1">
                                <span>Exercise finished on:</span>
                                <span
                                    className="font-bold">{formatDate(currentDay?.workoutRoutineDTO?.dateFinish)}</span>
                            </div>
                        )}
                        <div className="flex flex-col space-y-1.5 text-lg p-1">
                            Exercises:
                        </div>
                        {currentDay?.workoutRoutineDTO?.exerciseStatsDTO.map((exercise, index) => (
                            <div className="flex items-center gap-4 my-6 justify-between w-full" key={index}>
                                <div className="flex align-center gap-3">
                                    <div className="flex align-center gap-3">
                                        <ImageDecoder base64String={exercise.exerciseDTO.image} maxHeight="50"
                                                      maxWidth="50"/>
                                    </div>
                                </div>
                                <div className="flex items-center ml-5 gap-3">
                                    {exercise.exerciseDTO.exerciseName}
                                </div>
                                <div className="flex gap-3 items-center ml-5">
                                    <div className="mr-1"> Sets: {exercise?.set} </div>
                                    <div className="mr-1"> Reps: {exercise?.reps} </div>
                                    <div> Weight: {exercise?.exerciseWeight} </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center">
                        {currentDay?.workoutRoutineDTO?.dateFinish ? null : (
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-400 text-white hover:text-white mr-5"
                            >
                                Finish Workout
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-600 hover:bg-red-400 text-white hover:text-white">
                            Delete Workout Plan
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default WorkoutRoutineCard;