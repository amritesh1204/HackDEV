import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/navbarstyles.css'; 

export default function Navbar() {
  const navigate = useNavigate();
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleAnonymous = () => {
    setIsAnonymous(!isAnonymous); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Loki</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/about" className="nav-link">About Us</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/chat" className="nav-link">Chat</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/canvas" className="nav-link">Canvas</NavLink>
        </li>
        {isAnonymous && (
          <li className="nav-item">
            <NavLink to="/whistleblow" className="nav-link">Whistleblow</NavLink>
          </li>
        )}
      </ul>
      <div className="auth-buttons">
        <button className="login-button" onClick={() => handleNavigate('/login')}>Login</button>
        <button className="register-button" onClick={() => handleNavigate('/register')}>Register</button>
      </div>
      <button className="anonymous-button" onClick={toggleAnonymous}>
        {isAnonymous ? "Disable Anonymous" : "Enable Anonymous"}
      </button>
    </nav>
  );
}
