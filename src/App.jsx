import Header from './Components/Header.jsx'
import Landing from './Components/Landing.jsx'
import Footer from './Components/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp.jsx'
import Login from './Components/Login.jsx'
import Welcome from './Components/Welcome.jsx'
import ErrorPage from './Components/ErrorPage.jsx'
import ForgetPassword from './Components/ForgetPassword.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <div className="m-0 h-screen">
          <AuthProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/inscription" element={<SignUp />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/accueil" element={<Welcome />} />
              <Route path="/mot-de-passe-oublie" element={<ForgetPassword />} />
            </Routes>
            <Footer />
          </AuthProvider>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
