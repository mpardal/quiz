import club from '../assets/club.png'
import {Link} from "react-router-dom";
import {useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../config/firebase-config.js";

const SignUp = () => {


    const data = {
        pseudo:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    const [loginData, setLoginData] = useState(data)
    const [error, setError] = useState('')

    const {pseudo, email, password, confirmPassword} = loginData

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id]:e.target.value})
    }

    const displayButton = pseudo !== '' && email !== '' &&
                        password !== '' && password.length >= 8 &&
                        confirmPassword !== '' && confirmPassword.length >= 8 &&
                        confirmPassword === password

    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = loginData
            signInWithEmailAndPassword(auth, email, password)
            .then(user => {
                setLoginData({...data})
            })
            .catch(error => {
                setError(error)
                setLoginData({...data})
            })
    }

return(
    <main className="flex flex-row justify-between h-full bg-gray-400">
        <div className="my-auto">
            <img src={club} alt="inscription"/>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col m-auto gap-20 w-1/2">
            {error !== '' ?
                <span> {error.message} </span>
            :
            <></>
            }
            <h2 className="text-3xl">INSCRIPTION</h2>
            <div className="flex flex-col mx-auto gap-10 w-full">
                <input type="text" placeholder="Pseudo" id="pseudo"
                       value={pseudo}
                       onChange={handleChange}
                       className="border px-2 py-0.5 bg-gray-200 rounded"/>
                <input type="email" placeholder="Email" id="email"
                       value={email}
                       onChange={handleChange}
                       className="border px-2 py-0.5 bg-gray-200 rounded"/>
                <input type="password" placeholder="Mot de passe" id="password"
                       value={password}
                       onChange={handleChange}
                       className="border px-2 py-0.5 bg-gray-200 rounded"/>
                <input type="password" placeholder="Confirmation du mot de passe" id="confirmPassword"
                       value={confirmPassword}
                       onChange={handleChange}
                       className="border px-2 py-0.5 bg-gray-200 rounded"/>
                {displayButton ?
                    <button type="submit"
                            className="mx-auto px-5 py-1 text-white bg-green-600 rounded">
                        Inscription
                    </button>
                    :
                    <button disabled
                            className="mx-auto px-5 py-1 text-white bg-red-600 rounded">
                        Incomplet
                    </button>
                }
            </div>
            <div>
                <hr className="border-dashed"/>
                <Link to="/login">
                    <span>Déjà inscrit ? (Connectez-vous)</span>
                </Link>
            </div>
        </form>
    </main>
)
}

export default SignUp