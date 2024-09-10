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

  return (
    <div className="application-card">
      <h3>{application.title}</h3>
      <p>Kompanija: {application.company}</p>
      <p>Datum prijave: {application.appliedAt}</p>
      <p>Ime studenta: {application.studentName}</p>
      <p>Fakultet: {application.faculty}</p>
      <p>Smer: {application.major}</p>
      <p>Status prijave: {status}</p>

      {isCompany && (
        <div>
          <select value={status} onChange={handleStatusChange}>
            <option value="Prijavljen">Prijavljen</option>
            <option value="Razmatranje">Razmatranje</option>
            <option value="Prihvaćen">Prihvaćen</option>
            <option value="Odbijen">Odbijen</option>
          </select>
          <button onClick={handleSave}>Sačuvaj</button>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;