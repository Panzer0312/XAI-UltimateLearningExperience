import { useState } from "react";

const TOPIC_TITLE = "Concept-based Explanations I";
const TOPIC_DESCRIPTION = "Erklärungen durch hochrangige Konzepte statt Rohdaten";
const LECTURE_NUM = "6";
const PROFESSOR = "Prof. Dr. Jannik Strötgen";
const UNIVERSITY = "Hochschule Karlsruhe";

const P = {
  bg: "var(--color-background-primary)",
  surface: "var(--color-background-secondary)",
  card: "var(--color-background-tertiary)",
  border: "var(--color-border-tertiary)",
  text: "var(--color-text-primary)",
  sec: "var(--color-text-secondary)",
  muted: "var(--color-text-tertiary)",
};

const SUMMARY_SECTIONS = [
  {
    title: "Motivation für Concept-based Explanations",
    color: "#EEEDFE",
    border: "#534AB7",
    text: "#3C3489",
    points: [
      "Traditionelle XAI-Methoden erklären Modellentscheidungen auf Input-Layer-Ebene (z.B. Pixel-basierte Salienz)",
      "Menschen bevorzugen Erklärungen durch hochrangige, intuitive Konzepte statt Rohdaten",
      "DNNs verarbeiten Bilder hierarchisch: erste Schicht erkennt Kanten, mittlere erkennen Teile, höhere erkennen Objekte",
      "Analog zur menschlichen Reasoning: Menschen denken in Konzepten (Objekteigenschaften, Farben, Texturen) statt Pixeln",
      "Concept-based Explanations operieren auf Ebene dieser Zwischenkonzepte, nicht auf Input-Level",
    ],
  },
  {
    title: "Hochrangige Features in DNNs",
    color: "#E1F5EE",
    border: "#0F6E56",
    text: "#085041",
    points: [
      "DNNs lernen eine hierarchische Repräsentation von Eingabedaten",
      "Input-Schicht: rohe Pixel-Werte",
      "Erste Schichten: erkennen einfache Strukturen wie Kanten und Ecken",
      "Mittlere Schichten: erkennen Objektteile und Muster",
      "Höhere Schichten: erkennen ganze Objekte und semantisch bedeutsame Features",
      "Letzte Schicht: macht Klassifizierung basierend auf gelernten Repräsentationen",
    ],
  },
  {
    title: "Concept-based Representations",
    color: "#E6F1FB",
    border: "#185FA5",
    text: "#0C447C",
    points: [
      "Konzepte sind Zwischenrepräsentationen zwischen Input und Output",
      "Beispiele: Farbe, Textur, Objektteile, Form, Bewegungsmuster",
      "Eigenschaften von Konzept-Repräsentationen: komprimiert (weniger Dimensionen als Input), minimaler Informationsverlust, intuitive Bedeutung, direktere Beziehung zum Output als zu Rohdaten",
      "Zwei Ansätze zur Concept-Extraction: (1) Modell-Architektur anpassen für bestimmte Konzepte, (2) Post-hoc Extraktion aus trainierten Modellen",
    ],
  },
  {
    title: "Concept Bottleneck Models",
    color: "#FAECE7",
    border: "#993C1D",
    text: "#712B13",
    points: [
      "Zwingen das Modell, spezifische Konzepte vor der finalen Vorhersage zu repräsentieren",
      "Architektur: Input → CNN → Konzepte (Zwischenschicht) → Vorhersage",
      "Vorteil: ermöglicht Interpretation in Begriffen hochrangiger klinischer Konzepte (z.B. 'Knochenspornte' für Arthritis-Vorhersage)",
      "Ermöglichen Intervention: Modellvorhersagen können korrigiert werden durch Anpassung von Konzeptwerten zur Testzeit",
      "Erreichbare Genauigkeit vergleichbar mit Standard-End-to-End Modellen",
    ],
  },
  {
    title: "Concept Activation Vectors (TCAV)",
    color: "#EAF3DE",
    border: "#3B6D11",
    text: "#27500A",
    points: [
      "Post-hoc Ansatz: identifiziert Konzepte in der Latent Space eines bereits trainierten Modells",
      "Alternativ zu Concept Bottleneck Models",
      "Verwendung von Concept-Samples um Concept Activation Vectors zu finden",
      "Untersucht wie sensitiv eine Vorhersage gegenüber Konzepten ist",
      "Vector Space Perspective: Modell-interner State wird als Vektor-Raum betrachtet (Em) gespannt durch Input-Features und (Eh) durch implizite, menschenverständliche Konzepte",
      "TCAV quantifiziert Sensitivität durch Directional Derivatives (Richtungsableitungen)",
    ],
  },
  {
    title: "Concept-based Explanations für Bildklassifikation",
    color: "#FBEAF0",
    border: "#993556",
    text: "#72243E",
    points: [
      "Bilder sollten mit hochrangigen Konzepten erklärt werden statt Pixel-Level",
      "Beispiel: Vogelidentifikation nutzt Konzepte wie Flügelfarbe, Unterflügelfarbe, Schnabellänge",
      "Pixel-basierte Salienz: zeigt wo wichtige Information lokalisiert ist, aber nicht was diese Information bedeutet",
      "Konzept-basierte Erklärung: zeigt welche höherstufigen Konzepte zur Entscheidung beitragen",
      "Bietet intuitivere, bedeutungsvollere Erklärungen als Gradient-basierte Methoden",
    ],
  },
  {
    title: "Herausforderungen und Ansätze",
    color: "#FAEEDA",
    border: "#854F0B",
    text: "#633806",
    points: [
      "Hauptfrage 1: Welche Konzepte sollten wir betrachten? Requires domain knowledge oder Ziel-Definition",
      "Hauptfrage 2: Wie erhält man Concept-basierte Repräsentation der Input-Daten?",
      "Ansatz 1: Modell anpassen um spezifische Konzepte zu garantieren (Concept Bottleneck)",
      "Ansatz 2: Standard-Modell verwenden, dann post-hoc entdecken wie Konzepte darin repräsentiert sind (TCAV)",
      "Focus auf hochdimensionale Daten: hauptsächlich Bilder, möglicherweise Genomik oder NLP",
    ],
  },
  {
    title: "Shapley Values und SHAP",
    color: "#E0F5F5",
    border: "#0F6E6E",
    text: "#085050",
    points: [
      "Shapley Values: Technik zur Kreditverteilung unter Spielern in kooperativen Spielen",
      "Basieren auf vier Fairness-Axiomen: Effizienz, Symmetrie, Null-Spieler, Linearität",
      "SHAP (Shapley Additive exPlanations): populärer Einsatz von Shapley Values im Machine Learning",
      "SHAP erklärt einzelne Vorhersagen durch Shapley Values",
      "KernelSHAP: Approximation von Shapley Values für beliebige Modelle",
      "TreeSHAP: optimierte Berechnung für Tree-basierte Modelle",
      "SHAP ist typischerweise eine Approximation der echten Shapley Values",
    ],
  },
];

