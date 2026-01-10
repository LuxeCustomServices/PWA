import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in-up">
          <h1 className="hero-title">
            Get Paid <span className="gradient-text">Faster</span> Than Ever
          </h1>
          <p className="hero-subtitle">
            Professional invoicing made simple. Create stunning invoices, 
            get paid online, and grow your business with BIZZY.
          </p>
          <div className="hero-buttons">
            <button 
              onClick={() => navigate('/signup')}
              className="btn btn-primary btn-large"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => navigate('/payments')}
              className="btn btn-outline"
            >
              View Pricing
            </button>
          </div>
          <p className="hero-note">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <div className="features-grid">
            <div className="feature-card card fade-in-up">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Create professional invoices in under 60 seconds. No complex setup required.</p>
            </div>
            <div className="feature-card card fade-in-up">
              <div className="feature-icon">💳</div>
              <h3>Get Paid Online</h3>
              <p>Accept credit cards, bank transfers, and digital payments with built-in Stripe integration.</p>
            </div>
            <div className="feature-card card fade-in-up">
              <div className="feature-icon">📱</div>
              <h3>Works Everywhere</h3>
              <p>Progressive Web App works on desktop, tablet, and mobile. Install like a native app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <h2 className="section-title">Join Thousands of Happy Entrepreneurs</h2>
          <div className="testimonials">
            <div className="testimonial card">
              <p>"BIZZY cut my invoicing time from hours to minutes. Game changer!"</p>
              <div className="testimonial-author">
                <strong>Sarah K.</strong>
                <span>Freelance Designer</span>
              </div>
            </div>
            <div className="testimonial card">
              <p>"Finally, an invoicing tool that doesn't break the bank. Love it!"</p>
              <div className="testimonial-author">
                <strong>Mike R.</strong>
                <span>Consultant</span>
              </div>
            </div>
            <div className="testimonial card">
              <p>"Clean interface, powerful features. Exactly what I needed!"</p>
              <div className="testimonial-author">
                <strong>Lisa T.</strong>
                <span>Agency Owner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Transform Your Business?</h2>
          <p>Join thousands of entrepreneurs who trust BIZZY for their invoicing needs.</p>
          <button 
            onClick={() => navigate('/signup')}
            className="btn btn-success btn-large"
          >
            Start Your Free Trial Now
          </button>
          <p className="cta-note">
            Setup takes less than 2 minutes
          </p>
        </div>
      </section>

      <style jsx>{`
        .landing {
          overflow-x: hidden;
        }

        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          position: relative;
        }

        .hero-content {
          max-width: 800px;
          z-index: 2;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.2;
          color: white;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 40px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 1.1rem;
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .hero-note {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .features {
          padding: 100px 20px;
          background: rgba(255, 255, 255, 0.05);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 60px;
          color: white;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
        }

        .feature-card {
          text-align: center;
          padding: 40px 24px;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 24px;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 16px;
          color: #333;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        .social-proof {
          padding: 100px 20px;
        }

        .testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .testimonial {
          padding: 30px;
          text-align: center;
        }

        .testimonial p {
          font-size: 1.1rem;
          font-style: italic;
          margin-bottom: 20px;
          color: #555;
        }

        .testimonial-author strong {
          display: block;
          color: #333;
          margin-bottom: 4px;
        }

        .testimonial-author span {
          color: #666;
          font-size: 0.9rem;
        }

        .cta {
          padding: 100px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: white;
        }

        .cta-content p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-note {
          margin-top: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .testimonials {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Landing;