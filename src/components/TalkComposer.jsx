import React, { useState } from 'react';

export default function TalkComposer({ 
  communities, 
  preselectedCommunity, 
  onSubmitPost 
}) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [communitySlug, setCommunitySlug] = useState(preselectedCommunity || communities[0].slug);
  const [audience, setAudience] = useState('community');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    onSubmitPost({
      title: title.trim(),
      body: body.trim(),
      communitySlug,
      isAnonymous: audience === 'anonymous'
    });
  };

  return (
    <div className="view-enter talk-container">
      <h1 className="talk-prompt-title">What's on your mind?</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="talk-title-input"
          placeholder="A short thought or question..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={140}
        />

        <textarea 
          className="talk-textarea"
          placeholder="Take your time to write. There are no character constraints, streaks, or follower rankings here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--aura-ink)' }}>
            Select Community Room:
          </label>
          <select 
            value={communitySlug}
            onChange={(e) => setCommunitySlug(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 0.85rem', background: 'var(--aura-surface)', border: '1px solid var(--aura-border)', borderRadius: 'var(--aura-radius)', outline: 'none' }}
          >
            {communities.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Audience options */}
        <div className="audience-selector-group">
          <div className="audience-title">Who should see this?</div>
          <div className="audience-options">
            <label className="audience-radio-label">
              <input 
                type="radio" 
                name="talk-audience" 
                value="community" 
                checked={audience === 'community'}
                onChange={() => setAudience('community')}
              />
              <div>
                <div className="audience-option-text">My community</div>
                <div className="audience-option-sub">Members of the selected room can read and respond.</div>
              </div>
            </label>

            <label className="audience-radio-label">
              <input 
                type="radio" 
                name="talk-audience" 
                value="anyone" 
                checked={audience === 'anyone'}
                onChange={() => setAudience('anyone')}
              />
              <div>
                <div className="audience-option-text">Anyone on AURA</div>
                <div className="audience-option-sub">Discoverable across AURA under your pseudonymous username.</div>
              </div>
            </label>

            <label className="audience-radio-label">
              <input 
                type="radio" 
                name="talk-audience" 
                value="anonymous" 
                checked={audience === 'anonymous'}
                onChange={() => setAudience('anonymous')}
              />
              <div>
                <div className="audience-option-text">Anonymous conversation</div>
                <div className="audience-option-sub">Others see no username on the post. Moderated securely for safety.</div>
              </div>
            </label>
          </div>
        </div>

        <div className="talk-actions-row">
          <span style={{ fontSize: '0.8rem', color: 'var(--aura-muted)' }}>
            AI safety screening active before publishing.
          </span>
          <button type="submit" className="post-primary-btn">
            Post Thought
          </button>
        </div>
      </form>
    </div>
  );
}
