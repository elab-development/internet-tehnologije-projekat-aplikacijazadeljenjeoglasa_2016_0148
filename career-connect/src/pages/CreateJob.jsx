import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/CreateJob.css';

function CreateJob() {
  const location = useLocation();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    employmentType: 'full-time',
    workMode: 'remote',
    expiresAt: '',
    description: '',
  });

  useEffect(() => {
    const jobToEdit = location.state?.job;
    if (jobToEdit) {
      setJobData(jobToEdit);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Preuzmi trenutno ulogovanog korisnika (kompaniju) iz localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];

    if (jobData.id) {
      // Izmena posla
      existingJobs = existingJobs.map(job => job.id === jobData.id ? jobData : job);
    } else {
      // Kreiranje novog posla
      const newJob = {
        id: Date.now(),
        companyId: currentUser.id, 
        company: currentUser.name,
        ...jobData,
      };
      existingJobs.push(newJob);
    }

    localStorage.setItem('jobs', JSON.stringify(existingJobs));
    alert('Oglas je uspešno sačuvan');
    navigate('/company-dashboard');
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  return (
    <div className="create-job-container">
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
          <label htmlFor="employmentType">Tip zaposlenja</label>
          <select
            name="employmentType"
            id="employmentType"
            value={jobData.employmentType}
            onChange={handleChange}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="workMode">Način rada</label>
          <select
            name="workMode"
            id="workMode"
            value={jobData.workMode}
            onChange={handleChange}
          >
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="expiresAt">Ističe</label>
          <input
            type="date"
            name="expiresAt"
            id="expiresAt"
            value={jobData.expiresAt}
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