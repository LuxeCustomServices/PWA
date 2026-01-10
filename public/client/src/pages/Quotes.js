import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '', clientEmail: '', clientAddress: '', clientPhone: '',
    businessName: '', businessAddress: '', businessPhone: '', businessEmail: '',
    quoteNumber: `QT-${Date.now()}`,
    items: [{ description: '', quantity: 1, rate: 0 }],
    notes: '', validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    subtotal: 0, total: 0
  });
  const navigate = useNavigate();

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + (item.quantity * item.rate), 0);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuote = {
      id: Date.now(),
      ...formData,
      total: calculateTotal(),
      date: new Date().toLocaleDateString(),
      status: 'Draft'
    };
    setQuotes([...quotes, newQuote]);
    setFormData({
      clientName: '', clientEmail: '', clientAddress: '', clientPhone: '',
      businessName: '', businessAddress: '', businessPhone: '', businessEmail: '',
      quoteNumber: `QT-${Date.now()}`,
      items: [{ description: '', quantity: 1, rate: 0 }],
      notes: '', validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtotal: 0, total: 0
    });
    setShowForm(false);
  };

  const convertToInvoice = (quote) => {
    const invoiceData = {
      businessName: quote.businessName,
      clientName: quote.clientName,
      clientEmail: quote.clientEmail,
      clientAddress: quote.clientAddress,
      clientPhone: quote.clientPhone,
      businessAddress: quote.businessAddress,
      businessPhone: quote.businessPhone,
      businessEmail: quote.businessEmail,
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: quote.items,
      notes: quote.notes,
      paymentTerms: 'Net 30',
      taxRate: 0,
      subtotal: quote.total,
      taxAmount: 0,
      total: quote.total,
      status: 'Draft'
    };
    
    localStorage.setItem('convertedQuote', JSON.stringify(invoiceData));
    navigate('/invoices');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="card-header" style={{ border: 'none', marginBottom: '0' }}>
            <div className="card-icon">💼</div>
            <h2 className="card-title">Quotes & Estimates</h2>
          </div>
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-large">
            ✨ Create New Quote
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card slide-in-up" style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <div className="card-icon">📝</div>
            <h3 className="card-title">Create New Quote</h3>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid form-grid-2" style={{ marginBottom: '30px' }}>
              <div className="form-section">
                <div className="form-section-title">🏢 Your Business</div>
                <div className="form-group">
                  <label className="form-label">Business Name *</label>
                  <input type="text" className="form-input" placeholder="Your business name" value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea className="form-input" rows="3" placeholder="Business address" value={formData.businessAddress} onChange={(e) => setFormData({...formData, businessAddress: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" placeholder="Business phone" value={formData.businessPhone} onChange={(e) => setFormData({...formData, businessPhone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="Business email" value={formData.businessEmail} onChange={(e) => setFormData({...formData, businessEmail: e.target.value})} />
                </div>
              </div>
              
              <div className="form-section">
                <div className="form-section-title">👤 Client Information</div>
                <div className="form-group">
                  <label className="form-label">Client Name *</label>
                  <input type="text" className="form-input" placeholder="Client name" value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="Client email" value={formData.clientEmail} onChange={(e) => setFormData({...formData, clientEmail: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <textarea className="form-input" rows="3" placeholder="Client address" value={formData.clientAddress} onChange={(e) => setFormData({...formData, clientAddress: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" placeholder="Client phone" value={formData.clientPhone} onChange={(e) => setFormData({...formData, clientPhone: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="form-grid form-grid-2" style={{ marginBottom: '30px' }}>
              <div className="form-group">
                <label className="form-label">Quote Number</label>
                <input type="text" className="form-input" value={formData.quoteNumber} onChange={(e) => setFormData({...formData, quoteNumber: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form-label">Valid Until</label>
                <input type="date" className="form-input" value={formData.validUntil} onChange={(e) => setFormData({...formData, validUntil: e.target.value})} required />
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">📦 Items & Services</div>
              {formData.items.map((item, index) => (
                <div key={index} className="card" style={{ marginBottom: '15px', padding: '20px' }}>
                  <div className="form-grid form-grid-4" style={{ alignItems: 'end' }}>
                    <div className="form-group">
                      <label className="form-label">Description *</label>
                      <input type="text" className="form-input" placeholder="What are you quoting?" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Quantity</label>
                      <input type="number" className="form-input" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} min="0" step="0.01" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Rate ($)</label>
                      <input type="number" className="form-input" value={item.rate} onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)} min="0" step="0.01" required />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ padding: '14px 18px', background: '#f8f9fa', borderRadius: '10px', fontWeight: 'bold', color: '#667eea' }}>
                        ${(item.quantity * item.rate).toFixed(2)}
                      </div>
                      {formData.items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="btn" style={{ background: '#dc3545', color: 'white', padding: '10px' }}>🗑️</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addItem} className="btn btn-success" style={{ marginBottom: '20px' }}>
                ➕ Add Item
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea className="form-input" rows="3" placeholder="Additional notes or terms" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
            </div>

            <div className="card" style={{ background: '#f8f9fa', textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#667eea', margin: '0 0 10px 0' }}>💰 Quote Total: ${calculateTotal().toFixed(2)}</h3>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} className="btn" style={{ background: '#6c757d', color: 'white' }}>Cancel</button>
              <button type="submit" className="btn btn-primary">✨ Create Quote</button>
            </div>
          </form>
        </div>
      )}

      {quotes.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>💼</div>
          <h3 style={{ marginBottom: '10px' }}>No quotes yet</h3>
          <p style={{ color: '#666', marginBottom: '30px' }}>Create your first quote to estimate project costs!</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary">🎯 Create Your First Quote</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {quotes.map(quote => (
            <div key={quote.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0' }}>{quote.quoteNumber} - {quote.clientName}</h4>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>💰 Total: <strong>${quote.total.toFixed(2)}</strong> | 📅 Valid until: {quote.validUntil}</p>
                  <small style={{ color: '#999' }}>Created: {quote.date}</small>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button onClick={() => convertToInvoice(quote)} className="btn btn-success">🔄 Convert to Invoice</button>
                  <span className={`status-badge status-${quote.status.toLowerCase()}`}>{quote.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quotes;