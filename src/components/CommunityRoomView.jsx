import React, { useState } from 'react';
import ConversationCard from './ConversationCard';

export default function CommunityRoomView({ 
  community, 
  conversations, 
  isJoined, 
  onToggleJoin, 
  onOpenConversation, 
  onSelectCommunity, 
  onToggleReaction, 
  onStartTalkInRoom 
}) {
  const [activeTab, setActiveTab] = useState('conversations');
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (!community) return null;

  let roomConvs = conversations.filter(c => c.communitySlug === community.slug);
  if (selectedTopic) {
    roomConvs = roomConvs.filter(c => c.topic === selectedTopic);
  }

  return (
    <div className="view-enter">
      {/* Community room header */}
      <div className="community-header-card">
        <div className="community-top-row">
          <div>
            <h1 className="community-name-title">{community.name}</h1>
            <div className="community-member-stat">{community.membersCount} people</div>
          </div>
          <div className="community-primary-action">
            <button 
              className={isJoined ? "btn-outline joined" : "btn-primary"}
              onClick={onToggleJoin}
            >
              {isJoined ? "Joined" : "Join Room"}
            </button>
            <button 
              className="btn-outline" 
              onClick={() => onStartTalkInRoom(community.slug)}
            >
              + New Talk
            </button>
          </div>
        </div>

        <p className="community-purpose">{community.purpose}</p>

        <div className="community-actions-bar">
          <div className="moderation-badge-notice">
            <span>{community.moderationInfo}</span>
          </div>
        </div>
      </div>

      {/* 4 Focused room tabs */}
      <div className="community-tabs" role="tablist">
        <button 
          className={`community-tab-btn ${activeTab === 'conversations' ? 'active' : ''}`}
          onClick={() => setActiveTab('conversations')}
        >
          Conversations
        </button>
        <button 
          className={`community-tab-btn ${activeTab === 'topics' ? 'active' : ''}`}
          onClick={() => setActiveTab('topics')}
        >
          Topics
        </button>
        <button 
          className={`community-tab-btn ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          Members & Roles
        </button>
        <button 
          className={`community-tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          Room Rules
        </button>
      </div>

      {activeTab === 'conversations' && (
        <div className="view-enter">
          {selectedTopic && (
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--aura-muted)' }}>
              <span>Filtered by topic: <strong>{selectedTopic}</strong></span>
              <button 
                onClick={() => setSelectedTopic(null)} 
                style={{ color: 'var(--aura-accent)', fontWeight: 600, cursor: 'pointer' }}
              >
                Clear filter
              </button>
            </div>
          )}

          <div className="conversation-list">
            {roomConvs.length === 0 ? (
              <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--aura-surface)', border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius)' }}>
                <p style={{ color: 'var(--aura-muted)', marginBottom: '0.75rem' }}>No active discussions under this topic yet.</p>
                <button className="btn-primary" onClick={() => onStartTalkInRoom(community.slug)}>
                  Start the first conversation
                </button>
              </div>
            ) : (
              roomConvs.map(conv => (
                <ConversationCard
                  key={conv.id}
                  conversation={conv}
                  community={community}
                  onOpenConversation={onOpenConversation}
                  onSelectCommunity={onSelectCommunity}
                  onToggleReaction={onToggleReaction}
                />
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="view-enter">
          <p style={{ fontSize: '0.9rem', color: 'var(--aura-muted)', marginBottom: '1rem' }}>
            Select a topic to view focused conversations inside {community.name}:
          </p>
          <div className="topic-tag-grid">
            {community.topics.map(t => (
              <button
                key={t}
                className={`topic-tag-chip ${selectedTopic === t ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTopic(selectedTopic === t ? null : t);
                  setActiveTab('conversations');
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <div className="view-enter">
          <p style={{ fontSize: '0.9rem', color: 'var(--aura-muted)', marginBottom: '1rem' }}>
            Verified humans participating in this room:
          </p>
          <div className="community-members-list">
            {community.members.map(m => (
              <div key={m.username} className="member-item">
                <div className="member-info">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--aura-ink)' }}>@{m.username}</span>
                      {m.isVerified && (
                        <span className="verified-human" title="Verified Human">
                          <svg className="verified-icon" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                          </svg>
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--aura-muted)', marginTop: '0.15rem' }}>{m.bio}</div>
                  </div>
                </div>
                <span className={`member-role-badge ${m.role.toLowerCase()}`}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="view-enter">
          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.25rem' }}>Room Etiquette & Principles</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--aura-muted)' }}>Rules are visible to all members before joining and participating.</p>
          </div>
          <div className="community-rules-list">
            {community.rules.map(r => (
              <div key={r.id} className="rule-card">
                <div className="rule-number">RULE 0{r.id}</div>
                <div className="rule-title">{r.title}</div>
                <div className="rule-desc">{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--aura-surface)', border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius)', fontSize: '0.85rem', color: 'var(--aura-muted)' }}>
            <strong>Moderation Transparency:</strong> Reports are reviewed by human community moderators with assistance from AURA's automated safety screening. Actions are logged to immutable audit records.
          </div>
        </div>
      )}
    </div>
  );
}
