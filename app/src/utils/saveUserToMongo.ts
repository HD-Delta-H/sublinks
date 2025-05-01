import { API_URL } from '@/App';
import axios from 'axios'


export const saveUserToMongo = async (name: string | undefined, email: string | undefined) => {
  const response = await axios.post(`${API_URL}/creator/create`, {
    name: name,
    email: email,
    walletAddress: "",
  });
  return response;
}