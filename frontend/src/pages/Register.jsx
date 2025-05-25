import { useState } from 'react';
import axios from 'axios';
import API_ROUTES from "../constants/API_ROUTES";
import { useNavigate } from 'react-router-dom';

 function Register() {

  const [formdata, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formdata.password !== formdata.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const {username, email, password} = formdata;
      await axios.post(API_ROUTES.REGISTER, { username, email, password });
      navigate("/login");
      } 
      catch (error) {
        console.error("Registration error:", error);
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='form-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        
        <input type='text' name='username' placeholder='Username' onChange={handleChange} required />
        <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
        <input type='password' name='password' placeholder='Password' onChange={handleChange} required />
        <input type='password' name='confirmPassword' placeholder='Confirm Password' onChange={handleChange} required />

        <button type='submit'>Register</button>
        {error && <p className='error'>{error}</p>}
      
      </form>
    </div>
  );
}

export default Register;

