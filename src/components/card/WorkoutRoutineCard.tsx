import {DayDTO} from "@/model/DayDTO.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import ImageDecoder from "@/util/ImageDecoder.tsx";
import {CheckCheck, Eye, PlusCircle, XCircle} from "lucide-react";
import {updateWorkoutRoutine} from "@/api/workoutRoutine/workoutRoutine.redaxios.ts";
import {deleteDay} from "@/api/day/day.redaxios.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import Routine from "@/components/routine/Routine.tsx";

interface WorkoutRoutineCardProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
    currentDay: DayDTO | null;
    setContentLoaded: (contentLoaded: boolean) => void;
    setShowDialog: (showDialog: boolean) => void;
    refreshTrigger: boolean;
    setRefreshTrigger: (value: boolean) => void;
    loadData: () => void;
}

const WorkoutRoutineCard = ({
                                errorMessage,
                                successMessage,
                                currentDay,
                                setContentLoaded,
                                setShowDialog,
                                refreshTrigger,
                                setRefreshTrigger,
                                loadData
                            }: WorkoutRoutineCardProps) => {

    const formatDate = (date: Date | null | undefined) => {
        const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'short', year: 'numeric'};
        return date ? new Date(date).toLocaleDateString(undefined, options) : '';
    };

    const handleFinishWorkout = () => {
        const workoutRoutineToUpdate = currentDay?.workoutRoutineDTO;

        if (!workoutRoutineToUpdate) {
            errorMessage("Workout routine not found");
            return;
        }

        workoutRoutineToUpdate.dateFinish = new Date();

        updateWorkoutRoutine(workoutRoutineToUpdate).then(r => {
            successMessage(r);
        }).catch(error => {
            errorMessage(error.message || "An error occurred");
        })
    }

    const handleDeleteDay = () => {
        deleteDay(currentDay!).then(r => {
            successMessage(r);
            setRefreshTrigger(!refreshTrigger);
        }).catch(error => {
            errorMessage(error.message || "An error occurred");
        })
    }

    return (
        <>
            <div className="flex items-center justify-center">
                <Card className="w-[800px] h-[650px] bg-slate-50 relative">
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
                                    <div className="flex align-center gap-3 max-w-[50px] max-h-[50px]">
                                        <ImageDecoder base64String={exercise.exerciseDTO.image}/>
                                    </div>
                                </div>
                                <div className="flex items-center ml-5 gap-3">
                                    {exercise.exerciseDTO.exerciseName}
                                </div>
                                <div className="flex gap-3 items-center ml-5">
                                    <div className="mr-1"> Sets: {exercise?.set} </div>
                                    <div className="mr-1"> Reps: {exercise?.reps} </div>
                                    <div className="mr-1"> Weight: {exercise?.exerciseWeight} </div>
                                    {/*add dialog with view details here*/}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="group relative text-blue-600 hover:text-blue-400 bg-transparent hover:bg-transparent border-0  mr-5"
                                            >
                                                <Eye/>
                                                <span
                                                    className="absolute top-1/2 ms-4 translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                                                    Exercise Details
                                                </span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader className="flex items-center justify-center">
                                                <DialogTitle>Exercise Details</DialogTitle>
                                                <DialogDescription>{exercise.exerciseDTO.exerciseName}</DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col space-y-1.5 text-lg p-1">
                                                <div className="flex items-center justify-center gap-3">
                                                    <div
                                                        className="flex align-center gap-3 max-w-[550px] max-h-[550px]">
                                                        <ImageDecoder base64String={exercise.exerciseDTO.image}/>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-center gap-3">
                                                    {exercise.exerciseDTO.exerciseDescription}
                                                </div>
                                                <div className="flex gap-6 items-center justify-center py-6">
                                                    <div> Sets: {exercise?.set} </div>
                                                    <div> Reps: {exercise?.reps} </div>
                                                    <div> Weight: {exercise?.exerciseWeight} </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="absolute bottom-0 left-0 right-0 p-4 flex justify-center items-center">
                        {currentDay?.workoutRoutineDTO?.dateFinish ? null : (
                            <div className="group relative mr-5">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-3xl border-slate-400 bg-transparent hover:bg-blue-400 text-white hover:text-white"
                                    onClick={handleFinishWorkout}
                                >
                                    <CheckCheck className="text-blue-600 hover:text-white"/>
                                    <span
                                        className="absolute top-1/2 ms-4 translate-y-3/4 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                                            Finish Workout
                                    </span>
                                </Button>
                            </div>
                        )}
                        <div className="group relative mr-5">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-3xl border-slate-400 bg-transparent hover:bg-slate-400 text-white hover:text-white"
                                    >
                                        <PlusCircle className="text-slate-600 hover:text-white"/>
                                        <span
                                            className="absolute top-1/2 ms-4 translate-y-3/4 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                                                Create Workout
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <Routine errorMessage={errorMessage} successMessage={successMessage}
                                             setContentLoaded={setContentLoaded} setShowDialog={setShowDialog}
                                             loadData={loadData}/>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="group relative mr-5">
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-3xl border-slate-400 bg-transparent hover:bg-red-400 text-white hover:text-white"
                                onClick={handleDeleteDay}
                            >
                                <XCircle className="group relative text-red-600 hover:text-white"
                                         onClick={handleDeleteDay}/>
                                <span
                                    className="absolute top-1/2 ms-4 translate-y-3/4 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                                        Delete Workout
                                </span>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

export default WorkoutRoutineCard;