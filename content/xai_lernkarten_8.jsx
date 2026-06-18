import { useState } from "react";

const TOPIC_TITLE = "Mechanistic Interpretability";
const TOPIC_DESCRIPTION = "Verstehen der internen Mechanismen neuronaler Netze durch Reverse-Engineering von Algorithmen und Schaltkreisen";
const LECTURE_NUM = "9";
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
    title: "Definition und Grundkonzept",
    border: "#534AB7",
    color: "#EEEDFE",
    points: [
      "Mechanistic Interpretability ist das Studium des Verständnisses, wie neuronale Netze ihre Ausgaben berechnen, indem man ihre spezifischen internen Komponenten analysiert (Neuronen, Aufmerksamkeitsköpfe, Gewichte)",
      "Ziel: nicht nur Komponenten mit Verhaltensweisen korrelieren, sondern erklären WARUM und WIE einzelne Komponenten zu spezifischen Ausgaben führen",
      "Methode: Reverse-Engineering von Netzen, um präzise Algorithmen oder Schaltkreise zu identifizieren, die darin implementiert sind",
      "Dies unterscheidet sich vom Betrachten von Attention Maps oder Salienzmaßen - es geht um tiefes mechanistisches Verständnis"
    ]
  },
  {
    title: "Konzeptbasierte Erklärungen und Neuronale Interpretation",
    border: "#0F6E56",
    color: "#E1F5EE",
    points: [
      "Neuron Interpretation zielt darauf ab, die internen Features eines Modells zu verstehen, z.B. durch die Analyse von ZFnet zur Interpretation von AlexNet",
      "Transformers und Attention: Das Fundament für moderne KI-Systeme ist die Transformer-Architektur (Vaswani et al.: 'Attention is All You Need')",
      "Attention für XAI: Attention Maps sind häufig verwendet, um zu demonstrieren, was in Transformer-Modellen geschieht",
      "Kritischer Punkt: Aufmerksamkeit ist KEINE Erklärung - Attention-Gewichte stimmen nicht immer mit Feature-Wichtigkeitswerten überein"
    ]
  },
  {
    title: "Grenzen von Attention als Erklärung",
    border: "#185FA5",
    color: "#E6F1FB",
    points: [
      "Aufmerksamkeit ist nicht Erklärung: Attention-Gewichte korrelieren nicht konsistent mit Standard-Feature-Wichtigkeitswerten",
      "Alternative Attention Maps können oft zu ähnlich guten Vorhersagen führen wie die originalen Attention-Gewichte",
      "Attention ist 'eine' Erklärung, nicht 'die' Erklärung - man sollte nicht automatisch davon ausgehen, dass Attention-Gewichte die für eine Ausgabe verantwortlichen Eingaben offenbaren",
      "Dies verdeutlicht, warum mechanistisches Verständnis tiefere Analysemethoden erfordert als nur die Visualisierung von Attention"
    ]
  },
  {
    title: "Circuits: Die Bausteine neuraler Netze",
    border: "#993C1D",
    color: "#FAECE7",
    points: [
      "Circuits sind kleine, interpretierbare Sub-Netzwerke von Neuronen und Verbindungen, die zusammenarbeiten, um eine spezifische Funktion auszuführen (Bausteine des Netzes)",
      "Kernidee: Anstatt das gesamte riesige neurale Netzwerk zu betrachten, versucht man, spezifische CIRCUITS zu identifizieren - Mini-Module, die bedeutungsvolle Berechnungen durchführen",
      "Beispiel: Ein Circuit könnte spezialisiert sein, um bestimmte syntaktische Strukturen zu erkennen oder um Assoziationen zwischen Konzepten herzustellen",
      "Durch die Identifikation von Circuits kann man das Netzwerk in verständliche, funktionale Komponenten zerlegen"
    ]
  },
  {
    title: "Activation Patching: Methode zur Kausalitätsfeststellung",
    border: "#3B6D11",
    color: "#EAF3DE",
    points: [
      "Activation Patching wird verwendet, um herauszufinden, welche Teile eines neuronalen Netzes für ein bestimmtes Verhalten verantwortlich sind",
      "Methode: Man wählt zwei Eingaben - eine 'Base Prompt' (Model antwortet falsch) und eine 'Source Prompt' (Model antwortet richtig)",
      "Prozedur: Modell auf beiden Prompts ausführen, Aktivierungen speichern, dann die Aktivierung eines spezifischen Neurons/Layer/Kopfs in der fehlerhaften Ausführung durch die gute Aktivierung ersetzen",
      "Forward Pass neu starten von diesem Punkt an und beobachten: Wenn Patching den Fehler behebt, ist diese Komponente kausal wichtig",
      "Dies erlaubt es, präzise zu bestimmen, welche Netzwerkteile für spezifische Verhaltensweisen verantwortlich sind"
    ]
  },
  {
    title: "Grokking: Emergentes Verhalten beim Training",
    border: "#993556",
    color: "#FBEAF0",
    points: [
      "Grokking ist ein neu entdecktes Phänomen, bei dem kleine Transformer, die auf modulare Additionsaufgaben trainiert werden, plötzlich springen von Memorisierung zu echtem Verständnis",
      "Nanda et al. (2023) zeigen, dass Grokking aus der graduellen Verstärkung strukturierter Mechanismen in den Gewichten entsteht, gefolgt von der späteren Entfernung von Memorierungskomponenten",
      "Training erfolgt in drei kontinuierlichen Phasen: Memorisierung → Circuit-Bildung → Aufräumen (Entfernung von Memorierungskomponenten)",
      "Dieses Phänomen zeigt, dass neurale Netze komplexe, interpretierbare Algorithmen entwickeln und dass mechanistisches Verständnis deren Lernprozesse enthüllen kann"
    ]
  },
  {
    title: "Reverse-Engineering: Fourier-Analyse und Trigonometrische Identitäten",
    border: "#854F0B",
    color: "#FAEEDA",
    points: [
      "Bei der Reverse-Engineering-Analyse des Grokking-Phänomens wurden diskrete Fourier-Transformationen und trigonometrische Identitäten verwendet",
      "Das Modell nutzt diese mathematischen Werkzeuge, um Additionsaufgaben (z.B. Rotation um einen Kreis) zu implementieren",
      "Durch die Analyse von Aktivierungen und Gewichten im Fourier-Raum konnte der exakte Algorithmus, den das Modell gelernt hat, identifiziert werden",
      "Dies demonstriert, wie mechanistisches Interpretability es ermöglicht, die präzisen mathematischen Operationen zu verstehen, die in Netzwerken implementiert sind"
    ]
  },
  {
    title: "Logit Lens: Einsicht in Transformer-Vorhersagen pro Layer",
    border: "#5F5E5A",
    color: "#F1EFE8",
    points: [
      "Logit Lens ist ein Werkzeug, um in einen Transformer 'hineinzuschauen' und zu sehen, welches Token das Modell auf jeder Schicht vorhersagen würde",
      "Verfahren: Prompt durch Modell ausführen, den verborgenen Zustand (Hidden State) an einer gegebenen Schicht extrahieren, das Output Layer (LM Head) darauf anwenden, und dekodieren",
      "Ermöglicht es, die Zwischenvorhersage des Modells auf jeder Ebene zu sehen - 'Wenn du jetzt vorhersagen müsstest, was würdest du sagen?'",
      "Dies hilft zu verstehen, wie sich die Vorhersagen des Modells durch die verschiedenen Schichten entwickeln und wo Konzepte/Informationen verarbeitet werden"
    ]
  },
  {
    title: "Cross-Linguale Inkonsistenz in Mehrsprachigen Sprachmodellen",
    border: "#0F6E6E",
    color: "#E0F5F5",
    points: [
      "Mehrsprachige Sprachmodelle (MLMs) zeigen bemerkenswerte Fähigkeiten beim Speichern und Abrufen von Faktenwissen über Sprachen hinweg",
      "Sie weisen jedoch Inkonsistenzen auf, wenn sie auf semantisch äquivalente Prompts in verschiedenen Sprachen reagieren",
      "Forscher (Qi et al., Wang et al.) nutzen mechanistisches Interpretability, um zu untersuchen, wo diese Inkonsistenzen entstehen",
      "Szenarios: (1) Modelle geben in allen Sprachen konsistente Antworten; (2) Modelle geben korrekte Antworten in Englisch, aber generieren inkorrekte Antworten in anderen Sprachen",
      "Durch Information-Tracing innerhalb von MLMs können Fehler auf sprachspezifische Raumübergänge in den finalen Schichten zurückgeführt werden"
    ]
  }
];

const MNEMONICS = [
  {
    title: "CIRCUITS",
    keywords: ["Komponenten", "Interpretierbarkeit", "Funktionen"],
    mnemonic: "Components\nInterpreted\nReverse-engineered\nComputing\nUnits\nIdentified\nThrough\nSub-networks\n\nSmall, interpretable sub-networks (Mini-Module) that perform specific functions.\nEach CIRCUIT is a self-contained unit of computation with clear interpretability."
  },
  {
    title: "PATCHING",
    keywords: ["Aktivierungen", "Kausalität", "Intervention"],
    mnemonic: "Procedure\nActivations\nTransplanted\nCausal\nHypothesis\nInterpreted\nNeurally\nGauged\n\nAktivierungen aus 'guten' Läufen in 'schlechte' Läufe einfügen.\nMisst die kausale Wichtigkeit einer Komponente durch Intervention."
  },
  {
    title: "GROKKING",
    keywords: ["Memorisierung", "Verständnis", "Emergenz"],
    mnemonic: "Gradual\nRealization\nOf\nKnowledge\nKnits\nIn\nNetwork\nGrowth\n\nNetzwerk springt von Memorisierung zu echtem Verständnis.\nDrei Phasen: Memorisierung → Circuit-Bildung → Aufräumen."
  },
  {
    title: "LOGIT LENS",
    keywords: ["Intermediate", "Vorhersagen", "Pro-Layer"],
    mnemonic: "Layer\nOperations\nGive\nIntermediateToken\nTranslations\n\nZeigt, was das Modell auf jeder Schicht vorhersagen würde.\nEnthüllt, wie sich Vorhersagen durch Transformer-Schichten entwickeln."
  },
  {
    title: "MECHANISTIC",
    keywords: ["Interne", "Algorithmen", "Verständnis"],
    mnemonic: "Model\nExplanations\nClarified\nHrough\nAnalysis\nOf\nNetworkIStic\nStructures\nThrough\nInternal\nCircuits\n\nVerstehen von Wie und WARUM, nicht nur Was.\nReverse-Engineering interner Mechanismen auf präzise Weise."
  },
  {
    title: "AKTIVIERUNGSPATCH",
    keywords: ["Austausch", "Feststellen", "Verantwortung"],
    mnemonic: "Austausch\nKomponentenaktivierungen\nTesten\nIntervention\nVorher-Nachher\nAuswirkungen\nTeil-Modell-Zuordnung\nReprä\nErkennung\nUntersuchen\nNachverkehr\nGewicht-Analyse\n\nEinfaches, aber mächtiges Werkzeug:\n1. Basisprompt (falsch) + Quellprompt (richtig) wählen\n2. Aktivierungen speichern\n3. Ersetzen & weiterlaufen\n4. Beobachten ob Fehler behoben wurde"
  },
  {
    title: "FOURIER-MECHANISMUS",
    keywords: ["Transformation", "Trigonometrie", "Algorithmus"],
    mnemonic: "Fourier\nOperations\nUnroll\nRingen\nInternal\nEmbedded\nRotations\n\nModelle nutzen diskrete Fourier-Transformationen.\nTrigonometrische Identitäten zum Implementieren von Algorithmen.\nZeigt mathematische Präzision in Mechanismen."
  },
  {
    title: "MLM-INKONSISTENZ",
    keywords: ["Mehrsprachig", "Faktenwissen", "Fehler"],
    mnemonic: "Multilingual\nLanguage\nModels\n\nImproving\nNonsistent\nKnowledge\nOnsets\nIncorrect\nStaged\nTransitions\nEarth\nNumerical\nChart\nYields\n\nMehrsprachige Modelle speichern Wissen über Sprachen hinweg.\nAber: Sprachspezifische Fehler in finalen Schichten entstehen."
  }
];

const FLASHCARDS = [
  {
    q: "Was ist Mechanistic Interpretability?",
    a: "Das Studium des Verständnisses, wie neuronale Netze ihre Ausgaben berechnen, indem man ihre spezifischen internen Komponenten (Neuronen, Aufmerksamkeitsköpfe, Gewichte) analysiert. Ziel ist es, zu erklären WARUM und WIE Komponenten zu spezifischen Ausgaben führen, nicht nur diese zu korrelieren."
  },
  {
    q: "Welcher ist der Hauptunterschied zwischen Mechanistic Interpretability und Attention-basierter Erklärung?",
    a: "Attention Maps zeigen nur, auf welche Token das Modell sich konzentriert, erklären aber nicht kausal, wie die Ausgabe berechnet wird. Mechanistic Interpretability geht tiefer und reverse-engineert die präzisen Algorithmen und Schaltkreise, die im Netzwerk implementiert sind."
  },
  {
    q: "Was sind Circuits in neuronalen Netzen?",
    a: "Circuits sind kleine, interpretierbare Sub-Netzwerke von Neuronen und Verbindungen, die zusammenarbeiten, um eine spezifische Funktion auszuführen. Sie sind wie Bausteine oder Mini-Module des Netzwerks, die bedeutungsvolle Berechnungen durchführen."
  },
  {
    q: "Beschreibe die Methode des Activation Patching.",
    a: "1. Zwei Eingaben auswählen: Base Prompt (Model antwortet falsch) und Source Prompt (Model antwortet richtig)\n2. Modell auf beiden Prompts ausführen und Aktivierungen speichern\n3. Eine spezifische Aktivierung (Neuron/Layer/Kopf) aus der Base-Ausführung mit der aus Source ersetzen\n4. Forward Pass weiterlaufen und beobachten, ob der Fehler behoben wird\n→ Falls ja: Diese Komponente ist kausal wichtig für das Verhalten"
  },
  {
    q: "Warum ist Activation Patching ein mächtiges Werkzeug für Mechanistic Interpretability?",
    a: "Es erlaubt kausale Inferenz statt nur Korrelation: Durch das Ersetzen von Aktivierungen kann man direkt testen, ob eine spezifische Netzwerk-Komponente für ein bestimmtes Verhalten verantwortlich ist. Dies offenbart die funktionale Rolle einzelner Teile des Netzwerks."
  },
  {
    q: "Was ist Grokking?",
    a: "Ein neu entdecktes Phänomen, bei dem neuronale Netze plötzlich von Memorisierung zu echtem Verständnis springt. Besonders beobachtet bei kleinen Transformers auf modularen Aufgaben (z.B. Addition). Das Netzwerk entwickelt über Zeit hinweg interpretierbare Algorithmen."
  },
  {
    q: "Beschreibe die drei Phasen des Grokking-Trainings.",
    a: "1. Memorisierung: Das Netzwerk memoriert zunächst einfach die Trainingsbeispiele\n2. Circuit-Bildung: Strukturierte Mechanismen entwickeln sich graduell in den Gewichten\n3. Aufräumen: Memorierungskomponenten werden entfernt, übrig bleibt der interpretierbare Algorithmus"
  },
  {
    q: "Wie nutzen Mechanistic Interpretability Forscher Fourier-Analysen zum Reverse-Engineering?",
    a: "Sie verwenden diskrete Fourier-Transformationen und trigonometrische Identitäten, um die mathematischen Operationen zu identifizieren, die ein Netzwerk implementiert. Im Grokking-Fall wurde so enthüllt, dass das Modell Addition durch Rotationen im Fourier-Raum berechnet."
  },
  {
    q: "Was ist Logit Lens und wie funktioniert es?",
    a: "Ein Werkzeug zum 'Hineinschauen' in Transformer-Modelle. Procedure:\n1. Prompt durch Modell laufen lassen\n2. Hidden State an einer Schicht extrahieren\n3. Output Layer (LM Head) auf diesen Hidden State anwenden\n4. Dekodieren → das ist die Zwischenvorhersage\nZeigt, was das Modell auf jeder Schicht vorhersagen würde."
  },
  {
    q: "Was erklärt Logit Lens über die Informationsverarbeitung in Transformers?",
    a: "Es zeigt, wie sich die Vorhersagen des Modells durch die verschiedenen Schichten entwickeln. Man sieht, wo bestimmte Konzepte oder Informationen verarbeitet werden und wie die Layer progressiv die Vorhersage verfeinern - 'Wenn du jetzt vorhersagen müsstest, was würdest du sagen?'"
  },
  {
    q: "Was sind mehrsprachige Sprachmodelle (MLMs) und welches Problem zeigen sie?",
    a: "MLMs speichern Faktenwissen über Sprachen hinweg, zeigen aber Inkonsistenzen: Sie können in einer Sprache die richtige Antwort geben, in einer anderen aber eine falsche Antwort generieren, obwohl die Fragen semantisch äquivalent sind. Dies offenbart Mängel in der cross-lingualen Verarbeitung."
  },
  {
    q: "Wie nutzen Forscher Mechanistic Interpretability um Cross-linguale Inkonsistenzen zu untersuchen?",
    a: "Sie verfolgen Information Flows innerhalb von MLMs auf zwei komplementären Szenarien:\n1. Fälle wo Modelle in allen Sprachen konsistente Vorhersagen machen\n2. Fälle wo Modelle in Englisch korrekt sind, aber in anderen Sprachen fehlerhaft\nSo können sie präzise identifizieren, wo Fehler entstehen (z.B. in sprachspezifischen Raumübergängen)."
  },
  {
    q: "Warum ist es wichtig, dass Aufmerksamkeits-Gewichte NICHT unbedingt die Feature-Wichtigkeit abbilden?",
    a: "Weil es zeigt, dass einfache Visualisierungen irreführend sein können. Alternative Attention-Muster können oft ähnliche Vorhersagen liefern. Aufmerksamkeit ist 'eine' Erklärung, nicht 'die' Erklärung. Dies verdeutlicht die Notwendigkeit von tieferen mechanistischen Analysemethoden."
  },
  {
    q: "Wie unterscheidet sich der Ansatz von Neuron Interpretation von Mechanistic Interpretability?",
    a: "Neuron Interpretation beschreibt, was einzelne Neuronen 'tun' (z.B. welche visuellen Features sie detektieren). Mechanistic Interpretability geht weiter und erklärt, wie Neuronen zusammenarbeiten, um Algorithmen und Schaltkreise zu bilden, die komplexe Berechnungen durchführen."
  },
  {
    q: "Nenne die wichtigsten Werkzeuge für Mechanistic Interpretability.",
    a: "1. Circuit Analysis: Identifikation von Mini-Modulen\n2. Activation Patching: Kausale Analyse durch Intervention\n3. Feature Visualization: Sichtbarmachen interner Repräsentationen\n4. Logit Lens: Einsicht in Layer-weise Vorhersagen\n5. Ablation Studies: Entfernung und Analyse von Komponenten"
  },
  {
    q: "Welche Rolle spielen 'Basis-Prompts' und 'Quell-Prompts' beim Activation Patching?",
    a: "Base Prompt: Eine Eingabe, auf der das Modell einen Fehler macht (falsche Antwort)\nSource Prompt: Eine Eingabe, auf der das Modell die richtige Antwort gibt\nDieser Kontrast ermöglicht es, präzise zu isolieren, welche Komponenten für die Fehlerbehebung verantwortlich sind."
  },
  {
    q: "Erkläre das Konzept der 'kontinuierlichen Fortschrittsmaße' im Kontext von Grokking.",
    a: "Statt eines plötzlichen Sprungs vom Fehler zum Erfolg gibt es kontinuierliche Fortschrittsmaße, die die graduellen Veränderungen in den Netzwerkgewichten zeigen. Diese Maße können durch mechanistisches Interpretability identifiziert werden und offenbaren, wie die Struktur des Netzwerks sich während des Grokking-Phänomens entwickelt."
  },
  {
    q: "Was bedeutet es, wenn Activation Patching einen Fehler 'behebt'?",
    a: "Es bedeutet, dass die ersetzte Komponente kausal verantwortlich für das Verhalten ist. Wenn das Netzwerk die richtige Antwort gibt, nachdem man die Aktivierung einer Komponente mit der aus einer korrekten Vorhersage ersetzt hat, dann ist klar, dass diese Komponente für das ursprüngliche fehlerhafte Verhalten zuständig war."
  },
  {
    q: "Wie kann man die Ergebnisse von Logit Lens praktisch nutzen?",
    a: "Mit Logit Lens kann man:\n1. Fehlerhafte Schichten identifizieren - wenn die Vorhersage in einer Schicht plötzlich falsch wird\n2. Verstehen, wie Information durch das Netzwerk fließt\n3. Layer-spezifisches Debugging durchführen\n4. Feststellen, wo Konzepte 'kristallisieren' (zu stabilen Vorhersagen werden)"
  },
  {
    q: "Was ist die Implikation der Cross-Lingualen Inkonsistenz für MLM-Design und Evaluierung?",
    a: "Sie zeigt, dass oberflächliche Metriken (Test-Genauigkeit über Sprachen hinweg) nicht ausreichen. Mit Mechanistic Interpretability kann man zeigen, dass:\n1. Modelle oberflächlich mehrsprachig wirken\n2. Aber intern sprachspezifische Fehler haben\n3. Diese Fehler systematisch in bestimmten Komponenten entstehen\nDies hat Implikationen für die Verbesserung von MLM-Qualität und -Sicherheit."
  },
  {
    q: "Erkläre die Verbindung zwischen Mechanistic Interpretability und Model Safety.",
    a: "Mechanistic Interpretability ermöglicht es, Fehler und problematische Verhaltensweisen zu verstehen und zu lokalisieren. Durch Activation Patching kann man bestimmen, welche Komponenten für unsicherere Ausgaben verantwortlich sind. Dies eröffnet die Möglichkeit, gezielt auf Komponenten-Ebene zu intervenieren, um Modell-Sicherheit zu verbessern."
  },
  {
    q: "Warum ist Reverse-Engineering von neuronalen Netzen schwierig?",
    a: "1. Skala: Große Modelle haben Milliarden von Parametern und versteckte Neuronen\n2. Komplexität: Nicht-lineare Aktivierungen und überlagerte Computationen\n3. Emergenz: Verhalten entsteht aus Zusammenspiel vieler Komponenten\n4. Interpretation: Man muss sicherstellen, dass die identifizierten Mechanismen wirklich kausal sind, nicht nur korreliert"
  },
  {
    q: "Was ist die Zukunft von Mechanistic Interpretability?",
    a: "Potenzielle Entwicklungen:\n1. Bessere Tools zur automatischen Circuit-Identifikation\n2. Skalierung von Methoden auf größere Modelle\n3. Integration mit Training-Prozessen (interpretierbare Modelle von Grund auf trainieren)\n4. Anwendung auf Vision Models und Multi-Modale Modelle\n5. Nutzung für Model Editing und Alignment"
  }
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
