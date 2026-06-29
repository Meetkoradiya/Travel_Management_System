import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaneTakeoff, LayoutDashboard, Info, Phone, Building2, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import HomeTab from './HomeTab';
import AboutTab from './AboutTab';
import ContactTab from './ContactTab';
import HotelsTab from './HotelsTab';
import DestinationTab from './DestinationTab';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('home');

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

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <HomeTab onAddBookingClick={() => setActivePage('hotels')} />;
      case 'about':
        return <AboutTab />;
      case 'contact':
        return <ContactTab />;
      case 'hotels':
        return <HotelsTab />;
      case 'destination':
        return <DestinationTab />;
      default:
        return <HomeTab onAddBookingClick={() => setActivePage('hotels')} />;
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar - Desktop Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <PlaneTakeoff size={28} color="var(--primary-color)" />
          <span>TravelAdmin</span>
        </div>
        <ul className="sidebar-nav">
          <li>
            <a 
              href="#" 
              className={activePage === 'home' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
            >
              <LayoutDashboard size={20} /> Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activePage === 'about' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); setActivePage('about'); }}
            >
              <Info size={20} /> About Platform
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activePage === 'contact' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}
            >
              <Phone size={20} /> Support Tickets
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activePage === 'hotels' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); setActivePage('hotels'); }}
            >
              <Building2 size={20} /> Hotel Directory
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activePage === 'destination' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); setActivePage('destination'); }}
            >
              <MapPin size={20} /> Destinations
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Unified Top Navbar component */}
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          user={user} 
          handleLogout={handleLogout} 
        />

        {/* Content Pane */}
        <div className="content">
          {renderContent()}
        </div>

        <footer className="footer">
          &copy; {new Date().getFullYear()} Travel Management System. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

