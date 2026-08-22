import { useParams, useLocation, Link } from "react-router-dom";
import Usercard from "./Usercard";

function UserPage() {
  const { username } = useParams();
  const location = useLocation();
  const userData = location.state?.userData;

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:underline">← Back to Search</Link>
      {userData ? (
        <Usercard user={userData} />
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default UserPage;