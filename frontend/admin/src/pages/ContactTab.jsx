import { useState } from 'react';
import { Mail, Phone, MessageSquare, Search, Send, Clock, CheckCircle } from 'lucide-react';

export default function ContactTab() {
  const [inquiries, setInquiries] = useState([
    { id: 1, name: 'Alice Thompson', email: 'alice.t@gmail.com', phone: '+1 555-0198', subject: 'Corporate booking inquiries', message: 'Hello, our company is planning an executive retreat to Bali. Do you provide enterprise discounts for groups above 20?', date: '2 hours ago', status: 'Pending', replies: [] },
    { id: 2, name: 'Robert Chen', email: 'rob.chen@outlook.com', phone: '+1 555-0143', subject: 'Refund request #BK-1044', message: 'I need to process a full refund for my Tokyo trip as the flight was canceled by the operator. Please confirm status.', date: '1 day ago', status: 'Pending', replies: [] },
    { id: 3, name: 'Gabriella Rossi', email: 'g.rossi@yahoo.it', phone: '+39 347 1290', subject: 'Hotel upgrade options', message: 'We booked the Paris package. Is it possible to upgrade to a suite with Eiffel views? I am happy to pay the delta.', date: '3 days ago', status: 'Resolved', replies: ['Hello Gabriella, Yes, you can upgrade your room. We have sent the quote to your email.'] },
    { id: 4, name: 'Samuel Miller', email: 'samuel.m@live.com', phone: '+44 7700 9000', subject: 'Custom itinerary request', message: 'Looking for a private guided tour of Rome for our family anniversary. Need high-end local guides.', date: '5 days ago', status: 'Resolved', replies: ['Hi Samuel, we have assigned senior guide Marco to your booking. Check details in your invoice email.'] }
  ]);

  const [activeInquiry, setActiveInquiry] = useState(inquiries[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Reply inputs
  const [replyText, setReplyText] = useState('');

  // New ticket inputs
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTicketName, setNewTicketName] = useState('');
  const [newTicketEmail, setNewTicketEmail] = useState('');
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const updatedInquiries = inquiries.map(inq => {
      if (inq.id === activeInquiry.id) {
        const updated = {
          ...inq,
          status: 'Resolved',
          replies: [...inq.replies, replyText]
        };
        setActiveInquiry(updated);
        return updated;
      }
      return inq;
    });

    setInquiries(updatedInquiries);
    setReplyText('');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketName || !newTicketEmail || !newTicketSubject || !newTicketMessage) return;

    const newTicket = {
      id: inquiries.length + 1,
      name: newTicketName,
      email: newTicketEmail,
      phone: '+1 555-0100',
      subject: newTicketSubject,
      message: newTicketMessage,
      date: 'Just now',
      status: 'Pending',
      replies: []
    };

    const list = [newTicket, ...inquiries];
    setInquiries(list);
    setActiveInquiry(newTicket);
    setShowAddForm(false);
    
    // reset form
    setNewTicketName('');
    setNewTicketEmail('');
    setNewTicketSubject('');
    setNewTicketMessage('');
  };

  return (
    <div className="tab-pane fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Support Tickets</h1>
          <p className="page-subtitle">Track customer inquiries, process direct replies, and manage booking requests.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm(true)}>
          <MessageSquare size={18} /> New Ticket
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Ticket List Panel */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="panel-title">Inbox</h3>
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Tickets</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="search-bar" style={{ width: '100%' }}>
            <Search size={18} color="var(--text-light)" />
            <input 
              type="text" 
              placeholder="Search by customer, subject, content..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="ticket-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '450px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inq) => (
                <div 
                  key={inq.id} 
                  className={`ticket-item ${activeInquiry?.id === inq.id ? 'active' : ''}`}
                  onClick={() => setActiveInquiry(inq)}
                >
                  <div className="ticket-item-header">
                    <h4>{inq.name}</h4>
                    <span className={`badge ${inq.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                      {inq.status}
                    </span>
                  </div>
                  <div className="ticket-item-subject">{inq.subject}</div>
                  <p className="ticket-item-text">{inq.message}</p>
                  <span className="ticket-item-time">{inq.date}</span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No support tickets found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Reply/Details Panel */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
          {activeInquiry ? (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div className="ticket-details-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{activeInquiry.subject}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '4px' }}>
                      From: <strong>{activeInquiry.name}</strong> ({activeInquiry.email})
                    </p>
                  </div>
                  <span className={`badge ${activeInquiry.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                    {activeInquiry.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={14} /> {activeInquiry.phone}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Mail size={14} /> {activeInquiry.email}</span>
                </div>
              </div>

              {/* Message Content & History */}
              <div className="ticket-conversation" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '4px', marginBottom: '1.5rem' }}>
                {/* Customer Original message */}
                <div className="chat-bubble client">
                  <p>{activeInquiry.message}</p>
                  <span className="chat-time">{activeInquiry.date}</span>
                </div>

                {/* Staff replies */}
                {activeInquiry.replies.map((reply, idx) => (
                  <div key={idx} className="chat-bubble staff">
                    <p>{reply}</p>
                    <span className="chat-time">Staff Response</span>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="reply-form" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <textarea 
                    className="form-control" 
                    placeholder="Type your response to mark ticket as Resolved..." 
                    style={{ minHeight: '80px', paddingRight: '3.5rem', resize: 'none', background: '#F8FAFC' }}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                  />
                  <button type="submit" className="reply-send-btn" title="Send Reply">
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="empty-state" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <p>Select a ticket from the inbox to reply.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Ticket Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h3>Create Support Ticket</h3>
              <button className="btn-close" onClick={() => setShowAddForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateTicket}>
              <div className="form-group">
                <label>Customer Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. David Beckham" 
                  value={newTicketName} 
                  onChange={(e) => setNewTicketName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="name@company.com" 
                  value={newTicketEmail} 
                  onChange={(e) => setNewTicketEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Inquiry or issue topic" 
                  value={newTicketSubject} 
                  onChange={(e) => setNewTicketSubject(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Message details</label>
                <textarea 
                  className="form-control" 
                  placeholder="Enter the customer inquiry message here..." 
                  style={{ minHeight: '120px' }}
                  value={newTicketMessage} 
                  onChange={(e) => setNewTicketMessage(e.target.value)} 
                  required 
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
