import React, { useState, useEffect } from 'react';
import '../styles/ApplicationCard.css';

function ApplicationCard({ application, isCompany, onSaveStatus, onDelete }) {
  const [status, setStatus] = useState(application.status);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Učitavanje currentUser iz sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.userType === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    onSaveStatus(application.id, status);
  };

  const handleDelete = () => {
    onDelete(application.id);
  };

  // Funkcija za formatiranje datuma, sa proverom da li je datum definisan
  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Nepoznato'; // Vrati default vrednost ako datum nije definisan
    }
    const date = new Date(dateString.replace(' ', 'T')); // Zameni razmak sa 'T' da bude u ISO formatu
    return date.toLocaleDateString();
  };

  return (
    <div className="application-card">
      <h3>{application.opening.title}</h3>
      <p>Kompanija: {application.opening.company}</p>
      <p>Datum prijave: {formatDate(application.applied_at)}</p>
      <p>Ime studenta: {application.student.name}</p>
      <p>Fakultet: {application.student.faculty}</p> 
      <p>Smer: {application.student.study_program}</p> 
      <p>Status prijave: {status}</p> 

      {isCompany && (
        <div>
          <select value={status} onChange={handleStatusChange}>
            <option value="interviewing">Razmatranje</option>
            <option value="accepted">Prihvaćen</option>
            <option value="rejected">Odbijen</option>
          </select>
          <button onClick={handleSave}>Sačuvaj</button>
        </div>
      )}

      {/* Dugme za brisanje koje je vidljivo samo adminima */}
      {isAdmin && (
        <button className="delete-button" onClick={handleDelete}>Obriši</button>
      )}
    </div>
  );
}

export default ApplicationCard;