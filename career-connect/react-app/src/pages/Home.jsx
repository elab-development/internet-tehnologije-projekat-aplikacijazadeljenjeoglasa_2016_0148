import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Api';
import RegisterStudentModal from '../components/RegisterStudentModal';
import RegisterCompanyModal from '../components/RegisterCompanyModal';
import Alert from '../components/Alert';
import '../styles/Home.css';

function Home() {
  const [showRegisterStudentModal, setShowRegisterStudentModal] = useState(false);
  const [showRegisterCompanyModal, setShowRegisterCompanyModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const response = await loginUser(loginData);
      
      const { token, user_type, user } = response;

      // Čuvanje tokena i korisnika u sessionStorage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('currentUser', JSON.stringify({ ...user, userType: user_type }));

      // Navigacija prema odgovarajućem dashboard-u
      if (user_type === 'student') {
        navigate('/student-dashboard');
      } else if (user_type === 'company') {
        navigate('/company-dashboard');
      } else if (user_type === 'admin') {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      setAlertMessage('Neispravan email ili lozinka.');
      setAlertType('error');
    }
  };

  return (
    <div className="home-container">
      {alertMessage && (
        <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage('')} />
      )}
      
      <div className="login-container">
        <h1>Login</h1>
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
          {/* Dva dugmeta za registraciju: Student i Kompanija */}
          <button onClick={() => setShowRegisterStudentModal(true)}>Registruj se kao student</button>
          <button onClick={() => setShowRegisterCompanyModal(true)}>Registruj se kao kompanija</button>
        </div>
      </div>

      {/* Modal za registraciju studenta */}
      {showRegisterStudentModal && (
        <RegisterStudentModal onClose={() => setShowRegisterStudentModal(false)} />
      )}

      {/* Modal za registraciju kompanije */}
      {showRegisterCompanyModal && (
        <RegisterCompanyModal onClose={() => setShowRegisterCompanyModal(false)} />
      )}
    </div>
  );
};

export default Home;