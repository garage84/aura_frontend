import React from 'react';

export default function ProfileView({ currentUser, communities, onSelectCommunity }) {
  return (
    <div className="view-enter">
      <div className="profile-card">
        <div className="profile-header-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 className="profile-username">@{currentUser.username}</h1>
            <span className="verified-human" title="Privately verified real human">
              <svg className="verified-icon" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
              </svg>
              Verified human
            </span>
          </div>
          <p className="profile-bio">{currentUser.bio}</p>
        </div>

        {/* Calm contribution metrics */}
        <div className="profile-stats-grid">
          <div className="stat-box">
            <span className="stat-number">{currentUser.conversationsJoined}</span>
            <span className="stat-label">Conversations joined</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{currentUser.peopleHelped}</span>
            <span className="stat-label">People helped (replies marked helpful)</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{currentUser.experiencesShared}</span>
            <span className="stat-label">Experiences shared</span>
          </div>
        </div>

        <div>
          <div className="profile-communities-title">Joined Community Rooms</div>
          <div className="profile-communities-chips">
            {currentUser.joinedCommunitySlugs.map(slug => {
              const comm = communities.find(c => c.slug === slug);
              return (
                <button
                  key={slug}
                  className="community-pill"
                  onClick={() => onSelectCommunity(slug)}
                  style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}
                >
                  {comm ? comm.name : slug}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--aura-border-subtle)', fontSize: '0.825rem', color: 'var(--aura-muted)' }}>
          <strong>Privacy Boundary:</strong> Legal verification records are held in an isolated zero-access zone. Other members see only your pseudonymous username and verified status.
        </div>
      </div>
    </div>
  );
}
