import { createContext, useState } from "react";

export const jobContext = createContext();

export function jobProvider({children}) {
  const [jobs, setjobs] = useState([]);
  const [applications, setApplications] = useState([]);

  function initializejobs(){
    const mockjobs = [
      {
        id: 1,
        title: "Senior React Developer",
        company: "Techorp.com",
        level: "mid",
        location: "Remote",
        Decription: "we're looking for an experienced React developer to join our growing team",
        requirement: ["5+ years React", "TypeScript", "State Management"]
      },
      {
        id: 2,
        title: " product Manager",
        Company: "Startup.com",
        level: "Senior",
        location: "San francisco",
        description: "lead product strategy for our AI platform.",
        requirement: ["8+ years pm expereince", "Technical background", "Leadership"] 
      },
    ];
    setjobs(mockjobs);
  }

  function getjobs(){
    return jobs;
  }
  function getjobById(id) {
    return jobs.find(job => job.id === id);
  }
  function searchjobs(query, level) {
    return jobs.filter(job => {
      const matchQuery = job.title.toLowercase().includes(query.toLowercase()) ||
                         job.company.toLowercase().includes(query.toLowercase())
      const matchlevel = level === "All levels" || job.level === level
      return matchQuery && matchlevel;                   
    });
  }
  function applyTojob(jobId, userEmail) {
    const application = {
      id: Math.random(),
      jobId,
      userEmail,
      appliedAt: new Date().toLocaleDateString()
    };
    setApplications([...applications, application])
    return true;
  }
  function getUserApplication(userEmail) {
    return applications(app => app.userEmail === userEmail)
  }
  function postjobs(jobData, userEmail) {
    const newjob = {
      id: Math.random(),
      ...jobData,
      postedBy: userEmail,
      postedAt: new Date(). toLocaleDateString,
    };
    setjobs([...setjobs, newjob]);
    return true;
  } 
  return(
    <jobContext.Provider value={{
       jobs, 
      applications, 
      initializejobs, 
      getjobs, 
      getjobById, 
      searchjobs, 
      applyTojob, 
      getUserApplication, 
      postjobs 
    }}>
      {children}
    </jobContext.Provider>
  );
}