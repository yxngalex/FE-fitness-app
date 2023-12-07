import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import GaugeComponent from 'react-gauge-component'
import {calculateBmi} from "@/api/overview/overview.redaxios.ts";
import {BmiDTO} from "@/model/BmiDTO.ts";

const BMICalculator = () => {
    const [data, setData] = useState<BmiDTO | null>(null);

    useEffect(() => {
        let mounted = true;

        calculateBmi().then(result => {
            if (mounted) {
                console.log('API Response:', result);

                if (result && typeof result.bmi === 'number') {
                    setData(result);
                } else {
                    console.error('Invalid BMI value in API response:', result);
                }

                mounted = false;
            }
        });
    }, []);

    return (
        <Card className="w-[400px] h-[450px] bg-slate-50">
            <CardHeader>
                <CardTitle className="justify-center items-center flex">Body Mass Index</CardTitle>
                <CardDescription>The Body Mass Index (BMI) Calculator can be used to calculate BMI value and
                    corresponding weight status while taking age into consideration.</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {data && (
                        <GaugeComponent
                            value={data.bmi}
                            minValue={15}
                            maxValue={40}
                            type="radial"
                            arc={{
                                colorArray: ['#EA4228', '#FFD700', '#5BE12C', '#FFD700', '#EA4228'],
                                subArcs: [
                                    {limit: 17},
                                    {limit: 18.5},
                                    {limit: 25},
                                    {limit: 30},
                                    {limit: 40}
                                ],
                                padding: 0.02,
                                width: 0.3
                            }}
                            pointer={{
                                elastic: true,
                                animationDelay: 0
                            }}
                        />
                    )}
                    <div>
                        <p className="justify-center items-center flex text-lg pt-2">{data?.bmiCategory}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BMICalculator;