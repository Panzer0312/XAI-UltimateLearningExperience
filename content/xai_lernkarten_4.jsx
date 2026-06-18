import { useState } from "react";

const TOPIC_TITLE = "Feature Importance Explanations II";
const TOPIC_DESCRIPTION = "Erklärungsmethoden auf Basis von Merkmalsentfernung und Perturbation für Black-Box-Modelle";
const LECTURE_NUM = "5";
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
    title: "Merkmalsbasierte Erklärungen - Grundrahmen",
    color: "#EEEDFE",
    border: "#534AB7",
    text: "#3C3489",
    points: [
      "Merkmalsbasierte Erklärungen folgen einem dreiteiligen Rahmen: (1) Merkmalsentfernung - wie entfernt die Methode Merkmale (z.B. Standardwerte, zufällige Werte), (2) Modellverhalten - welches Verhalten wird erklärt (einzelne Vorhersage, Datensatzvertust), (3) Zusammenfassungstechnik - wie wird der Einfluss jedes Merkmals aggregiert (Merkmalsauswahl, Merkmalszuordnung)",
      "Ablationsstudien: Iteratives Entfernen von Merkmalen und Messen der Auswirkung auf die Modellausgabe",
      "Permutationstests: Merkmale werden durch zufällige Permutation ihrer Werte korrumpiert; misst Veränderung bei ungeordneter Eingabe",
      "Okklusión: Datenbereiche (z.B. Bildregionen wie Superpixel) werden mit nichtsagendem Inhalt (z.B. Pixel) überlagert",
    ],
  },
  {
    title: "PredDiff - Visualisierung von Vorhersagedifferenzen",
    color: "#E1F5EE",
    border: "#0F6E56",
    text: "#085041",
    points: [
      "Ziel: Hervorhebung von Bildbereichen, die Belege für oder gegen eine bestimmte Klasse liefern, mittels Salienzmap",
      "Merkmalsentfernung: Nutzung eines bedingten In-Painting-Modells; benachbarte Pixel werden zur Auffüllung herangezogen",
      "Schiebefenster über Eingabebild x mit Fenster der Größe k × k, aus denen Pixel aus kleineren Fenster l × l abgesampled werden",
      "Farben in der Salienzmap: Rot zeigt Belege FÜR, Blau zeigt Belege GEGEN die Zielklasse",
      "Anwendung: Bildklassifikation mit Fokus auf visuell interpretierbare Regionen",
    ],
  },
  {
    title: "Meaningful Perturbations - Semantische Störungen",
    color: "#E6F1FB",
    border: "#185FA5",
    text: "#0C447C",
    points: [
      "Ziel: Allgemeiner Rahmen für verschiedene Erklärungstypen spezialisiert auf Identifikation von Bildbereichen, die für Klassifikationsentscheidung verantwortlich sind",
      "Modellunabhängig und auf interpretierbaren Bildstörungen basiert - definiert als Lernproblem mit dem Ziel, Löschmasken zu finden, die maximal informativ sind",
      "Entfernung durch Verschwommenheit: Ein Löschspiel mit dem Ziel, die kleinste Löschmask zu finden, die die Punktzahl der korrekten Klasse signifikant senkt",
      "Die gelernte Mask zeigt räumlich, welche Bildbereiche für die Entscheidung am wichtigsten sind",
      "Mehrere Perturbationsmethoden: Gradient, Guided Backprop, Contrast Excitation, Grad-CAM, Occlusion für Vergleich",
    ],
  },
  {
    title: "RISE - Randomisiertes Input-Sampling",
    color: "#FAECE7",
    border: "#993C1D",
    text: "#712B13",
    points: [
      "Ziel: Generierung einer Wichtigkeitskarte ohne Zugriff auf interne Modellstrukturen; zeigt, wie saliënt jedes Pixel für Vorhersage ist",
      "Merkmalsentfernung: Empirische Wichtigkeitsschätzung durch Abfrage des Modells mit zufällig maskierten Eingabebildversionen",
      "Algorithmus: Sampling vieler Teilmengen fehlender Merkmale mit kleineren binären Masken (erste Stufe), dann Upsampling mit Wichtungsausgleich",
      "Berechnung des Durchschnitts der Vorhersage wenn x_i enthalten ist: a_i = E[F_y(x_S) | i ∈ S] - Vorhersage unter Bedingung von x_S",
      "Zusammenfassungsmethode: Saliënzmerkartierung über lineare Kombination der zufälligen binären Masken, gewichtet durch Ausgabewahrscheinlichkeiten des Basismodells",
    ],
  },
  {
    title: "RISE - Deletion und Insertion Metriken",
    color: "#EAF3DE",
    border: "#3B6D11",
    text: "#27500A",
    points: [
      "Vier Visualisierungsebenen: (1) Eingabebild, (2) Wichtigkeitskarte, (3) Deletionkurve, (4) Insertionkurve",
      "Deletionsmetrik: Entfernen der erkannten Ursache zwingt das Basismodell, seine Entscheidung zu ändern - misst Auswirkung wichtiger Pixel",
      "Insertionsmetrik: Misst den Anstieg der Wahrscheinlichkeit, wenn mehr und mehr Pixel eingeführt werden - zeigt, wie Vorhersage bei gradueller Information aufgebaut wird",
      "AUC-Werte für beide Kurven: Höhere Deletion-AUC und höhere Insertion-AUC deuten auf bessere Erklärungsqualität hin",
      "Visuelle Interpretation: Importanzmap zeigt räumliche Verteilung der entscheidungsrelevanten Bildregionen für spezifische Klasse",
    ],
  },
  {
    title: "RISE für Bildunterschrift-Generierung",
    color: "#FBEAF0",
    border: "#993556",
    text: "#72243E",
    points: [
      "Anwendung: RISE zum Erklären von automatisch generierten Bildunterschriften für beliebige Netzwerke ohne Internalszugriff",
      "Basis-Untertitelungssystem modelliert Wahrscheinlichkeit des nächsten Wortes w_k gegeben teilsatz s = (w_1, ..., w_{k-1}) und Bild",
      "RISE gibt für jedes Wort eine Saliënzmerkartierung zurück, die räumlich zeigt, welche Bildregionen für Wortgenerierung relevant sind",
      "Beispiel: Für Wort 'Pferd' zeigt Heatmap relevante Regionen, für 'Wagen' andere Regionen - jede mit unterschiedlicher räumlicher Aufmerksamkeitsverteilung",
      "Ermöglicht Verständnis, welche visuellen Features die Sprachgenerierung in sequentiellen Captioning-Modellen beeinflussen",
    ],
  },
  {
    title: "Surrogat-Modelle und lokale Interpretabilität",
    color: "#FAEEDA",
    border: "#854F0B",
    text: "#633806",
    points: [
      "Surrogatmodelle: Interpretierbare Modelle zur Erklärung einzelner Vorhersagen von Black-Box-Maschinen-Lernmodellen",
      "Zweck: Approximation der Vorhersagen des zugrundeliegenden Black-Box-Modells in lokaler Nachbarschaft einer Instanz",
      "Lokale Surrogatmodelle: Spezialisiert auf Erklärung einzelner Vorhersagen durch lokale Interpretabilität",
      "Vorteil: Ermöglicht Verständnis der Modellentscheidung ohne vollständigen Zugriff auf Modellarchitektur oder Training",
      "Anwendungsbereich: Entscheidungsumgebungen, wo Erklärbarkeit einzelner Vorhersagen kritisch ist",
    ],
  },
  {
    title: "Vergleich der Feature-Importance-Methoden",
    color: "#E0F5F5",
    border: "#0F6E6E",
    text: "#085050",
    points: [
      "PredDiff: In-Painting-basierte Entfernung mit bedingtem Modell, mittlere Komplexität, interpretierbar für Bildregionen",
      "Meaningful Perturbations: Lernbasierte Maskenoptimierung, hohe Aussagekraft für kritische Regionen, moderate Rechenkosten",
      "RISE: Modellunabhängig, empirische Schätzung durch Sampling, geringer Internalsanforderungen, skalierbar auf beliebige Netzwerke",
      "Tradeoffs: Recheneffizienz vs. Interpretierbarkeit; Modellzugriff vs. Black-Box-Applicability; Stabilität vs. Sensitivität",
      "Auswahl abhängig von: Problemkontext (Bilder/Text), verfügbarem Modellzugriff, Rechenressourcen, erforderlicher Erklärungsgenauigkeit",
    ],
  },
];

