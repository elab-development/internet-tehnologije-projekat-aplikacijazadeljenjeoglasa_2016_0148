import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import '../styles/CompanyDashboard.css';

function CompanyDashboard() {
  const [openings, setOpenings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const openingsPerPage = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser) {
      const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const companyJobs = savedJobs.filter(job => job.companyId === currentUser.id);
      setOpenings(companyJobs);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleEdit = (job) => {
    navigate('/create-job', { state: { job } });
  };

  const handleDelete = (jobId) => {
    const allJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const updatedOpenings = allJobs.filter(job => job.id !== jobId);
    localStorage.setItem('jobs', JSON.stringify(updatedOpenings));
    
    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const updatedApplications = applications.filter(application => application.id !== jobId);
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    
    setOpenings(updatedOpenings.filter(job => job.companyId === JSON.parse(localStorage.getItem('currentUser')).id));
    
    alert('Oglas je uspešno obrisan');
  };

  const indexOfLastOpening = currentPage * openingsPerPage;
  const indexOfFirstOpening = indexOfLastOpening - openingsPerPage;
  const currentOpenings = openings.slice(indexOfFirstOpening, indexOfLastOpening);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < Math.ceil(openings.length / openingsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="company-content">
      <Navbar userType="company" />
      <main>
        <h1>Moji Oglasi</h1>
        <button className="create-job-button" onClick={() => navigate('/create-job')}>
          Kreiraj Novi Oglas
        </button>
        <div className="job-list">
          {currentOpenings.map((opening) => (
            <JobCard
              key={opening.id}
              job={opening}
              onEdit={() => handleEdit(opening)}
              onDelete={() => handleDelete(opening.id)}
            />
          ))}
        </div>
        <Pagination
          jobsPerPage={openingsPerPage}
          totalJobs={openings.length}
          paginate={paginate}
          currentPage={currentPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
        />
      </main>
    </div>
  );
};

export default CompanyDashboard;