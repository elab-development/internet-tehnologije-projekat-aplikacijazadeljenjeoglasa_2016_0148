import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Modal.css';

function RegisterStudentModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [faculty, setFaculty] = useState('');
  const [major, setMajor] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Ime je obavezno.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Unesite validan email.';
    if (!password || password.length < 8) newErrors.password = 'Lozinka mora imati najmanje 8 karaktera.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Lozinke se ne poklapaju.';
    if (!faculty) newErrors.faculty = 'Fakultet je obavezan.';
    if (!major) newErrors.major = 'Smer je obavezan.';
    if (!graduationYear || graduationYear < new Date().getFullYear()) newErrors.graduationYear = 'Godina diplomiranja mora biti validna.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const newStudent = { 
        id: uuidv4(), 
        name, 
        email, 
        password, 
        faculty, 
        major, 
        graduationYear 
      };
  
      // Preuzmi postojeće studente iz localStorage
      let existingStudents = JSON.parse(localStorage.getItem('students')) || [];
  
      // Dodaj novog studenta u niz
      existingStudents.push(newStudent);
  
      // Sačuvaj ažurirani niz studenata u localStorage
      localStorage.setItem('students', JSON.stringify(existingStudents));
  
      console.log('Registered student:', newStudent);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrujte se kao Student</h2>
        <label>
          Ime:
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
          Fakultet:
          <input type="text" value={faculty} onChange={(e) => setFaculty(e.target.value)} />
          {errors.faculty && <p className="error">{errors.faculty}</p>}
        </label>
        <label>
          Smer:
          <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
          {errors.major && <p className="error">{errors.major}</p>}
        </label>
        <label>
          Godina Diplomiranja:
          <input type="number" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} />
          {errors.graduationYear && <p className="error">{errors.graduationYear}</p>}
        </label>
        <button onClick={handleRegister}>Registruj se</button>
        <button onClick={onClose}>Zatvori</button>
      </div>
    </div>
  );
};

export default RegisterStudentModal;