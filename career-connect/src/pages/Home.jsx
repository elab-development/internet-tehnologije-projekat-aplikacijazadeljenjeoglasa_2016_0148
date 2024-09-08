import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterStudentModal from '../components/RegisterStudentModal';
import RegisterCompanyModal from '../components/RegisterCompanyModal';
import '../styles/Home.css';

function Home() {
  const [userType, setUserType] = useState('student');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleTabClick = (type) => {
    setUserType(type);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Pretraživanje studenta ili kompanije
    if (userType === 'student') {
      const students = JSON.parse(localStorage.getItem('students')) || [];
      const student = students.find(s => s.email === email && s.password === password);
  
      if (student) {
        console.log('Logged in as student');
        localStorage.setItem('currentUser', JSON.stringify({ ...student, userType: 'student' }));
        navigate('/student-dashboard');
      } else {
        alert('Neispravan email ili lozinka.');
      }
    } else if (userType === 'company') {
      const companies = JSON.parse(localStorage.getItem('companies')) || [];
      const company = companies.find(c => c.email === email && c.password === password);
      
      if (company) {
        console.log('Logged in as company');
        localStorage.setItem('currentUser', JSON.stringify({ ...company, userType: 'company' }));
        navigate('/company-dashboard');
      } else {
        alert('Neispravan email ili lozinka.');
      }
    }
  };

  return (
    <div className="home-container">
      <div className="tabs">
        <button
          className={userType === 'student' ? 'active' : ''}
          onClick={() => handleTabClick('student')}
        >
          Student
        </button>
        <button
          className={userType === 'company' ? 'active' : ''}
          onClick={() => handleTabClick('company')}
        >
          Kompanija
        </button>
      </div>

      <div className="login-container">
        <h1>{userType === 'student' ? 'Student Login' : 'Company Login'}</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
        <div className="register-link">
          <p>Nemaš nalog?</p>
          <button onClick={handleRegisterClick}>Registruj se</button>
        </div>
      </div>

      {showRegisterModal && (
        userType === 'student' ? (
          <RegisterStudentModal onClose={() => setShowRegisterModal(false)} />
        ) : (
          <RegisterCompanyModal onClose={() => setShowRegisterModal(false)} />
        )
      )}
    </div>
  );
};

export default Home;