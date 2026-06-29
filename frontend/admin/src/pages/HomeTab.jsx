import { useState } from 'react';
import { 
  Users, Briefcase, DollarSign, Clock, ArrowUpRight, 
  ArrowDownRight, Plus, Search, MoreVertical 
} from 'lucide-react';

export default function HomeTab({ onAddBookingClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [bookings, setBookings] = useState([
    { id: '#BK-1042', customer: 'John Doe', destination: 'Bali, Indonesia', date: 'Oct 24, 2026', status: 'Approved' },
    { id: '#BK-1043', customer: 'Sarah Smith', destination: 'Paris, France', date: 'Oct 25, 2026', status: 'Pending' },
    { id: '#BK-1044', customer: 'Mike Johnson', destination: 'Tokyo, Japan', date: 'Oct 28, 2026', status: 'Cancelled' },
    { id: '#BK-1045', customer: 'Emily Chen', destination: 'Dubai, UAE', date: 'Nov 02, 2026', status: 'Processing' },
    { id: '#BK-1046', customer: 'David Miller', destination: 'London, UK', date: 'Nov 05, 2026', status: 'Approved' },
    { id: '#BK-1047', customer: 'Sofia Rodriguez', destination: 'Rome, Italy', date: 'Nov 12, 2026', status: 'Pending' }
  ]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.destination.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved': return 'badge badge-success';
      case 'Pending': return 'badge badge-warning';
      case 'Cancelled': return 'badge badge-danger';
      case 'Processing': return 'badge badge-primary';
      default: return 'badge';
    }
  };

  return (
    <div className="tab-pane fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here's a live update of your travel business stats.</p>
        </div>
        <button className="btn-primary" onClick={onAddBookingClick}>
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
          <div className="stat-value">{bookings.length}</div>
          <div className="stat-trend trend-up">
            <ArrowUpRight size={16} /> <span>14% vs last month</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <h3>Active Users</h3>
            <div className="icon-wrapper green"><Users size={20} /></div>
          </div>
          <div className="stat-value">912</div>
          <div className="stat-trend trend-up">
            <ArrowUpRight size={16} /> <span>8% vs last month</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Revenue</h3>
            <div className="icon-wrapper yellow"><DollarSign size={20} /></div>
          </div>
          <div className="stat-value">$54,820</div>
          <div className="stat-trend trend-down">
            <ArrowDownRight size={16} /> <span>1.8% vs last month</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <h3>Pending Approvals</h3>
            <div className="icon-wrapper red"><Clock size={20} /></div>
          </div>
          <div className="stat-value">
            {bookings.filter(b => b.status === 'Pending').length}
          </div>
          <div className="stat-trend trend-neutral">
            <span>Requires attention</span>
          </div>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="panel chart-panel" style={{ marginBottom: '1.5rem' }}>
        <div className="panel-header">
          <h3 className="panel-title">Booking Trends (Last 6 Months)</h3>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot blue"></span> Bookings</span>
            <span className="legend-item"><span className="legend-dot green"></span> Inquiries</span>
          </div>
        </div>
        <div className="mock-chart-container">
          <div className="mock-chart-bars">
            {[
              { month: 'Jan', bookings: 40, inquiries: 75 },
              { month: 'Feb', bookings: 60, inquiries: 90 },
              { month: 'Mar', bookings: 55, inquiries: 80 },
              { month: 'Apr', bookings: 85, inquiries: 110 },
              { month: 'May', bookings: 115, inquiries: 150 },
              { month: 'Jun', bookings: 130, inquiries: 175 }
            ].map((d, index) => (
              <div key={index} className="chart-bar-group">
                <div className="chart-bars">
                  <div className="chart-bar bar-blue" style={{ height: `${(d.bookings / 180) * 100}%` }} title={`Bookings: ${d.bookings}`}></div>
                  <div className="chart-bar bar-green" style={{ height: `${(d.inquiries / 180) * 100}%` }} title={`Inquiries: ${d.inquiries}`}></div>
                </div>
                <span className="chart-bar-label">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Bookings Table Panel */}
        <div className="panel">
          <div className="panel-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="panel-title">Manage Bookings</h3>
              <div className="table-actions">
                <select 
                  className="filter-select" 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="search-bar" style={{ width: '100%' }}>
              <Search size={18} color="var(--text-light)" />
              <input 
                type="text" 
                placeholder="Search by customer, destination, ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            {filteredBookings.length > 0 ? (
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
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.customer}</td>
                      <td>{booking.destination}</td>
                      <td>{booking.date}</td>
                      <td><span className={getStatusBadgeClass(booking.status)}>{booking.status}</span></td>
                      <td>
                        <button className="icon-btn"><MoreVertical size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p>No bookings match your search filters.</p>
              </div>
            )}
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
            <div className="timeline-item">
              <div className="timeline-icon" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}><ArrowDownRight size={16} /></div>
              <div className="timeline-content">
                <div className="timeline-title">Booking #BK-1044 cancelled</div>
                <div className="timeline-time">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
