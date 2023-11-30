import {ReactNode} from "react";
import Sidebar from "@/components/sidebar/Sidebar.tsx";

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {

    return (
        <div className="flex">
            <aside>
                <Sidebar />
            </aside>
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    )

}

export default Layout;