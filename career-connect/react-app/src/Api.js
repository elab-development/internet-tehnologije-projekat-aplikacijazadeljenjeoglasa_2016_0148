import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/register/student`, studentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post(`${API_URL}/register/company`, companyData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};