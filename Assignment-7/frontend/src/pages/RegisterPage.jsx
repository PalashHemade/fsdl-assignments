import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    prn: '', fullName: '', email: '', password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        alert('Registration successful. Please login.');
        navigate('/login');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-panel auth-panel">
        <h2>Student Registration</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>PRN (Unique ID)</label>
            <input type="text" value={formData.prn} onChange={e => setFormData({...formData, prn: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="btn-primary" style={{width: '100%'}}>Register</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
