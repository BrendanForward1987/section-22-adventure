"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Impact = "voice" | "knowledge" | "conditions";
type ScenarioId = "river" | "mine" | "corridor";
type Screen = "intro" | "select" | "story";

type Choice = {
  label: string;
  note: string;
  next: string;
  impact: Impact;
};

type Scene = {
  step: number;
  kicker: string;
  title: string;
  body: string;
  callout: string;
  image: string;
  imageAlt: string;
  choices: Choice[];
};

type Scenario = {
  id: ScenarioId;
  number: string;
  tag: string;
  title: string;
  summary: string;
  focus: string;
  image: string;
  imageAlt: string;
  accent: string;
  outcomeTitle: string;
  outcomeBody: string;
  outcomeCallout: string;
  resultImage: string;
  resultImageAlt: string;
  scenes: Record<string, Scene>;
};

const commonHearingImage = "/images/community-hearing.png";
const commonResultImage = "/images/project-path.png";

const scenarios: Record<ScenarioId, Scenario> = {
  river: {
    id: "river",
    number: "01",
    tag: "Road + work camp",
    title: "The River Route",
    summary: "A proposed access road and work camp could affect a river bend used by families, fishers, and travellers.",
    focus: "Water · harvesting · route alternatives",
    image: "/images/hero-landscape.png",
    imageAlt: "A community member overlooking a river and a proposed access road",
    accent: "blue",
    outcomeTitle: "YOU HELPED TURN KNOWLEDGE INTO ACTION.",
    outcomeBody: "Your choices brought lived experience into the review, connected environmental and social effects, and helped shape possible changes and conditions.",
    outcomeCallout: "YOUR VOICE CHANGED THE PATH",
    resultImage: commonResultImage,
    resultImageAlt: "A revised access route curving away from a river and harvesting area",
    scenes: {
      arrival: {
        step: 1,
        kicker: "Stage 1 · A proposal arrives",
        title: "A company wants to build near the river.",
        body: "You hear about a proposed access road and work camp near a place your family uses. What do you do first?",
        callout: "Proposed does not mean decided.",
        image: "/images/hero-landscape.png",
        imageAlt: "A community member looking across a river toward a proposed development area",
        choices: [
          { label: "Ask what is being proposed", note: "Get the facts and learn where the review is at.", next: "questions", impact: "voice" },
          { label: "Share what you know about the area", note: "Bring land-based knowledge into the conversation early.", next: "knowledge", impact: "knowledge" },
          { label: "Assume the decision is already made", note: "See why the process still matters.", next: "myth", impact: "voice" },
        ],
      },
      myth: {
        step: 1,
        kicker: "Pause · Let’s clear something up",
        title: "The project is not set in stone.",
        body: "Section 22 creates an environmental and social assessment process. Questions, community knowledge, and concerns can affect what information is required and what happens next.",
        callout: "Your voice can change the path.",
        image: "/images/hero-landscape.png",
        imageAlt: "A river and forest landscape with a proposed development in the distance",
        choices: [
          { label: "Find out what questions are being asked", note: "Step into the assessment process.", next: "questions", impact: "voice" },
          { label: "Talk with land users", note: "Start with the people who know the place.", next: "knowledge", impact: "knowledge" },
        ],
      },
      questions: {
        step: 2,
        kicker: "Stage 2 · Ask better questions",
        title: "What needs a closer look?",
        body: "An assessment is not only about maps and engineering. It can examine environmental and social effects—including the things that matter to community life.",
        callout: "The right questions reveal the real impact.",
        image: "/images/land-knowledge.png",
        imageAlt: "Land users comparing a map with the river and forest around them",
        choices: [
          { label: "Ask about water, animals, and habitat", note: "How could the land and wildlife be affected?", next: "knowledge", impact: "knowledge" },
          { label: "Ask about harvesting and community life", note: "How could people, culture, and land use be affected?", next: "knowledge", impact: "voice" },
          { label: "Ask for both", note: "Environmental and social effects belong in the same story.", next: "hearing", impact: "knowledge" },
        ],
      },
      knowledge: {
        step: 3,
        kicker: "Stage 3 · Knowledge of the land",
        title: "You know something the map does not.",
        body: "A crossing is used during goose break. A bend in the river matters for fishing. Families travel here. Details like these help reviewers understand what could be affected.",
        callout: "Land-based knowledge is evidence.",
        image: "/images/land-knowledge.png",
        imageAlt: "Cree land users sharing knowledge about a river crossing and fishing area",
        choices: [
          { label: "Bring the concern forward", note: "Make sure the assessment can respond to it.", next: "hearing", impact: "voice" },
          { label: "Suggest a safer route", note: "Community knowledge can help shape alternatives.", next: "conditions", impact: "conditions" },
        ],
      },
      hearing: {
        step: 4,
        kicker: "Stage 4 · Community voice in action",
        title: "It is time to speak—and listen.",
        body: "At a consultation or public hearing, community members can ask questions, describe impacts, and propose ways to avoid or reduce harm.",
        callout: "Participation is part of the process—not an afterthought.",
        image: commonHearingImage,
        imageAlt: "Community members taking part in a consultation about the land",
        choices: [
          { label: "Describe what could be lost", note: "Put the community’s lived experience on the record.", next: "conditions", impact: "voice" },
          { label: "Ask for a clear commitment", note: "Turn a concern into a possible condition.", next: "conditions", impact: "conditions" },
        ],
      },
      conditions: {
        step: 5,
        kicker: "Stage 5 · Shape the recommendation",
        title: "What should happen next?",
        body: "The review can lead to more questions, proposed changes, conditions, monitoring, or a recommendation about whether and how a project should proceed.",
        callout: "The process is a mechanism of Cree power.",
        image: commonResultImage,
        imageAlt: "A project route changing to protect a river and important land use area",
        choices: [
          { label: "Protect the water with conditions", note: "Add commitments that can be followed and checked.", next: "result", impact: "conditions" },
          { label: "Require more information first", note: "A gap in knowledge is a reason to ask more—not rush.", next: "result", impact: "knowledge" },
          { label: "Call for the plan to change", note: "Avoiding harm can mean redesigning the proposal.", next: "result", impact: "voice" },
        ],
      },
    },
  },
  mine: {
    id: "mine",
    number: "02",
    tag: "Mine exploration",
    title: "The Wetland Questions",
    summary: "Exploration work is proposed near a wetland, a small lake, and a seasonal wildlife and travel corridor.",
    focus: "Water flow · wildlife · cumulative effects",
    image: "/images/mine-proposal.png",
    imageAlt: "A preliminary mine exploration area near wetlands and a small lake",
    accent: "orange",
    outcomeTitle: "YOU TURNED A SMALL FOOTPRINT INTO BIGGER QUESTIONS.",
    outcomeBody: "Your choices looked beyond the first drill site. You connected water flow, seasonal travel, wildlife, and possible future expansion—giving the review a fuller picture.",
    outcomeCallout: "BIG QUESTIONS. BETTER DECISIONS.",
    resultImage: "/images/mine-proposal.png",
    resultImageAlt: "A proposed exploration area beside wetlands and a lake",
    scenes: {
      arrival: {
        step: 1,
        kicker: "Stage 1 · Exploration is proposed",
        title: "Survey crews may arrive near the wetland.",
        body: "A company proposes drilling, survey lines, and an access clearing near a lake and wetland used for fishing, travel, and wildlife. What do you do first?",
        callout: "Early work can still raise important questions.",
        image: "/images/mine-proposal.png",
        imageAlt: "A land user overlooking a proposed mine exploration area near wetlands",
        choices: [
          { label: "Ask for the complete exploration plan", note: "Find the drill sites, access routes, timing, and water needs.", next: "questions", impact: "voice" },
          { label: "Share seasonal knowledge immediately", note: "Explain how the wetland and travel routes change through the year.", next: "knowledge", impact: "knowledge" },
          { label: "Assume exploration is too small to matter", note: "Test that assumption before the work begins.", next: "myth", impact: "voice" },
        ],
      },
      myth: {
        step: 1,
        kicker: "Pause · Look beyond the drill pad",
        title: "A small footprint can connect to larger effects.",
        body: "Survey lines, access, water use, noise, and the possibility of later development can raise environmental and social questions. Early participation helps define what the review needs to understand.",
        callout: "Start asking before impacts become assumptions.",
        image: "/images/mine-proposal.png",
        imageAlt: "Survey stakes and an exploration clearing near a lake and wetland",
        choices: [
          { label: "Ask what could happen downstream", note: "Follow water and access beyond the immediate site.", next: "questions", impact: "knowledge" },
          { label: "Talk with people who use the area", note: "Build the land-use picture before the map is finalized.", next: "knowledge", impact: "voice" },
        ],
      },
      questions: {
        step: 2,
        kicker: "Stage 2 · Define the real footprint",
        title: "Where could the effects travel?",
        body: "The drill pad is only one part of the proposal. Water movement, noise, traffic, new access, and future phases may reach beyond the marked site.",
        callout: "The project boundary is not always the impact boundary.",
        image: "/images/mine-proposal.png",
        imageAlt: "A proposed exploration site connected to water and travel routes",
        choices: [
          { label: "Follow the water", note: "Ask about surface flow, groundwater, fish, and downstream users.", next: "knowledge", impact: "knowledge" },
          { label: "Follow the new access", note: "Ask how roads, traffic, and easier access could affect the area.", next: "knowledge", impact: "voice" },
          { label: "Ask about both—and future phases", note: "Look at connected and cumulative effects.", next: "hearing", impact: "knowledge" },
        ],
      },
      knowledge: {
        step: 3,
        kicker: "Stage 3 · Seasonal knowledge",
        title: "The wetland changes through the year.",
        body: "Spring water spreads beyond the summer shoreline. Animals cross at different times. A winter route may disappear on a summer map. These details can change how impacts are understood.",
        callout: "One site visit cannot tell the whole story.",
        image: "/images/land-knowledge.png",
        imageAlt: "Land users comparing seasonal knowledge with a map",
        choices: [
          { label: "Map the seasonal changes", note: "Show when water, wildlife, and travel patterns shift.", next: "hearing", impact: "knowledge" },
          { label: "Propose a different location or season", note: "Use the knowledge to avoid sensitive places and times.", next: "conditions", impact: "conditions" },
        ],
      },
      hearing: {
        step: 4,
        kicker: "Stage 4 · Put the full picture on the table",
        title: "What must the review hear?",
        body: "Community members can connect the proposed work to existing disturbances, future possibilities, and the things people need to continue using the land safely.",
        callout: "Cumulative effects belong in the conversation.",
        image: commonHearingImage,
        imageAlt: "Community members discussing maps and proposed development",
        choices: [
          { label: "Record the community’s concerns", note: "Make the seasonal and cumulative picture visible.", next: "conditions", impact: "voice" },
          { label: "Request stronger baseline information", note: "Ask for evidence that can be checked over time.", next: "conditions", impact: "knowledge" },
        ],
      },
      conditions: {
        step: 5,
        kicker: "Stage 5 · Shape safeguards and next steps",
        title: "What should be required before work moves ahead?",
        body: "Possible responses can include more information, adjusted timing or location, protective buffers, monitoring, restoration commitments, or a different recommendation.",
        callout: "A clear condition needs a clear way to check it.",
        image: "/images/mine-proposal.png",
        imageAlt: "An exploration proposal near water and wetlands",
        choices: [
          { label: "Protect water with buffers and monitoring", note: "Define what will be measured, shared, and acted on.", next: "result", impact: "conditions" },
          { label: "Avoid sensitive seasons and routes", note: "Change the timing and location of work.", next: "result", impact: "knowledge" },
          { label: "Require more study before a recommendation", note: "Do not treat missing information as no impact.", next: "result", impact: "voice" },
        ],
      },
    },
  },
  corridor: {
    id: "corridor",
    number: "03",
    tag: "Transmission corridor",
    title: "The Line on the Map",
    summary: "A proposed transmission corridor crosses near a portage, wetland, and seasonal community travel route.",
    focus: "Access · cultural use · route alignment",
    image: "/images/transmission-corridor.png",
    imageAlt: "Land users viewing a proposed transmission corridor near a travel route",
    accent: "green",
    outcomeTitle: "YOU HELPED MOVE THE LINE—BEFORE IT MOVED THE LAND.",
    outcomeBody: "Your choices showed that the shortest route on a planning map may not be the safest route for the land. Community knowledge helped identify alternatives and commitments.",
    outcomeCallout: "BETTER ROUTES START WITH LISTENING",
    resultImage: "/images/transmission-corridor.png",
    resultImageAlt: "A proposed transmission route through forest near a portage and wetland",
    scenes: {
      arrival: {
        step: 1,
        kicker: "Stage 1 · A line appears on the map",
        title: "A corridor is proposed near a portage.",
        body: "A new transmission corridor may cross forest near a wetland, a portage, and a route families use in different seasons. What do you do first?",
        callout: "A straight line on paper crosses a lived landscape.",
        image: "/images/transmission-corridor.png",
        imageAlt: "A family viewing a proposed transmission corridor through the forest",
        choices: [
          { label: "Ask to see the proposed alignment", note: "Understand the width, access needs, structures, and timing.", next: "questions", impact: "voice" },
          { label: "Map the routes people already use", note: "Start with portages, camps, crossings, and seasonal travel.", next: "knowledge", impact: "knowledge" },
          { label: "Assume a narrow corridor has narrow effects", note: "See why the line may reach beyond its width.", next: "myth", impact: "voice" },
        ],
      },
      myth: {
        step: 1,
        kicker: "Pause · Look beside the line",
        title: "A narrow corridor can have wider effects.",
        body: "Clearing, access roads, noise, crossings, maintenance, and changes in how people or wildlife move can extend beyond the corridor itself.",
        callout: "Width is only one part of the footprint.",
        image: "/images/transmission-corridor.png",
        imageAlt: "A proposed corridor crossing forest and travel routes",
        choices: [
          { label: "Ask how access will change", note: "Follow the corridor through construction and long-term maintenance.", next: "questions", impact: "voice" },
          { label: "Ask who travels across it", note: "Bring human and wildlife movement into the review.", next: "knowledge", impact: "knowledge" },
        ],
      },
      questions: {
        step: 2,
        kicker: "Stage 2 · Test the alignment",
        title: "Where could the line interrupt movement?",
        body: "The review can examine crossings, wetlands, portages, camps, wildlife movement, new access, and how construction timing affects use of the land.",
        callout: "A route should be tested against more than distance and cost.",
        image: "/images/transmission-corridor.png",
        imageAlt: "A proposed transmission route passing near wetlands and a portage",
        choices: [
          { label: "Ask about portages and camps", note: "Protect access to places people continue to use.", next: "knowledge", impact: "voice" },
          { label: "Ask about wetlands and wildlife crossings", note: "Identify sensitive movement and habitat areas.", next: "knowledge", impact: "knowledge" },
          { label: "Compare alternate alignments", note: "Put more than one route into the conversation.", next: "hearing", impact: "conditions" },
        ],
      },
      knowledge: {
        step: 3,
        kicker: "Stage 3 · The lived map",
        title: "The shortest route crosses the routes people know.",
        body: "A portage connects water systems. A winter trail avoids unsafe ice. A small clearing may be a family camp. Community knowledge reveals connections a base map can miss.",
        callout: "A blank space on a map may not be empty.",
        image: "/images/land-knowledge.png",
        imageAlt: "Land users identifying travel routes and important places on a map",
        choices: [
          { label: "Draw the lived routes onto the map", note: "Make the connections visible to the review.", next: "hearing", impact: "knowledge" },
          { label: "Sketch a lower-impact alignment", note: "Use community knowledge to compare alternatives.", next: "conditions", impact: "conditions" },
        ],
      },
      hearing: {
        step: 4,
        kicker: "Stage 4 · Compare the choices",
        title: "A better alignment can begin with a conversation.",
        body: "Community participation can test route options, identify places to avoid, and ask how access, construction, and monitoring will be managed.",
        callout: "Alternatives make participation concrete.",
        image: commonHearingImage,
        imageAlt: "Community members comparing route drawings during a consultation",
        choices: [
          { label: "Show where the route creates conflict", note: "Connect the alignment to real travel and land use.", next: "conditions", impact: "voice" },
          { label: "Ask the proponent to compare alternatives", note: "Require reasons, trade-offs, and community feedback.", next: "conditions", impact: "knowledge" },
        ],
      },
      conditions: {
        step: 5,
        kicker: "Stage 5 · Make commitments follow the line",
        title: "What should change—or be guaranteed?",
        body: "Possible responses include a revised alignment, protected crossings, limits on new access, seasonal work windows, restoration, monitoring, and community follow-up.",
        callout: "A promise is stronger when it can be tracked.",
        image: "/images/transmission-corridor.png",
        imageAlt: "A transmission corridor proposal through forest and wetlands",
        choices: [
          { label: "Move the alignment away from key places", note: "Avoid the impact before trying to reduce it.", next: "result", impact: "conditions" },
          { label: "Protect crossings and seasonal access", note: "Keep routes usable and construction timing responsive.", next: "result", impact: "knowledge" },
          { label: "Require community monitoring and follow-up", note: "Keep local knowledge active after a decision.", next: "result", impact: "voice" },
        ],
      },
    },
  },
};

