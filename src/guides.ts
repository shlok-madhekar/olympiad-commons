export type Guide = {
  no: string;
  symbol: string;
  subject: string;
  name: string;
  exams: string;
  url: string;
  status: "live" | "building";
  accent: string;
  accentDark: string;
  line: string;
};

/** The shelf. Add a guide here and it shows up on the homepage. */
export const GUIDES: Guide[] = [
  {
    no: "01",
    symbol: "Ph",
    subject: "Physics",
    name: "USAPhO Guide",
    exams: "F=ma and USAPhO",
    url: "https://usapho.one",
    status: "live",
    accent: "#2f56c9",
    accentDark: "#8aa8ff",
    line: "82 lessons, 2,591 problems and 267 interactive sims.",
  },
  {
    no: "02",
    symbol: "Ch",
    subject: "Chemistry",
    name: "USNCO Guide",
    exams: "USNCO local and national",
    url: "https://usnco.one",
    status: "building",
    accent: "#0d7f76",
    accentDark: "#5fd0c3",
    line: "General chemistry through organic and the lab practical.",
  },
  {
    no: "03",
    symbol: "Bi",
    subject: "Biology",
    name: "USABO Guide",
    exams: "USABO Open and Semifinal",
    url: "https://usabo.one",
    status: "building",
    accent: "#3d7d36",
    accentDark: "#8fcf84",
    line: "All seven exam areas, weighted the way the exam weights them.",
  },
];

export const STATS: [string, string][] = [
  ["54", "countries"],
  ["931", "visitors in the first month"],
  ["77", "Discord members"],
  ["18", "outside pull requests"],
];

export const REPO = "https://github.com/shlok-madhekar/olympiad-commons";
export const EDITOR = "https://usapho.one/edit";
