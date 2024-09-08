import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Učitavanje podataka trenutno ulogovanog korisnika iz localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      // Ako korisnik nije ulogovan, preusmeravanje na početnu stranicu
      navigate('/');
    } else {
      setUserData(currentUser);
    }
  }, [navigate]);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Da li ste sigurni da želite da obrišete svoj profil? Ova akcija je nepovratna.');

    if (confirmDelete) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser) {
        // Preuzmi sve korisnike, kompanije, oglase i prijave iz localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let companies = JSON.parse(localStorage.getItem('companies')) || [];
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        let applications = JSON.parse(localStorage.getItem('applications')) || [];

        // Filtriraj korisnike ili kompanije na osnovu tipa korisnika
        if (currentUser.userType === 'student') {
          // Brisanje studenta
          users = users.filter(user => user.id !== currentUser.id);
          localStorage.setItem('users', JSON.stringify(users));

          // Izbriši sve prijave koje je student kreirao
          const remainingApplications = applications.filter(application => application.studentId !== currentUser.id);
          localStorage.setItem('applications', JSON.stringify(remainingApplications));

        } else if (currentUser.userType === 'company') {
          // Brisanje kompanije
          companies = companies.filter(company => company.id !== currentUser.id);
          localStorage.setItem('companies', JSON.stringify(companies));
          
          // Izbriši sve oglase koje je kompanija kreirala
          const remainingJobs = jobs.filter(job => job.companyId !== currentUser.id);
          localStorage.setItem('jobs', JSON.stringify(remainingJobs));
        }
        
        // Obriši trenutno ulogovanog korisnika iz localStorage
        localStorage.removeItem('currentUser');
        navigate('/');
      }
    }
  };

  const handleBack = () => {
    // Navigacija nazad na prethodnu stranicu
    navigate(-1);
  };

  if (!userData) {
    return <div>Loading...</div>; // Prikazuje se dok se podaci ne učitaju
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h1>Profil {userData.userType === 'student' ? 'Studenta' : 'Kompanije'}</h1>
        <p><strong>Ime:</strong> {userData.name}</p>
        {userData.userType === 'student' && (
          <>
            <p><strong>Fakultet:</strong> {userData.faculty}</p>
            <p><strong>Glavna oblast:</strong> {userData.major}</p>
            <p><strong>Godina diplomiranja:</strong> {userData.graduationYear}</p>
          </>
        )}
        {userData.userType === 'company' && (
          <>
            <p><strong>Opis:</strong> {userData.description}</p>
            <p><strong>Websajt:</strong> {userData.website}</p>
            <p><strong>Lokacija:</strong> {userData.location}</p>
          </>
        )}
      </div>
      <div className="button-container">
        <button className="delete-button" onClick={handleDelete}>Obriši Profil</button>
        <button className="back-button" onClick={handleBack}>Nazad</button>
      </div>
    </div>
  );
};

export default ProfilePage;