import Sidemenu from "@/components/sidemenu/Sidemenu.tsx";

interface HomeProps {
    username: string
}

const Home = ({username}: HomeProps) => {

    return (
        <div>
            <h1>Home</h1>
            <p>{username}</p>
            <Sidemenu />
        </div>
    )
}

export default Home;