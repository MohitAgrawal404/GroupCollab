import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./backend/firebase";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Preferences } from "./pages/Preferences";
// import { Meetingroom } from "./pages/Meetingroom";

import Meetingroom from "./pages/Meetingroom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./store/reducer";

const store = createStore(reducer);

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signuserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();

      setIsAuth(false);
    });
  };

  return (
    <Provider store={store}>
      <Router className="">
        <nav className="">
          {!isAuth ? (
            <Link className="" to={"/login"}>
              {" "}
              Login{" "}
            </Link>
          ) : (
            <>
              <Link to={"/dashboard"} className="">
                {" "}
                Dashboard{" "}
              </Link>
              <Link to={"/meetingroom"} className="">
                {" "}
                Meeting Room{" "}
              </Link>
              <Link to={"/preferences"} className="">
                {" "}
                Preferences{" "}
              </Link>
              <Link to={"/login"} className="" onClick={signuserOut}>
                LOG OUT
              </Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="/preferences"
            element={<Preferences isAuth={isAuth} />}
          />
          <Route path="/dashboard" element={<Dashboard isAuth={isAuth} />} />
          <Route
            path="/meetingroom"
            element={<Meetingroom isAuth={isAuth} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
