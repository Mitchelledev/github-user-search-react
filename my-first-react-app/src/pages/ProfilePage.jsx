import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import JobsContext from "../context/JobsContext";

function ProfilePage() {
  const { user, logout, updatedUser } = useContext(AuthContext);
  const {getUserApplication} = useContext(JobsContext);
  const navigate = useNavigate(); 

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    skills: "",
    experience: "",
    companyName: "",
    companyDescription: "",
    skillsRequired: "",
    experienceRequired: "",
  });
  const [snapshort, setsnapshort] = useState(null); 

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    setFormData({
      name: user.name ?? "", 
      bio: user.bio ?? "",
      location: user.location ?? "",
      skills: user.skills ?? "",
      experience: user.experience ?? "",
      companyName: user.companyName ?? "",
      companyDescription: user.companyDescription ?? "",
      skillsRequired: user.skillsRequired ?? "",
      experienceRequired: user.experienceRequired ?? "",
    });
  }, [user, navigate]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  
  function handleSave() {
    const success = updatedUser(formData);
    if (success) {
      setIsEditing(true); 
    }
  }
  function handleEdit() {
    setsnapshort(formData)
    setIsEditing(true);
  }
  function handleCancel() {
    setFormData(snapshort)
    setIsEditing(false); 
  }

  function handleLogout() {
    logout();
    navigate("/");
  }
  
  if (!user) return null; 

  const appliedCount = getUserApplication(user.email).length; 

  function renderField(label, name) {
    return (
      <div className="border-b border-slate-200 pb-4">
        <p className="text-sm text-slate-600 mb-1">{label}</p> 
        {isEditing ? (
          <input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        ) : (
          <p className="text-base text-slate-900">{formData[name] || "—"}</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-lg font-semibold text-slate-900">JobBoard</div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-slate-900">Your Profile</h1>
          {isEditing ? (
            <div className="flex gap-3">
              <button
                onClick={handleSave} 
                className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Edit
            </button>
          )}
        </div> 

        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-4">
          {!user.isEmployer && (
            <>
              {renderField("Name", "name")}
              {renderField("Bio", "bio")}
              {renderField("Location", "location")}
              {renderField("Skills", "skills")}
              {renderField("Experience", "experience")}
              { <div className="border-b border-slate-200 pb-4"> 
                <p className="text-sm text-slate-600 mb-1">job applied</p>
                <p className="text-base font-medium text-slate-900">{appliedCount}</p> 
              </div> }
            </> 
          )}

          {user.isEmployer && (
            <>
              {renderField("Company name", "companyName")}
              {renderField("Company description", "companyDescription")}
              {renderField("Skills required", "skillsRequired")}
              {renderField("Experience required", "experienceRequired")}
            </>
          )}

          <div> 
            <p className="text-sm text-slate-600 mb-1">Email</p>
            <p className="text-base font-medium text-slate-900">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 