import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '', clientName: '', invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    businessAddress: '', businessCity: '', businessState: '', businessZip: '',
    businessPhone: '', businessEmail: '',
    clientAddress: '', clientCity: '', clientState: '', clientZip: '',
    clientPhone: '', clientEmail: '',
    items: [{ description: '', quantity: 1, rate: 0 }],
    taxRate: 0, notes: '', paymentTerms: 'Net 30',
    subtotal: 0, taxAmount: 0, total: 0, status: 'Draft'
  });
  const navigate = useNavigate();

  const calculateTotals = useCallback(() => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const taxAmount = subtotal * (formData.taxRate / 100);
    const total = subtotal + taxAmount;
    setFormData(prev => ({ ...prev, subtotal, taxAmount, total }));
  }, [formData.items, formData.taxRate]);

  useEffect(() => {
    // Check for converted quote
    const convertedQuote = localStorage.getItem('convertedQuote');
    if (convertedQuote) {
      const quoteData = JSON.parse(convertedQuote);
      setFormData(prev => ({...prev, ...quoteData}));
      setShowForm(true);
      localStorage.removeItem('convertedQuote');
    }
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  const steps = [
    { number: 1, title: 'Basic Info', icon: '📝' },
    { number: 2, title: 'Addresses', icon: '🏠' },
    { number: 3, title: 'Items', icon: '📦' },
    { number: 4, title: 'Review', icon: '✅' }
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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

  const handleSubmit = () => {
    if (invoices.length >= 3) {
      alert('🎯 Free plan limited to 3 invoices. Upgrade to Pro for unlimited invoices!');
      navigate('/payments');
      return;
    }
    
    const invoice = {
      id: Date.now(),
      ...formData,
      createdDate: new Date().toISOString()
    };
    
    setInvoices([...invoices, invoice]);
    setShowForm(false);
    setCurrentStep(1);
    setFormData({
      businessName: '', clientName: '', invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      businessAddress: '', businessCity: '', businessState: '', businessZip: '',
      businessPhone: '', businessEmail: '',
      clientAddress: '', clientCity: '', clientState: '', clientZip: '',
      clientPhone: '', clientEmail: '',
      items: [{ description: '', quantity: 1, rate: 0 }],
      taxRate: 0, notes: '', paymentTerms: 'Net 30',
      subtotal: 0, taxAmount: 0, total: 0, status: 'Draft'
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-section slide-in-up">
            <div className="form-section-title">
              📝 Basic Information
            </div>
            <div className="form-grid form-grid-2">
              <div className="form-group">
                <label className="form-label">Your Business Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter client name"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Invoice Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Payment Terms</label>
                <select
                  className="form-input"
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})}
                >
                  <option value="Due on receipt">Due on receipt</option>
                  <option value="Net 15">Net 15</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 60">Net 60</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Invoice Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.invoiceDate}
                  onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="slide-in-up">
            <div className="form-section">
              <div className="form-section-title">
                🏢 Your Business Address
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input type="text" className="form-input" placeholder="123 Business St" value={formData.businessAddress} onChange={(e) => setFormData({...formData, businessAddress: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" placeholder="(555) 123-4567" value={formData.businessPhone} onChange={(e) => setFormData({...formData, businessPhone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" className="form-input" placeholder="City" value={formData.businessCity} onChange={(e) => setFormData({...formData, businessCity: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="business@email.com" value={formData.businessEmail} onChange={(e) => setFormData({...formData, businessEmail: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input type="text" className="form-input" placeholder="State" value={formData.businessState} onChange={(e) => setFormData({...formData, businessState: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">ZIP Code</label>
                  <input type="text" className="form-input" placeholder="12345" value={formData.businessZip} onChange={(e) => setFormData({...formData, businessZip: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">
                🏠 Client Address
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input type="text" className="form-input" placeholder="456 Client Ave" value={formData.clientAddress} onChange={(e) => setFormData({...formData, clientAddress: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-input" placeholder="(555) 987-6543" value={formData.clientPhone} onChange={(e) => setFormData({...formData, clientPhone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" className="form-input" placeholder="City" value={formData.clientCity} onChange={(e) => setFormData({...formData, clientCity: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input" placeholder="client@email.com" value={formData.clientEmail} onChange={(e) => setFormData({...formData, clientEmail: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input type="text" className="form-input" placeholder="State" value={formData.clientState} onChange={(e) => setFormData({...formData, clientState: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">ZIP Code</label>
                  <input type="text" className="form-input" placeholder="67890" value={formData.clientZip} onChange={(e) => setFormData({...formData, clientZip: e.target.value})} />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-section slide-in-up">
            <div className="form-section-title">
              📦 Items & Services
            </div>
            {formData.items.map((item, index) => (
              <div key={index} className="card" style={{ marginBottom: '15px', padding: '20px' }}>
                <div className="form-grid form-grid-4" style={{ alignItems: 'end' }}>
                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="What did you do?"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-input"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rate ($)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      padding: '14px 18px', 
                      background: '#f8f9fa', 
                      borderRadius: '10px', 
                      fontWeight: 'bold',
                      color: '#667eea'
                    }}>
                      ${(item.quantity * item.rate).toFixed(2)}
                    </div>
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="btn"
                        style={{ background: '#dc3545', color: 'white', padding: '10px' }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addItem}
              className="btn btn-success"
              style={{ marginBottom: '20px' }}
            >
              ➕ Add Another Item
            </button>

            <div className="form-group">
              <label className="form-label">Tax Rate (%)</label>
              <input
                type="number"
                className="form-input"
                value={formData.taxRate}
                onChange={(e) => setFormData({...formData, taxRate: parseFloat(e.target.value) || 0})}
                min="0"
                step="0.01"
                style={{ maxWidth: '200px' }}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="slide-in-up">
            <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>🎉 Almost Done!</h3>
              <p style={{ margin: '0', opacity: 0.9 }}>Review your invoice and add any final notes</p>
            </div>

            <div className="form-section">
              <div className="form-section-title">
                💰 Invoice Summary
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
                <div>
                  <div className="form-group">
                    <label className="form-label">Notes (Optional)</label>
                    <textarea
                      className="form-input"
                      rows="4"
                      placeholder="Any additional notes or payment instructions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="card" style={{ background: '#f8f9fa', height: 'fit-content' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '15px' }}>💵 Total</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Subtotal:</span>
                    <span>${formData.subtotal.toFixed(2)}</span>
                  </div>
                  {formData.taxAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span>Tax ({formData.taxRate}%):</span>
                      <span>${formData.taxAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <hr style={{ margin: '10px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>
                    <span>Total:</span>
                    <span>${formData.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showForm) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        {/* Progress Steps */}
        <div className="form-steps">
          {steps.map((step) => (
            <div key={step.number} className={`step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
              <div className="step-number">{currentStep > step.number ? '✓' : step.icon}</div>
              <div className="step-title">{step.title}</div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>

        {/* Form Content */}
        <div className="card">
          {renderStep()}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #f8f9fa' }}>
            <button
              type="button"
              onClick={prevStep}
              className="btn"
              style={{ background: '#6c757d', color: 'white' }}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => { setShowForm(false); setCurrentStep(1); }}
                className="btn"
                style={{ background: 'transparent', color: '#dc3545', border: '2px solid #dc3545' }}
              >
                Cancel
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-success"
                >
                  🎉 Create Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="card-header" style={{ border: 'none', marginBottom: '0' }}>
            <div className="card-icon">📄</div>
            <h2 className="card-title">Your Invoices</h2>
          </div>
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-large">
            ✨ Create New Invoice
          </button>
        </div>
      </div>
      
      {/* Upgrade Prompt */}
      {invoices.length >= 2 && (
        <div className="card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff8c00 100%)', color: 'white', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🎯 You're using {invoices.length}/3 free invoices</h3>
          <p style={{ margin: '0 0 15px 0', opacity: 0.9 }}>Upgrade to Pro for unlimited invoices + advanced features!</p>
          <button onClick={() => navigate('/payments')} className="btn" style={{ background: 'white', color: '#ff8c00', fontWeight: 'bold' }}>
            🚀 Upgrade Now - Only $19/mo
          </button>
        </div>
      )}

      {/* Invoice List */}
      {invoices.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📄</div>
          <h3 style={{ marginBottom: '10px' }}>No invoices yet</h3>
          <p style={{ color: '#666', marginBottom: '30px' }}>Create your first professional invoice to get started!</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            🎯 Create Your First Invoice
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {invoices.map(invoice => (
            <div key={invoice.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 8px 0' }}>{invoice.invoiceNumber} - {invoice.clientName}</h4>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                    💰 Total: <strong>${invoice.total.toFixed(2)}</strong> | 📅 Due: {invoice.dueDate}
                  </p>
                  <small style={{ color: '#999' }}>Created: {new Date(invoice.createdDate).toLocaleDateString()}</small>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Invoices;