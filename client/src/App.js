import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {useState} from "react";
import {signOut} from 'firebase/auth'
import {auth} from "./firebase-config";
import {Login} from "./Login"
import {Dashboard} from "./Dashboard"
import {Preferences} from "./Preferences"
import {MeetingRoom} from "./MeetingRoom"


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signuserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    })
  }

  return (
    <div className="">
    <Router className = "">
      <nav className= "">
        {!isAuth ? <Link className=''  to={"/Login"}> Login </Link> : (
          <>
        <Link to ={"/Dashboard"} className = ""> Dashboard </Link>
        <Link to={"/Meeting Room"} className = ""> Meeting Room </Link>
        <Link to={"/Preferences"} className = ""> Preferences </Link>
        <button className= "" onClick = {signuserOut}>LOG OUT</button>
        </>
        )}
      </nav>
      <Routes>
        <Route path = "/Login" element = {<Login isAuth = {isAuth} />} />
        <Route path = "/Preferences" element = {<Preferences isAuth={isAuth}/>} />
        <Route path = "/Dashboard" element = {<Dashboard isAuth={isAuth}/>} />
        <Route path = "/Meeting Room" element = {<MeetingRoom setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
