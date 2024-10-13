import axios from 'axios'

const API_URL = 'https://sublinks.onrender.com';

export const saveUserToMongo = async (name, email, walletAddress) => {
  const response = await axios.post(`${API_URL}/blinks/create`, {
    name: name,
    email: email,
    walletAddress: walletAddress,
  });
  return response;
}