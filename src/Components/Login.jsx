import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase-config.js";
import stadium from "../assets/stadium.png";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import ForgetPassword from "./ForgetPassword.jsx";

const Login = () => {

    const navigate = useNavigate()

    const data = {
        email:'',
        password:''
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')

    const {email, password } = loginData

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id]:e.target.value})
    }

    const displayButton = email !== '' && password !== ''

    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = loginData
        signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                navigate('/accueil')
            })
            .catch(error => {
                setError(error)
                setLoginData({...data})
            })
    }

return(
    <main className="flex flex-row justify-between h-full bg-gray-400">
        <div className="my-auto">
            <img src={stadium} alt="inscription"/>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col m-auto gap-20 w-1/2">
            {error !== '' ?
                <span> {error.message} </span>
                :
                <></>
            }
            <h2 className="text-3xl">CONNEXION</h2>
            <div className="flex flex-col mx-auto gap-10 w-full">
                <input type="email" placeholder="Email" id="email"
                       value={email}
                       onChange={handleChange}
                       className="border px-2 py-0.5 bg-gray-200 rounded"/>
                <input type="password" placeholder="Mot de passe" id="password"
                       value={password}
                       onChange={handleChange}
                       className="border px-2 py-0.5 bg-gray-200 rounded"/>
                {displayButton ?
                    <button type="submit"
                            className="mx-auto px-5 py-1 text-white bg-green-600 rounded">
                        Connexion
                    </button>
                    :
                    <button disabled
                            className="mx-auto px-5 py-1 text-white bg-gray-300 rounded">
                        Incomplet
                    </button>
                }
            </div>
            <div>
                <hr className="border-dashed"/>
                <div className="flex flex-row justify-between">
                    <Link to="/login">
                        <span>S'inscrire</span>
                    </Link>
                    <Link to="/mot-de-passe-oublie">
                        <span>Mot de passe oublié</span>
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

export default Login