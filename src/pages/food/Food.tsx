import {useEffect, useState} from "react";
import {getAllDays} from "@/api/day/day.redaxios.ts";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";

interface FoodProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
}

const Food = ({errorMessage, successMessage}: FoodProps) => {
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
                    console.log(r)
                    setContentLoaded(true);
                }
            })
            .catch((error) => {
                errorMessage(error.message || "An error occurred");
            });
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
                    <p>Food Page</p>
                </div>
            )}
        </>
    )
}

export default Food;