const impactLabels: Record<Impact, string> = {
  voice: "You used your voice",
  knowledge: "You brought knowledge forward",
  conditions: "You shaped a response",
};

export default function Home() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [scenarioId, setScenarioId] = useState<ScenarioId>("river");
  const [sceneId, setSceneId] = useState("arrival");
  const [path, setPath] = useState<Choice[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [showAbout, setShowAbout] = useState(false);

  const scenario = scenarios[scenarioId];
  const isResult = sceneId === "result";
  const scene = !isResult ? scenario.scenes[sceneId] : null;
  const currentStep = isResult ? 5 : scene?.step ?? 1;
  const progress = currentStep * 20;
  const strengths = useMemo(() => Array.from(new Set(path.map((item) => item.impact))), [path]);

  function beginScenario(id: ScenarioId) {
    setScenarioId(id);
    setSceneId("arrival");
    setPath([]);
    setHistory([]);
    setScreen("story");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function choose(choice: Choice) {
    setHistory((current) => [...current, sceneId]);
    setPath((current) => [...current, choice]);
    setSceneId(choice.next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setPath([]);
    setHistory([]);
    setSceneId("arrival");
    setScreen("intro");
    setShowAbout(false);
  }

  function goBack() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setSceneId(previous);
    setHistory((current) => current.slice(0, -1));
    setPath((current) => current.slice(0, -1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={goHome} aria-label="Return to the Section 22 home screen">
          <span className="brand-mark">22</span>
          <span className="brand-copy"><b>OUR POWER</b><small>Your voice matters. Projects can change because of you.</small></span>
        </button>
        <div className="header-actions">
          <span className="language-toggle" role="group" aria-label="Language availability">
            <span className="language-choice is-active"><b>EN</b><small>English</small></span>
            <span className="language-choice is-coming"><b>CREE</b><small>Coming next</small></span>
          </span>
          <button className="about-button" onClick={() => setShowAbout(true)}>What is Section 22?</button>
        </div>
      </header>

      {showAbout && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowAbout(false)}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="about-title" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAbout(false)} aria-label="Close">×</button>
            <p className="eyebrow">Plain-language overview</p>
            <h2 id="about-title">Section 22 helps put Cree voices into environmental decisions.</h2>
            <p>Section 22 of the James Bay and Northern Québec Agreement establishes an environmental and social protection regime for the territory. It includes assessment and review processes for development projects and provides for Cree participation.</p>
            <div className="modal-actions">
              <a className="primary-button modal-link" href="/section-22-flow">Explore the Section 22 pathway <span>→</span></a>
            </div>
            <p className="fine-print">These simulations are educational introductions. They are not legal interpretations, predictions, or replacements for the JBNQA and official guidance.</p>
          </section>
        </div>
      )}

      {screen === "intro" && (
        <section className="hero paper-stage">
          <div className="hero-copy">
            <p className="tape-label">Three choose-your-own-path simulations</p>
            <h1>HOW <span>YOUR VOICE</span><br />CAN SHAPE<br />WHAT HAPPENS</h1>
            <p className="lead">Choose a proposed project. Ask questions, bring forward knowledge of the land, and see how community participation can change the path.</p>
            <div className="power-ribbons" aria-label="Know your rights. Use your power.">
              <span className="power-ribbon rights-ribbon">Know your rights</span>
              <span className="power-ribbon action-ribbon">Use your power</span>
            </div>
            <button className="primary-button" onClick={() => setScreen("select")}>Choose a scenario <span>→</span></button>
            <p className="time-note">About 3–5 minutes each · No legal jargon</p>
          </div>
          <div className="hero-art">
            <Image src="/images/hero-landscape.png" alt="A hand-drawn Eeyou Istchee river landscape with a community member and a proposed project in the distance" width={1448} height={1086} priority unoptimized sizes="(max-width: 900px) 100vw, 48vw" />
            <div className="hero-image-wash" aria-hidden="true"></div>
            <div className="proposal-note">PROPOSED<br />PROJECT <b>≠</b><br />FINAL DECISION</div>
            <div className="arrow-note">your voice enters here ↗</div>
          </div>
        </section>
      )}

      {screen === "select" && (
        <section className="scenario-shell">
          <div className="scenario-intro">
            <div>
              <p className="eyebrow">Choose your simulation</p>
              <h1>ONE PROCESS.<br /><span>DIFFERENT QUESTIONS.</span></h1>
            </div>
            <p>Each fictional scenario explores a different set of environmental and social questions. There is no single “correct” path—the goal is to see where knowledge and participation enter the process.</p>
          </div>
          <div className="scenario-grid">
            {(Object.values(scenarios) as Scenario[]).map((item) => (
              <button className={`scenario-card accent-${item.accent}`} key={item.id} onClick={() => beginScenario(item.id)}>
                <div className="scenario-image">
                  <Image src={item.image} alt={item.imageAlt} width={1448} height={1086} unoptimized sizes="(max-width: 760px) 100vw, 33vw" />
                  <span>{item.number}</span>
                </div>
                <div className="scenario-content">
                  <p>{item.tag}</p>
                  <h2>{item.title}</h2>
                  <span className="scenario-summary">{item.summary}</span>
                  <small>{item.focus}</small>
                  <b>Start this simulation →</b>
                </div>
              </button>
            ))}
          </div>
          <button className="back-link selector-back" onClick={() => setScreen("intro")}>← Back to introduction</button>
        </section>
      )}

      {screen === "story" && !isResult && scene && (
        <section className="story-shell">
          <div className="simulation-context">
            <button onClick={() => setScreen("select")}>← All scenarios</button>
            <span><b>{scenario.number}</b> {scenario.title}</span>
          </div>
          <div className="progress-wrap" aria-label={`Simulation progress ${progress}%`}>
            <div className="progress-meta"><span>Your path through Section 22</span><b>{currentStep} / 5</b></div>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            <div className="progress-steps" aria-hidden="true"><span className="done">NOTICE</span><span className={currentStep >= 2 ? "done" : ""}>QUESTIONS</span><span className={currentStep >= 3 ? "done" : ""}>KNOWLEDGE</span><span className={currentStep >= 4 ? "done" : ""}>VOICE</span><span className={currentStep >= 5 ? "done" : ""}>ACTION</span></div>
          </div>
          <div className="story-grid">
            <article className="story-card">
              <div className="scene-image-wrap">
                <Image src={scene.image} alt={scene.imageAlt} width={1448} height={1086} unoptimized sizes="(max-width: 900px) 100vw, 50vw" />
                <span className="scene-number">{String(currentStep).padStart(2, "0")}</span>
              </div>
              <div className="story-copy">
                <p className="eyebrow">{scene.kicker}</p>
                <h2>{scene.title}</h2>
                <p className="story-body">{scene.body}</p>
                <aside className="marker-callout">{scene.callout}</aside>
              </div>
            </article>
            <section className="choices-panel" aria-labelledby="choice-heading">
              <p className="choice-step">YOUR MOVE</p>
              <h3 id="choice-heading">What do you choose?</h3>
              <div className="choice-list">
                {scene.choices.map((choice, index) => (
                  <button key={choice.label} className="choice-card" onClick={() => choose(choice)}>
                    <span className="choice-number">{String(index + 1).padStart(2, "0")}</span>
                    <span><b>{choice.label}</b><small>{choice.note}</small></span>
                    <i>→</i>
                  </button>
                ))}
              </div>
              <div className="story-controls">
                {path.length > 0 && <button className="back-link" onClick={goBack}>← Previous step</button>}
                <button className="restart-link" onClick={() => beginScenario(scenarioId)}>↺ Restart scenario</button>
              </div>
            </section>
          </div>
        </section>
      )}

      {screen === "story" && isResult && (
        <section className="result-shell paper-stage">
          <div className="result-visual">
            <Image src={scenario.resultImage} alt={scenario.resultImageAlt} width={1448} height={1086} unoptimized sizes="(max-width: 900px) 100vw, 42vw" />
            <div className="result-burst">{scenario.outcomeCallout}</div>
          </div>
          <div className="result-copy">
            <p className="tape-label">{scenario.title} · Outcome</p>
            <h1>{scenario.outcomeTitle}</h1>
            <p>{scenario.outcomeBody}</p>
            <div className="strength-list">
              {strengths.map((strength) => <span key={strength}>✓ {impactLabels[strength]}</span>)}
            </div>
            <div className="result-actions">
              <button className="primary-button" onClick={() => beginScenario(scenarioId)}>Try another path <span>↺</span></button>
              <button className="secondary-button" onClick={() => setScreen("select")}>Choose another scenario</button>
            </div>
            <p className="fine-print">Fictional proof-of-concept scenario. A public version should be reviewed by Section 22 specialists and developed in Cree and English.</p>
          </div>
        </section>
      )}

      <footer>
        <p><b>OUR POWER</b> · Our Voice in Action</p>
        <p>Know your rights. Use your power.</p>
      </footer>
    </main>
  );
}
