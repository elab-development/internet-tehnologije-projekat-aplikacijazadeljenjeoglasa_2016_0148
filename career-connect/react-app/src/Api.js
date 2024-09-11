import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
// Helper funkcija za dobijanje Authorization header-a
const getAuthHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/register/
student`,
      studentData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const registerCompany = async (companyData) => {
  try {
    const response = await axios.post(
      `${API_URL}/register/
company`,
      companyData
    );
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
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAllOpenings = async (filters = {}, page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/openings`, {
      ...getAuthHeader(),
      params: { ...filters, page },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const applyToJob = async (openingId) => {
    try {
      const response = await axios.post(`${API_URL}/student/openings/${openingId}/apply`, {}, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  export const checkIfApplied = async (openingId) => {
    try {
      const response = await axios.get(`${API_URL}/student/openings/${openingId}/apply`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const getStudentApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/student/applications`, getAuthHeader());
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
