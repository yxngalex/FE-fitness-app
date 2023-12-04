import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getBodyType} from "@/api/bodyType/bodyType.redaxios.ts";
import {saveOrUpdateGoal} from "@/api/goal/goal.redaxios.ts";
import {GoalDTO} from "@/model/GoalDTO.ts";

interface GoalCardProps {
    weightGoal: number,
    bodyTypeGoal: string,
    weeklyExercise: number,
    errorMessage: (error: string | null) => void,
    successMessage: (success: string | null) => void;
}

const GoalCard = ({weightGoal, bodyTypeGoal, weeklyExercise, errorMessage, successMessage}: GoalCardProps) => {
    const [bodyTypes, setBodyTypes] = useState<string[]>([]);

    const formSchema = z.object({
        weightGoal: z.string().refine((v) => {
            const weight = parseInt(v, 10);
            return weight > 0 && weight <= 999;
        }, {message: "Weight goal must be above 0."}),
        bodyTypeGoal: z.string(),
        weeklyExercise: z.string().refine((v) => {
            const exercise = parseInt(v, 10);
            return exercise > 0 && exercise <= 6;
        }, {message: "Exercise must be between 1 and 6 days."}),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            weightGoal: weightGoal ? String(weightGoal) : "",
            bodyTypeGoal: bodyTypeGoal || "",
            weeklyExercise: weeklyExercise ? String(weeklyExercise) : "",
        },
    })

    useEffect(() => {
        let mounted = true;

        getBodyType().then(data => {
            if (mounted) {
                setBodyTypes(data)
                mounted = false;
            }
        })
    }, []);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        const newGoalData: GoalDTO = {
            weightGoal: parseInt(values.weightGoal),
            bodyTypeGoal: values.bodyTypeGoal,
            weeklyExercise: parseInt(values.weeklyExercise)
        }

        if (newGoalData.weightGoal == weightGoal && newGoalData.bodyTypeGoal == bodyTypeGoal && newGoalData.weeklyExercise == weeklyExercise) {
            errorMessage("You need to change some value if you want to update your goal.")
        } else {
            saveOrUpdateGoal(newGoalData).then(response => {
                successMessage(response);
            }).catch(error => {
                errorMessage(error);
            })
        }
    };

    return (
        <Card className="w-[400px] h-[450px] bg-slate-50">
            <CardHeader>
                <CardTitle className="justify-center items-center flex">Your Goal</CardTitle>
                <CardDescription className="pt-2">Change the values if you want to update your goal.</CardDescription>
            </CardHeader>
            <Form {...form}>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="weightGoal"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label>Your weight goal</Label>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="..." {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}></FormField>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="weeklyExercise"
                                    render={({field}) => (
                                        <FormItem>
                                            <Label>Weekly Exercise</Label>
                                            <FormControl>
                                                <Input type="number"
                                                       placeholder="How much a week would you like to train!" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}></FormField>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="bodyTypeGoal"
                                    render={() => (
                                        <FormItem>
                                            <Label>Primary goal</Label>
                                            <FormControl>
                                                <select
                                                    value={form.getValues("bodyTypeGoal") || bodyTypeGoal || ""}
                                                    onChange={(e) => form.setValue("bodyTypeGoal", e.target.value)}
                                                    className="w-full h-10 px-3 mt-1 mb-2 text-base placeholder-gray-600 border rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                                                >
                                                    <option value="" disabled>Select</option>
                                                    {bodyTypes.map((bodyType) => (
                                                        <option key={bodyType} value={bodyType}>
                                                            {bodyType}
                                                        </option>
                                                    ))}
                                                </select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between float-right pt-1">
                    <Button type="submit" onClick={form.handleSubmit(onSubmit)}
                            className="bg-blue-600 hover:bg-blue-400">
                        Update
                    </Button>
                </CardFooter>
            </Form>
        </Card>
    )
}

export default GoalCard;