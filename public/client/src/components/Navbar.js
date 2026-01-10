import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.ok ? r.json() : null)
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          💰 BIZZY
        </Link>
        
        <div className="nav-menu">
          {user ? (
            <>
              <Link to="/invoices" className="nav-link">Invoices</Link>
              <Link to="/quotes" className="nav-link">Quotes</Link>
              <Link to="/payments" className="nav-link">Upgrade</Link>
              <button onClick={logout} className="nav-link logout-btn">
                Logout ({user.email})
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link signup-btn">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;