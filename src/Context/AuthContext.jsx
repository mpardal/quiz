import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db } from '../config/firebase-config.js'
import { getDocs, collection, query, updateDoc, addDoc, doc } from 'firebase/firestore'

const AuthContext = createContext(/** @type {AuthContextValue} */ {})

/**
 * @typedef {object} AuthContextValue
 * @property {() => Promise<void>} signIn
 * @property {() => Promise<void>} signOut
 * @property {(email: string, password: string, pseudo: string) => Promise<void>} signUp
 * @property {import('firebase/auth').User | undefined} userData
 * @property {Error | undefined} error
 * @property {boolean} isSignedIn
 */

/**
 *
 * @return {AuthContextValue}
 */
export function useAuth() {
  return useContext(AuthContext)
}

// 1. Le AuthProvider ne devrait pas gérer le formulaire de login (loginData, etc)
// 2. Il ne devrait pas être responsable de la redirection (navigate)
// 3. Ne dois pas être responsable de l'affichage ou non d'élément sur la page (displayButton)

/**
 * Je te propose donc,
 *
 * AuthProvider permet de savoir qui est connecté, et quelles sont ses informations,
 *
 * Celui-ci met à dispo une function pour signIn, une function pour signOut, et signUp
 *
 * Je verrai donc,
 *
 * ``` jsx
 * <AuthContext.Provider value={{ signIn, logOut, signUp, userData }}>{children}</AuthContext.Provider>
 * ```
 */
export function AuthProvider({ children }) {
  const [userSession, setUserSession] = useState(false)
  const [userData, setUserData] = useState({})

  const signUp = async (email, password, pseudo) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(`${errorCode} => ${errorMessage}`)
      })
    await addDoc(collection(db, 'users'), {
      pseudo,
      email,
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserSession(true)
      } else {
        setUserSession(false)
      }
    })
  }, [])

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userCredential.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(`${errorCode} => ${errorMessage}`)
      })
  }

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        setUserSession(false)
        console.log('Vous êtes déconnectés')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(`${errorCode} => ${errorMessage}`)
      })
  }

  const setInfoUser = async () => {
    const userCollection = query(collection(db, 'users'))
    const querySnapshot = await getDocs(userCollection)
    querySnapshot.forEach((doc) => {
      setUserData(doc.data())
    })
  }

  /*  const addInfoUser = async () => {
      const userCollection = doc(db, 'users')
      await addDoc(userCollection, {
        score,
      })
    }*/

  const value = {
    userData,
    signUp,
    signIn,
    logOut,
    userSession,
    setInfoUser,
  }

  return (
    // comme ça ici, Phpstorm t'indique que value n'est pas au bon format,
    // tant que c'est souligné, ça veut sûrement dire que tu n'envoies pas les bons trucs
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}
