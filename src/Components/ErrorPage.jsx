import error from '../assets/error.png'

const ErrorPage = () => {
    return(
        <div>
            <h2>Oups... vous avez surement fait une erreur !</h2>
            <img src={error} alt="erreur page"/>
        </div>
    )

}

export default ErrorPage