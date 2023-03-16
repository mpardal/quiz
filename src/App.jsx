import Header from "./Components/Header.jsx";
import Landing from "./Components/Landing.jsx";
import Footer from "./Components/Footer.jsx";
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./Components/SignUp.jsx";
import Login from "./Components/Login.jsx";
import Welcome from "./Components/Welcome.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";

function App() {

  return (
    <BrowserRouter>
        <div className="m-0 h-screen">
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/inscription" element={<SignUp />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/accueil" element={<Welcome />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
  )
}

export default App
