import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }) 
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Login error');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card fade-in-up">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your BIZZY account</p>
          </div>
          
          <form onSubmit={submit} className="auth-form">
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
                placeholder="Enter your password"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary auth-submit"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Don't have an account? 
              <Link to="/signup" className="auth-link"> Sign up here</Link>
            </p>
            <p>
              <Link to="/forgot-password" className="auth-link">Forgot your password?</Link>
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
          margin: 0;
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