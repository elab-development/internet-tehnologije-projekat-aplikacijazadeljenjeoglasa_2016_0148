import React, { useState, useEffect } from 'react';
import '../styles/ApplicationCard.css';
import { changeStatus, downloadCv } from '../Api';
import Alert from './Alert';

function ApplicationCard({ application, isCompany, onSaveStatus, onDelete }) {
  const [status, setStatus] = useState(application.status);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

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

  const handleSave = async () => {
    try {
      // Pozivanje changeStatus funkcije iz Api.js
      await changeStatus(application.id, status);
      // Poziv onSaveStatus callback-a ako je potreban
      if (onSaveStatus) {
        onSaveStatus(application.id, status);
      }
      setAlertMessage('Status prijave je uspešno ažuriran.');
      setAlertType('success');
    } catch (error) {
      setAlertMessage(`Greška: ${error.message}`);
      setAlertType('error');
    }
  };

  const handleDelete = () => {
    onDelete(application.id);
  };

  // Funkcija za preuzimanje CV-a
  const handleDownloadCv = async () => {
    try {
      await downloadCv(application.id, application.student.name);
      setAlertMessage('CV je uspešno preuzet.');
      setAlertType('success');
    } catch (error) {
      setAlertMessage(`Greška pri preuzimanju CV-a: ${error.message}`);
      setAlertType('error');
    }
  };

  // Funkcija za formatiranje datuma, sa proverom da li je datum definisan
  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Nepoznato'; // Vrati default vrednost ako datum nije definisan
    }
    const date = new Date(dateString.replace(' ', 'T'));
    return date.toLocaleDateString();
  };

  // Funkcija za zatvaranje alert poruka
  const handleAlertClose = () => {
    setAlertMessage('');
  };

  return (
    <div className="application-card">
      {alertMessage && (
        <Alert message={alertMessage} type={alertType} onClose={handleAlertClose} />
      )}
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
          {application.cv_path && (
            <button onClick={handleDownloadCv}>Preuzmi CV</button>
          )}
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