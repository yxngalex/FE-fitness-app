import {useEffect, useState} from "react";
import {autoCreateDays, getAllDays} from "@/api/day/day.redaxios.ts";
import {Button} from "@/components/ui/button.tsx";

interface ExercisesProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
}

const Exercises = ({errorMessage, successMessage}: ExercisesProps) => {
    const [showDialog, setShowDialog] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getAllDays()
            .then((r) => {
                if (Array.isArray(r) && r.length === 0) {
                    setShowDialog(true);
                } else {
                    setContentLoaded(true);
                }
            })
            .catch((error) => {
                errorMessage(error.message || "An error occurred");
            });
    };

    const handleAutoCreation = () => {
        autoCreateDays().then(r => {
            setShowDialog(false);
            setContentLoaded(true);
            loadData()
            successMessage(r);
        }).catch(error => {
            errorMessage(error.data);
        })
    }

    const handleManualCreation = () => {
        //TODO: handle manual creation
    }

    return (
        <>
            {showDialog && (
                <div className="flex justify-center items-center h-screen">
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
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-slate-500 hover:bg-slate-400 text-white mr-2"
                            >
                                Create Manual Plan
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-400 text-white hover:text-white"
                                onClick={handleAutoCreation}
                            >
                                Auto Generate Plan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {contentLoaded && (
                <div>
                    <p>Other content loaded.</p>
                </div>
            )}
        </>
    )

}

export default Exercises;