import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlaneTakeoff, Eye, EyeOff, Lock, User } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost/Travel_Management_System/Travel_Management_System_/backend/api/auth/login.php', {
        username,
        password
      });

      if (res.data.status === 'success') {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.user));
        navigate('/dashboard');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error or invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Side - Graphic/Branding */}
      <div className="login-graphic">
        <div className="login-graphic-overlay"></div>
        <div className="login-graphic-content">
          <div className="brand-logo">
            <PlaneTakeoff size={48} color="#ffffff" />
            <h2>TravelAdmin</h2>
          </div>
          <div className="login-quote">
            <h1>Manage your travel business globally.</h1>
            <p>The all-in-one SaaS platform for travel agencies, corporate bookings, and itinerary management.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-container">
        <div className="login-form-box">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to access the admin panel.</p>
          </div>

          {error && <div className="alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  id="username" 
                  className="form-control" 
                  placeholder="e.g. admin" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  autoFocus 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  className="form-control" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <a href="#">Contact Support</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
