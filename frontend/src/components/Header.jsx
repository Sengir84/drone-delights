import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import routes from "../AppRoutes";
import "./Header.css";
import Avatar from '../assets/avatars/Default avatar.png';
import logoimg from '../assets/Img/logo.png';
import dronedelight from '../assets/Img/drone delight text.png';
import { useEffect, useState, useRef } from "react";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const dropdownRef = useRef();

  const toggledropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

useEffect(() => {
  if (isLoggedIn) {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || "User");
  } else {
    setUsername("");
  }
}, [isLoggedIn]);

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <img src={logoimg} alt="Drone Delights Logo" id="header-logo" />
      </Link>
      
      <img src={dronedelight} alt="Drone Delight" id="drone-delight-text" />
     
     {!isLoggedIn ? (
      <div className="header-buttons">
        <button onClick={() => navigate('/register')}>Register</button>
        <button onClick={() => navigate('/login')}>Login</button>
       </div>
      ) : (
      <div className="avatar" ref={dropdownRef}>
        <img 
        src={Avatar} 
        alt="User Avatar" 
        id="avatar_pic"
        onClick={toggledropdown}
        style={{ cursor: 'pointer' }}
        />

        {isDropdownOpen && (
          <div className="avatar-dropdown">
            <p>Hello {username}</p>
            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={() => {
              localStorage.removeItem('token');
              setIsLoggedIn(false);
              navigate('/login');
            }}>Logout</button>
      </div>
      )}
      </div>
      )}
      
    </header>
  );
}

export default Header;