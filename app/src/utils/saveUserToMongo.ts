import axios from 'axios'

const API_URL = 'http://localhost:8080';

export const saveUserToMongo = async (name: string | undefined, email: string | undefined, walletAddress: string | undefined) => {
  const response = await axios.post(`${API_URL}/creator/create`, {
    name: name,
    email: email,
    walletAddress: walletAddress,
  });
  return response;
}