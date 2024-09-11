import React, { useState } from 'react';
import { registerStudent } from '../Api'; // Uvezi API funkciju
import Alert from '../components/Alert'; // Uvezi Alert komponentu
import '../styles/Modal.css';

function RegisterStudentModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [faculty, setFaculty] = useState('');
  const [study_program, setStudyProgram] = useState('');
  const [graduation_year, setGraduationYear] = useState('');
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [shouldCloseModal, setShouldCloseModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Ime je obavezno.';
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Unesite validan email.';
    if (!password || password.length < 8) newErrors.password = 'Lozinka mora imati najmanje 8 karaktera.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Lozinke se ne poklapaju.';
    if (!faculty) newErrors.faculty = 'Fakultet je obavezan.';
    if (!study_program) newErrors.study_program = 'Smer je obavezan.';
    if (!graduation_year || graduation_year < new Date().getFullYear()) newErrors.graduation_year = 'Godina diplomiranja mora biti validna.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const studentData = { 
          name, 
          email, 
          password, 
          password_confirmation: confirmPassword, 
          faculty, 
          study_program, 
          graduation_year 
        };

        // Pozovi API za registraciju studenta
        const response = await registerStudent(studentData);
        console.log('Student registered successfully:', response);

        // Postavi uspešnu poruku
        setAlert({ message: 'Student je uspešno registrovan!', type: 'success' });
        setShouldCloseModal(true); // Označi da treba da se zatvori modal

      } catch (error) {
        // Obradi greške sa backend-a
        console.log('Error during student registration:', error);
        setAlert({ message: 'Email već postoji. Molimo pokušajte sa drugim emailom.', type: 'error' });
      }
    }
  };

  const handleAlertClose = () => {
    setAlert({ message: '', type: '' });
    if (alert.type === 'success' && shouldCloseModal) {
      onClose(); // Zatvori modal samo kada je obaveštenje uspešno
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Registrujte se kao Student</h2>
        {/* Prikaz Alert komponente */}
        <Alert message={alert.message} type={alert.type} onClose={handleAlertClose} />

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
          <input type="text" value={study_program} onChange={(e) => setStudyProgram(e.target.value)} />
          {errors.study_program && <p className="error">{errors.study_program}</p>}
        </label>
        <label>
          Godina Diplomiranja:
          <input type="number" value={graduation_year} onChange={(e) => setGraduationYear(e.target.value)} />
          {errors.graduation_year && <p className="error">{errors.graduation_year}</p>}
        </label>
        <button onClick={handleRegister}>Registruj se</button>
        <button onClick={onClose}>Zatvori</button>
      </div>
    </div>
  );
}

export default RegisterStudentModal;