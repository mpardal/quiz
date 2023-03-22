import {useAuth} from "../Context/AuthContext.jsx";
import Quiz from "./Quiz.jsx";
import {useNavigate} from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";
import Levels from "./Levels.jsx";
import {useEffect} from "react";

const Welcome = () => {
    const {userData, userSession} = useAuth()

    const navigate = useNavigate()

    const {pseudo} = userData

    useEffect(() => {
        if (!userSession) {
            navigate('/connexion')
        }
    }, [])

    return (
        <>
            <p>Pseudo : {pseudo}</p>
            <Levels/> <br/>
            <ProgressBar/>
            <Quiz/>
        </>
    )
}

export default Welcome