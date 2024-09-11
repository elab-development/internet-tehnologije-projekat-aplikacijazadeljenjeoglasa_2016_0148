import React, { useState } from 'react';
import '../styles/ApplicationCard.css';

function ApplicationCard({ application, isCompany, onSaveStatus }) {
  const [status, setStatus] = useState(application.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    onSaveStatus(application.id, status);
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
      <h3>{application.opening.title}</h3> {/* Prikazuje naziv pozicije */}
      <p>Kompanija: {application.opening.company}</p> {/* Prikazuje ime kompanije */}
      <p>Datum prijave: {formatDate(application.applied_at)}</p> {/* Prikazuje datum prijave */}
      <p>Ime studenta: {application.student.name}</p> {/* Prikazuje ime studenta */}
      <p>Fakultet: {application.student.faculty}</p> {/* Prikazuje fakultet */}
      <p>Smer: {application.student.study_program}</p> {/* Prikazuje studijski program */}
      <p>Status prijave: {status}</p> {/* Prikazuje trenutni status prijave */}

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
    </div>
  );
}

export default ApplicationCard;