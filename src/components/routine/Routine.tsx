import {Button} from "@/components/ui/button.tsx";
import {DialogClose, DialogFooter} from "@/components/ui/dialog.tsx";
import {Form, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {WorkoutRoutineDTO} from "@/model/WorkoutRoutineDTO.ts";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


interface RoutineProps {
    errorMessage: (error: string | null) => void;
    successMessage: (error: string | null) => void;
}

const Routine = ({errorMessage, successMessage}: RoutineProps) => {

    const formSchema = z.object({
        exercise: z.string(),
        set: z.string(),
        reps: z.string(),
        exerciseWeight: z.string(),
        dateStart: z.string(),
        dateFinish: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            exercise: "",
            set: "",
            reps: "",
            exerciseWeight: "",
            dateStart: "",
            dateFinish: "",
        },
    })
    const handleCreateRoutine = (data: WorkoutRoutineDTO) => {
        console.log(data);
    };

    return (
        <div className="p-4 flex items-center justify-center h-screen top-0">
            <Form {...form}>
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* Exercise Stats */}
                    <FormItem>
                        <label htmlFor="set">Set</label>
                        <input type="number" id="set" name="set"/>
                    </FormItem>
                    <FormItem>
                        <label htmlFor="reps">Reps</label>
                        <input type="number" id="reps" name="reps"/>
                    </FormItem>
                    <FormItem>
                        <label htmlFor="exerciseWeight">Exercise Weight</label>
                        <input type="number" id="exerciseWeight" name="exerciseWeight"/>
                    </FormItem>
                    <FormItem>
                        {/* Exercise */}
                        <label htmlFor="exercise">Select an Exercise</label>
                        <select id="exercise" name="exercise">
                            <option value="" disabled selected>
                                Select an exercise
                            </option>
                            {/*{exercises.map((exercise) => (*/}
                            {/*    <option key={exercise.id} value={exercise.id}>*/}
                            {/*        {exercise.exerciseName}*/}
                            {/*    </option>*/}
                            {/*))}*/}
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </FormItem>

                    {/* Date Start and Date Finish */}
                    <FormItem>
                        <label htmlFor="dateStart">Date Start</label>
                        <input type="date" id="dateStart" name="dateStart"/>
                    </FormItem>
                    <FormItem>
                        <label htmlFor="dateFinish">Date Finish</label>
                        <input type="date" id="dateFinish" name="dateFinish"/>
                    </FormItem>

                    {/* Category */}
                    <FormItem>
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category"/>
                    </FormItem>

                    <FormMessage/>

                    <DialogFooter>
                        <DialogClose>
                            <Button type="submit">
                                Create Routine
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </div>
    );
};

export default Routine;