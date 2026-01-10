import React, { useState } from 'react';

function Payments() {
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(setMe)
        .catch(() => setMe(null));
    }
  }, []);

  const handleCheckout = async (plan) => {
    setLoading(true);
    try {
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Unable to start checkout');
      }
    } catch (err) {
      console.error(err);
      alert('Checkout error');
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: 9,
      features: ['Unlimited invoices', 'Basic templates', 'Email support', 'Stripe integration'],
      popular: false
    },
    {
      name: 'Pro',
      price: 19,
      features: ['Everything in Starter', 'Custom branding', 'Recurring billing', 'Priority support', 'Advanced analytics'],
      popular: true
    },
    {
      name: 'Business',
      price: 39,
      features: ['Everything in Pro', 'Multi-user access', 'API access', 'White-label solution', 'Phone support'],
      popular: false
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2>Choose Your Plan</h2>
        <p>Start your 14-day free trial. No credit card required.</p>
        {me && <p style={{ color: '#28a745' }}>Signed in as {me.email}</p>}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {plans.map((plan, index) => (
          <div key={index} style={{
            background: 'white',
            border: plan.popular ? '3px solid #007cba' : '1px solid #ddd',
            borderRadius: '12px',
            padding: '30px',
            textAlign: 'center',
            position: 'relative',
            boxShadow: plan.popular ? '0 8px 25px rgba(0,124,186,0.15)' : '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#007cba',
                color: 'white',
                padding: '6px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                MOST POPULAR
              </div>
            )}
            
            <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>{plan.name}</h3>
            <div style={{ margin: '20px 0' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#007cba' }}>${plan.price}</span>
              <span style={{ color: '#666', fontSize: '16px' }}>/month</span>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '30px 0', textAlign: 'left' }}>
              {plan.features.map((feature, i) => (
                <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ color: '#28a745', marginRight: '10px' }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => handleCheckout(plan.name.toLowerCase())}
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: plan.popular ? '#007cba' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Processing...' : `Start ${plan.name} Trial`}
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Launch Special: 70% Off First 6 Months!</h3>
        <p>Join now and save big. Limited time offer - prices start at just $9/month!</p>
        <small style={{ color: '#666' }}>All plans include 14-day free trial - Cancel anytime - No setup fees</small>
      </div>
    </div>
  );
}

export default Payments;