const MNEMONICS = [
  {
    title: "Merkmalsbasierte Erklärungen - REM",
    mnemonic: "REM steht für die drei Säulen:\nR = Removal (Merkmalsentfernung - wie?)\nE = Explained Behavior (Erklärtes Verhalten - was?)\nM = Model Aggregation (Modell-Zusammenfassung - wie aggregiert?)",
    keywords: ["Rahmen", "Struktur", "drei Komponenten"],
  },
  {
    title: "PredDiff Prozess - SWF",
    mnemonic: "SWF für die Schritte:\nS = Sliding Window (Schiebefenster über Bild)\nW = Window sampled (Fenster mit Sampling aus kleineren Bereichen)\nF = Feedback colors (Rot/Blau zeigt Belege für/gegen Klasse)",
    keywords: ["Visualisierung", "Bildregionen", "Saliënz"],
  },
  {
    title: "RISE Methode - RIS",
    mnemonic: "RISE = Randomized Input Sampling for Explanations\nR = Random masks (zufällige binäre Masken)\nI = Input sampling (Eingabeabtastung mit Masken)\nS = Saliency map (Saliënzkarte als Ergebnis)",
    keywords: ["Modellunabhängig", "Sampling", "empirisch"],
  },
  {
    title: "Deletion vs Insertion - DIE",
    mnemonic: "DIE zeigt Metriken:\nD = Deletion (AUC: wie stark sinkt Vorhersage bei Entfernung?)\nI = Insertion (AUC: wie sehr steigt Vorhersage bei Hinzufügung?)\nE = Evaluation (beide Kurven zeigen Erklärungsqualität)",
    keywords: ["Metriken", "Evaluierung", "AUC"],
  },
  {
    title: "Meaningful Perturbations - BLO",
    mnemonic: "BLO für Kernkonzepte:\nB = Based on perturbations (basiert auf Bildstörungen)\nL = Learning problem (Lernproblem zur Maskoptimierung)\nO = Obtain deletion regions (findet maximale Löschregionen)",
    keywords: ["Optimierung", "Mask", "Semantic"],
  },
  {
    title: "Surrogatmodelle - LIA",
    mnemonic: "LIA für Surrogate-Modelle:\nL = Local (fokus auf lokale Nachbarschaft)\nI = Interpretable (interpretierbare Ersatzmodelle)\nA = Approximate (approximieren Black-Box-Vorhersagen)",
    keywords: ["lokal", "interpretierbar", "Erklärung"],
  },
];

