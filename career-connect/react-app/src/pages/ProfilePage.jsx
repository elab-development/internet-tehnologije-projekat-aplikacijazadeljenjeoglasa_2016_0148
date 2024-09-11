import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteStudent, deleteCompany } from '../Api';
import Alert from '../components/Alert';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Učitavanje podataka trenutno ulogovanog korisnika iz sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
      // Ako korisnik nije ulogovan, preusmeravanje na početnu stranicu
      navigate('/');
    } else {
      setUserData(currentUser);
    }
  }, [navigate]);

  const handleDelete = async () => {
    setShowConfirmModal(false);
    try {
      // Provera tipa korisnika i brisanje iz baze
      if (userData.userType === 'student') {
        await deleteStudent(); // Poziv API funkcije za brisanje studenta
      } else if (userData.userType === 'company') {
        await deleteCompany(); // Poziv API funkcije za brisanje kompanije
      }

      // Uklanjanje korisnika iz sessionStorage nakon uspešnog brisanja
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('token');
      setAlertMessage('Profil je uspešno obrisan.');
      setAlertType('success');
      navigate('/'); // Preusmeravanje na početnu stranicu nakon brisanja

    } catch (error) {
      console.error("Greška prilikom brisanja profila:", error);
      setAlertMessage('Došlo je do greške prilikom brisanja profila. Pokušajte ponovo.');
      setAlertType('error');
    }
  };

  const handleBack = () => {
    // Navigacija nazad na prethodnu stranicu
    navigate(-1);
  };

  const handleConfirmDelete = () => {
    setShowConfirmModal(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  if (!userData) {
    return <div>Loading...</div>; // Prikazuje se dok se podaci ne učitaju
  }

  return (
    <div className="profile-page">
      {alertMessage && (
        <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage('')} />
      )}
      
      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>Da li ste sigurni da želite da obrišete svoj profil? Ova akcija je nepovratna.</p>
            <button className="confirm-modal-button" onClick={handleDelete}>Da</button>
            <button className="confirm-modal-button" onClick={handleCancelDelete}>Ne</button>
          </div>
        </div>
      )}

      <div className="profile-info">
        <h1>Profil {userData.userType === 'student' ? 'Studenta' : 'Kompanije'}</h1>
        <p><strong>Ime:</strong> {userData.name}</p>
        {userData.userType === 'student' && (
          <>
            <p><strong>Fakultet:</strong> {userData.student.faculty}</p>
            <p><strong>Smer:</strong> {userData.student.study_program}</p>
            <p><strong>Godina diplomiranja:</strong> {userData.student.graduation_year}</p>
          </>
        )}
        {userData.userType === 'company' && (
          <>
            <p><strong>Opis:</strong> {userData.company.description}</p>
            <p><strong>Websajt:</strong> {userData.company.website}</p>
            <p><strong>Lokacija:</strong> {userData.company.location}</p>
          </>
        )}
      </div>
      <div className="button-container">
        <button className="delete-button" onClick={handleConfirmDelete}>Obriši Profil</button>
        <button className="back-button" onClick={handleBack}>Nazad</button>
      </div>
    </div>
  );
}

export default ProfilePage;