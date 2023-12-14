import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import DonutChart from "react-donut-chart";

interface BMRCalculatorProps {
    data: number;
    calories: number;
}

const BMRCalculator = ({data, calories}: BMRCalculatorProps) => {

    if (calories == null) {
        calories = 0;
    }

    return (
        <Card className="w-[500px] h-[550px] bg-slate-50">
            <CardHeader>
                <CardTitle className="justify-center items-center flex">Basal Metabolic Rate</CardTitle>
                <CardDescription>The BMR Calculator estimates your basal metabolic rate—the
                    amount of energy expended while at rest in a neutrally temperate environment, and in a
                    post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours
                    of fasting). <a href="https://www.calculator.net/bmr-calculator.html" target="_blank" className="ml-1 text-blue-500 underline" >More here.</a>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {data && (
                        <DonutChart
                            data={[
                                {
                                    label: "Calories / day ",
                                    value: data,
                                },
                                {
                                    label: "Calories eaten",
                                    value: calories,
                                    isEmpty: true
                                },
                            ]}
                            colors={["#03eaff", "#03eaff"]}
                            className="max-w-[400px] max-h-[400px] mx-10"
                            height={260}
                            width={380}
                        />
                    )}
                </div>
                <div>
                    <p className="justify-center items-center flex text-lg pt-2"> Calories per day: {data}</p>
                    <p className="justify-center items-center flex text-lg pt-2"> Calories eaten: {calories}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BMRCalculator;