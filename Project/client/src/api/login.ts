import { User } from '../types/users';

const baseUrl = import.meta.env.VITE_BASE_URL

console.log(baseUrl)

export const Login = async (username: string, password: string): Promise<User> => {
  console.log(baseUrl)
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