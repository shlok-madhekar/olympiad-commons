export type Kind = "ours-live" | "ours-building" | "community";

export type Olympiad = {
  n: number;
  symbol: string;
  exam: string;
  subject: string;
  kind: Kind;
  guide: string;
  url?: string;
  color?: string;
  tint?: string;
};

/**
 * Every US olympiad and the free guide for it.
 * Community guides are run by their own teams; we only link to them.
 */
export const TABLE: Olympiad[] = [
  { n: 1, symbol: "Ph", exam: "USAPhO", subject: "Physics", kind: "ours-live", guide: "USAPhO Guide", url: "https://usapho.one", color: "#2343c4" },
  { n: 2, symbol: "Ch", exam: "USNCO", subject: "Chemistry", kind: "ours-building", guide: "USNCO Guide", color: "#0b6e66", tint: "#d3eae5" },
  { n: 3, symbol: "Bi", exam: "USABO", subject: "Biology", kind: "ours-building", guide: "USABO Guide", color: "#3a6b2f", tint: "#dce8d1" },
  { n: 4, symbol: "Ma", exam: "USAMO", subject: "Math", kind: "community", guide: "USAMO Guide", url: "https://www.usamoguide.com" },
  { n: 5, symbol: "In", exam: "USACO", subject: "Informatics", kind: "community", guide: "USACO Guide", url: "https://usaco.guide" },
  { n: 6, symbol: "As", exam: "USAAAO", subject: "Astronomy", kind: "community", guide: "USAAAO Guide", url: "https://www.usaaao.guide" },
  { n: 7, symbol: "Es", exam: "USESO", subject: "Earth Science", kind: "community", guide: "USESO Guide", url: "https://www.useso.guide" },
  { n: 8, symbol: "Li", exam: "NACLO", subject: "Linguistics", kind: "community", guide: "NACLO Guide", url: "https://nacloguide.org" },
];

/** USAPhO Guide, as of Nov 8, 2026. */
export const READOUT: [string, string][] = [
  ["82", "lessons"],
  ["2,591", "problems"],
  ["267", "sims"],
  ["54", "countries"],
  ["77", "on Discord"],
];

export const REPO = "https://github.com/shlok-madhekar/olympiad-commons";
export const EDITOR = "https://usapho.one/edit";
