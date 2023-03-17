import {signOut} from 'firebase/auth'
import { auth } from '../config/firebase-config'
import {Alert} from "@mui/material";

const Logout = () => {

    const handleClick = () => {
        signOut(auth).then(() => {
            return(
                <Alert severity="success">
                    Vous êtes bien déconnecté
                </Alert>
            )
        }).catch(error => {
            return(
                <Alert severity="error">
                    Il y a eu une erreur
                </Alert>
            )
        })
    }

  return (
      <button onClick={handleClick} className="text-amber-100 border rounded px-5">
          Déconnexion
      </button>
          )
}

export default Logout