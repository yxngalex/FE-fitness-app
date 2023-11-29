import {BarChart4} from "lucide-react";
import {Link, useLocation} from "react-router-dom";

const Sidemenu = () => {
    const location = useLocation();

    const isActiveTab = (path: string) => {
        return location.pathname === path;
    }

    return (
        <div className="flex flex-col h-screen w-[300px] justify-between border-e bg-white">
            <div className="px-4 py-6 text-center">
                <span className="text-xl text-gray-600 font-medium"> MyFitnessApp </span>
                <ul className="mt-6 block items-center justify-center">
                    <li className="flex justify-center items-center w-full">
                        <Link to="/">
                            <div
                                className="flex items-center justify-center text-center rounded-lg px-4 py-6 text-sm">
                                <div>
                                    <BarChart4 className={isActiveTab('/') ? "text-blue-600" : "text-gray-700"}/>
                                </div>
                                <span
                                    className={isActiveTab('/') ? "text-black font-bold w-full flex ml-7" : "text-gray-400 font-bold w-full flex ml-7"}>Dashboard</span>
                            </div>
                        </Link>
                    </li>
                    <li className="flex justify-center items-center w-full">
                        <Link to="/">
                            <div
                                className="flex items-center justify-center text-center rounded-lg px-4 py-6 text-sm">
                                <div>
                                    <BarChart4 className={isActiveTab('/test') ? "text-blue-600" : "text-gray-700"}/>
                                </div>
                                <span className="flex items-center ml-2">
                                    <span className={isActiveTab('/test') ? "text-black font-bold flex ml-7" : "text-gray-400 font-bold w-full flex ml-7"}>Workouts</span>
                                </span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Uncomment this section if you want a sticky footer */}
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <Link to="/">
                    <div
                        className="flex justify-center items-center text-center rounded-lg hover:text-blue-600 px-4 py-2 text-sm font-medium text-gray-700 gap-6">
                        <BarChart4/>
                        <span>Logout</span>
                    </div>
                </Link>
                {/*    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">*/}
                {/*        <img*/}
                {/*            alt="Man"*/}
                {/*            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"*/}
                {/*            className="h-10 w-10 rounded-full object-cover"*/}
                {/*        />*/}

                {/*        <div>*/}
                {/*            <p className="text-xs">*/}
                {/*                <strong className="block font-medium">Eric Frusciante</strong>*/}
                {/*                <span> eric@frusciante.com </span>*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    </a>*/}
            </div>
        </div>
    )
}

export default Sidemenu;