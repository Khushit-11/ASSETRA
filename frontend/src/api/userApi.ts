import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};
export const signupUser = async (userData: any) => {
  const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
  return response.data;
};

// You can add more API functions here, e.g. registerUser, loginUser, etc.