const MNEMONICS = [
  {
    title: "Hierarchische Bildverarbeitung in DNNs",
    mnemonic: "EOTZ\nE = Edges (Kanten), O = Object parts (Objektteile), T = Templates, Z = Zuordnung zur Klasse\nDNNs verarbeiten Bilder in Schichten von einfach zu komplex",
    keywords: ["Hierarchie", "Schichten", "Komplexität"],
  },
  {
    title: "Concept-based Explanations",
    mnemonic: "KKI\nK = Konzepte (statt Kanten), K = Komprimiert (weniger Dimensionen), I = Intuitiv (für Menschen)",
    keywords: ["Intuition", "Konzepte", "Verständlichkeit"],
  },
  {
    title: "Concept Bottleneck Modell",
    mnemonic: "EZV\nE = Erzwingen von Konzepten, Z = Zwischenschicht, V = Vorhersage nach Konzept-Layer",
    keywords: ["Architektur", "Intervention", "Interpretierbar"],
  },
  {
    title: "TCAV - Testing with Concept Activation Vectors",
    mnemonic: "PNS\nP = Post-hoc, N = Nach dem Training, S = Sensitivitäts-Messung",
    keywords: ["Post-hoc", "Vektoren", "Sensitivität"],
  },
  {
    title: "Fairness-Axiome von Shapley Values",
    mnemonic: "SENL\nS = Symmetrie, E = Effizienz, N = Null-Spieler, L = Linearität",
    keywords: ["Shapley", "Fairness", "Axiome"],
  },
  {
    title: "Zwei Ansätze zu Concepts",
    mnemonic: "ABE\nA = Anpassung (Modell-ändern für Concepts), B = Bottleneck, E = Entdecken (Post-hoc in trainierten Modellen)",
    keywords: ["Ansätze", "Design", "Nachträgliche Analyse"],
  },
];

