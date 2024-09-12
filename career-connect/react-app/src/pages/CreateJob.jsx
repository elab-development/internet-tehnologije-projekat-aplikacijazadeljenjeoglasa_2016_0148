import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOpening, updateOpening } from '../Api';
import Alert from '../components/Alert';
import '../styles/CreateJob.css';

function CreateJob() {
  const location = useLocation();
  const navigate = useNavigate();

  // Dodajemo state za poruke
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const [jobData, setJobData] = useState({
    title: '',
    employment_type: 'full-time',
    work_mode: 'remote',
    expiresAtDate: '',
    expiresAtTime: '',
    description: '',
    location: '',
  });

  useEffect(() => {
    const jobToEdit = location.state?.job;
    if (jobToEdit) {
      const [date, time] = jobToEdit.expires_at.split(' ');
      setJobData({
        ...jobToEdit,
        expiresAtDate: date,
        expiresAtTime: time,
      });
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expires_at = `${jobData.expiresAtDate} ${jobData.expiresAtTime}`;

    const updatedJobData = { ...jobData, expires_at };

    try {
      if (jobData.id) {
        // Izmena postojećeg oglasa
        await updateOpening(jobData.id, updatedJobData);
        setAlertMessage('Oglas je uspešno ažuriran');
        setAlertType('success');
      } else {
        // Kreiranje novog oglasa
        await createOpening(updatedJobData);
        setAlertMessage('Oglas je uspešno kreiran');
        setAlertType('success');
      }
      // Nakon uspeha, preusmeravamo nakon kratkog vremena
      setTimeout(() => navigate('/company-dashboard'), 2000);
    } catch (error) {
      console.error("Greška prilikom čuvanja oglasa:", error);
      setAlertMessage('Došlo je do greške prilikom čuvanja oglasa. Pokušajte ponovo.');
      setAlertType('error');
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const closeAlert = () => {
    setAlertMessage('');
  };

  return (
    <div className="create-job-container">
      {/* Prikaz poruke */}
      {alertMessage && (
        <Alert message={alertMessage} type={alertType} onClose={closeAlert} />
      )}

      <h1>{jobData.id ? 'Izmeni Oglas' : 'Kreiraj Novi Oglas'}</h1>
      <form onSubmit={handleSubmit} className="create-job-form">
        <div className="form-group">
          <label htmlFor="title">Naslov</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Naslov posla"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="employment_type">Tip zaposlenja</label>
          <select
            name="employment_type"
            id="employment_type"
            value={jobData.employment_type}
            onChange={handleChange}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="work_mode">Način rada</label>
          <select
            name="work_mode"
            id="work_mode"
            value={jobData.work_mode}
            onChange={handleChange}
          >
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="expiresAtDate">Datum isteka</label>
          <input
            type="date"
            name="expiresAtDate"
            id="expiresAtDate"
            value={jobData.expiresAtDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiresAtTime">Vreme isteka</label>
          <input
            type="time"
            name="expiresAtTime"
            id="expiresAtTime"
            value={jobData.expiresAtTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Lokacija</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Unesite lokaciju"
            value={jobData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Opis posla</label>
          <textarea
            name="description"
            id="description"
            placeholder="Opis posla"
            value={jobData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Sačuvaj</button>
      </form>
    </div>
  );
};

export default CreateJob;