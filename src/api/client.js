const API_BASE = '/api';

export const api = {
  // Communities
  async getCommunities() {
    try {
      const res = await fetch(`${API_BASE}/communities`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  async joinCommunity(slug) {
    try {
      const res = await fetch(`${API_BASE}/communities/${slug}/join`, { method: 'POST' });
      return await res.json();
    } catch {
      return null;
    }
  },

  async leaveCommunity(slug) {
    try {
      const res = await fetch(`${API_BASE}/communities/${slug}/leave`, { method: 'POST' });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Conversations Feed
  async getConversations(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/conversations${query ? `?${query}` : ''}`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  // Empathy Reactions
  async toggleReaction(id, reactionType) {
    try {
      const res = await fetch(`${API_BASE}/conversations/${id}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reactionType })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Primary Creation
  async createTalk(talkData) {
    try {
      const res = await fetch(`${API_BASE}/talk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(talkData)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Shallow chronological replies
  async postReply(id, body) {
    try {
      const res = await fetch(`${API_BASE}/conversations/${id}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Semantic search
  async explore(query = '') {
    try {
      const res = await fetch(`${API_BASE}/explore?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  // Profile
  async getProfile() {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  },

  // Arrival check-in
  async updateMood(mood) {
    try {
      const res = await fetch(`${API_BASE}/profile/mood`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood })
      });
      return await res.json();
    } catch {
      return null;
    }
  }
};
