import { BASE_URL } from '../constants';
import { User } from '../types/users';

const baseUrl = BASE_URL

export const Login = async (username: string, password: string): Promise<User> => {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, password}),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }
    return response.json();
  };