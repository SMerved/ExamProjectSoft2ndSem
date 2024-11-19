import { http } from 'msw';
import { Credentials } from '../types/users';
import { VITE_BASE_URL } from '../constants';
import { Restaurant } from '../types/restaurants';

export const handlers = [
    http.post<never, Credentials>(
        `${VITE_BASE_URL}/login`,
        async ({ request }) => {
            const credentials = await request.json();
            const { username, password } = credentials;

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

            return new Response(
                JSON.stringify({ message: 'Invalid credentials' }),
                { status: 401 }
            );
        }
    ),

    http.get<never, Restaurant[]>(`${VITE_BASE_URL}/restaurants`, async () => {
        const restaurants = [
            {
                _id: '672de88ff54107237ff75565',
                name: 'The white chameleon',
                address: {
                    _id: '672df7b0f54107237ff75577',
                    city: 'Esbjerg',
                    postalCode: '6700',
                    street: 'Elm Court 27',
                },
                menu: [
                    {
                        _id: '672de8c4f54107237ff75547',
                        name: 'Chicken nuggets',
                        price: 6.99,
                        availability: true,
                    },
                    {
                        _id: '672de8c4f54107237ff75548',
                        name: 'Whopper Stopper without rubber',
                        price: 39.99,
                        availability: true,
                    },
                ],
            },
        ];

        return new Response(JSON.stringify(restaurants), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }),
];
