import { useState } from 'react';
import { PlaneTakeoff, Bell, LogOut, Menu, X, Home, Info, Phone, Building2, MapPin } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, user, handleLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'hotels', label: 'Hotels', icon: Building2 },
    { id: 'destination', label: 'Destination', icon: MapPin }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        {/* Mobile Menu Toggle Button */}
        <button className="mobile-toggle-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="navbar-logo" onClick={() => handleNavClick('home')}>
          <PlaneTakeoff size={28} className="logo-icon" />
          <span>TravelAdmin</span>
        </div>

        {/* Horizontal Navigation Menu for desktop */}
        <ul className="navbar-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  className={`navbar-link ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-right">
        {/* Notifications Icon Button */}
        <div className="notification-wrapper">
          <button className="icon-btn" onClick={() => setNotificationsOpen(!notificationsOpen)}>
            <Bell size={22} />
            <div className="badge-dot"></div>
          </button>
          
          {notificationsOpen && (
            <div className="notification-dropdown fade-in">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <span>Mark all as read</span>
              </div>
              <ul className="dropdown-list">
                <li onClick={() => setNotificationsOpen(false)}>
                  <div className="notification-avatar blue">N</div>
                  <div className="notification-info">
                    <p><strong>New user registration</strong>: Alice Miller signed up.</p>
                    <span>2 hours ago</span>
                  </div>
                </li>
                <li onClick={() => setNotificationsOpen(false)}>
                  <div className="notification-avatar green">B</div>
                  <div className="notification-info">
                    <p><strong>Booking Approved</strong>: Ticket #BK-1042 was processed.</p>
                    <span>5 hours ago</span>
                  </div>
                </li>
                <li onClick={() => setNotificationsOpen(false)}>
                  <div className="notification-avatar red">S</div>
                  <div className="notification-info">
                    <p><strong>System Alert</strong>: Database cleanup successfully completed.</p>
                    <span>1 day ago</span>
                  </div>
                </li>
              </ul>
              <div className="dropdown-footer">
                <button>View All Activity Log</button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <div className="avatar">{user?.username?.charAt(0).toUpperCase()}</div>
          <span className="user-name">{user?.username}</span>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="icon-btn logout-btn" title="Logout">
          <LogOut size={20} color="var(--danger)" />
        </button>
      </div>

      {/* Responsive Mobile Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-overlay fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="navbar-logo">
                <PlaneTakeoff size={24} className="logo-icon" />
                <span>TravelAdmin</span>
              </div>
              <button className="btn-close" onClick={() => setMobileMenuOpen(false)}>&times;</button>
            </div>

            <ul className="mobile-drawer-menu">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      className={`mobile-drawer-link ${activePage === item.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mobile-drawer-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <div className="avatar">{user?.username?.charAt(0).toUpperCase()}</div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user?.username}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Administrator</span>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
