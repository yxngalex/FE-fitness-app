import {Button} from "@/components/ui/button.tsx";
import {DialogClose} from "@/components/ui/dialog.tsx";
import {Form, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangeEvent, useEffect, useState} from "react";
import {ExerciseDTO} from "@/model/ExerciseDTO.ts";
import {getAllExercise} from "@/api/exercise/exercise.redaxios.ts";
// import {ExerciseStatsDTO} from "@/model/ExerciseStatsDTO.ts";
import {CategoryDTO} from "@/model/CategoryDTO.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon, XCircle} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {getAllCategories} from "@/api/category/category.redaxios.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";


interface RoutineProps {
    errorMessage: (error: string | null) => void;
    successMessage: (error: string | null) => void;
}

const Routine = ({errorMessage, successMessage}: RoutineProps) => {
    const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | undefined>(undefined);
    const [fetchedCategoryList, setFetchedCategoryList] = useState<CategoryDTO[]>([]);
    const [fetchedExerciseList, setFetchedExerciseList] = useState<ExerciseDTO[]>([]);
    const [selectedExercisesList, setSelectedExercisesList] = useState<Array<ExerciseDTO | undefined>>([]);
    const [selectedExercise, setSelectedExercise] = useState<ExerciseDTO | undefined>(undefined);
    const [date, setDate] = useState<Date>();

    useEffect(() => {
        getAllExercise().then(r => {
            setFetchedExerciseList(r);
        }).catch(error => {
            errorMessage(error.data);
        })
    }, [errorMessage]);

    useEffect(() => {
        getAllCategories().then(r => {
            setFetchedCategoryList(r);
        }).catch(error => {
            errorMessage(error.data);
        })

        console.log(fetchedCategoryList)
    }, [errorMessage]);

    const formSchema = z.object({
        exercise: z.object({
            exerciseName: z.string()
            //     ...
        }),
        set: z.string(),
        reps: z.string(),
        exerciseWeight: z.string(),
        dateStart: z.string(),
        dateFinish: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            exercise: {
                exerciseName: "",
            },
            set: "",
            reps: "",
            exerciseWeight: "",
            dateStart: "",
            dateFinish: "",
        },
    })

    const {register, handleSubmit} = form;

    const handleExerciseChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        const selectedExerciseName = event.target.value;

        const isExerciseAlreadySelected = selectedExercisesList.some(
            (ex) => ex?.exerciseName === selectedExerciseName
        );

        if (!isExerciseAlreadySelected) {
            const exercise = fetchedExerciseList.find((ex) => ex.exerciseName === selectedExerciseName);
            const updatedExerciseList = [...selectedExercisesList, exercise];
            setSelectedExercisesList(updatedExerciseList);

            setSelectedExercise(exercise);
        }
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryName = event.target.value;
        const category = fetchedCategoryList.find((cat) => cat.categoryName === selectedCategoryName);
        setSelectedCategory(category);
    };

    const handleRemoveExercise = (index: number) => {
        const updatedList = [...selectedExercisesList];
        updatedList.splice(index, 1);
        setSelectedExercisesList(updatedList);
    };

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormItem className="my-6">
                        <label htmlFor="exercise">Select an Exercise</label>
                        <select
                            id="exercise"
                            name="exercise"
                            className="w-full cursor-pointer h-10 px-3 mt-1 mb-2 text-base placeholder-gray-600 border rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                            value={selectedExercise?.exerciseName || ''}
                            onChange={handleExerciseChange}
                        >
                            <option value="" disabled>Select an exercise</option>
                            {fetchedExerciseList.map((exercise, index) => (
                                <option key={index} value={exercise.exerciseName}>
                                    {exercise.exerciseName}
                                </option>
                            ))}
                        </select>
                    </FormItem>
                    {selectedExercisesList.length > 0 && (
                        <div>
                            {
                                selectedExercisesList.map((item, index) => (
                                    <div className="flex items-center gap-4 my-3 justify-between w-full" key={index} >
                                        <div className="flex align-center gap-3">
                                            <div>
                                        {item?.exerciseName}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center ml-5 gap-3">
                                                <Input type="number" className="w-[100px]" placeholder="Sets" {...register(`set`)}/>
                                                <Input type="number" className="w-[100px]" placeholder="Reps"/>
                                                <Input type="number" className="w-[100px]" placeholder="Weight"/>
                                            <XCircle className="text-red-500 cursor-pointer" onClick={() => handleRemoveExercise(index)} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                    <div className="my-6">
                        <Popover>
                            <PopoverTrigger asChild>
                                <div>
                                    <Label>Start Date</Label>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "justify-start text-left font-normal w-full",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <FormItem className="my-6">
                        <label htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="w-full cursor-pointer h-10 px-3 mt-1 mb-2 text-base placeholder-gray-600 border rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                            value={selectedCategory?.categoryName || ''}
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled>Select a category</option>
                            {fetchedCategoryList.map((category, index) => (
                                <option key={index} value={category.categoryName}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </FormItem>

                    <FormMessage/>

                    <DialogClose asChild>
                        <Button type="submit"
                                className="bg-blue-600 hover:bg-blue-400 text-white hover:text-white flex justify-center items-center">Create
                            Routine</Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default Routine;