const FLASHCARDS = [
  {
    q: "Was sind die drei Hauptkomponenten des merkmalsbasierten Erklärungsrahmens?",
    a: "1. Merkmalsent fernung: Wie Merkmale entfernt werden (z.B. Standardwerte, zufällige Werte)\n2. Modellverhalten: Was erklärt wird (z.B. einzelne Vorhersage, Datensatzverlust)\n3. Zusammenfassungstechnik: Wie Merkmaleinfluss aggregiert wird (Merkmalsauswahl, Merkmalszuordnung)",
  },
  {
    q: "Erklären Sie PredDiff anhand eines konkreten Beispiels.",
    a: "PredDiff zeigt mittels Saliënzmaps, welche Bildbereiche Belege FÜR (rot) oder GEGEN (blau) eine Klasse liefern. Beispiel: Ein Bild eines Kakadus wird klassifiziert. Rot zeigt die Federnregionen (Beweis für Vogel), Blau zeigt Hintergrund (Beweis gegen). Nutzt In-Painting zur Merkmalsent fernung.",
  },
  {
    q: "Was ist das Ziel von Meaningful Perturbations?",
    a: "Das Ziel ist, Bildbereiche zu identifizieren, die für die Klassifikationsentscheidung am meisten verantwortlich sind. Dies geschieht durch ein Lernproblem, das die kleinste Löschmask findet, die die Vorhersagewahrscheinlichkeit für die korrekte Klasse signifikant reduziert.",
  },
  {
    q: "Wie unterscheidet sich RISE von PredDiff technisch?",
    a: "RISE ist modellunabhängig und benötigt keinen Zugriff auf interne Modellstrukturen. PredDiff nutzt ein bedingtes In-Painting-Modell zur Merkmalsent fernung. RISE sampelt zufällige Masken und fragt das Modell ab, während PredDiff gezielt Fenster manipuliert.",
  },
  {
    q: "Was sind die vier Visualisierungskomponenten bei RISE-Analysen?",
    a: "1. Eingabebild: das Original\n2. Wichtigkeitskarte: farbcodiert, zeigt Saliënz\n3. Deletionkurve: AUC misst Auswirkung wichtiger Pixel wenn entfernt\n4. Insertionkurve: AUC misst Auswirkung wenn wichtige Pixel hinzugefügt werden",
  },
  {
    q: "Definieren Sie Okklusión als Merkmalsent fernungsmethode.",
    a: "Okklusión überlagert Datenbereiche (z.B. Bildregionen, Superpixel) mit nichtsagendem Inhalt (z.B. Pixel oder Grau). Misst die Auswirkung auf Modellvorhersage wenn diese Bereiche maskiert werden. Effektiv für Bildanalyse.",
  },
  {
    q: "Was ist ein Surrogatmodell und wann wird es verwendet?",
    a: "Ein Surrogatmodell ist ein interpretierbares Modell (z.B. Entscheidungsbaum, lineare Regression), das die Vorhersagen eines Black-Box-Modells approximiert. Wird verwendet, um einzelne Vorhersagen zu erklären, wenn der Zugriff auf das Original-Modell begrenzt ist.",
  },
  {
    q: "Erklären Sie, wie RISE bei Bildunterschrift-Generierung funktioniert.",
    a: "RISE wird auf ein Captioning-Modell angewendet, das Wort für Wort generiert. Für jedes generierte Wort berechnet RISE eine Saliënzmerkarte, die zeigt, welche Bildregionen für dieses Wort relevant waren. So wird visuell deutlich, welche Features welche Wortwahl beeinflussen.",
  },
  {
    q: "Was bedeutet die Farbe Rot in PredDiff Saliënzmaps?",
    a: "Rot in PredDiff zeigt Belege FÜR die vorhergesagte Klasse - Bildbereiche, die die Klassifikationsentscheidung unterstützen. Je intensiver das Rot, desto stärker der positive Einfluss auf die Vorhersage.",
  },
  {
    q: "Was ist ein Permutationstest im Kontext von Feature Importance?",
    a: "Ein Permutationstest korrumpiert Merkmale, indem ihre Werte zufällig permutiert werden. Das Modell wird mit permutierter Eingabe abgefragt. Der Unterschied in der Vorhersage zeigt die Wichtigkeit dieses Merkmals.",
  },
  {
    q: "Wie berechnet RISE die Wichtigkeit a_i für Merkmal i?",
    a: "RISE nutzt die Formel: a_i = E[F_y(x_S) | i ∈ S], das ist der Erwartungswert der Vorhersage F_y nur unter Bedingung von Features x_S, wenn Merkmal i enthalten ist. Dies wird empirisch durch viele zufällige Samples geschätzt.",
  },
  {
    q: "Was ist der Unterschied zwischen Deletion-AUC und Insertion-AUC?",
    a: "Deletion-AUC misst, wie schnell die Vorhersagewahrscheinlichkeit sinkt, wenn wichtige Pixel entfernt werden. Insertion-AUC misst, wie schnell sie ansteigt, wenn wichtige Pixel schrittweise hinzugefügt werden. Beide messen Erklärungsqualität.",
  },
  {
    q: "Warum ist Modellunabhängigkeit ein Vorteil bei RISE?",
    a: "RISE erfordert keinen Zugriff auf interne Modellstrukturen, Gradienten oder Gewichte. Es behandelt das Modell als Black Box und arbeitet nur mit Ein-/Ausgaben. Dies macht es universell auf beliebige Modelle anwendbar.",
  },
  {
    q: "Wie nutzt Meaningful Perturbations Blurring zur Merkmalsent fernung?",
    a: "Meaningful Perturbations spielt ein Löschspiel mit Verschwommenheit: Das System findet die kleinste Löschmask, deren Anwendung (durch Blurring der maskierten Region) die Vorhersagewahrscheinlichkeit für die korrekte Klasse signifikant senkt.",
  },
  {
    q: "Welche Perturbationsmethoden werden in Meaningful Perturbations verglichen?",
    a: "Gradient, Guided Backprop, Contrast Excitation, Grad-CAM und Occlusion werden verglichen, um verschiedene Erklärungstypen zu generieren. Jede Methode erzeugt unterschiedliche Saliënzmaps, die verschiedene Aspekte der Entscheidung hervorheben.",
  },
  {
    q: "Was ist der Hauptvorteil lokaler Surrogatmodelle gegenüber globalen Modellen?",
    a: "Lokale Surrogatmodelle konzentrieren sich auf die Nachbarschaft einer spezifischen Instanz und können daher viel einfacher und interpretierbarer sein. Globale Modelle müssen das gesamte Black-Box-Verhalten approximieren und sind daher komplexer.",
  },
  {
    q: "Wie wird die Fenstergrößen in PredDiff definiert?",
    a: "PredDiff nutzt ein Schiebefenster der Größe k × k über das Eingabebild. Aus jedem Fenster werden Pixel aus einem kleineren Fenster der Größe l × l abgesampled. Diese Struktur ermöglicht granulare Kontrolle über die Auflösung der Erklärung.",
  },
  {
    q: "Warum benötigt Ablationsstudie mehrere Iterationen?",
    a: "Ablationsstudien entfernen iterativ Merkmale einzeln und messen die Auswirkung jeder Entfernung. Dies ist notwendig, um zu verstehen, welche Merkmale individuell wichtig sind und wie sich ihre Entfernung auf die Modellausgabe auswirkt.",
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
