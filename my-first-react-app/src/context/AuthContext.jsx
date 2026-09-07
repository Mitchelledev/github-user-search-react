import { createContext, useState, useEffect } from "react";

export const Authcontext = createContext()

export function AuthProvider({children}) {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const saveduser = localStorage.getItem("user");
    if(saveduser) {
      setuser(JSON.parse(saveduser));
    }
  },[]);

  function signup(email, password, isEmployer) {
    setloading(true);
    seterror(null);

   const users = JSON.parse(localStorage.getItem("user") || "[]");

    if (users.find(u => u.email === email)) {
      seterror("Email already Exit");
      setloading(false)
      return false;
    }
    const newUser = {email, password, isEmployer};
    users.push(newUser);
    localStorage.setItem("users",JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(user));

    setuser(newUser)
    setloading(false)
    return true;
  }

  function login(email, password) {
    setloading(true)
    seterror(null);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(u => u.email === email && u.password === password); 

    if(!foundUser) {
      seterror("invalid email or password");
      setloading(false)
      return false;
    }
    localStorage.setItem("user", JSON.stringify(foundUser));
    setuser(foundUser)
    setloading(false)
    return true;
  }

  function logout() {
    localStorage.remove("user")
    setuser(null);
  }

  return (
    <Authcontext.Provider value={{user, loading, error, signup, login, logout}}>
      {children}
    </Authcontext.Provider>
  );
}