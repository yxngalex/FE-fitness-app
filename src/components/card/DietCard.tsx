import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import 'react-circular-progressbar/dist/styles.css';
import {MealDTO} from "@/model/MealDTO.ts";
import {getAllMealsInaDay} from "@/api/meal/meal.redaxios.ts";
import {DayDTO} from "@/model/DayDTO.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {getAutocompleteFood} from "@/api/food/food.redaxios.ts";
import {FoodDTO} from "@/model/FoodDTO.ts";
import {XCircle} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";


interface DietDailyPlanProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
    day: DayDTO;
}


const DietDailyPlanCard = ({errorMessage, successMessage, day}: DietDailyPlanProps) => {
    const [mealList, setMealList] = useState<MealDTO[]>([]);
    const [foodSuggestions, setFoodSuggestions] = useState<FoodDTO[]>([]);
    const [selectedFood, setSelectedFood] = useState<FoodDTO[]>([]);


    useEffect(() => {
        let mounted = true;

        if (day != null) {
            getAllMealsInaDay(day).then(result => {
                if (mounted) {
                    if (result && Array.isArray(result)) {
                        setMealList(result);
                    } else {
                        errorMessage('Invalid meal list value in API response:');
                    }
                    mounted = false;
                }
            });
        }

        console.log(mealList);

    }, []);

    const handleAutocomplete = (input: string) => {
        console.log(input);
        if (input) {
            getAutocompleteFood(input).then(r => {
                setFoodSuggestions(r);
                console.log(foodSuggestions)
            }).catch(error => {
                errorMessage(error.data);
            })
        }
    }

    const handleSuggestion = (suggestion: FoodDTO) => {
        setSelectedFood([...selectedFood, suggestion]);
        setFoodSuggestions([]);
        console.log(selectedFood)
    }

    const handleRemoveFood = (index: number) => {
        const updatedList = [...selectedFood];
        updatedList.splice(index, 1);
        setSelectedFood(updatedList);
    }


    return (
        <Card className="w-[600px] h-[550px] bg-slate-50">
            <CardHeader>
                <CardTitle className="justify-center items-center flex">Diet daily plan</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center">
                    {mealList.length > 0 && (
                        <div>
                            {mealList.map((meal, index) => (
                                <div key={index}>
                                    {meal.mealName}
                                    Foods: {meal.foodEntries.length}
                                </div>
                            ))}
                        </div>
                    )}
                    {mealList.length === 0 && (
                        <div className="flex flex-col items-center justify-center mt-14">
                            <div className="mb-4 text-center">
                                There are no meals for this day.
                            </div>
                            <div className="flex items-center justify-center">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-blue-600 hover:bg-blue-400 text-white hover:text-white">
                                            Add a meal
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] lg:max-w-[550px]">
                                        <DialogHeader className="flex justify-center items-center">
                                            <DialogTitle>
                                                {day ? (
                                                    new Date(day.loggedDate).toDateString() === new Date().toDateString()
                                                        ? "Add today's meal"
                                                        : `Add a meal for ${new Date(day.loggedDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}`
                                                ) : ''}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="flex justify-center items-center">
                                            <Input type="text" className="w-1/2" placeholder="Meal name"/>
                                        </div>
                                        <div className="flex justify-center items-center relative">
                                            <div className="block w-1/2">
                                                <Input type="text" placeholder="Add a food..." className="w-full"
                                                       onChange={(e) => handleAutocomplete(e.target.value)}/>
                                                <div className="absolute w-1/2">
                                                    {foodSuggestions && foodSuggestions.map((suggestion, i) =>
                                                        <div key={i}
                                                             className="justify-center block cursor-pointer border-r bg-white border-b border-l hover:bg-blue-500 hover:text-white"
                                                             onClick={() => handleSuggestion(suggestion)}
                                                        >
                                                            {suggestion.foodName}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {selectedFood.length > 0 && (
                                            <div>
                                                {
                                                    selectedFood.map((item, index) => (
                                                        <div
                                                            className="flex items-center gap-4 my-6 justify-between w-full"
                                                            key={index}>
                                                            <div className="flex align-center gap-3">
                                                                <div>
                                                                    {item?.foodName}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center ml-5 gap-3">
                                                                    <Label>Serving: </Label>
                                                                    <Input type="number" className="w-[100px]"
                                                                           placeholder="Reps" defaultValue={item?.serving}/>
                                                                    <XCircle className="text-red-500 cursor-pointer"
                                                                             onClick={() => handleRemoveFood(index)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )}
                                        <div className="flex justify-center items-center">
                                            <DialogClose asChild>
                                                <Button type="submit"
                                                        className="bg-blue-600 hover:bg-blue-400 w-1/2 text-white hover:text-white">
                                                    Add a meal
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default DietDailyPlanCard;