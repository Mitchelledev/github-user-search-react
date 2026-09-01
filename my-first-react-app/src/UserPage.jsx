import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import Usercard from "./Usercard";

function UserPage() {
  const { userData, loading, error } = useContext(UserContext);

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:underline">← Back to Search</Link>
      
      {loading && <p>Searching...</p>}
      {error && <p>{error}</p>}
      {userData && <Usercard user={userData} />}
    </div>
  );
}

export default UserPage; 