import { useState } from 'react';
import { MapPin, Search, Plus, CloudSun, Calendar, Heart } from 'lucide-react';

export default function DestinationTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: 'Bali, Indonesia',
      description: 'A tropical paradise known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      weather: 'Sunny 29°C',
      season: 'April to October',
      likes: '96%'
    },
    {
      id: 2,
      name: 'Paris, France',
      description: 'The global center for art, fashion, gastronomy, and culture, defined by its 19th-century cityscape and architectural marvels.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      weather: 'Breezy 19°C',
      season: 'June to August',
      likes: '94%'
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      description: 'A neon-lit metropolis combining ultramodern skyscrapers with historic Shinto shrines and cherry blossom fields.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      weather: 'Rainy 15°C',
      season: 'March to May (Sakura)',
      likes: '98%'
    },
    {
      id: 4,
      name: 'Dubai, United Arab Emirates',
      description: 'Famed for luxury shopping, ultramodern architecture, Burj Khalifa skyscrapers, and a lively desert nightlife scene.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      weather: 'Sunny 36°C',
      season: 'November to March',
      likes: '91%'
    },
    {
      id: 5,
      name: 'Rome, Italy',
      description: 'A sprawling cosmopolitan city with nearly 3,000 years of globally influential art, architecture, and ruins on display.',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      weather: 'Clear 22°C',
      season: 'September to November',
      likes: '95%'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newSeason, setNewSeason] = useState('');

  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDestination = (e) => {
    e.preventDefault();
    if (!newName || !newDesc || !newWeather) return;

    const destImages = [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    const randomImage = destImages[Math.floor(Math.random() * destImages.length)];

    const newDest = {
      id: destinations.length + 1,
      name: newName,
      description: newDesc,
      image: randomImage,
      weather: newWeather,
      season: newSeason || 'All year round',
      likes: '95%'
    };

    setDestinations([...destinations, newDest]);
    setShowAddModal(false);

    // reset forms
    setNewName('');
    setNewDesc('');
    setNewWeather('');
    setNewSeason('');
  };

  return (
    <div className="tab-pane fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Destinations Catalog</h1>
          <p className="page-subtitle">Configure popular travel destinations, seasonal recommendations, and weather feeds.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add Destination
        </button>
      </div>

      {/* Search and Filters */}
      <div className="panel" style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
          <div className="search-bar" style={{ flex: 1 }}>
            <Search size={18} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder="Search destinations by name, region or country..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Destination Cards Grid */}
      <div className="destinations-grid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest) => (
            <div key={dest.id} className="dest-card">
              <div className="dest-card-image" style={{ backgroundImage: `url(${dest.image})` }}>
                <div className="dest-likes-badge">
                  <Heart size={14} fill="var(--danger)" color="var(--danger)" />
                  <span>{dest.likes} Approval</span>
                </div>
              </div>
              <div className="dest-card-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <MapPin size={12} />
                  <span>Popular Destination</span>
                </div>
                <h3 className="dest-name" style={{ marginTop: '4px', fontSize: '1.2rem', fontWeight: 700 }}>{dest.name}</h3>
                <p className="dest-desc" style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '8px', lineHeight: '1.5', minHeight: '54px' }}>
                  {dest.description}
                </p>

                <div className="dest-stats-row">
                  <div className="dest-stat-info">
                    <CloudSun size={16} color="var(--primary-color)" />
                    <div>
                      <span className="dest-stat-label">Weather</span>
                      <span className="dest-stat-val">{dest.weather}</span>
                    </div>
                  </div>

                  <div className="dest-stat-info">
                    <Calendar size={16} color="var(--success)" />
                    <div>
                      <span className="dest-stat-label">Best Season</span>
                      <span className="dest-stat-val">{dest.season}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <p>No destinations found matching your search term.</p>
          </div>
        )}
      </div>

      {/* Add Destination Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h3>Create Destination Listing</h3>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddDestination}>
              <div className="form-group">
                <label>Destination Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Kyoto, Japan" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description Summary</label>
                <textarea 
                  className="form-control" 
                  placeholder="Write a brief, attractive summary for travelers..." 
                  style={{ minHeight: '100px' }}
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Current Weather Status</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Sunny 22°C" 
                    value={newWeather} 
                    onChange={(e) => setNewWeather(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label>Best Season to Visit</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Spring / Autumn" 
                    value={newSeason} 
                    onChange={(e) => setNewSeason(e.target.value)} 
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Publish Destination</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
