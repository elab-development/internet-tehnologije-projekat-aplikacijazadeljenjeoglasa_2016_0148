import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import ApplicationCard from "../components/ApplicationCard";
import { getAllOpenings } from "../Api"; // Uvezi novu funkciju
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
          employment_type:
            employmentType === "all" ? undefined : employmentType,
        };
        const jobData = await getAllOpenings(filters, currentPage);
        setJobs(jobData.data); // Podaci sa paginacijom su unutar
        `data`;
        setTotalPages(jobData.meta.last_page); // Postavi ukupne stranice iz meta podataka
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };
    fetchJobs();
    // Održavanje prijava iz localStorage (možeš ih kasnije povući iz baze)
    const allApplications =
      JSON.parse(localStorage.getItem("applications")) || [];
    const studentApplications = allApplications.filter(
      (app) => app.studentId === studentId
    );
    setApplications(studentApplications);
  }, [studentId, searchTerm, filterMode, employmentType, currentPage]); // Dodajemo zavisnosti
  useEffect(() => {
    setCurrentPage(1); // Postavi stranicu na 1 kada se filteri
    promene;
  }, [searchTerm, filterMode, employmentType]);
  const handleApply = (job) => {
    if (!studentId) {
      alert("Please log in to apply for jobs.");
      return;
    }
    const newApplication = {
      ...job,
      studentId: studentId,
      studentName: currentUser.name,
      faculty: currentUser.faculty,
      major: currentUser.major,
      appliedAt: new Date().toLocaleDateString(),
      status: "Prijavljen",
    };
    const allApplications =
      JSON.parse(localStorage.getItem("applications")) || [];
    const updatedApplications = [...allApplications, newApplication];

    setApplications(
      updatedApplications.filter((app) => app.studentId === studentId)
    );
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
    alert(`Uspešno ste se prijavili na oglas: ${job.title}`);
  };
  // Paginacija
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
      <Navbar
        userType="student"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="student-content">
        {activeTab === "jobs" && (
          <div>
            <h1>Lista poslova</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Pretraga nazivu pozicije..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
              >
                <option value="all">Svi nacini rada</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="office">Office</option>
              </select>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
              >
                <option value="all">Svi tipovi zaposlenja</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="job-list">
              {jobs.map((job) => {
                const alreadyApplied = applications.some(
                  (application) => application.id === job.id
                );
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
            <h1>Moje Prijave</h1>
            <div className="job-list">
              {applications.map((application, index) => (
                <ApplicationCard key={index} application={application} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default StudentDashboard;
