import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ client: '', amount: '', description: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (invoices.length >= 3) {
      alert('Free plan limited to 3 invoices. Upgrade to Pro for unlimited invoices!');
      navigate('/payments');
      return;
    }
    const newInvoice = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
      status: 'Draft'
    };
    setInvoices([...invoices, newInvoice]);
    setFormData({ client: '', amount: '', description: '' });
    setShowForm(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Invoices</h2>
        <button onClick={() => setShowForm(true)} style={{ background: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          + New Invoice
        </button>
      </div>
      
      {invoices.length >= 2 && (
        <div style={{ background: '#fff3cd', padding: '15px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
          <p>You're using {invoices.length}/3 free invoices. <strong>Upgrade to Pro</strong> for unlimited invoices + payment processing!</p>
          <button onClick={() => navigate('/payments')} style={{ background: '#007cba', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Upgrade Now
          </button>
        </div>
      )}

      {showForm && (
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>Create New Invoice</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Client Name"
              value={formData.client}
              onChange={(e) => setFormData({...formData, client: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
            <input
              type="number"
              placeholder="Amount ($)"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px' }}
              required
            />
            <textarea
              placeholder="Description of work"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              style={{ width: '100%', padding: '10px', margin: '5px 0', border: '1px solid #ddd', borderRadius: '4px', minHeight: '80px' }}
              required
            />
            <div style={{ marginTop: '10px' }}>
              <button type="submit" style={{ background: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                Create Invoice
              </button>
              <button type="button" onClick={() => setShowForm(false)} style={{ background: '#6c757d', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        {invoices.length === 0 ? (
          <p>No invoices yet. Create your first invoice to get started!</p>
        ) : (
          invoices.map(invoice => (
            <div key={invoice.id} style={{ background: 'white', padding: '15px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4>{invoice.client}</h4>
                  <p>${invoice.amount} - {invoice.description}</p>
                  <small>Created: {invoice.date}</small>
                </div>
                <span style={{ background: '#ffc107', color: 'black', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                  {invoice.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Invoices;
