import {MealDTO} from "@/model/MealDTO.ts";
import {DayDTO} from "@/model/DayDTO.ts";
import {DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {XCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {getAutocompleteFood} from "@/api/food/food.redaxios.ts";
import {createMeal} from "@/api/meal/meal.redaxios.ts";
import {useEffect, useState} from "react";
import {FoodDTO} from "@/model/FoodDTO.ts";

interface MealDialogProps {
    day: DayDTO;
    errorMessage: (error: string) => void;
    successMessage: (success: string) => void;
    refreshTrigger: boolean;
    setRefreshTrigger: (value: boolean) => void;
}

const MealDialog = ({day, errorMessage, successMessage, refreshTrigger, setRefreshTrigger}: MealDialogProps) => {
    const [foodSuggestions, setFoodSuggestions] = useState<FoodDTO[]>([]);
    const [selectedFood, setSelectedFood] = useState<FoodDTO[]>([]);

    type FormValues = {
        mealName: string;
        serving: number;
    }

    useEffect(() => {
        console.log(selectedFood);
    }, [selectedFood])

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

    const onSubmit = async () => {
        await form.trigger()

        const mealWrapper: MealDTO = {
            dayDTO: day,
            foodList: selectedFood,
            nutrition: null,
            mealName: form.getValues("mealName"),
        };

        createMeal(mealWrapper).then(r => {
            setSelectedFood([]);
            successMessage(r);
            setRefreshTrigger(!refreshTrigger);
        }).catch(error => {
            errorMessage(error.data);
        });
    }

    const handleSuggestion = (suggestion: FoodDTO) => {
        setSelectedFood([...selectedFood, suggestion]);
        setFoodSuggestions([]);
    };

    const handleRemoveFood = (index: number) => {
        const updatedList = [...selectedFood];
        updatedList.splice(index, 1);
        setSelectedFood(updatedList);
    }

    return (
        <>
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
                                                <Input
                                                    type="number"
                                                    className="w-[100px]"
                                                    placeholder="Serving"
                                                    value={item.serving}
                                                    onChange={(e) => {
                                                        const servingValue = parseInt(e.target.value, 10);
                                                        if (!isNaN(servingValue) && servingValue > 0) {
                                                            const updatedSelectedFood = [...selectedFood];
                                                            updatedSelectedFood[index].serving = servingValue;
                                                            setSelectedFood(updatedSelectedFood);
                                                        }
                                                    }}
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
        </>
    )

}

export default MealDialog;