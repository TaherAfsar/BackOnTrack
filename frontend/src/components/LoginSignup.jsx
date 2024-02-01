import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    
    try {
      const response = isLogin
        ? await fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
        : await fetch('http://localhost:4000/user/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

      if (response.status === (isLogin ? 200 : 201)) {
        console.log(`${isLogin ? 'Login' : 'User added'} successful!`);

        // Store the user's name in local storage
        if (isLogin) {
          const user = await response.json();
          localStorage.setItem('user_name', user.name);
        } else {
          localStorage.setItem('user_name', formData.name);
        }

        // Redirect to home page after successful login or signup
        navigate('/home');
      } else {
        console.error(`Error ${isLogin ? 'logging in' : 'adding user'}:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error ${isLogin ? 'logging in' : 'adding user'}:`, error.message);
    }
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleAuth}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          />
        </label>
        {!isLogin && (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
              />
            </label>
            <label>
              Gender:
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
              />
            </label>
          </>
        )}
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;
