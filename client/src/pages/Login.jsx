import React, {useState} from "react";
import { auth, provider } from "../backend/firebase";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

export const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();
  const timetable = ["10:00", "11:00"];
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((response) => {
      const { isNewUser } = getAdditionalUserInfo(response);
      let user = auth.currentUser;
      let uid = user.uid;
      if (isNewUser === false) {
        complete();
      } else {
        let timedata = {
          Monday: timetable,
          Tuesday: timetable,
          Wednesday: timetable,
          Thursday: timetable,
          Friday: timetable,
          Saturday: timetable,
          Sunday: timetable,
        };
        firebase.database().ref("users").child(uid).set(timedata)
          .then((data) => {
            console.log("Saved Data on login", data);
          })
          .catch((error) => {
            console.log("Storing Error", error);
          });
        complete();
      }
    });
  };

  const complete = () => {
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
    navigate("/dashboard");
  };


  return (
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300 ">
      <h1 class="text-4xl font-medium">Login</h1>
      <div class="my-5">
        <button
          class="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
          onClick={signInWithGoogle}
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            class="w-6 h-6"
            alt=""
          />{" "}
          <span>Login with Google</span>
        </button>
      </div>
      {/*  */}
    </div>
  );
};

