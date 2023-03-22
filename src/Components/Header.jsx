import Logout from "./Logout.jsx";
import ballon from "../assets/ballon.png"
import {Link} from "react-router-dom";
import {useAuth} from "../Context/AuthContext.jsx";

const Header = () => {
    const {userSession} = useAuth()

    return (
        <header className="flex flex-row justify-between bg-gray-800 py-5 px-10 items-center ">
            <Link to="/">
                <img src={ballon} alt="logo" width="100"/>
            </Link>
            <h1 className="text-amber-100 text-3xl">FOOTBALL QUIZ</h1>
            {userSession ?
                <Logout/>
                :
                <div></div>
            }
        </header>
    )
}

export default Header