import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"
import {JobsContext} from "../context/JobsContext" 

function  HomePage() {
  const {user, logout} = useContext(AuthContext);
  const {jobs, initializeJobs, searchjobs} = useContext(JobsContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [filteredJobs, setfilteredJobs] = useState([]); 

  useEffect(() => {
    if(!user) {
      navigate("/")
    } else {
      initializeJobs();
    }
  }, [user, navigate]); 

  useEffect(() => {
    const results = searchjobs(searchQuery, selectedLevel)
    setfilteredJobs(results);
  }, [jobs, searchQuery, selectedLevel]); 

  function handleSearch() {
    const results = searchjobs(searchQuery, selectedLevel)
    setfilteredJobs(results);
    setSearchQuery("")
  }
  function handleViewDetails(jobid) {
    navigate(`/job/${jobid}`);
  } 
  function handlelogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-lg font-semibold text-slate-900">JobBoard</div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/applications")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              My Applications
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Profile
            </button>
            <button
              onClick={handlelogout}
              className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search Section */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search jobs by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> 
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>All Levels</option>
            <option>Entry</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 cursor-pointer text-sm"
          >
            Search
          </button>
        </div>

        {/* Job Cards */}
        <div className="flex flex-col gap-3">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-slate-600 py-8">No jobs found</p> 
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 cursor-pointer"
              >
                <div className="font-medium text-slate-900 mb-1">{job.title}</div>
                <div className="text-sm text-slate-600 mb-3">
                  {job.company} • {job.level} • {job.location}
                </div>
                <button
                  onClick={() => handleViewDetails(job.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage; 