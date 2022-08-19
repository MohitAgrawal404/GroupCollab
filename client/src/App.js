import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./backend/firebase";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Preferences } from "./pages/Preferences";
// import { Meetingroom } from "./pages/Meetingroom";
import './App.css';
import Meetingroom from "./pages/Meetingroom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { userReducer } from "./store/reducer";

export const store = createStore(userReducer);

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
      <Router className="App">
        <div className="h-screen w-screen bg-slate-600">
          <nav className="App-header">
            {!isAuth ? (
              <Link className="item" to={"/login"}>Login</Link>):(
              <>
                <Link to={"/dashboard"} className="item">
                  Dashboard
                </Link>
                <Link to={"/meetingroom"} className="item">
                  Meeting Room
                </Link>
                <Link to={"/preferences"} className="item">
                  Preferences
                </Link>
                <Link to={"/login"} className="item" onClick={signuserOut}>
                  Log Out
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
        </div>
      </Router>
    </Provider>
  );
}

export default App;
