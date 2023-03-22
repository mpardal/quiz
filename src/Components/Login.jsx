import stadium from "../assets/stadium.png";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../Context/AuthContext.jsx";
import {useEffect} from "react";


const Login = () => {
    const {signIn, userSession} = useAuth()

    const navigate = useNavigate()

    const InputStyle = "border px-2 py-0.5 bg-gray-200 rounded"

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const email = formData.get("email")
        const password = formData.get("password")

        signIn(email, password)
            .then(() => {
                navigate('/accueil')
            })

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
                <img src={stadium} alt="inscription"/>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col m-auto gap-20 w-1/2">
                <h2 className="text-3xl">CONNEXION</h2>
                <div className="flex flex-col mx-auto gap-10 w-full">
                    <input type="email" placeholder="Email" id="email" name="email"
                           className={InputStyle}/>
                    <input type="password" placeholder="Mot de passe" id="password" name="password"
                           className={InputStyle}/>
                    <button type="submit"
                            className="mx-auto px-5 py-1 text-white bg-green-600 rounded">
                        Connexion
                    </button>
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