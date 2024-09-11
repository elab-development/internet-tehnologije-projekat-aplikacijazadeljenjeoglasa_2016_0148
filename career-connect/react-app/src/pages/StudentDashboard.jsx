import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import ApplicationCard from '../components/ApplicationCard';
import '../styles/StudentDashboard.css';

function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;
  const [activeTab, setActiveTab] = useState('jobs');

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
  // Ensure currentUser is not null before accessing its properties
  const studentId = currentUser?.id || null;
  
  useEffect(() => {
    if (studentId === null) return;

    const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(allJobs);

    const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
    const studentApplications = allApplications.filter(app => app.studentId === studentId);
    setApplications(studentApplications);
  }, [studentId]);

  const handleApply = (job) => {
    if (!studentId) {
      alert('Please log in to apply for jobs.');
      return;
    }

    const newApplication = {
      ...job,
      studentId: studentId, 
      studentName: currentUser.name,
      faculty: currentUser.faculty,
      major: currentUser.major,
      appliedAt: new Date().toLocaleDateString(),
      status: 'Prijavljen',
    };

    const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
    const updatedApplications = [...allApplications, newApplication];
    
    setApplications(updatedApplications.filter(app => app.studentId === studentId));
    localStorage.setItem('applications', JSON.stringify(updatedApplications));

    alert(`Uspešno ste se prijavili na oglas: ${job.title}`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterMode === 'all' || job.workMode === filterMode;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / jobsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Navbar userType="student" activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="student-content">
        <div className="tab-buttons">
          <div 
            className={`tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Poslovi
          </div>
          <div 
            className={`tab-button ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Moje Prijave
          </div>
        </div>

        {activeTab === 'jobs' && (
          <div>
            <h1>Lista poslova</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Pretraga po imenu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={filterMode} onChange={(e) => setFilterMode(e.target.value)}>
                <option value="all">Svi</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="office">Office</option>
              </select>
            </div>

            <div className="job-list">
              {currentJobs.map((job) => {
                const alreadyApplied = applications.some((application) => application.id === job.id);
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
              jobsPerPage={jobsPerPage}
              totalJobs={filteredJobs.length}
              paginate={paginate}
              currentPage={currentPage}
              goToPreviousPage={goToPreviousPage}
              goToNextPage={goToNextPage}
            />
          </div>
        )}

        {activeTab === 'applications' && (
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
};

export default StudentDashboard;