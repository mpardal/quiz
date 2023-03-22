import club from '../assets/club.png'
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext.jsx";
import {useEffect} from "react";
import {Alert} from "@mui/material";

const SignUp = () => {

    const {signUp, userSession} = useAuth()

    const navigate = useNavigate()

    const InputStyle = "border px-2 py-0.5 bg-gray-200 rounded"

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const pseudo = formData.get("pseudo")
        const email = formData.get("email")
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")

        if (confirmPassword === password) {
            signUp(email, password, pseudo)
                .then(() => {
                    console.log('Inscris')
                    navigate('/accueil')
                })
        } else {
            alert('Vos mots de passe dont différents')
        }

        form.reset()
    }

    useEffect(() => {
        if (userSession) {
            navigate('/')
        }
    }, [])


    return (
        <main className="flex flex-row justify-between h-full bg-gray-400">
            <div className="my-auto">
                <img src={club} alt="inscription"/>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col m-auto gap-20 w-1/2">
                <h2 className="text-3xl">INSCRIPTION</h2>
                <div className="flex flex-col mx-auto gap-10 w-full">
                    <input type="text" placeholder="Pseudo" id="pseudo" name="pseudo"
                           className={InputStyle} required/>
                    <input type="email" placeholder="Email" id="email" name="email"
                           className={InputStyle} required/>
                    <input type="password" placeholder="Mot de passe" id="password" name="password"
                           className={InputStyle} required/>
                    <input type="password" placeholder="Confirmation du mot de passe" id="confirmPassword"
                           name="confirmPassword" className={InputStyle} required/>
                    <button type="submit"
                            className="mx-auto px-5 py-1 text-white bg-green-600 rounded">
                        Inscription
                    </button>
                </div>
                <div>
                    <hr className="border-dashed"/>
                    <div className="flex flex-row justify-between">
                        <Link to="/login">
                            <span>Déjà inscrit ? (Connectez-vous)</span>
                        </Link>
                        <Link to="/">
                            <span>Retourner à l'accueil</span>
                        </Link>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default SignUp