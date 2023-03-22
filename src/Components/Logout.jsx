import {useAuth} from "../Context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Logout = () => {

    const {logOut} = useAuth()

    const navigate = useNavigate()

    const handleClick = () => {
        logOut()
            .then(
                navigate('/')
            )
    }

    return (
        <button onClick={handleClick} className="text-amber-100 border rounded px-5">
            Déconnexion
        </button>
    )
}

export default Logout