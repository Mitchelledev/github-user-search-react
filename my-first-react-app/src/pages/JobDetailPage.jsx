import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { JobsContext } from "../context/JobsContext";

function JobDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { getJobById, applyToJob } = useContext(JobsContext);
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false); 

  useEffect(() => {
    if (!user) {
      navigate("/");
      return; 
    }

    const foundJob = getJobById(parseInt(id));
    setJob(foundJob);
  }, [id, user, navigate]);

  function handleApply() {
    setLoading(true);
    const success = applyToJob(job.id, user.email);
    if (success) {
      setApplied(true);
    }
    setLoading(false);
  }

   if (!job) {
     return <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
      <p className="text-slate-600">Loading...</p> 
     </div>
   }

  return (
  <div className="min-h-screen w-full bg-slate-50">
    {/* Header with navigation */}
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
            onClick={() => navigate("/home")}
            className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            Back
          </button>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* Job Title Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">{job.title}</h1>
        <p className="text-slate-600 text-sm">
          {job.company} • {job.level} • {job.location} 
        </p>
      </div>

      {/* About Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">About this role</h2>
        <p className="text-slate-700">{job.description}</p>
      </div>

      {/* Requirements Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Requirements</h2>
        <ul className="list-disc list-inside space-y-2">
          {job.requirement.map((req, index) => (
            <li key={index} className="text-slate-700">{req}</li>
          ))}
        </ul>
              {/* Apply Button */}
      {applied ? (
        <p className="text-green-600 font-medium">✓ Application submitted!</p>
      ) : (
        <button
          onClick={handleApply}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 mt-3 disabled:bg-blue-400 cursor-pointer"
        >
          {loading ? "Applying..." : "Apply Now"}
        </button>
      )}
    </div>
  </div>
</div>
);  
}

export default JobDetailPage;