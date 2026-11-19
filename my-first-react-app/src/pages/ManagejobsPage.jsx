import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { JobsContext } from "../context/JobsContext"; 

function ManagejobsPage() {
  const { user, logout } = useContext(AuthContext);
  const { jobs, deletejob } = useContext(JobsContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    if (!user.isEmployer) navigate("/home");
  }, [user, navigate]);

  // Guard: after all hooks, before anything that reads user
  if (!user || !user.isEmployer) return null;

  const myJobs = jobs.filter((job) => job.postedBy === user.email);

  function handleLogout() {
    logout();
    navigate("/"); 
  }

  return (
    <div className="min-h-screen w-full bg-[#0B132B]">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-lg font-semibold text-slate-900">JobBoard</div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/post-job")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Post a job
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white border border-slate-300 bg-indigo-600 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-amber-200 mb-2">Manage Jobs</h1>
          <p className="text-slate-600 text-sm text-white">Jobs you've posted. Delete any listing you didn't mean to publish.</p>
        </div>

        <div className="flex flex-col gap-3">
          {myJobs.length === 0 ? (
            <p className="text-center text-white text-slate-600 py-8">You haven't posted any jobs yet</p>
          ) : (
            myJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-600">{job.company} • {job.level} • {job.location}</p>
                </div>
                <button
                  onClick={() => deletejob(job.id, user.email)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagejobsPage; 