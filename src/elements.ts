export type Kind = "ours" | "building" | "tbd";

export type Olympiad = {
  id: string;
  symbol: string;
  exam: string;
  name: string;
  subject: string;
  kind: Kind;
  color: string; // subject color
  tint: string; // light fill
  glow: string; // bright version for dark backgrounds
  line: string; // one plain sentence
  path: string[];
  status: string;
  stats?: [string, string][];
  action?: { label: string; href: string };
};

export const REPO = "https://github.com/shlok-madhekar/olympiad-commons";
/** The USAPhO Guide server doubles as the Commons server for now (permanent invite). */
export const DISCORD = "https://discord.gg/KGWAxqxug2";

/** Our guides, placed at the start of period 2. */
export const OLYMPIADS: Olympiad[] = [
  {
    id: "physics", symbol: "Ph", exam: "USAPhO", name: "US Physics Olympiad", subject: "Physics", kind: "ours",
    color: "#2343c4", tint: "#dfe5fb", glow: "#7d97ff",
    line: "Mechanics on the F=ma exam, then everything else on USAPhO.",
    path: ["F=ma", "USAPhO", "Camp", "IPhO"],
    status: "Our guide is live.",
    stats: [["82", "lessons"], ["2,591", "problems"], ["267", "sims"]],
    action: { label: "Open the guide", href: "https://usapho.one" },
  },
  {
    id: "chemistry", symbol: "Ch", exam: "USNCO", name: "US National Chemistry Olympiad", subject: "Chemistry", kind: "building",
    color: "#0b6e66", tint: "#d3eae5", glow: "#4fd6c4",
    line: "General chemistry on the local exam, then organic, lab work and free response at nationals.",
    path: ["Local", "National", "Camp", "IChO"],
    status: "Our guide is being written.",
    stats: [["17", "units"], ["46", "lessons planned"]],
    action: { label: "Help write it", href: DISCORD },
  },
  {
    id: "biology", symbol: "Bi", exam: "USABO", name: "USA Biolympiad", subject: "Biology", kind: "building",
    color: "#3a6b2f", tint: "#dce8d1", glow: "#8fd97a",
    line: "Fifty questions in fifty minutes on the Open Exam, across seven areas of biology.",
    path: ["Open", "Semifinal", "Finals", "IBO"],
    status: "Our guide is being written.",
    stats: [["11", "units"], ["34", "lessons planned"]],
    action: { label: "Help write it", href: DISCORD },
  },
  {
    id: "ai", symbol: "Ai", exam: "USAAIO", name: "USA AI Olympiad", subject: "AI", kind: "tbd",
    color: "#5b3fd1", tint: "#e4defa", glow: "#a996ff",
    line: "Math, Python and machine learning, from a three-hour first round to the selection camp.",
    path: ["Round 1", "Round 2", "Camp", "IOAI"],
    status: "Claimed. Next on our list.",
    action: { label: "Help start it", href: DISCORD },
  },
  {
    id: "economics", symbol: "Ec", exam: "USAEBO", name: "USA Economics and Business Olympiad", subject: "Economics", kind: "tbd",
    color: "#9a5b00", tint: "#f3e6cc", glow: "#ffc061",
    line: "Economics and finance, in two rounds that pick five students for Team USA.",
    path: ["Round 1", "Round 2", "IEO"],
    status: "Claimed. Next on our list.",
    action: { label: "Help start it", href: DISCORD },
  },
  {
    id: "neuro", symbol: "Nu", exam: "Brain Bee", name: "USA Brain Bee", subject: "Neuroscience", kind: "tbd",
    color: "#a3335a", tint: "#f5dbe4", glow: "#ff8fb6",
    line: "Neuroscience, from a local chapter bee to the national championship.",
    path: ["Local bee", "Nationals", "Intl. Brain Bee"],
    status: "Claimed. Next on our list.",
    action: { label: "Help start it", href: DISCORD },
  },
  {
    id: "astronomy", symbol: "As", exam: "USAAAO", name: "USA Astronomy and Astrophysics Olympiad", subject: "Astronomy", kind: "tbd",
    color: "#1f4f8a", tint: "#dce6f3", glow: "#8db8ff",
    line: "Astrophysics built on the mechanics, optics and thermal physics you already know.",
    path: ["First round", "National round", "Training", "IOAA"],
    status: "Claimed. Next on our list.",
    action: { label: "Help start it", href: DISCORD },
  },
];

/* ---------------- the real periodic table, for the ghost cells ---------------- */

const SYMBOLS =
  "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(" ");

/** Grid position (row 1-10, col 1-18) for atomic number z. Rows 9-10 are the f-block. */
export function position(z: number): { row: number; col: number } {
  if (z === 1) return { row: 1, col: 1 };
  if (z === 2) return { row: 1, col: 18 };
  const block = (start: number, row: number) => {
    const i = z - start;
    return i < 2 ? { row, col: i + 1 } : { row, col: i + 11 };
  };
  if (z <= 10) return block(3, 2);
  if (z <= 18) return block(11, 3);
  if (z <= 36) return { row: 4, col: z - 18 };
  if (z <= 54) return { row: 5, col: z - 36 };
  if (z <= 56) return { row: 6, col: z - 54 };
  if (z <= 71) return { row: 9, col: z - 54 };
  if (z <= 86) return { row: 6, col: z - 68 };
  if (z <= 88) return { row: 7, col: z - 86 };
  if (z <= 103) return { row: 10, col: z - 86 };
  return { row: 7, col: z - 100 };
}

export type Cell = { z: number; symbol: string; row: number; col: number; olympiad?: Olympiad };

/** All 118 slots. The first slots of period 2 hold our guides. */
export const TABLE: Cell[] = SYMBOLS.map((symbol, i) => {
  const z = i + 1;
  const pos = position(z);
  const olympiad = z >= 3 && z < 3 + OLYMPIADS.length ? OLYMPIADS[z - 3] : undefined;
  return { z, symbol, ...pos, olympiad };
});

export const symbolOf = (z: number) => SYMBOLS[z - 1];
