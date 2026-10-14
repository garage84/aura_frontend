import React from 'react';

export default function ConversationCard({ 
  conversation, 
  community, 
  onOpenConversation, 
  onSelectCommunity, 
  onToggleReaction 
}) {
  return (
    <article 
      className="conversation-card" 
      onClick={() => onOpenConversation(conversation.id)}
    >
      <div className="card-meta-top">
        <div className="author-group">
          {conversation.isAnonymous ? (
            <span className="author-username anonymous">Anonymous conversation</span>
          ) : (
            <>
              <span className="author-username">@{conversation.authorUsername}</span>
              <span className="verified-human" title="Privately verified real human">
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
            onClick={(e) => {
              e.stopPropagation();
              onSelectCommunity(community.slug);
            }}
          >
            {community.name}
          </button>
        )}
      </div>

      <h3 className="conversation-title">{conversation.title}</h3>
      <p className="conversation-body-snippet">{conversation.body}</p>

      {/* Empathy reactions */}
      <div className="card-actions">
        <button 
          className={`reaction-btn ${conversation.userReacted.i_relate ? 'reacted' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleReaction(conversation.id, 'i_relate');
          }}
          title="The reader shares a similar experience"
        >
          <span>I relate</span>
          <span className="count">{conversation.reactions.i_relate}</span>
        </button>

        <button 
          className={`reaction-btn ${conversation.userReacted.i_hear_you ? 'reacted' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleReaction(conversation.id, 'i_hear_you');
          }}
          title="Acknowledgement and support without advice"
        >
          <span>I hear you</span>
          <span className="count">{conversation.reactions.i_hear_you}</span>
        </button>

        <button 
          className={`reaction-btn ${conversation.userReacted.im_curious ? 'reacted' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleReaction(conversation.id, 'im_curious');
          }}
          title="Wants to understand more; invites author to elaborate"
        >
          <span>I'm curious</span>
          <span className="count">{conversation.reactions.im_curious}</span>
        </button>

        <button 
          className="respond-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onOpenConversation(conversation.id);
          }}
        >
          <span>{conversation.replies.length} replies</span> · Respond
        </button>
      </div>
    </article>
  );
}
