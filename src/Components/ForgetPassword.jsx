import { auth } from '../config/firebase-config'
import { sendPasswordResetEmail } from 'firebase/auth'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import interrogation from "../assets/interrogation.jpg"

const ForgetPassword = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError(null)
                setSuccess(`Consultez votre ${email} pour réinitialiser le mot de passe`)
                setEmail("")
                setTimeout(() => {
                    navigate('/connexion')
                }, 2000)
            }).catch(error => {
                setError(error)
                setEmail("")
            }
        )
    }

    return(
        <>
            <h2 className="text-3xl text-center my-2 font-bold">Récupération de mot de passe</h2>
            <div className="flex flex-row justify-between h-full bg-gray-400 gap-5 pr-5">
                <img src={interrogation} alt="interrogation"/>
                <form onSubmit={handleSubmit} className="flex flex-col m-auto gap-2 w-1/2">
                    <label htmlFor="email" className="ml-3">Entrez votre adresse mail</label>
                    <input type="email" value={email} onChange={e => {setEmail(e.target.value)}} id="email"
                           className="border px-2 py-0.5 bg-gray-200 rounded"/>
                    <button type="submit">Récupérer</button>
                    {success && <span className="bg-green-700 text-amber-100 border-2">
                        {success}
                    </span>
                    }
                    {error && <span className="bg-red-700">{error.message}</span>}
                </form>
            </div>
        </>
    )
}

export default ForgetPassword