import React from "react";
import {auth, provider} from '../backend/firebase';
import {signInWithPopup} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const Login = ({setIsAuth}) => {
    let navigate = useNavigate();
    
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/dashboard");
        });
    };

    return (
        <div className = "App">
            <h1 className="title">Sign In / Sign Up: </h1>
            <button className="delete" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}
