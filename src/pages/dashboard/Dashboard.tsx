import {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Apple, Drumstick, Flame, Pizza} from "lucide-react";

interface DashboardProps {
    username: string
}

const Dashboard = ({username}: DashboardProps) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const getCurrentTimeOfDay = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 5 && currentHour < 12) {
                setGreeting('Good Morning');
            } else if (currentHour >= 12 && currentHour < 18) {
                setGreeting('Good Afternoon');
            } else {
                setGreeting('Good Evening');
            }
        };

        getCurrentTimeOfDay();
    }, []);

    return (
        <div>
            <div className="p-8 block">
                <span className="text-4xl flex pb-6">{greeting} {username}</span>
                <span className="flex-1">Let's see your stats for today.</span>
            </div>

            <div className="flex flex-grow-1 justify-center">
                <Card className="flex-grow bg-red-100 mx-4 shadow-red-500">
                    <CardContent className="flex items-center">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Flame className="w-8 h-8 text-red-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                0
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. calories
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-grow bg-blue-100 mx-4 shadow-blue-400">
                    <CardContent className="flex items-center">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Drumstick className="w-8 h-8 text-blue-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                0
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. proteins
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-grow bg-yellow-100 mx-4 shadow-yellow-400">
                    <CardContent className="flex items-center">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Apple className="w-8 h-8 text-yellow-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                0
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. carbs
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-grow bg-pink-100 mx-4 shadow-pink-400">
                    <CardContent className="flex items-center">
                        <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                            <Pizza className="w-8 h-8 text-pink-500"/>
                        </div>
                        <div className="ml-4 flex flex-col">
                            <div className="text-black text-xl">
                                0
                            </div>
                            <div className="text-slate-500 text-sm">
                                Avg. fat
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard;