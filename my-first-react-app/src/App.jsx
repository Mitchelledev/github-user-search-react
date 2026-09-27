import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import { JobsProvider } from "./context/JobsContext";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
 
function App(){
  return (
    <AuthProvider>
    <JobsProvider> 
    <BrowserRouter> 
    <Routes>
     <Route path="/" element={<LandingPage/>} />
     <Route path="/signup" element={<SignUpPage/>} />
     <Route path="/signin" element={<SignInPage/>} />
     <Route path="/home" element={<HomePage/>} />
     </Routes>
    </BrowserRouter>
    </JobsProvider>
    </AuthProvider>
  );
}
export default App; 