const FLASHCARDS = [
  {
    q: "Was ist das Hauptziel von Concept-based Explanations?",
    a: "Modellentscheidungen durch hochrangige, menschlich intuitive Konzepte zu erklären statt durch Pixel-Ebene oder andere Low-Level Features. Dies macht die Erklärungen verständlicher und bedeutungsvoller für Menschen.",
  },
  {
    q: "Wie unterscheiden sich Concept-based Explanations von anderen XAI-Methoden?",
    a: "Andere XAI-Methoden operieren auf der Input-Layer-Ebene (z.B. Salienz-Maps zeigen wichtige Pixel). Concept-based Explanations operieren auf Zwischenkonzept-Ebene, die semantisch bedeutungsvoller ist und besser mit menschlichem Reasoning korrespondiert.",
  },
  {
    q: "Was ist ein Concept Bottleneck Model?",
    a: "Ein Modell, das das tiefe Netzwerk zwingt, spezifische hochrangige Konzepte als Zwischenschicht zu repräsentieren, bevor die finale Vorhersage gemacht wird. Struktur: Input → CNN → Konzepte → Vorhersage. Ermöglicht Interpretation und Intervention.",
  },
  {
    q: "Welche Vorteile hat ein Concept Bottleneck Model?",
    a: "Ermöglicht Interpretation in hochrangigen klinischen oder bedeutungsvollen Konzepten, ermöglicht menschliche Intervention durch Anpassung von Konzeptwerten zur Testzeit, bietet wettbewerbsfähige Genauigkeit mit Standard End-to-End Modellen.",
  },
  {
    q: "Was ist TCAV (Testing with Concept Activation Vectors)?",
    a: "Ein Post-hoc Ansatz zur Identifikation von Konzepten in der Latent Space eines trainierten Modells. Nach Training werden Concept Samples verwendet um Concept Activation Vectors zu finden und die Sensitivität der Vorhersage gegenüber Konzepten zu untersuchen.",
  },
  {
    q: "Wie unterscheiden sich Concept Bottleneck Models und TCAV?",
    a: "Concept Bottleneck Models: erfordern Architektur-Anpassung während des Trainings um spezifische Konzepte zu erzwingen. TCAV: Post-hoc Ansatz auf bereits trainierten Modellen ohne Änderungen an Architektur oder Training.",
  },
  {
    q: "Wie verarbeitet ein DNN Bilder hierarchisch?",
    a: "Erste Schicht: erkennt einfache Strukturen wie Kanten und Ecken. Mittlere Schichten: erkennen Objektteile und Muster. Höhere Schichten: erkennen ganze Objekte und semantische Features. Letzte Schicht: Klassifizierung basierend auf gelernten Repräsentationen.",
  },
  {
    q: "Was sind die Eigenschaften einer guten Concept-Repräsentation?",
    a: "Komprimiert (weniger Dimensionen als Input), minimaler Informationsverlust, intuitive Bedeutung für Menschen, einfachere und direktere Beziehung zu Output als Rohdaten.",
  },
  {
    q: "Welche zwei Ansätze gibt es um Concept-Representations zu erhalten?",
    a: "1) Modell-Architektur anpassen um spezifische Konzepte zu garantieren (Concept Bottleneck). 2) Standard-Modell verwenden und post-hoc entdecken wie Konzepte darin repräsentiert sind (TCAV).",
  },
  {
    q: "Warum sind Concept-based Explanations besser als Pixel-basierte Erklärungen?",
    a: "Pixel-basierte Erklärungen (wie Salienz-Maps) zeigen nur wo wichtige Information ist, nicht was diese Information bedeutet. Concept-based Explanationen zeigen welche hochrangigen, semantischen Konzepte zur Entscheidung beitragen, was intuitiver und bedeutungsvoller ist.",
  },
  {
    q: "Geben Sie ein Beispiel für Concepts in der Bildklassifikation.",
    a: "Vogelidentifikation nutzt Concepts wie: Flügelfarbe, Unterflügelfarbe, Schnabellänge, Körpergröße. Diese sind intuitiver zu verstehen als einzelne Pixelwerte oder Gradients.",
  },
  {
    q: "Was sind die Hauptherausforderungen bei Concept-based Explanations?",
    a: "Frage 1: Welche Konzepte sollten betrachtet werden? (benötigt Domain Knowledge). Frage 2: Wie erhält man Concept-basierte Repräsentation der Input-Daten? (verschiedene Ansätze möglich).",
  },
  {
    q: "Auf welche Datentypen konzentrieren sich Concept-based Explanations hauptsächlich?",
    a: "Hauptsächlich auf hochdimensionale Daten, besonders Bilder (Computer Vision). Möglicherweise auch auf Genomik oder NLP-Daten anwendbar.",
  },
  {
    q: "Was sind Shapley Values im Kontext von Machine Learning?",
    a: "Eine Technik zur fairen Verteilung von Kreditwert unter Features/Spielern, basierend auf kooperativen Spielen. Basieren auf vier Fairness-Axiomen: Effizienz, Symmetrie, Null-Spieler, Linearität.",
  },
  {
    q: "Was ist SHAP und wie funktioniert es?",
    a: "SHAP (Shapley Additive exPlanations): Populärer Einsatz von Shapley Values in ML um einzelne Vorhersagen zu erklären. Erklärt die Beiträge jedes Features zur Vorhersage. SHAP ist typischerweise eine Approximation echter Shapley Values.",
  },
  {
    q: "Welche zwei Varianten von SHAP gibt es?",
    a: "KernelSHAP: Approximation von Shapley Values für beliebige Modelle. TreeSHAP: optimierte Berechnung speziell für Tree-basierte Modelle (schneller und genauer).",
  },
  {
    q: "Wie ähneln Concept-based Explanations menschlichem Reasoning?",
    a: "Sowohl DNNs als auch Menschen verarbeiten Informationen hierarchisch und bevorzugen Erklärungen basierend auf hochrangigen, intuitiven Konzepten statt niedriger Details. Menschen denken in Konzepten (z.B. Objekteigenschaften), nicht in Pixeln.",
  },
  {
    q: "Was ist die mathematische Grundlage von SHAP?",
    a: "SHAP basiert auf Game Theory (Spieltheorie) und nutzt Shapley Values um den Beitrag jedes Features zur Vorhersage zu quantifizieren. Die Erklärung kann als lineare Kombination von Features mit ihren Shapley-Werten ausgedrückt werden: E_m = Vektor-Raum der Input-Features.",
  },
  {
    q: "Warum ist das Concept Bottleneck Model interpretierbar?",
    a: "Weil es zwingt dass alle Informationen durch eine interpretierbare Konzept-Schicht fließen. Jeder Concept-Wert hat klare semantische Bedeutung. Vorhersagen können direkt in Termen dieser Konzepte erklärt werden.",
  },
  {
    q: "Wie funktioniert TCAV technisch?",
    a: "TCAV findet Concept Activation Vectors durch Concept Samples. Diese Vektoren werden dann verwendet um die Sensitivität einer Klassifizierungsentscheidung gegenüber einem Konzept zu messen. Verwendet Directional Derivatives um Sensitivität zu quantifizieren.",
  },
];

