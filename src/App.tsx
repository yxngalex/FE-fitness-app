import './App.css'
import Login from "@/pages/login/Login.tsx";
import {Route, Routes} from "react-router-dom";
// import Home from "@/pages/home/Home.tsx";
// import {useContext} from "react";
// import {AuthContext} from "@/providers/AuthProvider.tsx";

function App() {
    // const {auth} = useContext(AuthContext);

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        {/*<Route path="/" element={ auth?.isAuthenticated ? <Home /> : <Navigate to="/login" />} />*/}
    </Routes>
  )
}

export default App
