import React, { useState } from 'react';

export default function ExploreView({ communities, onSelectCommunity }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Semantic search keyword mapping
  const semanticKeywords = {
    "falling behind": ["career-anxiety", "college-life"],
    "late": ["career-anxiety"],
    "burnout": ["career-anxiety", "mental-wellbeing"],
    "lonely": ["moving-to-a-new-city", "college-life"],
    "solitude": ["moving-to-a-new-city", "books"],
    "books": ["books"],
    "anxiety": ["career-anxiety", "mental-wellbeing"],
    "startup": ["entrepreneurship"],
    "founder": ["entrepreneurship"]
  };

  let filteredRooms = [...communities];
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    let matchedSlugs = new Set();
    Object.keys(semanticKeywords).forEach(key => {
      if (q.includes(key)) {
        semanticKeywords[key].forEach(s => matchedSlugs.add(s));
      }
    });

    filteredRooms = filteredRooms.filter(c => {
      return c.name.toLowerCase().includes(q) ||
             c.purpose.toLowerCase().includes(q) ||
             c.topics.some(t => t.toLowerCase().includes(q)) ||
             matchedSlugs.has(c.slug);
    });
  }

  return (
    <div className="view-enter">
      <div className="section-header" style={{ marginBottom: '0.75rem' }}>
        <h1 className="section-title">Explore Focused Rooms</h1>
        <span className="section-context">Discussions organized around topics, not personal brands</span>
      </div>

      <div className="explore-search-wrapper">
        <input 
          type="text" 
          className="search-input-box"
          placeholder="Search by meaning... (e.g. 'feeling behind in career', 'loneliness', 'starting out')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        <div className="search-helper-text">
          Searches semantic meaning and themes across rooms rather than mechanical keywords.
        </div>
      </div>

      <div className="explore-rooms-grid">
        {filteredRooms.map(room => (
          <div 
            key={room.slug} 
            className="room-card" 
            onClick={() => onSelectCommunity(room.slug)}
          >
            <div>
              <div className="room-card-name">{room.name}</div>
              <div className="room-card-purpose">{room.purpose}</div>
            </div>
            <div className="room-card-footer">
              <span>{room.membersCount} people</span>
              <span style={{ color: 'var(--aura-accent)', fontWeight: 600 }}>Enter room &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
