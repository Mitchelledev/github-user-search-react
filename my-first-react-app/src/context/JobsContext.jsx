import { createContext, useState } from "react";

export const JobsContext = createContext();

export function JobsProvider({children}) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  function initializeJobs(){
    const mockjobs = [
      {
        id: 1,
        title: "Senior React Developer",
        company: "Techorp.com",
        level: "Mid",
        location: "Remote",
        decription: "we're looking for an experienced React developer to join our growing team",
        requirement: ["5+ years React", "TypeScript", "State Management"]
      },
      {
        id: 2,
        title: " product Manager",
        company: "Startup.com",
        level: "Senior",
        location: "San francisco",
        description: "lead product strategy for our AI platform.",
        requirement: ["8+ years pm expereince", "Technical background", "Leadership"] 
      },
    ];
    setJobs(mockjobs);
  }

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
      id: Math.random(),
      ...jobData,
      postedBy: userEmail,
      postedAt: new Date().toLocaleDateString(),
    };
    setJobs([...jobs, newJob]);
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
      postJobs 
    }}>
      {children}
    </JobsContext.Provider>
  );
}
export default JobsContext; 