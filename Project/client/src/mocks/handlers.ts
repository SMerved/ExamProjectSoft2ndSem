import { http } from 'msw';
import { Credentials } from '../types/users';
import { VITE_BASE_URL } from '../constants';

export const handlers = [
  http.post<never, Credentials>(`${VITE_BASE_URL}/login`, async ({ request }) => {
    const credentials = await request.json();
    const {username, password} = credentials

    if (username === 'testuser' && password === 'testpass') {
      return new Response(
        JSON.stringify({
          id: 1,
          username: 'testuser',
          role: 'user',
        }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }),
];
