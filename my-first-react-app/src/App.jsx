import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import { jobProvider } from "./context/jobsContext";
import LandingPage from "./pages/LandingPage";
 
function App(){
  return (
    <AuthProvider>
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<LandingPage/>} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
export default App; 