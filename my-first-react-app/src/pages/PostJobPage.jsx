import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { JobsContext } from "../context/JobsContext";

function PostJobPage() {
  const { user, logout } = useContext(AuthContext);
  const { postJobs } = useContext(JobsContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [level, setLevel] = useState("Entry");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    if (!user.isEmployer) {
      navigate("/home");
    }
  }, [user, navigate]);

  // Guard goes after all hooks, before anything that reads user
  if (!user || !user.isEmployer) return null;

  function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    const jobData = {
      title: title.trim(),
      company: company.trim(),
      level,
      location: location.trim(),
      description: description.trim(),
      requirement: requirements
        .split(",")
        .map((req) => req.trim())
        .filter((req) => req !== ""),
    };

    postJobs(jobData, user.email);
    navigate("/profile");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const inputClass =
    "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm";

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-lg font-semibold text-slate-900">JobBoard</div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Profile
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

      <div className="max-w-3xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">Post a job</h1>
          <p className="text-slate-600 text-sm">Fill in the details seekers will see.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Job title</p>
            <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-1">Company</p>
            <input className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-1">Level</p>
            <select className={inputClass} value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="Entry">Entry</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-1">Location</p>
            <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-1">Description</p>
            <textarea
              className={inputClass}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-1">Requirements (separate with commas)</p>
            <input className={inputClass} value={requirements} onChange={(e) => setRequirements(e.target.value)} />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Post job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJobPage;