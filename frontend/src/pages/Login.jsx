import { useState } from 'react';
import axios from 'axios';
import API_Routes from '../constants/API_Routes';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formdata, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(API_Routes.LOGIN, formdata);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("username", response.data.username);
      window.location.reload();
      navigate("/");
  }
    catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className='form-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} required />
        <button type='submit'>Login</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );

}

export default Login;