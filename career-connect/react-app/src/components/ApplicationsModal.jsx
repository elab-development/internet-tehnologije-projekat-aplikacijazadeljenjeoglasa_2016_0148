import React, { useState, useEffect } from 'react';
import { getApplicationsForOpening } from '../Api';
import ApplicationCard from './ApplicationCard'; 
import '../styles/ApplicationsModal.css';

function ApplicationsModal({ openingId, onClose }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicationsForOpening(openingId);
        setApplications(data.data);
      } catch (err) {
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [openingId]);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Prijave za oglas</h2>
        </div>
        <div className="modal-body">
          <div className="applications-list">
            {applications.map(application => (
              <ApplicationCard 
                key={application.id}
                application={application}
                isCompany={true}
                onSaveStatus={(id, status) => {/* Implement status save */}}
                onDelete={(id) => {/* Implement delete */}}
              />
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>Zatvori</button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsModal;