import { useState } from "react";

const summary = [
  {
    title: "Motivation für XAI",
    color: "#EEEDFE",
    border: "#534AB7",
    text: "#3C3489",
    points: [
      "ML-Modelle lernen aus riesigen Mengen an Trainingsdaten und haben Millionen oder Milliarden von Parametern.",
      "Moderne Modelle sind hochgenaue Black Boxes – sie liefern gute Ergebnisse, aber ohne Transparenz.",
      "Explainability (Erklärbarkeit) kann genauso wichtig sein wie Accuracy (Genauigkeit) – besonders in kritischen Anwendungen wie Kreditvergabe oder Medizin.",
      "Die drei XAI-Ingredienzien: 1) Model (z.B. Neural Network), 2) Data (einzelne Samples oder ganzer Datensatz), 3) Question (Was genau soll erklärt werden?).",
    ],
  },
  {
    title: "ML-Modelltypen (Recap)",
    color: "#E1F5EE",
    border: "#0F6E56",
    text: "#085041",
    points: [
      "Linear Regression: f(x) = β₀ + Σ βᵢxᵢ – eine gewichtete Summe der Features. Trainiert mit Least Squares Loss (geschlossene Form). Gut interpretierbar.",
      "Logistic Regression: Wie lineare Regression, aber mit Sigmoid-Funktion σ(z) = 1/(1+e⁻ᶻ) für binäre Klassifikation. Training via Gradient Descent (kein geschlossenes Lösungsverfahren).",
      "Decision Trees: Baumartige Struktur, bei der interne Knoten Features/Schwellenwerte nutzen und Blätter Vorhersagen ausgeben. Training durch gieriges Minimieren von Entropie. Inherently interpretable.",
      "Tree Ensembles: Summierung mehrerer Trees. Random Forests = Bagging (unabhängige Bäume). Gradient Boosting = schwache Lerner verbessern sich iterativ.",
      "Neural Networks: Hierarchische, nichtlineare Funktionen. MLP für tabellarische Daten, CNNs für Bilder (Convolution + Pooling), RNNs/LSTMs für Sequenzen.",
      "Transformers: Ersetzen sequenzielle RNNs durch Attention Mechanisms – besser parallelisierbar. Varianten: Encoder-only (BERT), Encoder-Decoder (T5), Decoder-only (GPT).",
    ],
  },
  {
    title: "Ensembles & Knowledge Distillation",
    color: "#E6F1FB",
    border: "#185FA5",
    text: "#0C447C",
    points: [
      "Ensembles verbessern die Performance durch Training mehrerer unabhängiger Modelle und Kombination ihrer Vorhersagen.",
      "Ensemble-Strategien: (1) Gleiches Modell, verschiedene Initialisierungen, (2) Top-k Modelle aus Cross-Validation, (3) Verschiedene Checkpoints, (4) Running Average der Gewichte.",
      "Nachteil: Ensembles sind langsamer bei der Inferenz (Auswertung zur Test-Zeit).",
      "Knowledge Distillation: Wissen wird von einem großen Ensemble-Modell (Teacher) in ein kleineres Modell (Student) übertragen – ohne signifikanten Qualitätsverlust. Distillierte Modelle sind schneller und benötigen weniger Hardware.",
    ],
  },
  {
    title: "XAI-Terminologie",
    color: "#FAECE7",
    border: "#993C1D",
    text: "#712B13",
    points: [
      "Explainability und Interpretability werden oft synonym verwendet: 'the degree to which an observer can understand the cause of a decision'.",
      "Explanation: Eine Methode, um dieses Verständnis zu erzeugen.",
      "Justification vs. Explanation: Justification liefert Belege, WARUM eine Entscheidung richtig ist – nicht wie das Modell intern funktioniert. Viele XAI-Methoden liefern nur Justifications!",
      "Explanandum: Das zu erklärende Phänomen (das Modell/seine Entscheidung).",
      "Explanans: Die Erklärung selbst (z.B. eine Saliency Map).",
      "Explainer: Die automatische Methode, die erklärt.",
      "Explainee: Der Nutzer, der die Erklärung empfängt.",
    ],
  },
  {
    title: "XAI-Taxonomie",
    color: "#EAF3DE",
    border: "#3B6D11",
    text: "#27500A",
    points: [
      "Scope – Lokale Methoden: Erklären einzelne Vorhersagen (z.B. warum wurde DIESER Kredit abgelehnt?). Globale Methoden: Beschreiben das durchschnittliche Verhalten des Modells.",
      "Stage – Post-hoc: Erklärung wird NACH der Entscheidung generiert (auf bestehendem Black-Box-Modell). Ante-hoc (intrinsic): Modell ist by design interpretierbar (z.B. Decision Tree).",
      "Functioning – Perturbation-based: Input wird verändert/entfernt und die Auswirkung auf den Output beobachtet (z.B. SHAP, LIME). Example-based: Arbeitet mit konkreten Trainingsbeispielen.",
      "Result: Feature Relevance, Surrogate Models oder Beispiele.",
      "Format: Textual, Visual, Numerical oder Rules.",
    ],
  },
  {
    title: "Scope of Interpretability (5 Stufen)",
    color: "#FBEAF0",
    border: "#993556",
    text: "#72243E",
    points: [
      "1. Algorithm Transparency: Wie erzeugt der Algorithmus das Modell? (Kein Zugriff auf Daten oder Modell nötig, nur Wissen über den Algorithmus.)",
      "2. Global, Holistic Model Interpretability: Wie macht das trainierte Modell Vorhersagen insgesamt? (Sehr schwer zu erreichen in der Praxis.)",
      "3. Global Model Interpretability on a Modular Level: Wie beeinflussen einzelne Modellteile die Vorhersagen? (Achtung: Bei linearen Modellen sind Gewichte miteinander verschränkt.)",
      "4. Local Interpretability for a Single Prediction: Warum hat das Modell DIESE spezifische Vorhersage gemacht? (Lokal oft genauer als global.)",
      "5. Local Interpretability for a Group of Predictions: Warum wurden für eine Gruppe von Instances bestimmte Vorhersagen getroffen?",
    ],
  },
  {
    title: "Evaluation von XAI",
    color: "#FAEEDA",
    border: "#854F0B",
    text: "#633806",
    points: [
      "Grundproblem: Kein Konsens darüber, was Interpretabilität ist – noch weniger, wie man sie messen soll.",
      "Plausibility vs. Faithfulness: Ist die Erklärung nachvollziehbar (plausibel)? vs. Spiegelt sie tatsächlich den Entscheidungsprozess wider (faithful)?",
      "Evaluation-Typ 1 – Application-level (real task): Endnutzer oder Domänenexperten testen die Erklärungen direkt in der echten Anwendung.",
      "Evaluation-Typ 2 – Human-level (simple task): Vereinfachte Version mit Laien (z.B. via Crowdsourcing). Nutzer wählen die beste Erklärung.",
      "Evaluation-Typ 3 – Function-level (proxy task): Kein Mensch nötig. Proxy-Metriken werden genutzt (z.B. Tiefe eines Decision Trees als Proxy für Verständlichkeit).",
      "Reference-based: Vergleich mit Ground-Truth-Erklärungen (Agreement, IoU, BLEU, ROUGE, BLEURT).",
      "Reference-free: Removal-based Scores, Explanation-Prediction Consistency, LLM-as-a-Judge.",
    ],
  },
  {
    title: "Populäre XAI-Methoden",
    color: "#F1EFE8",
    border: "#5F5E5A",
    text: "#444441",
    points: [
      "Saliency Explanations (Gradient-based): Wie ändert sich der Output bei einer winzigen Änderung des Inputs? Methoden: Gradients, Integrated Gradients. Benötigt vollen Zugriff auf das Modell.",
      "Saliency Explanations (Perturbation-based): Wie ändert sich der Output, wenn ein Feature entfernt/ersetzt wird? Methoden: Shapley Values, SHAP. Kein vollständiger Modellzugriff nötig (Model-agnostic).",
      "Counterfactual Explanations: Welche minimalen Änderungen würden die Entscheidung umkehren? (z.B. 'Wenn Ihr Einkommen 5.000€ höher wäre, wäre der Kredit genehmigt worden.')",
      "Instance Explanations: Analyse, welche Trainingsbeispiele die Entscheidung am stärksten beeinflusst haben (Proponents vs. Opponents).",
      "Generated (Textual) Explanations: Das Modell wird trainiert, sowohl eine Vorhersage als auch eine textuelle Erklärung zu generieren.",
      "Chain-of-Thought Prompting: LLM wird mit Few-Shot-Beispielen dazu gebracht, seinen Denkprozess Schritt für Schritt zu explizieren. Verbessert Reasoning und liefert eine textuelle Erklärung.",
    ],
  },
];

const cards = [
  { q: "Was ist das Grundproblem mit modernen ML-Modellen aus XAI-Perspektive?", a: "Moderne ML-Modelle sind 'Black Boxes': Sie erreichen hohe Accuracy, bieten aber keine Transparenz über ihre Entscheidungsprozesse. Es gibt einen Zielkonflikt zwischen Performance und Explainability." },
  { q: "Was sind die drei 'Ingredients' von XAI?", a: "1. Model: Ein prädiktives Modell (möglicherweise eine Black Box, z.B. Neural Network)\n2. Data: Ein einzelner Sample oder der gesamte Datensatz\n3. Question: Was genau soll verstanden/erklärt werden?" },
  { q: "Was ist der Unterschied zwischen 'Explanation' und 'Justification'?", a: "Explanation: Erhöht das Verständnis darüber, WIE das Modell intern entscheidet.\nJustification: Liefert nur Evidenz, WARUM die Entscheidung korrekt sein sollte – ohne den internen Prozess zu beleuchten.\nWichtig: Viele XAI-Methoden produzieren nur Justifications!" },
  { q: "Was bedeuten die vier XAI-Terme: Explanandum, Explanans, Explainer, Explainee?", a: "Explanandum: Das zu erklärende Phänomen (das Modellverhalten)\nExplanans: Die Erklärung selbst (z.B. eine Saliency Map)\nExplainer: Die automatische Methode, die erklärt\nExplainee: Der Nutzer, der die Erklärung empfängt" },
  { q: "Was ist der Unterschied zwischen lokalen und globalen XAI-Methoden?", a: "Lokale Methoden: Erklären eine einzelne Vorhersage (z.B. 'Warum wurde THIS Kredit abgelehnt?')\nGlobale Methoden: Beschreiben das durchschnittliche Verhalten des gesamten Modells (z.B. 'Welche Features sind insgesamt am wichtigsten?')\nLokale Erklärungen können präziser sein, weil das Modell lokal einfacheres Verhalten zeigen kann." },
  { q: "Was bedeutet 'post-hoc' vs. 'ante-hoc (intrinsic)' in der XAI-Taxonomie?", a: "Post-hoc: Die Erklärung wird NACH der Entscheidung generiert, auf einem bereits trainierten (möglicherweise Black-Box-) Modell.\nAnte-hoc (intrinsic): Das Modell ist by design interpretierbar – z.B. ein Decision Tree oder ein lineares Modell. Keine separate Erklärungsmethode nötig." },
  { q: "Was sind 'perturbation-based' vs. 'gradient-based' Saliency-Methoden?", a: "Gradient-based: Wie verändert sich der Output bei einer winzigen (infinitesimalen) Änderung des Inputs? Benötigt vollen Zugriff auf das Modell (White Box). Methoden: Gradients, Integrated Gradients.\nPerturbation-based: Wie verändert sich der Output, wenn ein Feature entfernt oder ersetzt wird? Model-agnostic (kein interner Zugriff nötig). Methoden: SHAP, Shapley Values, LIME." },
  { q: "Welche 5 Scopes of Interpretability gibt es nach Molnar?", a: "1. Algorithm Transparency: Wie erzeugt der Algorithmus das Modell?\n2. Global, Holistic: Wie macht das Modell Vorhersagen insgesamt?\n3. Global, Modular: Wie beeinflussen Modellteile die Vorhersagen?\n4. Local for Single Prediction: Warum diese eine Vorhersage?\n5. Local for Group: Warum Vorhersagen für eine Gruppe?" },
  { q: "Was ist 'Plausibility' vs. 'Faithfulness' bei XAI-Erklärungen?", a: "Plausibility: Ist die Erklärung aus menschlicher Sicht nachvollziehbar und glaubwürdig?\nFaithfulness: Spiegelt die Erklärung tatsächlich den internen Entscheidungsprozess des Modells wider?\nBeide sind unabhängig! Eine Erklärung kann plausibel, aber nicht faithful sein (und umgekehrt)." },
  { q: "Welche 3 Evaluations-Typen für XAI gibt es nach Molnar?", a: "1. Application-level (real task): Domänenexperten testen Erklärungen in der echten Anwendung.\n2. Human-level (simple task): Laien bewerten Erklärungen (z.B. Crowdsourcing).\n3. Function-level (proxy task): Kein Mensch nötig; automatische Proxy-Metriken (z.B. Tiefe eines Decision Trees)." },
  { q: "Was ist 'Knowledge Distillation' und warum ist es relevant?", a: "Knowledge Distillation überträgt das Wissen eines großen Ensemble-Modells (Teacher) in ein kleineres Modell (Student), ohne signifikanten Qualitätsverlust.\nRelevanz für XAI: Distillierte Modelle sind schneller in der Inferenz und benötigen weniger Hardware – bei ähnlicher Performance wie das teure Ensemble." },
  { q: "Was sind 'Counterfactual Explanations'?", a: "Counterfactual Explanations identifizieren minimale Änderungen am Input, die die Modellentscheidung umkehren würden.\nBeispiel: 'Wenn Ihr Einkommen um 500€ höher wäre, wäre der Kredit genehmigt worden.'\nSie beantworten die Frage: Was müsste sich ändern, um ein anderes Ergebnis zu erhalten?" },
  { q: "Was ist 'Chain-of-Thought Prompting' und wie hängt es mit XAI zusammen?", a: "Chain-of-Thought Prompting gibt einem LLM Few-Shot-Beispiele, in denen Zwischenschritte des Denkprozesses explizit gezeigt werden.\nXAI-Relevanz: Das Modell erzeugt automatisch eine textuelle Erklärung seiner Vorhersage, was die Interpretierbarkeit erhöht und die Accuracy auf komplexen Reasoning-Tasks verbessert.\nProblem: Die Chain-of-Thought kann plausibel sein, ohne faithful zu sein." },
  { q: "Was ist der Unterschied zwischen 'Random Forest' und 'Gradient Boosting'?", a: "Random Forest (Bagging): Viele unabhängige Decision Trees werden parallel auf zufälligen Untermengen der Trainingsdaten trainiert und dann gemittelt.\nGradient Boosting: Schwache Lerner werden sequenziell trainiert – jeder neue Tree versucht die Fehler des vorherigen zu korrigieren.\nBeide sind Tree Ensembles, die Predictions summieren." },
  { q: "Was ist 'Reference-based' vs. 'Reference-free' Evaluation bei XAI?", a: "Reference-based: Es gibt eine annotierte Ground-Truth-Erklärung. Die generierte Erklärung wird damit verglichen (Agreement, IoU, BLEU, ROUGE, BLEURT).\nReference-free: Keine Ground Truth nötig. Stattdessen: Removal-based Scores (ändert sich der Output wenn irrelevante Features entfernt werden?), Explanation-Prediction Consistency, oder LLM-as-a-Judge." },
  { q: "Warum sind Transformer-Modelle parallelisierbarer als RNNs?", a: "RNN-basierte Modelle (LSTM, GRU) sind sequenziell: Position t kann erst enkodiert werden, wenn alle Positionen 0 bis t-1 enkodiert sind.\nTransformer verwenden ausschließlich Attention Mechanisms, die alle Positionen gleichzeitig verarbeiten können – daher viel effizienter auf GPUs parallelisierbar." },
  { q: "Was ist das Problem mit globaler, holistischer Modell-Interpretabilität?", a: "Global Holistic Interpretability erfordert ein vollständiges Verständnis, wie das Modell ALLE Features nutzt und welche Interaktionen zwischen ihnen bestehen.\nDas ist in der Praxis sehr schwer zu erreichen, besonders bei komplexen Modellen mit Millionen von Parametern." },
  { q: "Was ist 'LLM-as-a-Judge' bei der XAI-Evaluation?", a: "Ein großes LLM (z.B. GPT-4) wird genutzt, um Erklärungen zu bewerten – ohne menschliche Annotationen.\nStudien zeigen, dass starke LLMs mit menschlichen Präferenzen übereinstimmen (>80% Agreement).\nVorteil: Skalierbar und günstig. Nachteil: Anfällig für Biases (Position Bias, Self-Enhancement Bias)." },
];

export default function XAILernApp() {
  const [tab, setTab] = useState("summary");
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(new Set());

  const card = cards[cardIdx];

  function next() {
    setFlipped(false);
    setSeen(s => new Set([...s, cardIdx]));
    setTimeout(() => setCardIdx(i => (i + 1) % cards.length), 50);
  }
  function prev() {
    setFlipped(false);
    setTimeout(() => setCardIdx(i => (i - 1 + cards.length) % cards.length), 50);
  }
  function shuffle() {
    setFlipped(false);
    setSeen(new Set());
    const r = Math.floor(Math.random() * cards.length);
    setTimeout(() => setCardIdx(r), 50);
  }

  const progress = Math.round((seen.size / cards.length) * 100);

  return (
    <div style={{ padding: "0 0 2rem", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>
      <h2 style={{ fontSize: 22, fontWeight: 500, margin: "1.5rem 0 0.5rem" }}>XAI – Lernmaterial</h2>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 1.25rem" }}>Lecture 2 · Hochschule Karlsruhe · Summer 2026</p>

      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
        {["summary", "cards"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "6px 18px", fontSize: 14, borderRadius: "var(--border-radius-md)",
              border: tab === t ? "1.5px solid var(--color-border-primary)" : "0.5px solid var(--color-border-tertiary)",
              background: tab === t ? "var(--color-background-secondary)" : "transparent",
              color: "var(--color-text-primary)", cursor: "pointer", fontWeight: tab === t ? 500 : 400,
            }}
          >
            {t === "summary" ? "Zusammenfassung" : `Anki-Karten (${cards.length})`}
          </button>
        ))}
      </div>

      {tab === "summary" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {summary.map((sec, i) => (
            <div key={i} style={{
              background: "var(--color-background-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderLeft: `3px solid ${sec.border}`,
              borderRadius: "var(--border-radius-lg)",
              padding: "1rem 1.25rem",
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 500, margin: "0 0 0.75rem", color: "var(--color-text-primary)" }}>{sec.title}</h3>
              <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
                {sec.points.map((p, j) => (
                  <li key={j} style={{ fontSize: 14, lineHeight: 1.6, color: "var(--color-text-primary)" }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {tab === "cards" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
              Karte {cardIdx + 1} / {cards.length} · {progress}% gesehen
            </span>
            <button onClick={shuffle} style={{
              fontSize: 13, padding: "4px 12px", border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: "var(--border-radius-md)", background: "transparent", cursor: "pointer",
              color: "var(--color-text-secondary)",
            }}>
              <i className="ti ti-refresh" aria-hidden="true" style={{ marginRight: 4 }}></i>Shuffle
            </button>
          </div>

          <div style={{
            width: "100%", minHeight: 220,
            background: "var(--color-background-primary)",
            border: "0.5px solid var(--color-border-secondary)",
            borderRadius: "var(--border-radius-lg)",
            padding: "1.5rem",
            cursor: "pointer",
            transition: "border-color 0.15s",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }} onClick={() => setFlipped(f => !f)}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-tertiary)", margin: "0 0 0.75rem" }}>
                {flipped ? "Antwort" : "Frage"}
              </p>
              {!flipped ? (
                <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0, color: "var(--color-text-primary)" }}>{card.q}</p>
              ) : (
                <pre style={{ fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}>{card.a}</pre>
              )}
            </div>
            <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "1rem 0 0", textAlign: "center" }}>
              {flipped ? "" : "Klicken zum Umdrehen"}
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={prev} style={{
              flex: 1, padding: "8px", border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: "var(--border-radius-md)", background: "transparent", cursor: "pointer",
              color: "var(--color-text-primary)", fontSize: 14,
            }}>
              <i className="ti ti-arrow-left" aria-hidden="true" style={{ marginRight: 4 }}></i>Zurück
            </button>
            <button onClick={next} style={{
              flex: 1, padding: "8px", border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: "var(--border-radius-md)", background: "transparent", cursor: "pointer",
              color: "var(--color-text-primary)", fontSize: 14,
            }}>
              Weiter<i className="ti ti-arrow-right" aria-hidden="true" style={{ marginLeft: 4 }}></i>
            </button>
          </div>

          <div style={{ marginTop: 16, background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", height: 6, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "#534AB7", borderRadius: "var(--border-radius-md)", transition: "width 0.3s" }} />
          </div>
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", textAlign: "right", marginTop: 4 }}>{seen.size} von {cards.length} Karten gesehen</p>
        </div>
      )}
    </div>
  );
}
