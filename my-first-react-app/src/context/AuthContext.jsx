import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext()

export function AuthProvider({children}) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null; 
  }); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const saveduser = localStorage.getItem("user");
    if(saveduser) {
      setUser(JSON.parse(saveduser));  
    }
  },[]); 

  function signup(name, email, password, isEmployer) {
    setLoading(true);
    setError(null); 

   const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
      setError("Email already Exit");
      setLoading(false)
      return false;
    }
    const newUser = {email, password, isEmployer, name};
    users.push(newUser);
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(user));

    setUser(newUser)
    setLoading(false)
    return true; 
  }

  function login( email, password) {
    setLoading(true)
    setError(null);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.email === email && u.password === password); 

    if(!foundUser) {
      setError("Invalid Email or Password"); 
      setLoading(false)
      return null;
    }
    localStorage.setItem("user", JSON.stringify(foundUser));
    setUser(foundUser)
    setLoading(false)
    return foundUser; 
  }

  function updatedUser(newData) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? {...u, ...newData} : u 
  );
  const updatedUser = {...user, ...newData};
  
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  localStorage.setItem("user", JSON.stringify(updatedUser)); 
  setUser(updatedUser)
  return true; 
  }

  function logout() {
    localStorage.removeItem("user")
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, loading, error, signup, login, updatedUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext; 