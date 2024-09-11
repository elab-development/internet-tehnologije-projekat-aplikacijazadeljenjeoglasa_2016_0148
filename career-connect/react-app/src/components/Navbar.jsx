import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ userType, activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <ul className="left">
                {userType === 'student' && (
                    <>
                        <li>
                            <button
                                className={activeTab === 'jobs' ? 'active' : ''}
                                onClick={() => setActiveTab('jobs')}
                            >
                                Poslovi
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeTab === 'applications' ? 'active' : ''}
                                onClick={() => setActiveTab('applications')}
                            >
                                Prijave
                            </button>
                        </li>
                    </>
                )}
                {userType === 'company' && (
                    <li>
                        <span>Moji Oglasi</span>
                    </li>
                )}
                {userType === 'admin' && (
                    <>
                        <li>
                            <button
                                className={activeTab === 'students' ? 'active' : ''}
                                onClick={() => setActiveTab('students')}
                            >
                                Students
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeTab === 'companies' ? 'active' : ''}
                                onClick={() => setActiveTab('companies')}
                            >
                                Companies
                            </button>
                        </li>
                        <li>
                            <button
                                className={activeTab === 'applications' ? 'active' : ''}
                                onClick={() => setActiveTab('applications')}
                            >
                                Applications
                            </button>
                        </li>
                    </>
                )}
            </ul>
            <ul className="right">
                {userType !== 'admin' && (
                    <li>
                        <button onClick={handleProfileClick}>Profile</button>
                    </li>
                )}
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;