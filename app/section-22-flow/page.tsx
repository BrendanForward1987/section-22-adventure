"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- full-page navigation avoids a Vinext RSC transition failure in this runtime */

import { useEffect, useState } from "react";

type FlowStep = {
  number: string;
  stage: string;
  title: string;
  summary: string;
  plainLanguage: string;
  voice: string;
  questions: string[];
  artLabel: string;
  artPosition: string;
  accent: "yellow" | "orange" | "blue" | "green";
};

const flowSteps: FlowStep[] = [
  {
    number: "01",
    stage: "Notice",
    title: "A project idea enters the process",
    summary: "Start by understanding what is proposed, where it may happen, and who may be affected.",
    plainLanguage: "A proposal is information—not a final decision. Early notice gives people a chance to locate the project on the land and identify the first concerns.",
    voice: "Community members can ask for clear maps, timelines, access plans, and a description of the whole project—not only one small work site.",
    questions: ["Where is it?", "What work is included?", "Who uses this place and when?"],
    artLabel: "A project proposal beside a map of Eeyou Istchee",
    artPosition: "0% 0%",
    accent: "yellow",
  },
  {
    number: "02",
    stage: "Path",
    title: "Does it require assessment or review?",
    summary: "The proposal is considered to determine what Section 22 process may apply.",
    plainLanguage: "Different proposals can follow different paths. The key question is whether more environmental and social information and review are required before a decision.",
    voice: "Knowledge about sensitive places, connected activities, and seasonal use can help show why a proposal needs closer attention.",
    questions: ["What process applies?", "Are related activities being considered?", "Who decides the next step?"],
    artLabel: "A community member studying a project map",
    artPosition: "50% 0%",
    accent: "blue",
  },
  {
    number: "03",
    stage: "Questions",
    title: "What must the study explain?",
    summary: "The scope of the review should reflect environmental and social realities—not only engineering needs.",
    plainLanguage: "Questions guide the information that must be gathered. They can cover water, wildlife, harvesting, health, travel, culture, community services, and cumulative effects.",
    voice: "People who know the land can identify missing questions before assumptions harden into a project design.",
    questions: ["What could change?", "How far could effects travel?", "What is already affecting the area?"],
    artLabel: "Field notes, water, wildlife tracks and route maps",
    artPosition: "100% 0%",
    accent: "orange",
  },
  {
    number: "04",
    stage: "Knowledge",
    title: "Build the full picture of the land",
    summary: "Technical studies and Cree knowledge can reveal different, connected parts of the same story.",
    plainLanguage: "A map may not show a portage, a fishing place, changing ice, or the way families use an area through the seasons. Lived knowledge helps reviewers understand what could actually be affected.",
    voice: "Land users, youth, Elders, families, and community organizations can bring forward places, patterns, concerns, and alternatives.",
    questions: ["Whose knowledge is missing?", "How will it be respected?", "What seasons must be understood?"],
    artLabel: "Land users and Elders sharing knowledge around a map",
    artPosition: "0% 100%",
    accent: "green",
  },
  {
    number: "05",
    stage: "Review",
    title: "Ask, listen, test, and respond",
    summary: "Review is where information is examined, gaps are challenged, and community concerns enter the record.",
    plainLanguage: "Reviewers can examine the proposal and studies, hear from communities, and seek more information. Participation can expose missing evidence and make alternatives visible.",
    voice: "At meetings or hearings, people can describe effects in their own terms, ask direct questions, and request clear responses.",
    questions: ["Were concerns answered?", "Are alternatives realistic?", "Is more information needed?"],
    artLabel: "A community hearing with people speaking and listening",
    artPosition: "50% 100%",
    accent: "yellow",
  },
  {
    number: "06",
    stage: "Action",
    title: "Recommendation, decision, and follow-up",
    summary: "The process can shape whether and how work proceeds, including changes, conditions, and monitoring.",
    plainLanguage: "The outcome may involve more study, a changed design, conditions, monitoring, follow-up, or a recommendation about whether the project should proceed.",
    voice: "Community participation still matters after a decision. Commitments are stronger when responsibilities, reporting, and responses are clear.",
    questions: ["What must change?", "Who checks the commitments?", "What happens if impacts are different?"],
    artLabel: "A revised project route with water monitoring and community follow-up",
    artPosition: "100% 100%",
    accent: "orange",
  },
];

