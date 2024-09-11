import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import ApplicationCard from "../components/ApplicationCard";
import Alert from "../components/Alert"; // Dodajemo Alert komponentu
import { getAllOpenings, applyToJob, getStudentApplications } from "../Api";
import "../styles/StudentDashboard.css";

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("all");
  const [employmentType, setEmploymentType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState("jobs");
  const [alert, setAlert] = useState({ message: '', type: '' }); // Dodajemo stanje za Alert
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const studentId = currentUser?.id || null;

  useEffect(() => {
    if (studentId === null) return;

    // Povlačenje poslova iz baze uz primenu filtera
    const fetchJobs = async () => {
      try {
        const filters = {
          search: searchTerm,
          work_mode: filterMode === "all" ? undefined : filterMode,
          employment_type: employmentType === "all" ? undefined : employmentType,
        };
        const jobData = await getAllOpenings(filters, currentPage);
        setJobs(jobData.data);
        setTotalPages(jobData.meta.last_page);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
        setAlert({ message: "Došlo je do greške prilikom učitavanja poslova.", type: "error" });
      }
    };

    fetchJobs();
  }, [studentId, searchTerm, filterMode, employmentType, currentPage]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationData = await getStudentApplications();
        setApplications(applicationData.data);
      } catch (error) {
        console.error("Failed to fetch applications", error);
        setAlert({ message: "Došlo je do greške prilikom učitavanja prijava.", type: "error" });
      }
    };

    fetchApplications();
  }, [studentId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterMode, employmentType]);

  const handleApply = async (job) => {
    if (!studentId) {
      setAlert({ message: "Molimo vas da se prijavite kako biste aplicirali.", type: "warning" });
      return;
    }

    try {
      await applyToJob(job.id);
      setAlert({ message: `Uspešno ste aplicirali za posao: ${job.title}`, type: "success" });

      // Nakon prijave, ažuriramo listu prijava
      const updatedApplications = await getStudentApplications();
      setApplications(updatedApplications.data);
    } catch (error) {
      console.error("Failed to apply for job", error);
      setAlert({ message: "Došlo je do greške prilikom prijave na posao.", type: "error" });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Navbar userType="student" activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="student-content">
        {activeTab === "jobs" && (
          <div>
            <h1>Job Listings</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
                <option value="all">All work modes</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="office">Office</option>
              </select>
              <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
                <option value="all">All employment types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="job-list">
              {jobs.map((job) => {
                const alreadyApplied = applications.some((application) => application.opening_id === job.id);
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    isStudent={true}
                    onApply={() => handleApply(job)}
                    alreadyApplied={alreadyApplied}
                  />
                );
              })}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </div>
        )}
        {activeTab === "applications" && (
          <div>
            <h1>My Applications</h1>
            <div className="application-list">
              {applications.map((application, index) => (
                <ApplicationCard key={index} application={application} />
              ))}
            </div>
          </div>
        )}
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ message: '', type: '' })} 
        />
      </main>
    </div>
  );
}

export default StudentDashboard;