import React, { useState, useEffect } from 'react';
import { INITIAL_DATA } from './data/initialData';
import { api } from './api/client';
import Header from './components/Header';
import HomeView from './components/HomeView';
import CommunityRoomView from './components/CommunityRoomView';
import ExploreView from './components/ExploreView';
import TalkComposer from './components/TalkComposer';
import ProfileView from './components/ProfileView';
import ConversationModal from './components/ConversationModal';
import Toast from './components/Toast';

export default function App() {
  const [currentUser, setCurrentUser] = useState(INITIAL_DATA.currentUser);
  const [communities, setCommunities] = useState(INITIAL_DATA.communities);
  const [conversations, setConversations] = useState(INITIAL_DATA.conversations);

  const [currentView, setCurrentView] = useState('home');
  const [selectedCommunitySlug, setSelectedCommunitySlug] = useState('career-anxiety');
  const [preselectedTalkCommunity, setPreselectedTalkCommunity] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const [quietMode, setQuietMode] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('aura_theme') || 'light');
  const [toastMessage, setToastMessage] = useState('');

  // Initial backend fetch
  useEffect(() => {
    async function loadBackendData() {
      const comms = await api.getCommunities();
      if (comms && comms.length > 0) setCommunities(comms);

      const convs = await api.getConversations();
      if (convs && convs.length > 0) setConversations(convs);

      const prof = await api.getProfile();
      if (prof) setCurrentUser(prof);
    }
    loadBackendData();
  }, []);

  // Theme synchronization
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('aura_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2400);
  };

  const toggleQuietMode = () => {
    setQuietMode(prev => {
      const next = !prev;
      showToast(next ? "Quiet Mode enabled: Filtered to joined spaces" : "Quiet Mode disabled");
      return next;
    });
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCommunity = (slug) => {
    setSelectedCommunitySlug(slug);
    setCurrentView('community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTalk = () => {
    setPreselectedTalkCommunity(null);
    setCurrentView('talk');
  };

  const handleStartTalkInRoom = (slug) => {
    setPreselectedTalkCommunity(slug);
    setCurrentView('talk');
  };

  // Arrival mood check-in
  const handleSelectMood = async (mood) => {
    setCurrentUser(prev => ({ ...prev, currentMood: mood }));
    api.updateMood(mood);
    if (mood) {
      showToast(`Checked in: ${mood}. Gentle context applied.`);
    } else {
      showToast("Arrival check-in cleared.");
    }
  };

  // Join or leave community room
  const handleToggleJoin = async (slug) => {
    const isMember = currentUser.joinedCommunitySlugs.includes(slug);
    const comm = communities.find(c => c.slug === slug);
    const commName = comm ? comm.name : slug;

    if (isMember) {
      setCurrentUser(prev => ({
        ...prev,
        joinedCommunitySlugs: prev.joinedCommunitySlugs.filter(s => s !== slug)
      }));
      showToast(`Left ${commName}`);
      api.leaveCommunity(slug);
    } else {
      setCurrentUser(prev => ({
        ...prev,
        joinedCommunitySlugs: [...prev.joinedCommunitySlugs, slug]
      }));
      showToast(`Joined ${commName}`);
      api.joinCommunity(slug);
    }
  };

  // Meaningful empathy reactions (i_relate, i_hear_you, im_curious)
  const handleToggleReaction = async (conversationId, reactionType) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id !== conversationId) return conv;

      const isReacted = conv.userReacted[reactionType];
      const newReacted = { ...conv.userReacted, [reactionType]: !isReacted };
      const newCount = isReacted 
        ? Math.max(0, conv.reactions[reactionType] - 1) 
        : conv.reactions[reactionType] + 1;

      if (!isReacted) {
        const labels = {
          i_relate: "Shared: I relate",
          i_hear_you: "Acknowledged: I hear you",
          im_curious: "Invited: I'm curious"
        };
        showToast(labels[reactionType] || "Reaction recorded");
      }

      return {
        ...conv,
        userReacted: newReacted,
        reactions: {
          ...conv.reactions,
          [reactionType]: newCount
        }
      };
    }));

    api.toggleReaction(conversationId, reactionType);
  };

  // Primary talk post creation
  const handleSubmitPost = async ({ title, body, communitySlug, isAnonymous }) => {
    const talkPayload = { title, body, communitySlug, isAnonymous };
    
    const res = await api.createTalk(talkPayload);
    if (res && res.success === false) {
      showToast(res.message || "Content flagged by safety screening.");
      return;
    }

    const newPost = (res && res.data) ? res.data : {
      id: `post-${Date.now()}`,
      communitySlug,
      authorUsername: isAnonymous ? null : currentUser.username,
      isAnonymous,
      timeAgo: "Just now",
      title,
      body,
      topic: "Shared Thought",
      reactions: { i_relate: 0, i_hear_you: 0, im_curious: 0 },
      userReacted: { i_relate: false, i_hear_you: false, im_curious: false },
      replies: []
    };

    setConversations(prev => [newPost, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      experiencesShared: prev.experiencesShared + 1,
      conversationsJoined: prev.conversationsJoined + 1
    }));

    showToast("Thought shared calmly.");
    setSelectedCommunitySlug(communitySlug);
    setCurrentView('community');
  };

  // Shallow chronological reply
  const handleSubmitReply = async (conversationId, replyBody) => {
    const res = await api.postReply(conversationId, replyBody);
    if (res && res.success === false) {
      showToast(res.message || "Content flagged by safety screening.");
      return;
    }

    const newReply = (res && res.data) ? res.data : {
      id: `rep-${Date.now()}`,
      authorUsername: currentUser.username,
      timeAgo: "Just now",
      body: replyBody
    };

    setConversations(prev => prev.map(c => {
      if (c.id !== conversationId) return c;
      return {
        ...c,
        replies: [...c.replies, newReply]
      };
    }));

    setCurrentUser(prev => ({
      ...prev,
      conversationsJoined: prev.conversationsJoined + 1
    }));

    showToast("Thoughtful response shared.");
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const activeCommunity = communities.find(c => c.slug === selectedCommunitySlug);

  return (
    <div>
      <Header 
        currentView={currentView}
        onNavigate={handleNavigate}
        quietMode={quietMode}
        onToggleQuietMode={toggleQuietMode}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="aura-main" id="main-content">
        {currentView === 'home' && (
          <HomeView
            currentUser={currentUser}
            conversations={conversations}
            communities={communities}
            quietMode={quietMode}
            onSelectMood={handleSelectMood}
            onOpenConversation={(id) => setActiveConversationId(id)}
            onSelectCommunity={handleSelectCommunity}
            onToggleReaction={handleToggleReaction}
            onStartTalk={handleStartTalk}
          />
        )}

        {currentView === 'community' && (
          <CommunityRoomView
            community={activeCommunity}
            conversations={conversations}
            isJoined={currentUser.joinedCommunitySlugs.includes(selectedCommunitySlug)}
            onToggleJoin={() => handleToggleJoin(selectedCommunitySlug)}
            onOpenConversation={(id) => setActiveConversationId(id)}
            onSelectCommunity={handleSelectCommunity}
            onToggleReaction={handleToggleReaction}
            onStartTalkInRoom={handleStartTalkInRoom}
          />
        )}

        {currentView === 'explore' && (
          <ExploreView
            communities={communities}
            onSelectCommunity={handleSelectCommunity}
          />
        )}

        {currentView === 'talk' && (
          <TalkComposer
            communities={communities}
            preselectedCommunity={preselectedTalkCommunity}
            onSubmitPost={handleSubmitPost}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            communities={communities}
            onSelectCommunity={handleSelectCommunity}
          />
        )}
      </main>

      {/* Conversation modal */}
      {activeConversation && (
        <ConversationModal
          conversation={activeConversation}
          community={communities.find(c => c.slug === activeConversation.communitySlug)}
          onClose={() => setActiveConversationId(null)}
          onSelectCommunity={handleSelectCommunity}
          onToggleReaction={handleToggleReaction}
          onSubmitReply={handleSubmitReply}
        />
      )}

      <Toast message={toastMessage} />
    </div>
  );
}
