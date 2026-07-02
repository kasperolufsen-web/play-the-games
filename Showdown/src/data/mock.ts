// ----------------------------------------------------------------------------
// Showdown — mock data. No backend. All values are illustrative for screenshots.
// ----------------------------------------------------------------------------

export const VENUE = {
  name: "Northgate Arena",
  city: "Manchester",
  capacity: 53400,
  sport: "Football",
  fixture: "Northgate United  vs  Riverside FC",
  sponsor: "Velocity Energy",
  sessionCode: "SHOW-7412",
};

export const SESSION = {
  fansJoined: 18342,
  liveNow: 14108,
  avgRoundSeconds: 45,
  prizePool: 12000,
};

export type Player = {
  rank: number;
  name: string;
  handle: string;
  section: string;
  points: number;
  streak: number;
  delta: number; // rank change this round
  you?: boolean;
};

export const LEADERBOARD: Player[] = [
  { rank: 1, name: "Maya Theron", handle: "@maya_t", section: "Block 112", points: 9840, streak: 7, delta: 2 },
  { rank: 2, name: "Dev Okafor", handle: "@devo", section: "Block 204", points: 9610, streak: 5, delta: -1 },
  { rank: 3, name: "Lena Brandt", handle: "@lenab", section: "Block 118", points: 9420, streak: 6, delta: 1 },
  { rank: 4, name: "Theo Marsh", handle: "@tmarsh", section: "Block 309", points: 9180, streak: 3, delta: 4 },
  { rank: 5, name: "Aria Solberg", handle: "@aria", section: "Block 101", points: 8990, streak: 4, delta: -2 },
  { rank: 6, name: "You", handle: "@you", section: "Block 207", points: 8755, streak: 4, delta: 3, you: true },
  { rank: 7, name: "Carlos Vega", handle: "@cvega", section: "Block 215", points: 8610, streak: 2, delta: -1 },
  { rank: 8, name: "Priya Nair", handle: "@priyan", section: "Block 130", points: 8430, streak: 3, delta: 0 },
  { rank: 9, name: "Sam Whitfield", handle: "@samw", section: "Block 318", points: 8290, streak: 1, delta: -3 },
  { rank: 10, name: "Noor Haddad", handle: "@noorh", section: "Block 109", points: 8120, streak: 2, delta: 1 },
];

export const SECTION_BATTLE = [
  { name: "North Stand", points: 184200, color: "#9CFF4F", share: 32 },
  { name: "Kop End", points: 158900, color: "#4FC3FF", share: 27 },
  { name: "East Wing", points: 132400, color: "#FF6B4A", share: 23 },
  { name: "South Family", points: 102800, color: "#C792FF", share: 18 },
];

export type MiniGame = {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  type: "Reaction" | "Prediction" | "Skill" | "Trivia";
  accent: string;
  players: number;
};

export const MINI_GAMES: MiniGame[] = [
  {
    id: "reflex",
    title: "Reflex Rush",
    tagline: "Tap the target the instant it flashes green.",
    duration: "15s",
    type: "Reaction",
    accent: "#9CFF4F",
    players: 11840,
  },
  {
    id: "predict",
    title: "Next Goal Caller",
    tagline: "Predict the scorer before the restart.",
    duration: "Live",
    type: "Prediction",
    accent: "#4FC3FF",
    players: 13902,
  },
  {
    id: "power",
    title: "Power Strike",
    tagline: "Charge the meter, release for a perfect shot.",
    duration: "20s",
    type: "Skill",
    accent: "#FF6B4A",
    players: 9650,
  },
  {
    id: "trivia",
    title: "Rapid Recall",
    tagline: "Five club facts. Five seconds each.",
    duration: "30s",
    type: "Trivia",
    accent: "#C792FF",
    players: 8420,
  },
];

export type Prediction = {
  id: string;
  question: string;
  context: string;
  options: { label: string; share: number; odds: string }[];
};

export const LIVE_PREDICTION: Prediction = {
  id: "p1",
  question: "Who scores the next goal?",
  context: "62'  •  1–1  •  Northgate building down the right",
  options: [
    { label: "A. Reyes", share: 48, odds: "x2.1" },
    { label: "J. Okonkwo", share: 27, odds: "x3.8" },
    { label: "Set piece", share: 14, odds: "x5.0" },
    { label: "No goal", share: 11, odds: "x1.6" },
  ],
};

export type Reward = {
  id: string;
  title: string;
  sponsor: string;
  cost: number;
  tag: string;
  accent: string;
  remaining: number;
  hot?: boolean;
};

export const REWARDS: Reward[] = [
  { id: "r1", title: "Free Velocity Energy at Kiosk 4", sponsor: "Velocity Energy", cost: 500, tag: "Concession", accent: "#9CFF4F", remaining: 240, hot: true },
  { id: "r2", title: "20% off Home Kit 25/26", sponsor: "Club Store", cost: 1200, tag: "Merch", accent: "#4FC3FF", remaining: 88 },
  { id: "r3", title: "Pitch-side photo upgrade", sponsor: "Northgate United", cost: 3000, tag: "Experience", accent: "#FF6B4A", remaining: 12, hot: true },
  { id: "r4", title: "Half-time big-screen shoutout", sponsor: "Velocity Energy", cost: 2200, tag: "Moment", accent: "#C792FF", remaining: 6 },
];

export const ACTIVITY = [
  { who: "Maya T.", what: "hit a 7-round streak", pts: "+320", color: "#9CFF4F" },
  { who: "Block 204", what: "took the section lead", pts: "+1.2k", color: "#4FC3FF" },
  { who: "Dev O.", what: "nailed Next Goal Caller", pts: "+210", color: "#FF6B4A" },
  { who: "You", what: "climbed to Rank 6", pts: "+180", color: "#C792FF" },
  { who: "Lena B.", what: "perfect Reflex Rush", pts: "+260", color: "#9CFF4F" },
];

export const STADIUM_CTA = {
  countdown: 22,
  joinedThisBreak: 2140,
  qr: "SHOW-7412",
};
