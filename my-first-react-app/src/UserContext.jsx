import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({children}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  return(
    <UserContext.Provider  value={{userData, setUserData, loading, setLoading, error, setError}}>
      {children}
    </UserContext.Provider>
  );
} 
