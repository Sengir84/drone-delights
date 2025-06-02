import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; 

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    address: { street: '', city: '', zip: ''},
    phone: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setProfile(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put('/api/users/profile', profile, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="address-section">
      
        <label>Username:</label>
        <input type="text" name="username" value={profile.username} disabled />
        <label>Email:</label>
        <input type="email" name="email" value={profile.email} disabled />
        <label>Phone:</label>
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
      
        
        <label>Firstname</label>
        <input type='text' name='firstName' placeholder='First Name' value={profile.firstName} onChange={handleChange} />
        <label>Lastname</label>
        <input type='text' name='lastName' placeholder='Last Name' value={profile.lastName} onChange={handleChange} />
        <label>Streetaddress</label>
        <input type="text" name="address.street" placeholder="Street" value={profile.address.street} onChange={handleChange} />
        <label>City</label>
        <input type="text" name="address.city" placeholder="City" value={profile.address.city} onChange={handleChange} />
        <label>Zipcode</label>
        <input type="text" name="address.zip" placeholder="ZIP" value={profile.address.zip} onChange={handleChange} />
        
      </div>
      <button id="profile-save-button" type="submit">Save</button>
    </form>
  );
}

export default Profile;