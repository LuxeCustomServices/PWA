import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/forgot-password', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email }) 
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        alert(data.error || 'Error sending reset email');
      }
    } catch (err) {
      alert('Error sending reset email');
    } finally { 
      setLoading(false); 
    }
  };

  if (sent) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card card fade-in-up">
            <div className="auth-header">
              <h2>Check Your Email</h2>
              <p>We've sent password reset instructions to {email}</p>
            </div>
            <div className="auth-footer">
              <Link to="/login" className="auth-link">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card fade-in-up">
          <div className="auth-header">
            <h2>Forgot Password?</h2>
            <p>Enter your email to reset your password</p>
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
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary auth-submit"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="auth-footer">
            <Link to="/login" className="auth-link">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}