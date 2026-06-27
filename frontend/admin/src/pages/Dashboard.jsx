import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, PlaneTakeoff, CalendarCheck, Settings, 
  LogOut, Search, Bell, Briefcase, DollarSign, Clock, ArrowUpRight, 
  ArrowDownRight, Plus, MapPin, MoreVertical
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token || !userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <PlaneTakeoff size={28} color="var(--primary-color)" />
          <span>TravelAdmin</span>
        </div>
        <ul className="sidebar-nav">
          <li>
            <a href="#" className="active"><LayoutDashboard size={20} /> Dashboard</a>
          </li>
          <li><a href="#"><Users size={20} /> Users</a></li>
          <li><a href="#"><MapPin size={20} /> Destinations</a></li>
          <li><a href="#"><CalendarCheck size={20} /> Bookings</a></li>
          <li><a href="#"><Settings size={20} /> Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Topbar */}
        <header className="topbar">
          <div className="search-bar">
            <Search size={18} color="var(--text-light)" />
            <input type="text" placeholder="Search bookings, users..." />
          </div>
          
          <div className="topbar-right">
            <button className="icon-btn">
              <Bell size={22} />
              <div className="badge-dot"></div>
            </button>
            <div className="user-profile">
              <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
              <span>{user.username}</span>
            </div>
            <button onClick={handleLogout} className="icon-btn" title="Logout">
              <LogOut size={20} color="var(--danger)" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="content">
          <div className="page-header">
            <h1 className="page-title">Dashboard Overview</h1>
            <button className="btn-primary">
              <Plus size={18} /> New Booking
            </button>
          </div>
          
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <h3>Total Bookings</h3>
                <div className="icon-wrapper blue"><Briefcase size={20} /></div>
              </div>
              <div className="stat-value">1,284</div>
              <div className="stat-trend trend-up">
                <ArrowUpRight size={16} /> <span>12% vs last month</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3>Active Users</h3>
                <div className="icon-wrapper green"><Users size={20} /></div>
              </div>
              <div className="stat-value">845</div>
              <div className="stat-trend trend-up">
                <ArrowUpRight size={16} /> <span>5% vs last month</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3>Total Revenue</h3>
                <div className="icon-wrapper yellow"><DollarSign size={20} /></div>
              </div>
              <div className="stat-value">$45,290</div>
              <div className="stat-trend trend-down">
                <ArrowDownRight size={16} /> <span>2% vs last month</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-header">
                <h3>Pending Approvals</h3>
                <div className="icon-wrapper red"><Clock size={20} /></div>
              </div>
              <div className="stat-value">12</div>
              <div className="stat-trend trend-neutral">
                <span>Requires attention</span>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            {/* Recent Bookings Table Panel */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title">Recent Bookings</h3>
                <button className="btn-link">View All</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Customer</th>
                      <th>Destination</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#BK-1042</td>
                      <td>John Doe</td>
                      <td>Bali, Indonesia</td>
                      <td>Oct 24, 2026</td>
                      <td><span className="badge badge-success">Approved</span></td>
                      <td><button className="icon-btn"><MoreVertical size={16}/></button></td>
                    </tr>
                    <tr>
                      <td>#BK-1043</td>
                      <td>Sarah Smith</td>
                      <td>Paris, France</td>
                      <td>Oct 25, 2026</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                      <td><button className="icon-btn"><MoreVertical size={16}/></button></td>
                    </tr>
                    <tr>
                      <td>#BK-1044</td>
                      <td>Mike Johnson</td>
                      <td>Tokyo, Japan</td>
                      <td>Oct 28, 2026</td>
                      <td><span className="badge badge-danger">Cancelled</span></td>
                      <td><button className="icon-btn"><MoreVertical size={16}/></button></td>
                    </tr>
                    <tr>
                      <td>#BK-1045</td>
                      <td>Emily Chen</td>
                      <td>Dubai, UAE</td>
                      <td>Nov 02, 2026</td>
                      <td><span className="badge badge-primary">Processing</span></td>
                      <td><button className="icon-btn"><MoreVertical size={16}/></button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Activity Timeline */}
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title">Recent Activity</h3>
              </div>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-icon"><Users size={16} /></div>
                  <div className="timeline-content">
                    <div className="timeline-title">New user registered</div>
                    <div className="timeline-time">2 hours ago</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}><Briefcase size={16} /></div>
                  <div className="timeline-content">
                    <div className="timeline-title">Booking #BK-1042 approved</div>
                    <div className="timeline-time">5 hours ago</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-icon" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}><Clock size={16} /></div>
                  <div className="timeline-content">
                    <div className="timeline-title">System maintenance scheduled</div>
                    <div className="timeline-time">1 day ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <footer className="footer">
          &copy; {new Date().getFullYear()} Travel Management System. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
