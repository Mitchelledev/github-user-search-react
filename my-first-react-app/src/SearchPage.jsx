import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function SearchPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  async function SearchUser() {
    if (username === '') return;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    
    if (data.message === "Not Found") {
      alert("User Not Found. Check username and try again.");
    } else {
      navigate(`/user/${username}`, { state: { userData: data } });
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600">Github user Search</h1>
      <SearchBar
        username={username}
        setUsername={setUsername}
        onSearch={SearchUser}
      />
    </div>
  );
}

export default SearchPage;