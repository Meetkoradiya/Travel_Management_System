import { useState } from 'react';
import { Star, MapPin, Wifi, Award, Building, Plus, Search, DollarSign } from 'lucide-react';

export default function HotelsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: 'Grand Hyatt Regency',
      location: 'Nusa Dua, Bali',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      rating: 5,
      price: 240,
      status: 'Available',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Ocean View']
    },
    {
      id: 2,
      name: 'Hotel Plaza Athénée',
      location: 'Champs-Élysées, Paris',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      rating: 5,
      price: 580,
      status: 'Available',
      amenities: ['Michelin Dining', 'Concierge', 'Gym', 'Bar']
    },
    {
      id: 3,
      name: 'Park Hyatt Tokyo',
      location: 'Shinjuku, Tokyo',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      rating: 4,
      price: 450,
      status: 'Full',
      amenities: ['Sky Pool', 'WiFi', 'Bar', 'Airport Shuttle']
    },
    {
      id: 4,
      name: 'Atlantis The Palm',
      location: 'Palm Jumeirah, Dubai',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      rating: 5,
      price: 390,
      status: 'Available',
      amenities: ['Waterpark Access', 'Private Beach', 'Spa', 'WiFi']
    },
    {
      id: 5,
      name: 'The Savoy Hotel',
      location: 'Strand, London',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      price: 360,
      status: 'Available',
      amenities: ['Butler Service', 'Historic Bar', 'WiFi', 'Spa']
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newHotelName, setNewHotelName] = useState('');
  const [newHotelLocation, setNewHotelLocation] = useState('');
  const [newHotelPrice, setNewHotelPrice] = useState('');
  const [newHotelRating, setNewHotelRating] = useState('5');
  const [newHotelStatus, setNewHotelStatus] = useState('Available');
  const [newHotelAmenities, setNewHotelAmenities] = useState('');

  const filteredHotels = hotels.filter(hotel => 
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddHotel = (e) => {
    e.preventDefault();
    if (!newHotelName || !newHotelLocation || !newHotelPrice) return;

    // random high quality hotel image from unsplash
    const hotelImages = [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ];
    const randomImage = hotelImages[Math.floor(Math.random() * hotelImages.length)];

    const newHotel = {
      id: hotels.length + 1,
      name: newHotelName,
      location: newHotelLocation,
      image: randomImage,
      rating: parseFloat(newHotelRating),
      price: parseInt(newHotelPrice),
      status: newHotelStatus,
      amenities: newHotelAmenities ? newHotelAmenities.split(',').map(a => a.trim()) : ['WiFi', 'Pool']
    };

    setHotels([...hotels, newHotel]);
    setShowAddModal(false);

    // reset inputs
    setNewHotelName('');
    setNewHotelLocation('');
    setNewHotelPrice('');
    setNewHotelRating('5');
    setNewHotelStatus('Available');
    setNewHotelAmenities('');
  };

  return (
    <div className="tab-pane fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Hotel Properties</h1>
          <p className="page-subtitle">Add and configure partner hotel accommodations, pricing tiers, and availability.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} /> Add Hotel
        </button>
      </div>

      {/* Search and Filters */}
      <div className="panel" style={{ marginBottom: '1.5rem', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
          <div className="search-bar" style={{ flex: 1 }}>
            <Search size={18} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder="Search hotel properties by name or destination location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="hotels-grid">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <div className="hotel-card-image" style={{ backgroundImage: `url(${hotel.image})` }}>
                <span className={`badge ${hotel.status === 'Available' ? 'badge-success' : 'badge-danger'}`} style={{ position: 'absolute', top: '12px', right: '12px' }}>
                  {hotel.status}
                </span>
              </div>
              <div className="hotel-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--warning)', fontWeight: 600, fontSize: '0.95rem' }}>
                    <Star size={16} fill="var(--warning)" color="var(--warning)" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '4px' }}>
                  <MapPin size={14} />
                  <span>{hotel.location}</span>
                </div>

                <div className="hotel-amenities">
                  {hotel.amenities.map((amenity, idx) => (
                    <span key={idx} className="amenity-badge">{amenity}</span>
                  ))}
                </div>

                <div className="hotel-card-footer">
                  <div>
                    <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-color)' }}>${hotel.price}</span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}> / night</span>
                  </div>
                  <button className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', borderRadius: '6px' }}>Configure</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <p>No partner hotels found matching your search term.</p>
          </div>
        )}
      </div>

      {/* Add Hotel Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h3>Register Hotel Property</h3>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddHotel}>
              <div className="form-group">
                <label>Property Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Hilton Executive Club" 
                  value={newHotelName} 
                  onChange={(e) => setNewHotelName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Destination Location</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Kyoto, Japan" 
                  value={newHotelLocation} 
                  onChange={(e) => setNewHotelLocation(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label>Base Price per Night ($)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 180" 
                    value={newHotelPrice} 
                    onChange={(e) => setNewHotelPrice(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label>Property Rating (1-5)</label>
                  <select 
                    className="form-control" 
                    style={{ paddingLeft: '1rem' }}
                    value={newHotelRating} 
                    onChange={(e) => setNewHotelRating(e.target.value)}
                  >
                    <option value="5">5 Star Deluxe</option>
                    <option value="4.5">4.5 Star Executive</option>
                    <option value="4">4 Star Standard</option>
                    <option value="3.5">3.5 Star Quality</option>
                    <option value="3">3 Star Economy</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Availability Status</label>
                <select 
                  className="form-control"
                  style={{ paddingLeft: '1rem' }}
                  value={newHotelStatus} 
                  onChange={(e) => setNewHotelStatus(e.target.value)}
                >
                  <option value="Available">Available (Accepting Reservations)</option>
                  <option value="Full">Fully Booked (Waitlist only)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amenities (Comma-separated)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Free WiFi, Pool, Spa, Ocean View" 
                  value={newHotelAmenities} 
                  onChange={(e) => setNewHotelAmenities(e.target.value)} 
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Register Property</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
