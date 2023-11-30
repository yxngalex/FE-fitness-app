import {LayoutDashboard, LogOut, User2} from "lucide-react";
import {Link, useLocation} from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const isActiveTab = (path: string) => {
        return location.pathname === path;
    }

    return (
        <>
            <div className="flex flex-col h-screen w-[250px] justify-between border-e bg-slate-50">
                <div className="px-4 py-6 text-center">
                    <span className="text-xl text-gray-600 font-medium"> FitnessApp </span>
                    <ul className="mt-6 block items-center justify-center">
                        <Link to="/">
                            <li className="flex justify-center items-center w-full hover:bg-blue-50">
                                <div
                                    className="flex items-center justify-center text-center rounded-lg px-4 py-6 text-sm">
                                    <div>
                                        <LayoutDashboard
                                            className={isActiveTab('/') ? "text-blue-600" : "text-gray-400"}/>
                                    </div>
                                    <span
                                        className={isActiveTab('/') ? "text-black font-bold w-full flex ml-7" : "text-gray-400 w-full flex ml-7"}>
                                    Dashboard
                                </span>
                                </div>
                            </li>
                        </Link>
                        <Link to="/profile">
                            <li className="flex justify-center items-center w-full hover:bg-blue-50">
                                <div
                                    className="flex items-center justify-center text-center rounded-lg px-4 py-6 text-sm">
                                    <div>
                                        <User2 className={isActiveTab('/profile') ? "text-blue-600" : "text-gray-400"}/>
                                    </div>
                                    <span
                                        className={isActiveTab('/profile') ? "text-black font-bold w-full flex ml-7" : "text-gray-400 w-full flex ml-7"}>Profile</span>
                                </div>
                            </li>
                        </Link>
                        {/*<Link to="/">*/}
                        {/*    <li className="flex justify-center items-center w-full hover:bg-slate-50">*/}
                        {/*        <div*/}
                        {/*            className="flex items-center justify-center text-center rounded-lg px-4 py-6 text-sm ">*/}
                        {/*            <div>*/}
                        {/*                <LayoutDashboard*/}
                        {/*                    className={isActiveTab('/test') ? "text-blue-600" : "text-gray-400"}/>*/}
                        {/*            </div>*/}
                        {/*            <span className="flex items-center ml-2">*/}
                        {/*                <span*/}
                        {/*                    className={isActiveTab('/test') ? "text-black font-bold flex ml-7" : "text-gray-400 font-bold w-full flex ml-7"}>Workouts</span>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*    </li>*/}
                        {/*</Link>*/}
                    </ul>
                </div>

                {/* Uncomment this section if you want a sticky footer */}
                <div className="sticky inset-x-0 bottom-0 border-t border-gray-200">
                    <Link to="/">
                        <div
                            className="flex justify-center items-center text-center rounded-lg hover:bg-slate-50 px-4 py-7 text-sm font-medium text-gray-700 gap-6">
                            <LogOut/>
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
        </>
    )
}

export default Sidebar;