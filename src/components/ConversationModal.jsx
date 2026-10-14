import React, { useState } from 'react';

export default function ConversationModal({ 
  conversation, 
  community, 
  onClose, 
  onSelectCommunity, 
  onToggleReaction, 
  onSubmitReply 
}) {
  const [replyText, setReplyText] = useState('');

  if (!conversation) return null;

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSubmitReply(conversation.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div 
      className="conversation-modal-overlay" 
      onClick={(e) => {
        if (e.target.classList.contains('conversation-modal-overlay')) onClose();
      }}
    >
      <div className="conversation-modal-card">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close conversation">
          &times;
        </button>

        <div className="card-meta-top" style={{ marginBottom: '0.85rem' }}>
          <div className="author-group">
            {conversation.isAnonymous ? (
              <span className="author-username anonymous">Anonymous conversation</span>
            ) : (
              <>
                <span className="author-username">@{conversation.authorUsername}</span>
                <span className="verified-human">
                  <svg className="verified-icon" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                  Verified human
                </span>
              </>
            )}
            <span className="meta-time">· {conversation.timeAgo}</span>
          </div>

          {community && (
            <button 
              className="community-pill" 
              onClick={() => {
                onClose();
                onSelectCommunity(community.slug);
              }}
            >
              {community.name}
            </button>
          )}
        </div>

        <h2 style={{ fontSize: '1.45rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '0.85rem' }}>
          {conversation.title}
        </h2>

        <div className="full-post-body">{conversation.body}</div>

        {/* Empathy reaction buttons */}
        <div className="card-actions" style={{ marginTop: '1.25rem' }}>
          <button 
            className={`reaction-btn ${conversation.userReacted.i_relate ? 'reacted' : ''}`}
            onClick={() => onToggleReaction(conversation.id, 'i_relate')}
          >
            <span>I relate</span> <span className="count">{conversation.reactions.i_relate}</span>
          </button>
          <button 
            className={`reaction-btn ${conversation.userReacted.i_hear_you ? 'reacted' : ''}`}
            onClick={() => onToggleReaction(conversation.id, 'i_hear_you')}
          >
            <span>I hear you</span> <span className="count">{conversation.reactions.i_hear_you}</span>
          </button>
          <button 
            className={`reaction-btn ${conversation.userReacted.im_curious ? 'reacted' : ''}`}
            onClick={() => onToggleReaction(conversation.id, 'im_curious')}
          >
            <span>I'm curious</span> <span className="count">{conversation.reactions.im_curious}</span>
          </button>
        </div>

        {/* Shallow chronological replies */}
        <div className="replies-container">
          <h3 className="replies-heading">{conversation.replies.length} Responses</h3>

          <div className="replies-stream">
            {conversation.replies.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--aura-muted)' }}>
                No responses yet. Offer an acknowledgement or your experience below.
              </p>
            ) : (
              conversation.replies.map(r => (
                <div key={r.id} className="reply-item">
                  <div className="reply-meta">
                    <span style={{ fontWeight: 600, color: 'var(--aura-ink)' }}>@{r.authorUsername}</span>
                    <span className="verified-human">
                      <svg className="verified-icon" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                      </svg>
                    </span>
                    <span className="meta-time">· {r.timeAgo}</span>
                  </div>
                  <div className="reply-text">{r.body}</div>
                </div>
              ))
            )}
          </div>

          <form className="reply-composer-form" onSubmit={handleReplySubmit}>
            <textarea 
              className="reply-input"
              placeholder="Offer an acknowledgement or perspective without unsolicited advice..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              required
            />
            <div className="reply-submit-row">
              <button type="submit" className="btn-primary" style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}>
                Send Response
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
