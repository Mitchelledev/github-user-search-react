import { useState } from "react";
import SearchBar from "./SearchBar"
import Usercard from "./Usercard"

function App(){
    const[Loading, setLoading] = useState(false)
    const[error, seterror] = useState(null)

    const[username, setUsername] = useState('')
    const[userData, setuserData] = useState(null)

  async function SearchUser(){
        if(username === '') return
        setLoading(true)
        seterror(null)

        const response = await fetch(`https://api.github.com/users/${username}`)
        const data = await response.json()

        if(data.message == "Not Found"){
        seterror("User Not Found. Check username and try again." )
        setuserData(null)
    } else{
        setuserData(data)
        setUsername('')
    }
    setLoading(false)
    }
    return(
        <div>
            <h1>Github user Search</h1>
            <SearchBar
            username ={username}
            setUsername={setUsername}
            onSearch ={SearchUser}
            />
            {Loading && <p>Searching...</p>}
            {error && <p>{error}</p>}
            <Usercard user ={userData}/>
        </div>
    )

}
export default App; 