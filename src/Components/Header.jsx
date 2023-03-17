import Logout from "./Logout.jsx";
import ballon from "../assets/ballon.png"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../config/firebase-config.js";

const Header = () => {

    const navigate = useNavigate()
    const [userSession, setUserSession] = useState(null)

    useEffect(() => {
        return (
            onAuthStateChanged(auth, user => {
                user ?
                    setUserSession(user) :
                    navigate('/')
            })
        )
    },[])


    return userSession === null ? (
        <header className="flex flex-row justify-between bg-gray-800 py-5 px-10 items-center ">
            <Link to="/">
                <img src={ballon} alt="logo" width="100"/>
            </Link>
            <h1 className="text-amber-100 text-3xl">FOOTBALL QUIZ</h1>
            <div></div>
        </header>
    ):(
        <header className="flex flex-row justify-between bg-gray-800 py-5 px-10 items-center ">
            <Link to="/">
                <img src={ballon} alt="logo" width="100"/>
            </Link>
            <h1 className="text-amber-100 text-3xl">FOOTBALL QUIZ</h1>
            <Logout />
        </header>
    )
}

export default Header