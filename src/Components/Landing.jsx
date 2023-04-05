import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <main className="flex flex-col xl:flex-row justify-center items-center xl:justify-around h-full text-amber-100 xl:bg-worldcup bg-red-600 bg-no-repeat bg-center">
      <div className="xl:my-auto my-5">
        <button
          className="border-2 py-3 px-6 rounded bg-transparent text-lg text-center no-underline
                                   hover:bg-gray-800"
        >
          <Link to="/inscription">Inscription</Link>
        </button>
      </div>
      <div className="xl:my-auto my-5">
        <button
          className="border-2 py-3 px-6 rounded bg-transparent text-lg text-center no-underline
                                   hover:bg-gray-800"
        >
          <Link to="/connexion">Connexion</Link>
        </button>
      </div>
    </main>
  )
}

export default Landing
