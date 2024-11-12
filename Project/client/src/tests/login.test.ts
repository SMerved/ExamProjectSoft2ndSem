import { Login } from '../api/login';

describe('Login function', () => {
  it('should return user data on successful login', async () => {
    const user = await Login('testuser', 'testpass');
    expect(user).toEqual({
      id: 1,
      username: 'testuser',
      role: 'user',
    });
  });

  it('should throw an error on failed login', async () => {
    await expect(Login('wronguser', 'wrongpass')).rejects.toThrow('Failed to login');
  });
});
