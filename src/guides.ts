export type Guide = {
  no: string;
  symbol: string;
  subject: string;
  name: string;
  exam: string;
  international: string;
  url: string;
  status: "live" | "building";
  accent: string;
  blurb: string;
  facts: [string, string][];
};

/** The shelf. Add a guide here and it shows up on the homepage. */
export const GUIDES: Guide[] = [
  {
    no: "01",
    symbol: "Ph",
    subject: "Physics",
    name: "USAPhO Guide",
    exam: "F=ma and USAPhO",
    international: "IPhO",
    url: "https://usapho.one",
    status: "live",
    accent: "#2f5bd3",
    blurb: "Mechanics through modern physics, with sims you can drag and problems that check your answer.",
    facts: [
      ["82", "lessons"],
      ["2,591", "problems"],
      ["267", "sims"],
    ],
  },
  {
    no: "02",
    symbol: "Ch",
    subject: "Chemistry",
    name: "USNCO Guide",
    exam: "USNCO local and national",
    international: "IChO",
    url: "https://usnco.one",
    status: "building",
    accent: "#0f8a80",
    blurb: "General chemistry for the local exam, then organic, inorganic and the lab practical for nationals.",
    facts: [
      ["17", "units"],
      ["46", "lessons planned"],
    ],
  },
  {
    no: "03",
    symbol: "Bi",
    subject: "Biology",
    name: "USABO Guide",
    exam: "USABO Open and Semifinal",
    international: "IBO",
    url: "https://usabo.one",
    status: "building",
    accent: "#3b8a3f",
    blurb: "All seven USABO areas, weighted the way the exam weights them, plus multiple true/false practice.",
    facts: [
      ["11", "units"],
      ["34", "lessons planned"],
    ],
  },
];

export const REPO = "https://github.com/shlok-madhekar/olympiad-commons";
