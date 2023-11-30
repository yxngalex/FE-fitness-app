interface DashboardProps {
    username: string
}
const Dashboard = ({username}: DashboardProps) => {

    return (
        <div>
            <h1>Home</h1>
            <p>{username}</p>
        </div>
    )
}

export default Dashboard;