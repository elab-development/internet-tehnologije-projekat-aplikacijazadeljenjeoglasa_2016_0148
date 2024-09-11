import React from 'react';
import '../styles/JobDetailsModal.css';

function JobDetailsModal({ job, isOpen, onClose, isStudent, onApply, alreadyApplied, onEdit, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{job.title}</h2>
        <p><strong>Kompanija:</strong> {job.company}</p>
        <p><strong>Tip zaposlenja:</strong> {job.employment_type}</p>
        <p><strong>Način rada:</strong> {job.work_mode}</p>
        <p><strong>Opis posla:</strong> {job.description}</p>
        <p><strong>Ističe:</strong> {job.expires_at}</p>

        {isStudent ? (
          alreadyApplied ? (
            <button disabled style={{ backgroundColor: '#28a745', cursor: 'not-allowed' }}>
              Prijavljeni ste
            </button>
          ) : (
            <button onClick={onApply}>Prijavi se</button>
          )
        ) : (
          <>
            <button onClick={onEdit}>Izmeni poziciju</button>
            <button onClick={onDelete} style={{ backgroundColor: 'red' }}>Obriši poziciju</button>
          </>
        )}
        
        <button onClick={onClose}>Zatvori</button>
      </div>
    </div>
  );
};

export default JobDetailsModal;
