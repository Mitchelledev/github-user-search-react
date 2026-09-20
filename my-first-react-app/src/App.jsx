import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import { jobProvider } from "./context/jobsContext";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInpage from "./pages/SignInPage"
 
function App(){
  return (
    <AuthProvider>
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<LandingPage/>} />
    <Route path="/signup" element={<SignUpPage/>} />
    <Route path="/signin" element={<SignInpage/>} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
export default App; 