// Shared game logic & content — used by both host and player screens.

export const COLORS = {
  navy: "#0A1A3F",
  navyDeep: "#06122E",
  navySoft: "#13265A",
  gold: "#C8A24B",
  goldBright: "#E4C26A",
  red: "#C8102E",
  white: "#FFFFFF",
  mist: "#EAEDF5",
  slate: "#8A96B4",
};

export const TIME_PER_Q = 15; // seconds per question

export const QUESTIONS = [
  {
    id: 1,
    format: "Multiple choice",
    type: "mc",
    prompt: "Which city hosted the first modern Olympic Games in 1896?",
    options: ["Paris", "Athens", "London", "Rome"],
    answer: 1,
    fact: "The 1896 Games drew about 280 athletes from 13 nations — all of them men.",
  },
  {
    id: 2,
    format: "Closest answer",
    type: "closest",
    prompt: "How many gold medals did swimmer Michael Phelps win across his career?",
    options: ["18", "21", "23", "27"],
    answer: 2,
    fact: "Phelps won 23 golds and 28 medals total — the most decorated Olympian in history.",
  },
  {
    id: 3,
    format: "True / False",
    type: "tf",
    prompt: "The Olympic flame is lit in Olympia, Greece, before every Games.",
    options: ["True", "False"],
    answer: 0,
    fact: "The flame is kindled by the sun's rays using a parabolic mirror at the Temple of Hera.",
  },
  {
    id: 4,
    format: "Image",
    type: "image",
    prompt: "How many rings appear on the Olympic flag, and what do they represent?",
    options: [
      "Four — the seasons",
      "Five — the continents",
      "Six — the host cities",
      "Seven — the virtues",
    ],
    answer: 1,
    fact: "Five interlaced rings represent the five inhabited continents united by Olympism.",
  },
  {
    id: 5,
    format: "Speed",
    type: "speed",
    prompt: "Speed round — which country has hosted the most Summer Olympics?",
    options: ["France", "Greece", "United States", "United Kingdom"],
    answer: 2,
    fact: "The United States has hosted the Summer Games four times, with Los Angeles set for 2028.",
  },
];

// Correct answer = 600 base + up to 400 for speed.
export function scoreFor(correct, msTaken) {
  if (!correct) return { gained: 0, bonus: 0 };
  const secondsLeft = Math.max(0, TIME_PER_Q - msTaken / 1000);
  const bonus = Math.round((secondsLeft / TIME_PER_Q) * 400);
  return { gained: 600 + bonus, bonus };
}

// Short random room code, e.g. "OLY-4821"
export function makeRoomCode() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `OLY-${n}`;
}
