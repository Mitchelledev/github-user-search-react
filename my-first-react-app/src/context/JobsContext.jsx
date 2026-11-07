import { createContext, useEffect, useState } from "react";

export const JobsContext = createContext();

export function JobsProvider({children}) {
  const [jobs, setJobs] = useState(() => {
    const savedjobs = localStorage.getItem("jobs")
    return savedjobs ? JSON.parse(savedjobs) : []; 
  });
  const [applications, setApplications] = useState([]);  

  function initializeJobs(){
    const mockjobs = [ 
      {
        id: 1,
        title: "Senior React Developer",
        company: "Techorp.com", 
        postedBy: "udohchineye30@gmail.com",
        level: "Mid",
        location: "Remote",
        description: "we're looking for an experienced React developer to join our growing team",
        requirement: ["5+ years React", "TypeScript", "State Management"]
      },
      {
        id: 2,
        title: " Product Manager", 
        company: "Startup.com",
        postedBy: "udohchineye30@gmail.com",
        level: "Senior",
        location: "San francisco",
        description: "lead product strategy for our AI platform.",
        requirement: ["8+ years pm expereince", "Technical background", "Leadership"] 
      },
    ];
    setJobs((prev) => (prev.length > 0 ? prev : mockjobs)); 
  }

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  function getJobs(){
    return jobs; 
  }
  function getJobById(id) {
    return jobs.find(job => job.id === id); 
  }
  function searchjobs(query, level) {
    return jobs.filter(job => {
      const matchQuery = job.title.toLowerCase().includes(query.toLowerCase()) ||
                         job.company.toLowerCase().includes(query.toLowerCase()) 
      const matchLevel = level === "All Levels" || job.level === level
      return matchQuery && matchLevel;                   
    });
  }
  function applyToJob(jobId, userEmail) {
    const application = {
      id: Math.random(),
      jobId,
      userEmail,
      appliedAt: new Date().toLocaleDateString(), 
    };
    setApplications([...applications, application])
    return true;
  }

  function getUserApplication(userEmail) {
    return applications.filter(app => app.userEmail === userEmail)
  }
  function postJobs(jobData, userEmail) {
    const newJob = {
      id: Date.now(),
      ...jobData,
      postedBy: userEmail,
      postedAt: new Date().toLocaleDateString(),
    };
    setJobs([...jobs, newJob]);
    return true; 
  } 
  function deleteApplication(applicationid) {
    const updateApplications = applications.filter(app => app.id !== applicationid)
    setApplications(updateApplications); 
    return true; 
  }
  
  return(
    <JobsContext.Provider value={{
       jobs, 
      applications, 
      initializeJobs, 
      getJobs, 
      getJobById, 
      searchjobs, 
      applyToJob, 
      getUserApplication, 
      postJobs, 
      deleteApplication 
    }}>
      {children}
    </JobsContext.Provider>
  );
}
export default JobsContext; 