import type { threeW as threeWVi } from "../threeW";

export const threeW: typeof threeWVi = {
  slug: "3w",
  name: "3W — The WOW · WELL · WIN standard of success",
  headline: "WOW in insight • WELL in design • WIN in practice.",
  summary:
    "3W is the framework for assessing the outputs of learning and implementation — not a promise of absolute business results.",
  distinction: [
    { term: "BizCar", meaning: "The management model — a 12-block functional framework for seeing the business as one integrated system." },
    { term: "BMDO", meaning: "The hands-on training programme for designing and running the whole business." },
    { term: "3W", meaning: "The standard of success for learning and implementation." },
  ],
  pillars: [
    {
      key: "WOW",
      title: "Meaningful insight",
      body: "An eye-opening realisation: seeing what had not been seen before in the business.",
      outputs: ["Bottlenecks identified", "Facts, judgements and assumptions told apart", "A clearer picture of the current situation"],
    },
    {
      key: "WELL",
      title: "Better design and execution",
      body: "Practising well and producing management outputs that can be applied.",
      outputs: ["A management design blueprint", "An improvement process or plan", "An action plan with owners and deadlines"],
    },
    {
      key: "WIN",
      title: "Progress in practice",
      body: "Turning designs into action and evidenced improvement — measured and verified.",
      outputs: ["Tracking indicators", "Evidence of improvement", "A report on applied results"],
    },
  ],
};
