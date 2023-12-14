import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


interface BMRCalculatorProps {
    data: number;
    calories: number;
}


const BMRCalculator = ({data, calories}: BMRCalculatorProps) => {
    const [percentage, setPercentage] = useState(0);
    const [caloriesLabel, setCaloriesLabel] = useState(0);

    useEffect(() => {
        if (calories == null) {
            setPercentage(0);
            setCaloriesLabel(0);
        } else {
            setPercentage((calories / data) * 100);
            setCaloriesLabel(calories);
        }
    }, [calories, data]);


    return (
        <Card className="w-[500px] h-[550px] bg-slate-50">
            <CardHeader>
                <CardTitle className="justify-center items-center flex">Basal Metabolic Rate</CardTitle>
                <CardDescription>The BMR Calculator estimates your basal metabolic rate—the
                    amount of energy expended while at rest in a neutrally temperate environment, and in a
                    post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours
                    of fasting). <a href="https://www.calculator.net/bmr-calculator.html" target="_blank"
                                    className="ml-1 text-blue-500 underline">More here.</a>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center">
                    {data && (
                        <div className="w-[200px] h-[200px] my-6">
                            <CircularProgressbar value={percentage} text="Calories per day" styles={buildStyles({
                                textSize: '8px',
                                textColor: 'rgb(59, 130, 246)',
                                trailColor: 'rgb(255, 99, 132)',
                                pathColor: 'rgb(59, 130, 246)',
                            })}/>
                        </div>
                    )}
                </div>
                <div className="mt-5">
                    <p className="justify-center items-center flex text-lg pt-2"> Calories per day: <span className="text-red-500 mx-6 font-bold">{data}</span></p>
                    <p className="justify-center items-center flex text-lg pt-2"> Calories eaten: <span className="text-blue-500 mx-6 font-bold">{caloriesLabel}</span></p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BMRCalculator;