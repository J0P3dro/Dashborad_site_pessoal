
import axios from "axios";

export interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await axios.post("https://site-pessoaldb-2.onrender.com/login", data);
  return response.data; 
};
