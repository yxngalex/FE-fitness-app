import {DayDTO} from "@/model/DayDTO.ts";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";

interface HeaderProps {
    errorMessage: (error: string) => void;
    currentDay: DayDTO | null;
    setCurrentDay: (day: DayDTO) => void;
    daysLoaded: DayDTO[];
}

const Header = ({currentDay, errorMessage, daysLoaded, setCurrentDay}: HeaderProps) => {
    const handleNextDay = () => {
        if (currentDay && daysLoaded.length > 0) {
            const currentIndex = daysLoaded.findIndex(day => {
                const dayDate = new Date(day.loggedDate);
                const currentDayDate = new Date(currentDay.loggedDate);
                return dayDate.toISOString().split('T')[0] === currentDayDate.toISOString().split('T')[0];
            });

            if (currentIndex > 0) {
                const previousDay = daysLoaded[currentIndex - 1];
                setCurrentDay(previousDay);
            } else {
                errorMessage("Visit exercises page to create more days.");
            }
        }
    };


    const handlePreviousDay = () => {
        if (currentDay && daysLoaded.length > 0) {
            const currentIndex = daysLoaded.findIndex(day => {
                const dayDate = new Date(day.loggedDate);
                const currentDayDate = new Date(currentDay.loggedDate);
                return dayDate.toISOString().split('T')[0] === currentDayDate.toISOString().split('T')[0];
            });

            if (currentIndex < daysLoaded.length - 1) {
                const nextDay = daysLoaded[currentIndex + 1];
                setCurrentDay(nextDay);
            } else {
                errorMessage("No more previous days in history.");
            }
        }
    };

    return (
        <div className="p-8 block">
            <div className="flex justify-between items-center">
                            <span className="text-4xl pb-3 font-bold">
                                {currentDay && (
                                    <>
                                        {new Date(currentDay.loggedDate).toDateString() === new Date().toDateString()
                                            ? (
                                                <>
                                                    <div className="">Today</div>
                                                    <div
                                                        className="text-lg">{new Date(currentDay.loggedDate).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                    })}</div>
                                                </>
                                            )
                                            : (
                                                <div>
                                                    {new Date(currentDay.loggedDate).toLocaleDateString('en-US', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                    })}
                                                </div>
                                            )
                                        }
                                    </>
                                )}
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
    )
}

export default Header;