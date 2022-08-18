import React from "react";
import {auth, provider} from '../backend/firebase';
import {signInWithPopup, getAdditionalUserInfo} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";

export const Login = ({setIsAuth}) => {
    let navigate = useNavigate();
    const timetable = [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5];
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((response) => {
            const { isNewUser } = getAdditionalUserInfo(response)    
            let user = auth.currentUser;
            let uid = user.uid;
            if (isNewUser === false){
                complete()
            }
            else {
                let timedata = { Monday: timetable, Tuesday: timetable, Wednesday: timetable, Thursday: timetable, Friday: timetable, Saturday: timetable, Sunday: timetable};
                firebase.database().ref('users').child(uid).set(timedata)
                .then((data) => {
                    console.log('Saved Data', data)
                })
                .catch((error) => {
                    console.log('Storing Error', error)
                })   
                complete()
            }
            });
    };

    const complete = () => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/dashboard");
    }

    return (
        <div className = "App">
            <h1 className="title">Sign In / Sign Up: </h1>
            <button className="delete" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}
