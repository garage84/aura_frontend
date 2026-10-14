import React, { useState } from 'react';
import ConversationCard from './ConversationCard';

export default function HomeView({ 
  currentUser, 
  conversations, 
  communities, 
  quietMode, 
  onSelectMood, 
  onOpenConversation, 
  onSelectCommunity, 
  onToggleReaction, 
  onStartTalk 
}) {
  const [showBanner, setShowBanner] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning.";
    if (hour >= 12 && hour < 17) return "Good afternoon.";
    if (hour >= 17 && hour < 22) return "Good evening.";
    return "Good night.";
  };

  const moods = ["Heavy", "Lost", "Okay", "Hopeful", "Energized"];

  let feed = [...conversations];
  if (quietMode) {
    feed = feed.filter(c => currentUser.joinedCommunitySlugs.includes(c.communitySlug));
  }

  return (
    <div className="view-enter">
      {showBanner && (
        <div className="aura-hero-banner">
          <button 
            className="close-btn" 
            onClick={() => setShowBanner(false)} 
            aria-label="Dismiss banner"
          >
            &times;
          </button>
          <div className="aura-hero-eyebrow">AURA Community</div>
          <h1 className="aura-hero-title">You don't have to be anyone here.</h1>
          <p className="aura-hero-subtitle">
            Real verified people. Pseudonymous participation. Calm rooms. No follower counts or vanity metrics.
          </p>
          <div className="aura-hero-pillars">
            <span>Real people</span>
            <span>Pseudonymous voices</span>
            <span>Focused rooms</span>
            <span>Meaningful conversations</span>
          </div>
        </div>
      )}

      {/* Greeting and arrival check-in */}
      <div className="home-greeting-card">
        <div className="greeting-time">{getGreeting()}</div>
        <div className="greeting-prompt">How are you arriving today?</div>

        <div className="mood-arrival-bar">
          <span className="mood-label">Check-in:</span>
          <div style={{ display: 'inline-flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {moods.map(mood => (
              <button
                key={mood}
                className={`mood-chip ${currentUser.currentMood === mood ? 'selected' : ''}`}
                onClick={() => onSelectMood(currentUser.currentMood === mood ? null : mood)}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {currentUser.currentMood && (
          <div className="mood-active-note">
            <span>
              Arriving as <strong>{currentUser.currentMood}</strong>. Surfacing gentler discussions.
            </span>
            <button 
              onClick={() => onSelectMood(null)}
              style={{ textDecoration: 'underline', color: 'inherit', fontSize: '0.8rem', marginLeft: '0.5rem' }}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="quick-talk-bar" onClick={onStartTalk}>
        <span className="quick-talk-placeholder">What's on your mind?</span>
        <span className="quick-talk-action">+ Share a thought</span>
      </div>

      <div className="section-header">
        <h2 className="section-title">Current Conversations</h2>
        <span className="section-context">Chronological · Real voices</span>
      </div>

      <div className="conversation-list">
        {feed.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--aura-surface)', border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius)' }}>
            <p style={{ color: 'var(--aura-muted)' }}>No discussions in your joined communities yet.</p>
          </div>
        ) : (
          feed.map(conv => (
            <ConversationCard
              key={conv.id}
              conversation={conv}
              community={communities.find(c => c.slug === conv.communitySlug)}
              onOpenConversation={onOpenConversation}
              onSelectCommunity={onSelectCommunity}
              onToggleReaction={onToggleReaction}
            />
          ))
        )}
      </div>

      {/* Explicit end state */}
      <div className="feed-end-state">
        <div className="feed-end-title">You are all caught up.</div>
        <div className="feed-end-desc">
          AURA does not use infinite algorithmic feeds. You’ve reviewed recent conversations from your circle.
        </div>
      </div>
    </div>
  );
}
