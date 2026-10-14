export const INITIAL_DATA = {
  currentUser: {
    username: "bhavit",
    isVerified: true,
    bio: "Software builder. Finding quiet focus and genuine connection amidst the noise.",
    conversationsJoined: 42,
    peopleHelped: 17,
    experiencesShared: 9,
    joinedCommunitySlugs: ["career-anxiety", "books", "moving-to-a-new-city"],
    quietMode: false,
    currentMood: null
  },

  communities: [
    {
      id: "c1",
      slug: "career-anxiety",
      name: "Career Anxiety",
      membersCount: "18.4k",
      purpose: "A quiet place to talk about uncertainty, pressure and work.",
      moderationInfo: "Moderated by people, with AI-assisted screening.",
      topics: ["Career Anxiety", "Burnout", "Imposter Syndrome", "First Job", "Career Pivot", "Workplace Dynamics"],
      rules: [
        {
          id: 1,
          title: "Listen without unsolicited advice",
          desc: "Unless someone explicitly asks for advice, acknowledge their experience first."
        },
        {
          id: 2,
          title: "Honesty over prestige",
          desc: "Leave resume flexing and LinkedIn-style posturing at the door."
        },
        {
          id: 3,
          title: "Zero harassment or dismissal",
          desc: "Never minimize someone's pain or anxiety."
        }
      ],
      members: [
        { username: "quietfox", role: "Owner", isVerified: true, bio: "Product designer trying to slow down." },
        { username: "sunmoth", role: "Moderator", isVerified: true, bio: "Navigating mid-career transitions." },
        { username: "riverlark", role: "Member", isVerified: true, bio: "Junior engineer finding footing." },
        { username: "bhavit", role: "Member", isVerified: true, bio: "Software builder." }
      ]
    },
    {
      id: "c2",
      slug: "moving-to-a-new-city",
      name: "Moving to a New City",
      membersCount: "12.1k",
      purpose: "The quiet reality of starting over in an unfamiliar place.",
      moderationInfo: "Moderated by people, with AI-assisted screening.",
      topics: ["First Month Loneliness", "Finding Routine", "Making Friends as an Adult", "Home Sickness", "Solo Living"],
      rules: [
        {
          id: 1,
          title: "Safe space for vulnerability",
          desc: "Relocating brings disorientation. Be kind to members grieving old comforts."
        },
        {
          id: 2,
          title: "No commercial promotions",
          desc: "No apartment rental broker links or self-promotions."
        }
      ],
      members: [
        { username: "pinegrove", role: "Owner", isVerified: true, bio: "Moved across three continents." },
        { username: "sunmoth", role: "Member", isVerified: true, bio: "Navigating new streets." },
        { username: "bhavit", role: "Member", isVerified: true, bio: "Software builder." }
      ]
    },
    {
      id: "c3",
      slug: "mental-wellbeing",
      name: "Mental Wellbeing",
      membersCount: "22.8k",
      purpose: "A gentle space for navigating tough days and low energy without toxic positivity.",
      moderationInfo: "Moderated by people, with AI-assisted screening.",
      topics: ["Low Energy Days", "Boundaries", "Quiet Mornings", "Overwhelm", "Self-Acceptance"],
      rules: [
        {
          id: 1,
          title: "No medical or clinical diagnosis",
          desc: "Peer support community, not clinical therapy. Never attempt to diagnose members."
        },
        {
          id: 2,
          title: "Trigger warnings for heavy topics",
          desc: "Add a gentle note at the top if discussing difficult mental strain."
        }
      ],
      members: [
        { username: "calmfern", role: "Owner", isVerified: true, bio: "Advocate for slow living." },
        { username: "riverlark", role: "Moderator", isVerified: true, bio: "Junior engineer." }
      ]
    },
    {
      id: "c4",
      slug: "college-life",
      name: "College Life",
      membersCount: "15.3k",
      purpose: "Finding your footing, navigating expectations, exams, and roommates.",
      moderationInfo: "Moderated by people, with AI-assisted screening.",
      topics: ["Exam Pressure", "First Semester", "Roommates", "Future Uncertainty", "Campus Solitude"],
      rules: [
        {
          id: 1,
          title: "Respect all educational stages",
          desc: "Everyone's pace and path is valid."
        }
      ],
      members: [
        { username: "nightshade", role: "Owner", isVerified: true, bio: "Final year student." }
      ]
    },
    {
      id: "c5",
      slug: "books",
      name: "Books",
      membersCount: "9.7k",
      purpose: "Books that shifted how we think or feel, quietly discussed.",
      moderationInfo: "Moderated by people, with AI-assisted screening.",
      topics: ["Slow Reading", "Memoirs", "Philosophy for Everyday Life", "Fiction That Resonated"],
      rules: [
        {
          id: 1,
          title: "No reading-count shaming",
          desc: "Reading deeply is just as meaningful as reading in high volume."
        }
      ],
      members: [
        { username: "quietfox", role: "Owner", isVerified: true, bio: "Avid slow reader." },
        { username: "bhavit", role: "Member", isVerified: true, bio: "Software builder." }
      ]
    },
    {
      id: "c6",
      slug: "entrepreneurship",
      name: "Entrepreneurship",
      membersCount: "11.2k",
      purpose: "Beyond the hustle hype—real doubts, risks, and building alone.",
      moderationInfo: "Moderated by people, with AI-assisted screening.",
      topics: ["Bootstrapping", "Loneliness of Solo Building", "Product Market Fit Doubts", "Quiet Growth"],
      rules: [
        {
          id: 1,
          title: "Zero hustle porn or pitch decks",
          desc: "No vanity bragging about valuations or unsolicited investor pitches."
        }
      ],
      members: [
        { username: "solofounder", role: "Owner", isVerified: true, bio: "Bootstrapping calm software." }
      ]
    }
  ],

  conversations: [
    {
      id: "post-1",
      communitySlug: "career-anxiety",
      authorUsername: "quietfox",
      isAnonymous: false,
      timeAgo: "2h ago",
      title: "Three years in and I still feel like I'm behind everyone I started with. Is this just me?",
      body: "I graduated 3 years ago and joined a mid-sized tech company. On paper, things are stable. But every week when I see colleagues discussing promotions, complex architectures, or side ventures, my chest tightens. It feels like everyone else received a clear handbook on how to progress, and I am just improvising day to day. Does this feeling ever subside, or do we just learn to carry it?",
      topic: "Imposter Syndrome",
      reactions: { i_relate: 28, i_hear_you: 14, im_curious: 6 },
      userReacted: { i_relate: true, i_hear_you: false, im_curious: false },
      replies: [
        {
          id: "rep-1",
          authorUsername: "sunmoth",
          timeAgo: "1h ago",
          body: "Not just you at all. Everyone broadcasts their highlights while privately dealing with fog."
        },
        {
          id: "rep-2",
          authorUsername: "riverlark",
          timeAgo: "45m ago",
          body: "Can I ask what is weighing most? Is it external expectations, or the fear of letting yourself down?"
        },
        {
          id: "rep-3",
          authorUsername: "bhavit",
          timeAgo: "20m ago",
          body: "I can relate heavily. Progress is rarely linear. Focusing on one craft detail each week gave me peace."
        }
      ]
    },
    {
      id: "post-2",
      communitySlug: "moving-to-a-new-city",
      authorUsername: "sunmoth",
      isAnonymous: false,
      timeAgo: "4h ago",
      title: "The first month was lonelier than anyone warned me about.",
      body: "Everyone told me how exciting moving to a new city would be: new cafes, new skyline, a fresh clean slate. But nobody told me about that 8 PM silence when you finish unpacking your last cardboard box and realize nobody in a 50-mile radius knows your favorite tea or your middle name. The silence in the apartment felt deafening.",
      topic: "First Month Loneliness",
      reactions: { i_relate: 34, i_hear_you: 19, im_curious: 3 },
      userReacted: { i_relate: false, i_hear_you: true, im_curious: false },
      replies: [
        {
          id: "rep-4",
          authorUsername: "pinegrove",
          timeAgo: "3h ago",
          body: "What helped me was finding one neighborhood bakery where I became a regular face within two weeks."
        }
      ]
    },
    {
      id: "post-3",
      communitySlug: "career-anxiety",
      authorUsername: "riverlark",
      isAnonymous: false,
      timeAgo: "6h ago",
      title: "What helped when work felt heavy and detached",
      body: "When every task feels like moving through wet cement, trying to force high productivity only deepens numbness. I started taking 15 minutes before opening my laptop in the morning to write unfiltered thoughts. It separated my human identity from my output.",
      topic: "Burnout",
      reactions: { i_relate: 41, i_hear_you: 22, im_curious: 8 },
      userReacted: { i_relate: false, i_hear_you: false, im_curious: false },
      replies: [
        {
          id: "rep-5",
          authorUsername: "quietfox",
          timeAgo: "5h ago",
          body: "Separating identity from output is the hardest and most important lesson."
        }
      ]
    },
    {
      id: "post-4",
      communitySlug: "mental-wellbeing",
      authorUsername: null,
      isAnonymous: true,
      timeAgo: "8h ago",
      title: "Learning to let 'good enough' be the ceiling today, not the floor.",
      body: "For years I treated 'good enough' as a failure. Today I sent something functional and shut my laptop. My heart raced, but nothing collapsed. Maybe good enough is freedom.",
      topic: "Self-Acceptance",
      reactions: { i_relate: 52, i_hear_you: 31, im_curious: 4 },
      userReacted: { i_relate: true, i_hear_you: false, im_curious: false },
      replies: [
        {
          id: "rep-6",
          authorUsername: "calmfern",
          timeAgo: "7h ago",
          body: "Good enough is often where sustainable living begins."
        }
      ]
    },
    {
      id: "post-5",
      communitySlug: "books",
      authorUsername: "quietfox",
      isAnonymous: false,
      timeAgo: "1d ago",
      title: "Rereading Marcus Aurelius during a turbulent month",
      body: "'You have power over your mind - not outside events. Realize this, and you will find strength.' Reading Meditations slowly has been far more calming than consuming endless self-help articles.",
      topic: "Philosophy for Everyday Life",
      reactions: { i_relate: 18, i_hear_you: 12, im_curious: 15 },
      userReacted: { i_relate: false, i_hear_you: false, im_curious: true },
      replies: [
        {
          id: "rep-7",
          authorUsername: "bhavit",
          timeAgo: "18h ago",
          body: "Gregory Hays translation is the one that clicked for me."
        }
      ]
    }
  ]
};
