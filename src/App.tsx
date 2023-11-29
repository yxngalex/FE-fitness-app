import './App.css'
import Login from "@/pages/login/Login.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "@/pages/home/Home.tsx";
import {useContext, useState} from "react";
import {AuthContext} from "@/providers/AuthProvider.tsx";
import ErrorAlert from "@/components/alert/ErrorAlert.tsx";
import SuccessAlert from "@/components/alert/SuccessAlert.tsx";

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
                       element={auth?.isAuthenticated ? <Home username={auth?.user}/> : <Navigate to="/login"/>}/>
            </Routes>
        </>
    )
}

export default App
