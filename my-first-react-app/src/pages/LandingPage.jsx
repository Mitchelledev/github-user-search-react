import { useContext, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

 function LandingPage(){
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) { 
      navigate("/home");
    }
  }, [user, navigate]);

  function handleBrowseJobs(){
    navigate("/signin");
  }
  function handlePostJob(){
    navigate("/signin");
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-lg font-semibold text-slate-900">JobBoard</div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/signin")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Sign Up
            </button> 
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex items-center justify-center flex-col py-20 px-6">
        <h1 className="text-4xl font-semibold text-slate-900 mb-4 text-center">
          Find Your Next Opportunity
        </h1>
        <p className="text-slate-600 text-center mb-8 max-w-md">
          Search thousands of jobs or post your own. Connect talent with opportunity.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleBrowseJobs}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 font-medium cursor-pointer"
          >
            Browse Jobs
          </button>
          <button
            onClick={handlePostJob}
            className="px-6 py-3 border border-slate-300 text-slate-900 rounded-lg mt-4 hover:bg-slate-100 font-medium cursor-pointer"
          >
            Post a Job
          </button>
        </div>
      </div>
    </div>
  );
}



export default LandingPage;