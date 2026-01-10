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

  const handleUpgrade = () => navigate('/payments');

  return (
    <div className="dashboard">
      <div className="container">
        {user ? (
          <div className="fade-in-up">
            <div className="welcome-header">
              <h1>Welcome back, {user.name || user.email.split('@')[0]}! 👋</h1>
              <p>Ready to create some amazing invoices?</p>
            </div>

            <div className="upgrade-banner card">
              <div className="upgrade-content">
                <div className="upgrade-text">
                  <h3>🚀 Unlock Your Business Potential</h3>
                  <p>Create unlimited invoices, accept payments, and grow faster with BIZZY Pro.</p>
                </div>
                <button onClick={handleUpgrade} className="btn btn-primary">
                  Upgrade to Pro - Only $19/mo
                </button>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="quick-actions card">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button 
                    onClick={() => navigate('/invoices')} 
                    className="action-btn btn btn-success"
                  >
                    📄 Create Invoice
                  </button>
                  <button 
                    onClick={() => navigate('/quotes')} 
                    className="action-btn btn btn-primary"
                  >
                    💼 New Quote
                  </button>
                  <button 
                    onClick={() => navigate('/payments')} 
                    className="action-btn btn btn-outline"
                  >
                    ⚡ Upgrade Plan
                  </button>
                </div>
              </div>

              <div className="stats-card card">
                <h3>This Month</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">0</div>
                    <div className="stat-label">Invoices Sent</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">$0</div>
                    <div className="stat-label">Revenue</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">$0</div>
                    <div className="stat-label">Pending</div>
                  </div>
                </div>
              </div>

              <div className="recent-activity card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon">🎉</div>
                    <div className="activity-text">
                      <strong>Welcome to BIZZY!</strong>
                      <p>Your account has been created successfully.</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon">💡</div>
                    <div className="activity-text">
                      <strong>Pro Tip</strong>
                      <p>Create your first invoice to start getting paid faster.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-guest fade-in-up">
            <div className="guest-content">
              <h1>Start Your Business Journey</h1>
              <p>Join thousands of entrepreneurs using BIZZY to get paid faster.</p>
              <button 
                onClick={() => navigate('/signup')} 
                className="btn btn-primary btn-large"
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .dashboard {
          min-height: calc(100vh - 70px);
          padding: 40px 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .welcome-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 12px;
        }

        .welcome-header p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .upgrade-banner {
          margin-bottom: 40px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          border: none;
        }

        .upgrade-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .upgrade-text h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .upgrade-text p {
          opacity: 0.9;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .quick-actions h3,
        .stats-card h3,
        .recent-activity h3 {
          margin-bottom: 24px;
          color: #333;
          font-weight: 600;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-btn {
          width: 100%;
          text-align: left;
          padding: 16px 20px;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 12px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 8px;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 12px;
        }

        .activity-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .activity-text strong {
          display: block;
          color: #333;
          margin-bottom: 4px;
        }

        .activity-text p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .welcome-guest {
          text-align: center;
          padding: 100px 20px;
        }

        .guest-content h1 {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
        }

        .guest-content p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
        }

        .btn-outline {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-outline:hover {
          background: #667eea;
          color: white;
        }

        @media (max-width: 768px) {
          .upgrade-content {
            flex-direction: column;
            text-align: center;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .welcome-header h1 {
            font-size: 2rem;
          }

          .guest-content h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;