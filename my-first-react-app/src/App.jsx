import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import SearchPage from "./SearchPage";
import UserPage from "./UserPage"; 

function App(){
  return (
    <UserProvider>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<SearchPage/>} />
     <Route path="/user/:username" element={<UserPage/>} /> 
    </Routes>
    </BrowserRouter> 
    </UserProvider>
  )
}
export default App; 