import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/signup', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password, name }) 
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Signup error');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card fade-in-up">
          <div className="auth-header">
            <h2>Start Your Journey</h2>
            <p>Create your BIZZY account and get paid faster</p>
          </div>
          
          <form onSubmit={submit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text"
                className="form-input"
                value={name} 
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email"
                className="form-input"
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-success auth-submit"
            >
              {loading ? 'Creating account...' : 'Start Free Trial'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Already have an account? 
              <Link to="/login" className="auth-link"> Sign in here</Link>
            </p>
            <p className="terms-text">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: calc(100vh - 70px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .auth-container {
          width: 100%;
          max-width: 400px;
        }

        .auth-card {
          padding: 40px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 8px;
        }

        .auth-header p {
          color: #666;
          font-size: 1rem;
        }

        .auth-form {
          margin-bottom: 24px;
        }

        .auth-submit {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          font-weight: 600;
        }

        .auth-footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .auth-footer p {
          color: #666;
          margin: 0 0 12px 0;
        }

        .terms-text {
          font-size: 0.85rem;
          color: #999 !important;
        }

        .auth-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-left: 4px;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}