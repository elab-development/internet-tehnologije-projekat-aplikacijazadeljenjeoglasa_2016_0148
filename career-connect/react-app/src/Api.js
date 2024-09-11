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
            `${API_URL}/register/student`,
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
            `${API_URL}/register/company`,
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

export const getCompanyOpenings = async () => {
    try {
        const response = await axios.get(`${API_URL}/company/openings`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteOpening = async (openingId) => {
    try {
        const response = await axios.delete(`${API_URL}/openings/${openingId}`, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateOpening = async (openingId, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/openings/${openingId}`, updatedData, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createOpening = async (openingData) => {
    try {
        const response = await axios.post(`${API_URL}/openings`, openingData, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Brisanje studenta (sopstvenog naloga ili od strane admina)
export const deleteStudent = async (studentId = null) => {
    try {
        const url = studentId 
            ? `${API_URL}/student/profile/${studentId}` // Admin briše odredjenog studenta
            : `${API_URL}/student/profile`;            // Student briše svoj nalog
        const response = await axios.delete(url, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Brisanje kompanije (sopstvenog naloga ili od strane admina)
export const deleteCompany = async (companyId = null) => {
    try {
        const url = companyId 
            ? `${API_URL}/company/profile/${companyId}` // Admin briše odredjenu kompaniju
            : `${API_URL}/company/profile`;            // Kompanija briše svoj nalog
        const response = await axios.delete(url, getAuthHeader());
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funkcija za dobijanje trenutne lokacije
export const getCurrentLocation = async () => {
    try {
        // Prvo dobijamo IP adresu
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const ipAddress = ipResponse.data.ip;

        // Zatim dobijamo lokaciju na osnovu IP adrese
        const locationResponse = await axios.get(`http://api.ipstack.com/${ipAddress}?access_key=faf77daa746a14dd7cdf025fde147b1a`);
        const locationData = locationResponse.data;

        // Ekstrahuj željene podatke
        const { continent_name, country_name, city } = locationData;

        return { continent_name, country_name, city };
    } catch (error) {
        console.error("Error fetching location:", error);
        throw error.response ? error.response.data : error;
    }
};