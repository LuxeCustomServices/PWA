import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(setUser)
        .catch(() => setUser(null));
    }
  }, []);

  const quickActions = [
    {
      icon: '📄',
      title: 'Create Invoice',
      desc: 'Send professional invoices',
      action: () => navigate('/invoices'),
      color: '#4facfe'
    },
    {
      icon: '💼',
      title: 'New Quote',
      desc: 'Estimate project costs',
      action: () => navigate('/quotes'),
      color: '#667eea'
    },
    {
      icon: '💳',
      title: 'Get Paid',
      desc: 'Process payments',
      action: () => navigate('/payments'),
      color: '#28a745'
    },
    {
      icon: '⚡',
      title: 'Upgrade',
      desc: 'Unlock all features',
      action: () => navigate('/payments'),
      color: '#ffc107'
    }
  ];

  if (!user) {
    return (
      <div className="slide-in-up" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card-header">
            <div className="card-icon">🚀</div>
            <h1 className="card-title">Welcome to BIZZY</h1>
          </div>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
            The easiest way to create professional invoices and get paid faster.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/signup')} 
              className="btn btn-primary btn-large"
            >
              🎯 Get Started Free
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="btn" 
              style={{ background: 'transparent', color: '#667eea', border: '2px solid #667eea' }}
            >
              👋 Sign In
            </button>
          </div>
          <p style={{ marginTop: '20px', color: '#999', fontSize: '14px' }}>
            ✨ No credit card required • 🆓 3 free invoices • ⚡ Setup in 2 minutes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="slide-in-up">
      {/* Welcome Header */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div className="card-header" style={{ justifyContent: 'center', border: 'none' }}>
          <div className="card-icon">👋</div>
          <div>
            <h1 className="card-title">Welcome back, {user.name || user.email.split('@')[0]}!</h1>
            <p style={{ color: '#666', margin: '5px 0 0 0' }}>Ready to create some amazing invoices?</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((action, index) => (
          <div 
            key={index}
            className="quick-action"
            onClick={action.action}
            style={{ cursor: 'pointer' }}
          >
            <span className="quick-action-icon">{action.icon}</span>
            <div className="quick-action-title">{action.title}</div>
            <div className="quick-action-desc">{action.desc}</div>
          </div>
        ))}
      </div>

      {/* Upgrade Banner */}
      <div className="card" style={{ 
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="card-header" style={{ justifyContent: 'center', border: 'none' }}>
          <div className="card-icon" style={{ background: 'rgba(255,255,255,0.2)' }}>🚀</div>
          <div>
            <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Unlock Your Business Potential</h3>
            <p style={{ margin: '0', opacity: 0.9 }}>
              Create unlimited invoices, accept payments, and grow faster with BIZZY Pro.
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/payments')} 
          className="btn"
          style={{ 
            background: 'white', 
            color: '#4facfe', 
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(255,255,255,0.3)'
          }}
        >
          💎 Upgrade to Pro - Only $19/mo
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {/* Quick Stats */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">📊</div>
            <h3 className="card-title">This Month</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>0</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Invoices</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>$0</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Revenue</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>$0</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Pending</div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🎯</div>
            <h3 className="card-title">Getting Started</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '10px' }}>
              <span style={{ fontSize: '20px' }}>🎉</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>Welcome to BIZZY!</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Your account is ready to go</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: '#f8f9fa', borderRadius: '10px' }}>
              <span style={{ fontSize: '20px' }}>💡</span>
              <div>
                <div style={{ fontWeight: '600', fontSize: '14px' }}>Pro Tip</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Create your first invoice to get started</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs" style={{ marginTop: '30px' }}>
        <a href="/invoices" className="nav-tab">📄 Invoices</a>
        <a href="/quotes" className="nav-tab">💼 Quotes</a>
        <a href="/payments" className="nav-tab">💳 Payments</a>
        <a href="/schedule" className="nav-tab">📅 Schedule</a>
      </div>
    </div>
  );
}

export default Dashboard;