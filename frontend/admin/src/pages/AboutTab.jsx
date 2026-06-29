import { Cpu, Database, HardDrive, ShieldCheck, Heart } from 'lucide-react';

export default function AboutTab() {
  const teamMembers = [
    { name: 'Marcus Sterling', role: 'Chief Executive Officer', avatar: 'MS', bio: 'Former travel director with 15+ years experience in global tourism logistics.' },
    { name: 'Elena Rostova', role: 'Head of Engineering', avatar: 'ER', bio: 'Full-stack cloud architect specializing in high-throughput reservation APIs.' },
    { name: 'Akira Tanaka', role: 'Product Designer', avatar: 'AT', bio: 'Passionate about crafting fluid, minimalist travel experiences for modern explorers.' }
  ];

  return (
    <div className="tab-pane fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">About the Platform</h1>
          <p className="page-subtitle">Understand TravelAdmin SaaS architecture, system metrics, and our dedicated team.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Platform Overview */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 className="panel-title">TravelAdmin Core SaaS</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '1rem', lineHeight: '1.6' }}>
            TravelAdmin is an enterprise-grade Software-as-a-Service (SaaS) tool built to empower travel operators, travel agencies, and booking channels. The front-end leverages <strong>React.js</strong> and <strong>Vite</strong> for ultra-fast SPA loading, paired with high-performance routing mechanisms. The back-end is powered by a relational SQL system via highly efficient PHP endpoint controllers.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
            <span className="badge badge-primary" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
              React v19.0
            </span>
            <span className="badge badge-success" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
              Vite devServer
            </span>
            <span className="badge badge-warning" style={{ padding: '0.5rem 1rem', borderRadius: '8px' }}>
              PHP API Gateway
            </span>
            <span className="badge" style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#F1F5F9', color: '#475569' }}>
              MySQL Engine
            </span>
          </div>

          <div className="about-features" style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>Key Architectural Benefits</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <ShieldCheck size={18} color="var(--success)" />
                <span>Secure JWT-based credential validation and route guards.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <Cpu size={18} color="var(--primary-color)" />
                <span>Responsive sub-view render trees with state synchronization.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                <Database size={18} color="var(--warning)" />
                <span>Normalized database schemes supporting rapid query indexes.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Live System Metrics */}
        <div className="panel">
          <h3 className="panel-title" style={{ marginBottom: '1.25rem' }}>Live System Health</h3>
          <div className="metrics-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Cpu size={16} /> Web API Server Load</span>
                <span>24%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: '24%', background: 'var(--primary-color)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Database size={16} /> SQL Connection Pool</span>
                <span>12 / 100 Active</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: '12%', background: 'var(--success)' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><HardDrive size={16} /> Storage Space</span>
                <span>42.8 GB / 100 GB</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: '42.8%', background: 'var(--warning)' }}></div>
              </div>
            </div>
            
            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                <ShieldCheck size={20} color="var(--success)" />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-color)' }}>All Systems Operational</div>
                  <div style={{ fontSize: '0.8rem' }}>Last checked: Just now (auto-refresh enabled)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Widget */}
      <div className="panel" style={{ marginTop: '1.5rem' }}>
        <h3 className="panel-title" style={{ marginBottom: '1.5rem' }}>Management &amp; Leadership</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-card">
              <div className="team-card-header">
                <div className="team-avatar">{member.avatar}</div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-color)' }}>{member.name}</h4>
                  <span className="badge badge-primary" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{member.role}</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '1rem', lineHeight: '1.5' }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '2.5rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
        <span>Crafted with</span>
        <Heart size={16} color="var(--danger)" fill="var(--danger)" />
        <span>by TravelAdmin Engineering Team.</span>
      </div>
    </div>
  );
}
