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
import {useForm} from "react-hook-form";
import {FormItem} from "@/components/ui/form.tsx";


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
            console.log(mealList);
        }, [day]);

        useEffect(() => {
            console.log(selectedMeal);
        }, [selectedMeal])

        useEffect(() => {
            console.log(selectedFood);
        }, [selectedFood])

        type FormValues = {
            mealName: string;
            serving: number;
        }

        const form = useForm<FormValues>({
            defaultValues: {
                mealName: '',
                serving: 1
            },
        });

        const {register, handleSubmit} = form;


        const handleAutocomplete = (input: string) => {
            console.log(input);
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

        const handleRemoveFood = (index: number) => {
            const updatedList = [...selectedFood];
            updatedList.splice(index, 1);
            setSelectedFood(updatedList);
        }

        const handleRemoveMeal = (meal: MealDTO) => {
            deleteMeal(meal).then(r => {
                successMessage(r);
                setRefreshTrigger(!refreshTrigger);
            }, error => {
                errorMessage(error.data);
            });
        }

        const handleRemoveFoodFromMeal = (food: FoodDTO) => {
            setSelectedMeal((prevSelectedMeal: MealDTO | null) => {
                if (!prevSelectedMeal) {
                    return prevSelectedMeal;
                }

                const updatedFoods: FoodDTO[] = [];

                updatedFoods.push(food);

                const updatedMeal: MealDTO = {
                    ...prevSelectedMeal,
                    foodList: updatedFoods,
                };

                return updatedMeal;
            });

            removeFoodFromMeal(selectedMeal!).then(r => {
                if (!selectedMeal) {
                    errorMessage('No meal selected');
                    return;
                }
                successMessage(r);
                setRefreshTrigger(!refreshTrigger);
            }).catch(error => {
                errorMessage(error.data);
            });
        }

        const updateMeal = (mealToUpdate: MealDTO) => {
            console.log(mealToUpdate);
            if (mealToUpdate.foodList.length === 0) {
                mealToUpdate.foodList = selectedFood;
            }

            createMeal(mealToUpdate).then(r => {
                successMessage(r);
                setRefreshTrigger(!refreshTrigger);
            }).catch(error => {
                errorMessage(error.data);
            });
        }

        const onSubmit = async () => {
            await form.trigger()

            const mealWrapper: MealDTO = {
                dayDTO: day,
                foodList: selectedFood,
                nutrition: null,
                mealName: form.getValues("mealName"),
            };

            createMeal(mealWrapper).then(r => {
                successMessage(r);
                setRefreshTrigger(!refreshTrigger);
                console.log('Refresh triggered:', refreshTrigger);
            }).catch(error => {
                errorMessage(error.data);
            });
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
                                    <div className="flex items-center gap-4 my-6 justify-between w-full" key={index}>
                                        <Dialog>
                                            <div className="flex align-center gap-3">
                                                {meal.mealName}
                                            </div>
                                            <div className="flex items-center ml-5 gap-3">
                                                Foods: {meal.foodList.length}
                                            </div>
                                            <div className="flex items-center ml-5">
                                                <DialogTrigger asChild>
                                                    <Button className="bg-transparent hover:bg-transparent">
                                                        <Pen className="text-blue-500 cursor-pointer"
                                                             onClick={() => handleEditMeal(meal)}/>
                                                    </Button>
                                                </DialogTrigger>
                                            </div>
                                            <div className="flex items-center ml-2">
                                                <XCircle className="text-red-500 cursor-pointer"
                                                         onClick={() => handleRemoveMeal(meal)}/>
                                            </div>
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
                                <div>
                                    <Button className="bg-blue-600 hover:bg-blue-400 text-white hover:text-white">
                                        New meal
                                    </Button>
                                </div>
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
                                                            : `Add a meal for ${new Date(day.loggedDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}`
                                                    ) : ''}
                                                </DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="flex justify-center items-center my-6">
                                                    <FormItem className="w-1/2">
                                                        <Input type="text"
                                                               placeholder="Meal name" {...register("mealName")}/>
                                                    </FormItem>
                                                </div>
                                                <div className="flex justify-center items-center relative my-6">
                                                    <div className="block w-1/2">
                                                        <Input type="text" placeholder="Add a food..." className="w-full"
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
                                                                            <Input type="number"
                                                                                   className="w-[100px]"
                                                                                   placeholder="Reps"
                                                                                   defaultValue={item?.serving}
                                                                                   {...register(`serving`)}
                                                                            />
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
                                            </form>
                                        </DialogContent>
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