import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Alert from '../components/Alert'; // Importujemo Alert komponentu
import { getCompanyOpenings, deleteOpening } from '../Api'; // Importuj API funkcije
import '../styles/CompanyDashboard.css';

function CompanyDashboard() {
  const [openings, setOpenings] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' }); // Stanje za Alert komponentu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpenings = async () => {
      try {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (currentUser) {
          const response = await getCompanyOpenings();
          setOpenings(response.data); // Pristupi 'data' iz odgovora
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to fetch openings:', error);
        setAlert({ message: 'Došlo je do greške prilikom učitavanja oglasa.', type: 'error' });
      }
    };

    fetchOpenings();
  }, [navigate]);

  const handleEdit = (job) => {
    navigate('/create-job', { state: { job } });
  };

  const handleDelete = async (jobId) => {
    try {
      await deleteOpening(jobId);
      // Ponovo učitaj oglase nakon brisanja
      const updatedOpenings = await getCompanyOpenings();
      setOpenings(updatedOpenings.data);
      setAlert({ message: 'Oglas je uspešno obrisan', type: 'success' });
    } catch (error) {
      console.error('Failed to delete job:', error);
      setAlert({ message: 'Došlo je do greške prilikom brisanja oglasa.', type: 'error' });
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
          {openings.map((opening) => (
            <JobCard
              key={opening.id}
              job={opening}
              onEdit={() => handleEdit(opening)}
              onDelete={() => handleDelete(opening.id)}
            />
          ))}
        </div>
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ message: '', type: '' })} 
        />
      </main>
    </div>
  );
};

export default CompanyDashboard;