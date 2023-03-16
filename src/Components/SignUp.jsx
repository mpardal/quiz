import club from '../assets/club.png'

const SignUp = () => {
return(
    <main className="flex flex-row justify-between m-10 h-full">
        <div className="my-auto">
            <img src={club} alt="inscription"/>
        </div>
        <form className="flex flex-col mx-auto gap-10">
            <h2 className="text-3xl">INSCRIPTION</h2>
            <div className="flex flex-col mx-auto gap-10">
                <input type="text" placeholder="Pseudo"
                       className="border px-2 py-0.5"/>
                <input type="email" placeholder="Email"
                       className="border px-2 py-0.5"/>
                <input type="password" placeholder="Mot de passe"
                       className="border px-2 py-0.5"/>
                <button type="submit"
                        className="mx-auto my-3 px-2 py-1 text-white bg-red-600">
                    Inscription
                </button>
            </div>
        </form>
    </main>
)
}

export default SignUp