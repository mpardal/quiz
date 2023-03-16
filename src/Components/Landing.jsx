import {useRef} from "react";
import {Link} from "react-router-dom";

const Landing = () => {

    const refSignUpButton = useRef(null)
    const refLoginButton = useRef(null)

    console.log(refLoginButton)

    return(
        <main className="flex justify-around h-full text-amber-100 bg-worldcup bg-red-600 bg-no-repeat bg-center">
            <div className="my-auto">
                <button ref={refSignUpButton}
                        className="border-2 py-3 px-6 rounded bg-transparent text-lg text-center no-underline
                                   hover:bg-gray-800">
                    <Link to="/inscription">
                        Inscription
                    </Link>
                </button>
            </div>
            <div className="my-auto">
                <button ref={refLoginButton}
                        className="border-2 py-3 px-6 rounded bg-transparent text-lg text-center no-underline
                                   hover:bg-gray-800">
                    <Link to="/connexion">
                        Connexion
                    </Link>
                </button>
            </div>
        </main>
    )
}

export default Landing