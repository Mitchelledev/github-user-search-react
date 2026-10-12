import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {JobsContext} from "../context/JobsContext"; 

function MyApplicationPage() { 
    const {user, logout} = useContext(AuthContext);
    const {deleteApplication, getJobById, getUserApplication} = useContext(JobsContext); 
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [applications, setApplications] = useState([]); 

    useEffect(() => {
        if(!user) {
            navigate("/");
            return;
        }
        const userApps = getUserApplication(user.email);
        setApplications(userApps);
    }, [user, navigate, getUserApplication]);

    function handledeleteApplication(applicationid) {
        setLoading(true)
        deleteApplication(applicationid);
        setLoading(false)
    }
    function handlelogout() {
        logout();
        navigate("/")
    }

 return (
  <div className="min-h-screen w-full bg-slate-50">
    {/* Header */}
    <header className=" sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-lg font-semibold text-slate-900">JobBoard</div>
        <div className="flex gap-3">
          <button onClick={() => navigate("/home")}
            className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
            Home
          </button>
          <button onClick={handlelogout}
            className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </header>

    {/* Title */}
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">My Applications</h1>
        <p className="text-slate-600">Applied jobs</p> 
      </div>

      {/* Job Cards */}
      <div className="flex flex-col gap-3">
        {applications.length === 0 ? (
          <p className="text-center text-slate-600 font-bold py-8">No applied jobs found</p>
        ) : (
          applications.map((app) => (
            <div key={app.id} 
             className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="font-medium text-slate-900 mb-1">{getJobById(app.jobId).title}</div>
              <div className="text-sm text-slate-600 mb-3">
                {getJobById(app.jobId).company} • {getJobById(app.jobId).level} • {app.appliedAt}
              </div>
              <button
                onClick={() => handledeleteApplication(app.id)} 
                disabled={loading}
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
export default MyApplicationPage; 
