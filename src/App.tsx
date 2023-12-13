import './App.css'
import Login from "@/pages/login/Login.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "@/providers/AuthProvider.tsx";
import ErrorAlert from "@/components/alert/ErrorAlert.tsx";
import SuccessAlert from "@/components/alert/SuccessAlert.tsx";
import Layout from "@/components/layout/Layout.tsx";
import Profile from "@/pages/profile/Profile.tsx";
import Dashboard from "@/pages/dashboard/Dashboard.tsx";
import Exercise from "@/pages/exercise/Exercise.tsx";
import Food from "@/pages/food/Food.tsx";

function App() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const {auth} = useContext(AuthContext);

    return (
        <>
            {errorMessage && (
                <ErrorAlert errorMessage={errorMessage} onClose={() => setErrorMessage(null)}/>
            )}
            {successMessage && (
                <SuccessAlert alertMessage={successMessage} onClose={() => setSuccessMessage(null)}/>
            )}
            <Routes>
                <Route path="/login"
                       element={<Login setErrorMessage={setErrorMessage} setLoginMessage={setSuccessMessage}/>}/>
                <Route path="/"
                       element={auth?.isAuthenticated ?
                           <Layout><Dashboard username={auth?.user} errorMessage={setErrorMessage}
                                              successMessage={setSuccessMessage}/></Layout> :
                           <Navigate to="/login"/>}/>
                <Route path="/exercise"
                       element={auth?.isAuthenticated ? <Layout><Exercise errorMessage={setErrorMessage}
                                                                          successMessage={setSuccessMessage}/></Layout> :
                           <Navigate to="/login"/>}/>
                <Route path="/food"
                       element={auth?.isAuthenticated ? <Layout><Food errorMessage={setErrorMessage} successMessage={setSuccessMessage}/></Layout> :
                           <Navigate to="/login"/>}/>
                <Route path="/profile"
                       element={auth?.isAuthenticated ? <Layout><Profile/></Layout> :
                           <Navigate to="/login"/>}/>
            </Routes>
        </>
    )
}

export default App
