import {Link} from "react-router-dom";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Apple, Drumstick, Flame, Pizza} from "lucide-react";

interface NutritionCardProps {
    calories: number,
    protein: number,
    carbs: number,
    fat: number
}

const NutritionCard = ({calories, protein, carbs, fat}: NutritionCardProps) => {
    return (

        <div className="flex w-full justify-around">

            <Link to="/food">
                <Card className="flex items-center justify-center bg-red-100 mx-4 shadow-red-500 w-72">
                    <CardContent className="flex items-center justify-center h-full py-3">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Flame className="w-8 h-8 text-red-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                {calories != null ? calories : 0}
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. calories
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link to="/food">
                <Card className="flex items-center justify-center bg-blue-100 mx-4 shadow-blue-400 w-72">
                    <CardContent className="flex items-center justify-center h-full py-3">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Drumstick className="w-8 h-8 text-blue-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                {protein != null ? protein : 0}
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. proteins
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link to="/food">
                <Card className="flex items-center justify-center bg-yellow-100 mx-4 shadow-yellow-400 w-72">
                    <CardContent className="flex items-center justify-center h-full py-3">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Apple className="w-8 h-8 text-yellow-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                {carbs != null ? carbs : 0}
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. carbs
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>

            <Link to="/food">
                <Card className="flex items-center justify-center bg-pink-100 mx-4 shadow-pink-400 w-72">
                    <CardContent className="flex items-center justify-center h-full py-3">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Pizza className="w-8 h-8 text-pink-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                {fat != null ? fat : 0}
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. fat
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </div>
    )
}

export default NutritionCard;