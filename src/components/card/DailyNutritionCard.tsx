import {Card, CardContent} from "@/components/ui/card.tsx";

interface NutritionCardProps {
    calories: number | undefined,
    protein: number | undefined,
    carbs: number | undefined,
    fat: number | undefined
}

const DailyNutritionCard = ({calories, protein, carbs, fat}: NutritionCardProps) => {
    return (
        <div className="mx-10 mr-20">
            <Card className="bg-slate-50 mx-4 drop-shadow w-40 my-6">
                <CardContent className="h-full py-3">
                    <div className="ml-4 flex flex-col">
                        <div className="text-slate-500 text-sm">
                            Calories
                        </div>
                        <div className="text-black text-xl">
                            {calories != null ? calories : 0}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-slate-50 mx-4 drop-shadow w-40 my-6">
                <CardContent className="h-full py-3">
                    <div className="ml-4 flex flex-col">
                        <div className="text-slate-500 text-sm">
                            Proteins
                        </div>
                        <div className="text-black text-xl">
                            {protein != null ? protein : 0}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-slate-50 mx-4 drop-shadow w-40 my-6">
                <CardContent className="h-full py-3">
                    <div className="ml-4 flex flex-col">
                        <div className="text-slate-500 text-sm">
                            Carbs
                        </div>
                        <div className="text-black text-xl">
                            {carbs != null ? carbs : 0}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-slate-50 mx-4 drop-shadow w-40 my-6">
                <CardContent className="h-full py-3">
                    <div className="ml-4 flex flex-col">
                        <div className="text-slate-500 text-sm">
                            Fat
                        </div>
                        <div className="text-black text-xl">
                            {fat != null ? fat : 0}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default DailyNutritionCard;
