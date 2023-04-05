import { auth } from '../config/firebase-config'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import interrogation from '../assets/interrogation.png'

const ForgetPassword = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(null)
        setSuccess(`Consultez votre ${email} pour réinitialiser le mot de passe`)
        setEmail('')
        setTimeout(() => {
          navigate('/connexion')
        }, 2000)
      })
      .catch((error) => {
        setError(error)
        setEmail('')
      })
  }

  return (
    <main className="h-full bg-gray-400">
      <h2 className="text-3xl text-center my-2 font-bold">Récupération de mot de passe</h2>
      <div className="flex flex-col xl:flex-row items-center xl:justify-between gap-10 pr-5 my-10">
        <div className="my-auto">
          <img src={interrogation} alt="interrogation" width="450" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col m-auto gap-5 w-1/2 text-3xl">
          <label htmlFor="email" className="ml-3">
            Entrez votre adresse mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            id="email"
            className="border px-2 py-0.5 bg-gray-200 rounded"
          />
          <button type="submit" className="mx-auto px-5 py-1 text-white bg-green-600 rounded">
            Récupérer
          </button>
          {success && <span className="bg-green-700 text-amber-100 border-2">{success}</span>}
          {error && <span className="bg-red-700">{error.message}</span>}
        </form>
      </div>
    </main>
  )
}

export default ForgetPassword
