import React, { useState } from 'react';
import Alert from './Alert';
import ApplicationsModal from '../components/ApplicationsModal';
import '../styles/JobDetailsModal.css';

function JobDetailsModal({
  job,
  isOpen,
  onClose,
  isStudent,
  onApply,
  alreadyApplied,
  onEdit,
  onDelete
}) {
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isApplicationsModalOpen, setIsApplicationsModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setAlertMessage('CV mora biti fajl manji od 2MB');
        setAlertType('error');
        return;
      }
      if (file.type !== 'application/pdf') {
        setAlertMessage('CV mora biti u PDF formatu.');
        setAlertType('error');
        return;
      }
      setCvFile(file);
      setCvFileName(file.name);
      setAlertMessage('');
    }
  };

  const handleRemoveCv = () => {
    setCvFile(null);
    setCvFileName('');
    document.getElementById('cv-upload').value = '';
  };

  const handleApply = () => {
    if (cvFile) {
      onApply(cvFile);
    } else {
      onApply();
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage('');
  };

  const handleOpenApplicationsModal = () => {
    setIsApplicationsModalOpen(true);
  };

  const handleCloseApplicationsModal = () => {
    setIsApplicationsModalOpen(false);
  };

  return (
    <>
      {alertMessage && (
        <Alert message={alertMessage} type={alertType} onClose={handleCloseAlert} />
      )}
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
              <>
                <input
                  type="file"
                  id="cv-upload"
                  style={{ display: 'none' }}
                  onChange={handleCvChange}
                />
                {!cvFile ? (
                  <label htmlFor="cv-upload" className="file-input-label">
                    Priloži CV
                  </label>
                ) : (
                  <div className="cv-file-info">
                    <span>Priložen CV: {cvFileName}</span>
                    <button onClick={handleRemoveCv} className="remove-cv-button">x</button>
                  </div>
                )}
                <button onClick={handleApply}>Prijavi se</button>
              </>
            )
          ) : (
            <>
              <button onClick={onEdit}>Izmeni poziciju</button>
              <button onClick={onDelete} style={{ backgroundColor: 'red' }}>Obriši poziciju</button>
              <button onClick={handleOpenApplicationsModal}>Pogledaj prijave</button>
            </>
          )}

          <button onClick={onClose}>Zatvori</button>
        </div>
      </div>

      {/* Applications Modal */}
      {isApplicationsModalOpen && (
        <ApplicationsModal
          openingId={job.id}
          onClose={handleCloseApplicationsModal}
        />
      )}
    </>
  );
}

export default JobDetailsModal;