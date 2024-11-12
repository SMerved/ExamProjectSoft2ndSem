import { useState } from 'react'
import './App.css'
import { Login } from './api/login';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    Login(username, password)
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '95%', padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '95%', padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>
        <button type="submit" style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}>
          Login
        </button>
    </form>
  );
}

export default App