function SummaryView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "1rem" }}>
      {SUMMARY_SECTIONS.map((sec, i) => (
        <div key={i} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderLeft: `3px solid ${sec.border}`, borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem" }}>
          <h3 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 0.75rem", color: "var(--color-text-primary)" }}>{sec.title}</h3>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
            {sec.points.map((p, j) => (
              <li key={j} style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-primary)" }}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MnemonicsView() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "1rem" }}>
      <div style={{ background: "rgba(123, 68, 204, 0.08)", border: "1px solid rgba(123, 68, 204, 0.2)", borderRadius: "var(--border-radius-md)", padding: "0.75rem 1rem", color: "var(--color-text-secondary)", fontSize: 13 }}>
        💡 <strong>Eselsbrücken:</strong> Gedächtnisstützen zur leichteren Merkbarkeit der Inhalte. Klicken zum Aufklappen.
      </div>
      {MNEMONICS.map((m, i) => (
        <div key={i} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden" }}>
          <button onClick={() => setExpanded(expanded === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "1rem 1.25rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
            <div>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)" }}>{m.title}</h4>
              <p style={{ margin: "0.4rem 0 0", fontSize: 13, color: "var(--color-text-secondary)" }}>{m.keywords.join(" • ")}</p>
            </div>
            <span style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>{expanded === i ? "▲" : "▼"}</span>
          </button>
          {expanded === i && (
            <div style={{ borderTop: "1px solid var(--color-border-tertiary)", padding: "0 1.25rem 1rem", background: "var(--color-background-secondary)" }}>
              <pre style={{ color: "var(--color-text-primary)", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "var(--font-sans)", margin: "1rem 0 0" }}>{m.mnemonic}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FlashcardsView() {
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(new Set());
  const card = FLASHCARDS[cardIdx];
  const progress = Math.round((seen.size / FLASHCARDS.length) * 100);
  function next() { setFlipped(false); setSeen((s) => new Set([...s, cardIdx])); setTimeout(() => setCardIdx((i) => (i + 1) % FLASHCARDS.length), 50); }
  function prev() { setFlipped(false); setTimeout(() => setCardIdx((i) => (i - 1 + FLASHCARDS.length) % FLASHCARDS.length), 50); }
  function shuffle() { setFlipped(false); setSeen(new Set()); const r = Math.floor(Math.random() * FLASHCARDS.length); setTimeout(() => setCardIdx(r), 50); }
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Karte {cardIdx + 1} / {FLASHCARDS.length} · {progress}% gesehen</span>
        <button onClick={shuffle} style={{ fontSize: 13, padding: "4px 12px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "transparent", cursor: "pointer", color: "var(--color-text-secondary)" }}>Shuffle</button>
      </div>
      <div style={{ width: "100%", minHeight: 220, background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-lg)", padding: "1.5rem", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onClick={() => setFlipped((f) => !f)}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", margin: "0 0 0.75rem" }}>{flipped ? "Antwort" : "Frage"}</p>
          {!flipped ? <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0, color: "var(--color-text-primary)" }}>{card.q}</p> : <pre style={{ fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>{card.a}</pre>}
        </div>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "1rem 0 0", textAlign: "center" }}>{flipped ? "" : "Klicken zum Umdrehen"}</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={prev} style={{ flex: 1, padding: "8px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "transparent", cursor: "pointer", color: "var(--color-text-primary)", fontSize: 14 }}>Zurück</button>
        <button onClick={next} style={{ flex: 1, padding: "8px", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-md)", background: "transparent", cursor: "pointer", color: "var(--color-text-primary)", fontSize: 14 }}>Weiter</button>
      </div>
      <div style={{ marginTop: 16, background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", height: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#534AB7", borderRadius: "var(--border-radius-md)", transition: "width 0.3s" }} />
      </div>
      <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", textAlign: "right", marginTop: 4 }}>{seen.size} von {FLASHCARDS.length} Karten gesehen</p>
    </div>
  );
}

export default function XAILearningTool() {
  const [tab, setTab] = useState("summary");
  return (
    <div style={{ padding: "0 0 2rem", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>
      <h2 style={{ fontSize: 22, fontWeight: 500, margin: "1.5rem 0 0.5rem" }}>XAI – {TOPIC_TITLE}</h2>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 1.25rem" }}>Lecture {LECTURE_NUM} · {UNIVERSITY} · Summer 2026</p>
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
        {[["summary", "Zusammenfassung"], ["mnemonics", "Eselsbrücken"], ["cards", `Lernkarten (${FLASHCARDS.length})`]].map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "6px 18px", fontSize: 14, borderRadius: "var(--border-radius-md)", border: tab === t ? "1.5px solid var(--color-border-primary)" : "0.5px solid var(--color-border-tertiary)", background: tab === t ? "var(--color-background-secondary)" : "transparent", color: "var(--color-text-primary)", cursor: "pointer", fontWeight: tab === t ? 500 : 400 }}>{label}</button>
        ))}
      </div>
      {tab === "summary" && <SummaryView />}
      {tab === "mnemonics" && <MnemonicsView />}
      {tab === "cards" && <FlashcardsView />}
    </div>
  );
}