export default function Section22FlowPage() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const activeStep = openStep === null ? null : flowSteps[openStep];

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenStep(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <main className="flow-page">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Return to the Section 22 home screen">
          <span className="brand-mark">22</span>
          <span><b>OUR POWER</b><small>Section 22 · Plain language</small></span>
        </a>
        <div className="header-actions">
          <span className="language-note">EN <i>·</i> CREE COMING NEXT</span>
          <a className="about-button flow-home-link" href="/">Explore scenarios</a>
        </div>
      </header>

      <section className="flow-hero">
        <div>
          <p className="tape-label">Interactive plain-language map</p>
          <h1>HOW SECTION 22<br /><span>MOVES A PROJECT</span></h1>
        </div>
        <div className="flow-intro-copy">
          <p>Follow one possible pathway through notice, questions, knowledge, review, and action.</p>
          <div className="flow-ribbon">Select any stage to open it</div>
        </div>
      </section>

      <section className="flow-map" aria-label="Six-stage Section 22 pathway">
        <div className="flow-spine" aria-hidden="true"></div>
        {flowSteps.map((step, index) => (
          <button className={`flow-step flow-step-${step.accent}`} key={step.number} onClick={() => setOpenStep(index)} aria-haspopup="dialog">
            <span className="flow-node">{step.number}</span>
            <span className="flow-step-art" role="img" aria-label={step.artLabel} style={{ backgroundPosition: step.artPosition }}></span>
            <span className="flow-step-copy">
              <span className="flow-stage">{step.stage}</span>
              <strong>{step.title}</strong>
              <span>{step.summary}</span>
              <em>Open this stage →</em>
            </span>
          </button>
        ))}
      </section>

      <section className="flow-takeaway">
        <p>THE BIG IDEA</p>
        <h2>Community knowledge and participation can shape the questions, the review, and what happens next.</h2>
        <a className="primary-button modal-link" href="/">Try a project simulation <span>→</span></a>
      </section>

      <p className="flow-disclaimer">Educational proof of concept. This pathway simplifies a complex legal process and should be reviewed with Section 22 specialists and Cree knowledge holders before public use.</p>

      <footer><p><b>OUR POWER</b> · Our Voice in Action</p><p>Know your rights. Use your power.</p></footer>

      {activeStep && (
        <div className="flow-modal-backdrop" role="presentation" onClick={() => setOpenStep(null)}>
          <section className={`flow-modal flow-modal-${activeStep.accent}`} role="dialog" aria-modal="true" aria-labelledby="flow-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpenStep(null)} aria-label="Close stage">×</button>
            <div className="flow-modal-number">{activeStep.number}</div>
            <p className="eyebrow">{activeStep.stage} · Plain language</p>
            <h2 id="flow-modal-title">{activeStep.title}</h2>
            <div className="flow-modal-grid">
              <div><h3>What this means</h3><p>{activeStep.plainLanguage}</p></div>
              <div className="voice-panel"><h3>Where community voice enters</h3><p>{activeStep.voice}</p></div>
            </div>
            <div className="question-strip">
              <h3>Questions to carry forward</h3>
              <ul>{activeStep.questions.map((question) => <li key={question}>{question}</li>)}</ul>
            </div>
            <div className="flow-modal-controls">
              <button className="secondary-button" onClick={() => setOpenStep(null)}>Back to the pathway</button>
              {openStep !== null && openStep < flowSteps.length - 1 && (
                <button className="primary-button" onClick={() => setOpenStep(openStep + 1)}>Next stage <span>→</span></button>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
