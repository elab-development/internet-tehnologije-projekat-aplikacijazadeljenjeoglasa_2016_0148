import React, { useState, useEffect } from 'react';
import { getAllStudents, getAllCompanies, getAllApplications, deleteStudent, deleteCompany, deleteApplication } from '../Api';
import UserCard from '../components/UserCard';
import ApplicationCard from '../components/ApplicationCard';
import Navbar from '../components/Navbar';
import '../styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Proveri da li je ulogovani korisnik admin
    const user = JSON.parse(sessionStorage.getItem('currentUser')); 
    if (!user || user.userType !== 'admin') {
      navigate('/');
    } else {
      // Pribavljaj podatke u zavisnosti od taba
      const fetchData = async () => {
        if (activeTab === 'students') {
          await fetchStudents();
        } else if (activeTab === 'companies') {
          await fetchCompanies();
        } else if (activeTab === 'applications') {
          await fetchApplications();
        }
      };

      fetchData();
    }
  }, [activeTab, navigate]);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const data = await getAllCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const data = await getAllApplications();
      setApplications(data.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const handleDeleteStudent = (id) => {
    setItemToDelete(id);
    setDeleteType('student');
    setShowConfirmModal(true);
  };

  const handleDeleteCompany = (id) => {
    setItemToDelete(id);
    setDeleteType('company');
    setShowConfirmModal(true);
  };

  const handleDeleteApplication = (id) => {
    setItemToDelete(id);
    setDeleteType('application');
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    setShowConfirmModal(false);
    try {
      if (deleteType === 'student') {
        await deleteStudent(itemToDelete);
      } else if (deleteType === 'company') {
        await deleteCompany(itemToDelete);
      } else if (deleteType === 'application') {
        await deleteApplication(itemToDelete);
      }
      // Osvezi nakon brisanja
      if (activeTab === 'students') {
        await fetchStudents();
      } else if (activeTab === 'companies') {
        await fetchCompanies();
      } else if (activeTab === 'applications') {
        await fetchApplications();
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setItemToDelete(null);
      setDeleteType('');
    }
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
    setItemToDelete(null);
    setDeleteType('');
  };

  return (
    <div>
      <Navbar userType="admin" activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="admin-page-content">
        {activeTab === 'students' && (
          <div>
            <h2>All Students</h2>
            {students.map(student => (
              <UserCard 
                key={student.id} 
                user={student} 
                onDelete={() => handleDeleteStudent(student.id)} 
              />
            ))}
          </div>
        )}

        {activeTab === 'companies' && (
          <div>
            <h2>All Companies</h2>
            {companies.map(company => (
              <UserCard 
                key={company.id} 
                user={company} 
                onDelete={() => handleDeleteCompany(company.id)} 
              />
            ))}
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <h2>All Applications</h2>
            {applications.map(application => (
              <ApplicationCard 
                key={application.id} 
                application={application} 
                isCompany={false} 
                onSaveStatus={() => {}} 
                onDelete={() => handleDeleteApplication(application.id)} 
              />
            ))}
          </div>
        )}
      </div>

      {showConfirmModal && (
        <div className="confirm-modal">
          <div className="confirm-modal-content">
            <p>Da li ste sigurni da želite da obrišete ovu stavku? Ova akcija je nepovratna.</p>
            <button className="confirm-modal-button" onClick={confirmDelete}>Da</button>
            <button className="confirm-modal-button" onClick={cancelDelete}>Ne</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;