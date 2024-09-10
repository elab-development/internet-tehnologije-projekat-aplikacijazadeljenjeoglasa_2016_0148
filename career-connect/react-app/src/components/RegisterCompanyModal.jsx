import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Modal.css';

function RegisterCompanyModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Ime je obavezno.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Unesite validan email.';
    if (!password || password.length < 8) newErrors.password = 'Lozinka mora imati najmanje 8 karaktera.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Lozinke se ne poklapaju.';
    if (!description) newErrors.description = 'Opis kompanije je obavezan.';
    if (!website) newErrors.website = 'Websajt je obavezan.';
    if (!location) newErrors.location = 'Lokacija je obavezna.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const newUser = { id: uuidv4(), name, email, password, description, website, location };
  
      // Preuzmi postojeće kompanije iz localStorage
      let existingCompanies = JSON.parse(localStorage.getItem('companies')) || [];
  
      // Dodaj novu kompaniju u niz
      existingCompanies.push(newUser);
  
      // Sačuvaj ažurirani niz kompanija u localStorage
      localStorage.setItem('companies', JSON.stringify(existingCompanies));
  
      console.log('Registered company:', newUser);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrujte se kao Kompanija</h2>
        <label>
          Naziv kompanije:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <label>
          Lozinka:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <label>
          Potvrdi Lozinku:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </label>
        <label>
          Opis Kompanije:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          {errors.description && <p className="error">{errors.description}</p>}
        </label>
        <label>
          Websajt:
          <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
          {errors.website && <p className="error">{errors.website}</p>}
        </label>
        <label>
          Lokacija:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          {errors.location && <p className="error">{errors.location}</p>}
        </label>
        <button onClick={handleRegister}>Registruj se</button>
        <button onClick={onClose}>Zatvori</button>
      </div>
    </div>
  );
};

export default RegisterCompanyModal;