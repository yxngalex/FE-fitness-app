import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import 'react-circular-progressbar/dist/styles.css';
import {MealDTO} from "@/model/MealDTO.ts";
import {createMeal, deleteMeal, getAllMealsInaDay, removeFoodFromMeal} from "@/api/meal/meal.redaxios.ts";
import {DayDTO} from "@/model/DayDTO.ts";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Input} from "@/components/ui/input.tsx";
import {getAutocompleteFood} from "@/api/food/food.redaxios.ts";
import {FoodDTO} from "@/model/FoodDTO.ts";
import {Pen, XCircle} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import MealDialog from "@/components/dialog/MealDialog.tsx";


interface DietDailyPlanProps {
    errorMessage: (error: string | null) => void;
    successMessage: (success: string | null) => void;
    refreshTrigger: boolean;
    setRefreshTrigger: (value: boolean) => void;
    day: DayDTO;
}


const DietDailyPlanCard = ({
                               errorMessage,
                               successMessage,
                               day,
                               refreshTrigger,
                               setRefreshTrigger
                           }: DietDailyPlanProps) => {
        const [mealList, setMealList] = useState<MealDTO[]>([]);
        const [foodSuggestions, setFoodSuggestions] = useState<FoodDTO[]>([]);
        const [selectedFood, setSelectedFood] = useState<FoodDTO[]>([]);
        const [selectedMeal, setSelectedMeal] = useState<MealDTO | null>(null);


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
        }, [day]);

        useEffect(() => {
        }, [selectedMeal])

        useEffect(() => {
        }, [selectedFood])

        const handleAutocomplete = (input: string) => {
            if (input) {
                getAutocompleteFood(input).then(r => {
                    setFoodSuggestions(r);
                }).catch(error => {
                    errorMessage(error.data);
                })
            }
        }

        const handleEditMeal = (meal: MealDTO) => {
            setSelectedMeal(meal);
            if (meal.foodList.length > 0) {
                setSelectedFood(meal.foodList);
            }
        };

        const handleSuggestion = (suggestion: FoodDTO) => {
            setSelectedFood([...selectedFood, suggestion]);
            setFoodSuggestions([]);
        };

        const handleRemoveMeal = (meal: MealDTO) => {
            deleteMeal(meal).then(r => {
                successMessage(r);
                setRefreshTrigger(!refreshTrigger);
            }, error => {
                errorMessage(error.data);
            });
        }

        const handleRemoveFoodFromMeal = (food: FoodDTO) => {

            if (!selectedMeal) {
                errorMessage('No meal selected');
                return;
            }

            selectedMeal.foodList = [food];

            removeFoodFromMeal(selectedMeal!).then((response) => {
                successMessage(response);

                setRefreshTrigger(!refreshTrigger);
            }).catch((error) => {
                errorMessage(error.data);
            });
        };

        const updateMeal = (mealToUpdate: MealDTO) => {
            mealToUpdate.foodList = mealToUpdate.foodList || [];

            const newFoods: FoodDTO[] = [];

            selectedFood.forEach(newFood => {
                if (!mealToUpdate.foodList.some(existingFood => existingFood.foodName === newFood.foodName)) {
                    newFoods.push(newFood);
                }
            });

            mealToUpdate.foodList = newFoods;

            createMeal(mealToUpdate).then(r => {
                successMessage(r);
                setRefreshTrigger(!refreshTrigger);
            }).catch(error => {
                errorMessage(error.data);
            });
        }

        return (
            <Card className="w-[600px] relative min-h-[550px] h-full bg-slate-50 overflow-y-auto">
                <CardHeader>
                    <CardTitle className="justify-center items-center flex">Diet daily plan</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center bg-blue-100 rounded-md px-2 h-full justify-center">
                        {mealList.length > 0 && (
                            <>
                                {mealList.map((meal, index) => (
                                    <div className="flex items-center gap-4 my-6 justify-between w-full" key={index}>
                                        <Dialog>
                                            <div className="flex align-center gap-3">
                                                {meal.mealName}
                                            </div>
                                            <div className="flex items-center ml-5 gap-3">
                                                Foods: {meal.foodList.length}
                                            </div>
                                            <div className="flex gap-3 items-center ml-5">
                                                <DialogTrigger asChild>
                                                    <Button className="bg-transparent hover:bg-transparent">
                                                        <Pen className="text-blue-500 cursor-pointer"
                                                             onClick={() => handleEditMeal(meal)}/>
                                                    </Button>
                                                </DialogTrigger>
                                                <XCircle className="text-red-500 cursor-pointer"
                                                         onClick={() => handleRemoveMeal(meal)}/>
                                            </div>
                                            {/*<div className="flex items-center ml-2">*/}
                                            {/*</div>*/}
                                            <DialogContent>
                                                <DialogHeader className="flex justify-center items-center">
                                                    <DialogTitle>
                                                        Meal details
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Add or remove food for the existing meal.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="flex justify-center items-center my-6">
                                                    <Label>Meal name:</Label>
                                                    <Input type="text" placeholder="foodName" defaultValue={meal.mealName}
                                                           className="w-1/2 ml-3" disabled/>
                                                </div>
                                                <hr className="border-t border-gray-300"/>
                                                <div>
                                                    <div className="flex justify-center items-center my-6">
                                                        Foods:
                                                    </div>
                                                    <div className="flex justify-center items-center my-6">
                                                        <div className="block w-1/2 ml-3">
                                                            <Input type="text" placeholder="Search a food to add..."
                                                                   className="w-full"
                                                                   onChange={e => handleAutocomplete(e.target.value)}/>
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
                                                    <div className="my-16">
                                                        {selectedFood.map((food, index) => (
                                                            <div className="flex justify-between items-center my-3"
                                                                 key={index}>
                                                                <div className="ml-3">
                                                                    {food.foodName}
                                                                </div>
                                                                <div>
                                                                    {food.foodGroup}
                                                                </div>
                                                                <div className="mr-3">
                                                                    <DialogClose asChild>
                                                                        <XCircle className="text-red-500 cursor-pointer"
                                                                                 onClick={() => handleRemoveFoodFromMeal(food)}/>
                                                                    </DialogClose>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <hr className="border-t border-gray-300"/>
                                                <DialogClose asChild>
                                                    <div className="flex justify-center items-center mt-4">
                                                        <Button
                                                            onClick={() => updateMeal(selectedMeal!)}
                                                            className="bg-blue-600 hover:bg-blue-400 text-white hover:text-white">
                                                            Update meal
                                                        </Button>
                                                    </div>
                                                </DialogClose>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ))}
                                <div className="absolute bottom-5">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="bg-blue-600 self-end justify-self-end w-96 hover:bg-blue-400 text-white hover:text-white">
                                                New meal
                                            </Button>
                                        </DialogTrigger>
                                        <MealDialog day={day}
                                                    errorMessage={errorMessage}
                                                    successMessage={successMessage}
                                                    refreshTrigger={refreshTrigger}
                                                    setRefreshTrigger={setRefreshTrigger}/>
                                    </Dialog>
                                </div>
                            </>
                        )}
                        {mealList.length === 0 && (
                            <div className="flex flex-col items-center justify-center">
                                <div className="p-5 text-center">
                                    There are no meals for this day.
                                </div>
                                <div className="flex items-center justify-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <div className="absolute bottom-5">
                                                <Button
                                                    className="bg-blue-600 hover:bg-blue-400 w-96 text-white hover:text-white">
                                                    Add a meal
                                                </Button>
                                            </div>
                                        </DialogTrigger>
                                        <MealDialog day={day} errorMessage={errorMessage} successMessage={successMessage}
                                                    refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger}/>
                                    </Dialog>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    }
;

export default DietDailyPlanCard;