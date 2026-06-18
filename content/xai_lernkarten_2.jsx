import { useState } from "react";

const TOPIC_TITLE = "Feature Importance Explanations I";
const TOPIC_DESCRIPTION = "Removal-basierte Methoden, lineare Modelle, Partial Dependence Plots und mehr";
const LECTURE_NUM = "3";
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
    title: "Motivation & Setup",
    color: "#EEEDFE",
    border: "#534AB7",
    text: "#3C3489",
    points: [
      "Nach dem Training eines ML-Modells stellen verschiedene Personen unterschiedliche Fragen",
      "Engineer fragt: 'Warum wurde diese Prediction falsch gemacht?'",
      "Domain Expert fragt: 'Wie kam das Modell zu dieser Conclusion?'",
      "User fragt: 'Warum wurde mein Kreditantrag abgelehnt?'",
      "Feature Importance-Ansatz beantwortet diese Fragen: 'How does each feature affect the model?'",
      "Drei Zutaten einer XAI-Erklärung: Model (prädiktives Modell), Data (einzelnes Beispiel oder Datensatz), Question (was soll verstanden werden?)",
      "Feature Importance ist das, was die meisten Menschen intuitiv mit XAI assoziieren — der Klassiker unter den Erklärungsansätzen",
    ],
  },
  {
    title: "Notation & Formale Grundlagen",
    color: "#E6F1FB",
    border: "#185FA5",
    text: "#0C447C",
    points: [
      "Input features: x ∈ X mit d Features → x = (x₁, x₂, ..., x_d)",
      "Response variable: y ∈ Y (das Label / der Output)",
      "Predictive model: f : X → Y",
      "Bei Klassifikation: f_y(x) = Wahrscheinlichkeit für Klasse y",
      "Loss function: l(ŷ, y) — Log-Loss für Classification, MSE für Regression",
      "Subset: S ⊆ D = {1, ..., d} (Teilmenge der Feature-Indizes)",
      "Complement: S̄ = D \\ S (alle Features NICHT in S)",
      "Feature Subset: x_S = {xᵢ : i ∈ S} (nur Features aus Teilmenge S)",
      "Diese Notation ist die Basis aller Formeln — besonders der Unterschied zwischen dem Subset S (Indizes) und x_S (die zugehörigen Featurewerte)",
    ],
  },
  {
    title: "Definitionen: Attribution, Selection & Scope",
    color: "#E1F5EE",
    border: "#0F6E56",
    text: "#085041",
    points: [
      "Model Explanation: Versuch zu erklären, warum ein Modell eine Vorhersage getroffen hat",
      "Feature Importance Explanation: Fokus auf die Rolle jedes einzelnen Features",
      "Explanation Algorithm: Methode, die Erklärungen aus Input-Daten + ML-Modell generiert",
      "Feature Attribution: Jedes Feature xᵢ bekommt einen numerischen Score aᵢ ∈ ℝ — zeigt STÄRKE und RICHTUNG (positiv/negativ)",
      "Beispiel Attribution: 'Hohes Einkommen erhöht die Kreditgenehmigungswahrscheinlichkeit um +0.35'",
      "Feature Selection: Eine Teilmenge x_S ⊆ {x₁,...,x_d} wichtiger Features wird identifiziert — binäre Aussage: wichtig oder nicht wichtig",
      "Beispiel Selection: 'Die 3 wichtigsten Features sind: Einkommen, Kredithistorie, Alter'",
      "Local Explanation: Erklärt eine einzelne Prediction für ein konkretes Datenbeispiel",
      "Global Explanation: Erklärt das allgemeine Verhalten des Modells über den gesamten Datensatz",
    ],
  },
  {
    title: "Removal-based Explanations — Kernidee",
    color: "#FBEAF0",
    border: "#993556",
    text: "#72243E",
    points: [
      "Kernidee: Um die Wichtigkeit eines Features zu verstehen, entferne es und beobachte, wie sich die Prediction verändert",
      "Starke Veränderung = Feature ist wichtig",
      "Keine Veränderung = Feature ist irrelevant",
      "Die Richtung der Veränderung ist dabei ebenfalls relevant",
      "Problem: Modelle erwarten alle Features als Input — Feature-Entfernung muss SIMULIERT werden",
      "Option 1: Auf Zero setzen (Occlusion)",
      "Option 2: Zufallswert einsetzen (Permutation / Random)",
      "Option 3: Unscharf machen (Blurring für Bilder)",
      "Option 4: Separates Modell trainieren (Separate Models)",
      "Option 5: Generatives Modell nutzen",
      "Ablation Study: Evaluierung eines AI/ML-Systems durch Entfernen einzelner Systemkomponenten zur Quantifizierung ihres Beitrags — gleiche Grundidee auf System-Ebene statt Feature-Ebene",
      "Diese Grundidee ist der gemeinsame Nenner von 26+ XAI-Methoden, darunter SHAP, LIME, Permutation Tests und Occlusion",
    ],
  },
  {
    title: "Permutation Tests",
    color: "#FAECE7",
    border: "#993C1D",
    text: "#712B13",
    points: [
      "Ursprünglich für Random Forests entwickelt — bestimmt die globale Feature Importance",
      "Vorgehen Schritt 1: Evaluiere Modellgenauigkeit auf originalen Daten → Baseline",
      "Vorgehen Schritt 2: Für jedes Feature i einzeln — randomisiere / permutiere die Spalte i im Datensatz",
      "Vorgehen Schritt 3: Miss den Accuracy-Abfall (Increase in Loss)",
      "Vorgehen Schritt 4: Wichtigkeit = Differenz vor und nach der Permutation",
      "Formel intuitiv: aᵢ = Acc(original) − Acc(xᵢ permutiert)",
      "Formel detailliert: aᵢ = (1/n) Σ l(f(x¹,...,x^d), y) − (1/n) Σ l(f(x¹,...,x̃ᵢ,...,x^d), y)",
      "x̃ᵢ ist die permutierte (randomisierte) Version von Feature i",
      "Vorteile: Model-agnostic, kontinuierliche & kategorische Features möglich, schnell und einfach zu implementieren",
      "Kein erneutes Modell-Training nötig",
      "Permutation Tests liefern globale Erklärungen — Wichtigkeit wird über den gesamten Datensatz gemittelt, nicht für einzelne Beispiele",
    ],
  },
  {
    title: "Occlusion",
    color: "#EAF3DE",
    border: "#3B6D11",
    text: "#27500A",
    points: [
      "Früher Ansatz für Deep Learning / CNNs (Zeiler & Fergus, 2014) — erklärt individuelle Predictions von Image Classifiern",
      "Superpixel: Ergebnis einer perceptual grouping von Pixeln = Image Oversegmentation",
      "Semantisch zusammengehörige Pixel werden zu einer Gruppe zusammengefasst — wichtig, weil einzelne Pixel nicht unabhängig sind",
      "Vorgehen Schritt 1: Vorhersage mit vollständigem Input treffen → Baseline",
      "Vorgehen Schritt 2: Für jedes Feature (oder Bildbereich) — ersetze Feature i durch uninformative Werte (Zero / Black Square)",
      "Vorgehen Schritt 3: Miss die Änderung der Vorhersagewahrscheinlichkeit",
      "Formel intuitiv: aᵢ = f_y(x) − f_y(x₍₋ᵢ₎)",
      "Formel detailliert: aᵢ = f_y(x₁,...,x_d) − f_y(x₁,..., 0 ,...,x_d)",
      "Kosten: d + 1 Modellauswertungen pro Prediction",
      "Wichtige Einschränkung: Occlusion ist nur perfekt korrekt, wenn alle Features unabhängig sind",
      "In Bildern können Nachbarpixel fehlende Info rekonstruieren — deshalb: bedeutsame Superpixel statt einzelner Pixel entfernen",
      "Funktioniert mit jedem Modell (auch Nicht-Bilddaten) — einfach zu implementieren",
      "Liefert lokale Erklärungen für einzelne Beispiele",
    ],
  },
  {
    title: "Vergleich: Permutation Tests vs. Occlusion",
    color: "#FAEEDA",
    border: "#854F0B",
    text: "#633806",
    points: [
      "Auf den ersten Blick sehr unterschiedliche Methoden",
      "Permutation Tests: ursprünglich für Random Forests, global, randomisiere Werte, Dataset Loss",
      "Occlusion: für CNNs und Bilder, lokal, setze auf Zero, Individual Prediction",
      "Trotzdem folgen BEIDE demselben Grundprinzip: Remove → Observe → Measure",
      "Dimension 1 — Feature Removal: Permutation randomisiert Werte | Occlusion setzt auf Zero",
      "Dimension 2 — Model Behavior: Permutation misst Dataset Loss | Occlusion misst Individual Prediction",
      "Dimension 3 — Summarization: Beide entfernen einzelnes Feature",
      "Der Hauptunterschied: Permutation misst Accuracy-Abfall über VIELE Samples (global) | Occlusion misst Prediction-Änderung für EIN Sample (lokal)",
      "Dieser Vergleich zeigt, warum das Removal-based Framework entstand — um solche Parallelen sichtbar zu machen",
    ],
  },
  {
    title: "Removal-based Explanations Framework (Covert et al., 2021)",
    color: "#F1EFE8",
    border: "#5F5E5A",
    text: "#444441",
    points: [
      "Covert, Lundberg & Lee 2021 — 'Explaining by Removing: A Unified Framework for Model Explanation' veröffentlicht in JMLR",
      "Vereint 26+ Methoden: SHAP, LIME, Permutation Tests, Occlusion und viele mehr",
      "Kernidee: Neue Explanation-Methoden entstehen durch Kombination von 3 Design Choices",
      "Design Choice ① — Feature Removal: Wie werden Features entfernt?",
      "Feature Removal Optionen: Default values (Zero / Mean), Random values (Permutation / Sampling), Separate models pro Feature-Teilmenge",
      "Weitere Optionen: Modell akzeptiert missing features, Blurring (für Bilder), Generative model",
      "Design Choice ② — Model Behavior: Welches Verhalten wird erklärt?",
      "Model Behavior Optionen: Individual Prediction ŷ, Prediction Loss l(ŷ, y), Dataset Loss E[l(ŷ, y)], Prediction mean loss",
      "Design Choice ③ — Summarization Technique: Wie wird der Feature-Einfluss kommuniziert?",
      "Summarization Optionen: Feature Attribution (numerischer Score pro Feature), Feature Selection (Subset wichtiger Features)",
      "Weitere Optionen: Shapley value (spezielle gewichtete Attribution — benötigt Game Theory Background), Additive model (z. B. LIME)",
      "26+ Methoden = 26+ Kombinationen dieser drei Design Choices",
      "Das Framework hilft nicht nur, bestehende Methoden zu verstehen — es erlaubt auch, bewusst neue Methoden durch neue Kombinationen zu entwerfen",
    ],
  },
  {
    title: "Vor- und Nachteile der Permutation Feature Importance",
    color: "#E1F5EE",
    border: "#0F6E56",
    text: "#085041",
    points: [
      "VORTEILE:",
      "✅ Klare Interpretation: Feature Importance = Anstieg des Modellfehlers, wenn die Feature-Information zerstört wird",
      "✅ Interaction-aware: Berücksichtigt automatisch alle Interaktionen mit anderen Features",
      "✅ Model-agnostic: Funktioniert mit JEDEM Modell — kein Zugriff auf Interna nötig",
      "✅ Kein Retraining: Das Modell muss nicht neu trainiert werden",
      "NACHTEILE:",
      "❌ Ground Truth erforderlich: Zugang zu echten Labels (True Outcomes) nötig",
      "❌ Zufälligkeit: Permutation fügt Randomness hinzu → Ergebnisse können variieren",
      "❌ Unrealistische Datenpunkte (Korrelation!): Permutation erzeugt unnatürliche Kombinationen",
      "Beispiel: Körpergröße & Gewicht korreliert → Permutation → 2m-Person mit 30 kg",
      "❌ Importance Splitting (Korrelation!): Stark korreliertes Feature B teilt die Importance von Feature A",
      "Beispiel Importance Splitting: Temperatur 8:00 Uhr ist Top-Feature. Nach Hinzufügen von Temperatur 9:00 Uhr teilen beide die Importance",
      "Keine Feature landet mehr in Top-3 — Wichtige Features können im Ranking 'verschwinden'",
      "Das Importance-Splitting-Problem hat praktische Konsequenzen: Man könnte relevante Features bei teuren Fehler-Checks übersehen, weil sie im Ranking zu weit unten stehen",
    ],
  },
];

const MNEMONICS = [
  {
    title: "XAI Ingredients",
    mnemonic: "MDQ\nM = Model (prädiktives Modell, auch Black-Box)\nD = Data (einzelnes Beispiel oder gesamter Datensatz)\nQ = Question (was soll verstanden werden?)",
    keywords: ["Ingredients", "Model", "Data", "Question"],
  },
  {
    title: "Feature Importance Methoden",
    mnemonic: "RASPS\nR = Removal-based (entferne Feature → beobachte Änderung)\nA = Attribution vs. Selection (Score vs. Subset)\nS = Scope: Local vs. Global (ein Beispiel vs. Datensatz)\nP = Propagation-based (Sensitivität zu kleinen Änderungen)\nS = Shapley values (Game Theory basiert)",
    keywords: ["Removal", "Attribution", "Scope", "Propagation", "Shapley"],
  },
  {
    title: "Permutation Tests",
    mnemonic: "PRMS\nP = Permutation (randomisiere Feature-Spalte)\nR = Random Forests (ursprüngliche Motivation)\nM = Model-agnostic (funktioniert überall)\nS = Score basiert auf Accuracy-Abfall",
    keywords: ["Permutation", "Random Forest", "Model-agnostic", "Global"],
  },
  {
    title: "Occlusion",
    mnemonic: "OZSC\nO = Occlusion (verdecke / setze auf Zero)\nZ = Zero oder Black Square als Ersatz\nS = Superpixel (nicht einzelne Pixel!)\nC = CNN / Image Classification (Ursprung)",
    keywords: ["Occlusion", "Zero", "Superpixel", "Image Classification"],
  },
  {
    title: "Design Choices Framework",
    mnemonic: "RMS\n① Removal: Wie werden Features entfernt? (Zero, Permutation, Blurring, ...)\n② Model Behavior: Was wird erklärt? (Prediction, Loss, Dataset Loss)\n③ Summarization: Wie wird kommuniziert? (Attribution, Selection, Shapley, ...)",
    keywords: ["Removal", "Model Behavior", "Summarization", "Framework"],
  },
  {
    title: "Permutation Probleme",
    mnemonic: "CUIS\nC = Correlation (erzeugt unnatürliche Kombinationen)\nU = Unrealistic (2m-Person mit 30 kg)\nI = Importance Splitting (korrelierte Features teilen sich Score)\nS = \"Verschwinden\" im Ranking (relevante Features ganz unten)",
    keywords: ["Korrelation", "Unrealistisch", "Importance Splitting", "Ranking"],
  },
  {
    title: "Local vs. Global",
    mnemonic: "LOGM\nL = Local: eine einzelne Prediction (Occlusion)\nO = Observation: warum wurde THIS Beispiel so klassifiziert?\nG = Global: alle Predictions im Datensatz (Permutation Tests)\nM = Model behavior: allgemeines Verhalten verstehen",
    keywords: ["Local", "Global", "Individual", "Dataset"],
  },
  {
    title: "Feature Removal Optionen",
    mnemonic: "DBSG\nD = Default values (Zero, Mean)\nB = Blurring (für Bilder, Unschärfe)\nS = Sampling / Random values (Permutation)\nG = Generative model (komplexere Simulation)",
    keywords: ["Default", "Blurring", "Sampling", "Generative Model"],
  },
];

const FLASHCARDS = [
  {
    q: "Was ist der Unterschied zwischen Feature Attribution und Feature Selection?",
    a: "Feature Attribution:\n  → Jedes Feature xᵢ bekommt Score aᵢ ∈ ℝ\n  → Zeigt Stärke UND Richtung des Einflusses\n  → Bsp: 'Hohes Einkommen erhöht P(Kredit) um +0.35'\n\nFeature Selection:\n  → Teilmenge x_S wichtiger Features wird identifiziert\n  → Binäre Aussage: wichtig / nicht wichtig\n  → Bsp: 'Wichtigste Features: {Einkommen, Alter, Kredithistorie}'\n\nMerkregel: Attribution = Score | Selection = Subset",
  },
  {
    q: "Was ist der Unterschied zwischen Local und Global Explanation?",
    a: "Local Explanation:\n  → Erklärt eine einzelne Prediction für ein konkretes Datenbeispiel\n  → Bsp: 'Warum wurde MEIN Kreditantrag abgelehnt?'\n\nGlobal Explanation:\n  → Erklärt das allgemeine Verhalten des Modells\n  → Bsp: 'Welches Feature ist im Allgemeinen am wichtigsten?'\n\nZuordnung:\n  Permutation Tests → Global (über Datensatz gemittelt)\n  Occlusion → Local (für ein einzelnes Beispiel)",
  },
  {
    q: "Erkläre das Vorgehen bei Permutation Tests Schritt für Schritt!",
    a: "1. Evaluiere Modellgenauigkeit mit originalen Daten (Baseline)\n2. Für jedes Feature i einzeln:\n   a. Randomisiere/permutiere die Spalte i\n   b. Miss den Accuracy-Abfall\n3. Importance: aᵢ = Acc(original) − Acc(xᵢ permutiert)\n\nDetaillierte Formel:\naᵢ = (1/n)Σl(f(...,xⱼ,...),y) − (1/n)Σl(f(...,x̃ᵢ,...),y)\n\nKerneigenschaften:\n  • Scope: Global  |  Removal: Random sampling\n  • Model-agnostic, kein Retraining nötig",
  },
  {
    q: "Erkläre das Vorgehen bei Occlusion Schritt für Schritt!",
    a: "1. Vorhersage mit vollständigem Input (Baseline)\n2. Für jedes Feature i:\n   a. Ersetze Feature i durch Zero (0)\n   b. Miss die Änderung der Prediction\n3. Importance: aᵢ = f_y(x) − f_y(x₍₋ᵢ₎)\n   Detailliert: aᵢ = f_y(x₁,...,x_d) − f_y(x₁,...,0,...,x_d)\n\nKosten: d + 1 Modellauswertungen\n\nAchtung:\n  ⚠ Nur korrekt wenn Features unabhängig!\n  → Superpixel statt Pixel verwenden",
  },
  {
    q: "Nenne und erkläre die 3 Design Choices im Removal-based Framework! (Covert et al., 2021)",
    a: "① Feature Removal — WIE wird ein Feature entfernt?\n   Optionen: Zero, Random sampling, Blurring,\n   Separate models, Generative model\n\n② Model Behavior — WELCHES Verhalten wird erklärt?\n   Optionen: Prediction, Prediction Loss,\n   Dataset Loss\n\n③ Summarization — WIE wird Einfluss kommuniziert?\n   Optionen: Feature Attribution (Score),\n   Feature Selection (Subset),\n   Shapley value, Additive model\n\n→ 26+ Methoden = 26+ Kombinationen!",
  },
  {
    q: "Vergleiche Permutation Tests und Occlusion im Removal-based Framework!",
    a: "DIMENSION          │ PERM. TEST          │ OCCLUSION\n───────────────────┼─────────────────────┼──────────────────────\nFeature Removal    │ Random sampling     │ Set to Zero\nModel Behavior     │ Dataset loss        │ Individual prediction\nSummarization      │ Remove single feat. │ Remove single feat.\n\nFazit: Gleiche Grundstruktur — unterschiedliche Implementierungen.\nPermutation → global (über Datensatz gemittelt)\nOcclusion → local (für ein einzelnes Beispiel)",
  },
  {
    q: "Was ist ein Superpixel und warum ist er bei Occlusion wichtig?",
    a: "Superpixel =\n  Zusammenhängende Gruppe von Pixeln durch\n  perceptual grouping (Image Oversegmentation)\n\nProblem bei einzelnen Pixeln:\n  Benachbarte Pixel sind NICHT unabhängig.\n  Ein entfernter Pixel kann durch Nachbarn\n  rekonstruiert werden → kein echter Info-Verlust!\n\nLösung:\n  Bedeutsame Superpixel (semantische Bereiche)\n  entfernen → echter Informationsverlust.\n\nMerkregel:\n  Occlusion ist nur dann korrekt wenn Features\n  unabhängig sind — Pixel nie, Superpixel eher.",
  },
  {
    q: "Was ist eine Ablation Study?",
    a: "Definition:\n  Evaluierung eines AI/ML-Systems durch\n  Entfernen einzelner Komponenten.\n\nZiel:\n  Den Beitrag jeder Komponente zum\n  Gesamtsystem quantifizieren.\n\nVorgehen:\n  System vollständig testen → Baseline\n  System ohne Komponente X testen\n  Differenz = Beitrag von X\n\nVerwandtschaft mit Removal-based XAI:\n  Gleiches Grundprinzip:\n  'Entferne etwas → messe Auswirkung'\n  Aber: Systemkomponenten statt Features",
  },
  {
    q: "Welche zwei Probleme entstehen bei Permutation Tests mit korrelierten Features?",
    a: "Problem 1 — Unrealistische Datenpunkte:\n  Permutation erzeugt unmögliche Kombinationen.\n  Bsp: Körpergröße & Gewicht korreliert:\n  → Permutation → 2m-Person mit 30 kg!\n  → Modell wird auf Daten evaluiert, die\n    in der Realität nie vorkommen.\n\nProblem 2 — Importance Splitting:\n  Korreliertes Feature B teilt die Importance\n  von Feature A.\n  Bsp: Temperatur 8:00 Uhr = wichtigstes Feature.\n  + Temperatur 9:00 Uhr (stark korreliert):\n  → Beide teilen sich die Importance\n  → Keine landet mehr in Top-3!\n  → Relevante Features 'verschwinden' im Ranking.",
  },
  {
    q: "Nenne 4 bekannte Methoden aus dem Removal-based Framework!",
    a: "Methoden mit Shapley Value Summarization:\n  → SHAP, KernelSHAP, TreeSHAP, LossSHAP, SAGE\n     (benötigen Game Theory Hintergrund)\n\nMethoden mit Feature Attribution:\n  → Permutation Test (Random, Dataset Loss)\n  → Occlusion (Zeros, Individual Prediction)\n  → PredDiff (Conditional, Prediction)\n\nMethoden mit Additive Model:\n  → LIME Images (Default values)\n  → LIME Tabular (Replacement distribution)\n\nMethoden mit Feature Selection:\n  → L2X, REAL-X, INVASE, MIR, EP",
  },
  {
    q: "Welche vier Typen von XAI-Questions werden in der Vorlesung unterschieden?",
    a: "① Which features are important?\n   → Feature Importance Explanations\n   (Thema von Lecture 3)\n\n② Which concepts are important?\n   → Concept-based Explanations\n\n③ Which data samples are important?\n   → Example-based Explanations\n\n④ How much does a sample contribute\n  to model training?\n   → Training Data Attribution /\n     Data Influence\n\nXAI Ingredients: Model + Data + Question",
  },
  {
    q: "Nenne 3 Vorteile der Permutation Feature Importance!",
    a: "✅ Klare Interpretation:\n  Feature Importance = Anstieg des Modellfehlers\n  wenn Feature-Information zerstört wird.\n\n✅ Model-agnostic:\n  Funktioniert mit JEDEM Modell\n  (Random Forest, Neural Network, SVM, ...)\n  → Kein Zugriff auf Modell-Interna nötig!\n\n✅ Kein Retraining:\n  Das Modell wird NICHT neu trainiert.\n  Nur Inferenz mit veränderten Features.\n\nBonus:\n✅ Interaction-aware:\n  Berücksichtigt automatisch alle Interaktionen\n  mit anderen Features.",
  },
  {
    q: "Welche 2 Nachteile der Permutation Feature Importance sind am schwerwiegendsten?",
    a: "Nachteil 1 — Korrelation / Unrealistische Datenpunkte:\n  Permutation erzeugt unnatürliche Kombinationen\n  durch die Zerstörung von Abhängigkeiten.\n  Bsp: 2m-Person mit 30 kg ist in echten Daten unmöglich.\n  → Modell evaluiert auf Out-of-Distribution-Daten.\n\nNachteil 2 — Importance Splitting:\n  Stark korrelierte Features teilen sich\n  die Importance-Score.\n  → Relevante Features können im Ranking\n    'verschwinden' und übersehen werden.\n  → Praktisches Problem: teuer, wenn man\n    Top-Features für Fehlerchecks braucht.",
  },
  {
    q: "Was ist die zentrale Idee des Removal-based Explanations Framework?",
    a: "Zentrale Idee:\n  Alle Removal-basierten Methoden folgen einer\n  gemeinsamen Struktur mit 3 Design Choices:\n\n1. Feature Removal: WIE entfernen?\n   (Zero, Permutation, Blurring, Generative Model, ...)\n\n2. Model Behavior: WELCHES Verhalten?\n   (Individual Prediction, Loss, Dataset Loss, ...)\n\n3. Summarization: WIE kommunizieren?\n   (Attribution Score, Selection, Shapley, Additive, ...)\n\nGenius des Framework:\n  → 26+ existierende Methoden sind einfach\n     verschiedene Kombinationen dieser 3 Choices\n  → Neue Methoden durch neue Kombinationen\n  → Unified Understanding aller Methoden",
  },
  {
    q: "Was verstehst du unter 'Model Behavior' im Removal-based Framework?",
    a: "Model Behavior definiert WELCHES Verhalten des Modells\nwir durch das Entfernen eines Features beobachten:\n\nOption 1 — Individual Prediction f_y(x):\n  → Veränderung der Vorhersage für EIN Beispiel\n  → Lokal\n  → Occlusion nutzt dies\n\nOption 2 — Prediction Loss l(ŷ, y):\n  → Fehler für ein einzelnes Beispiel\n  → Lokal, misst Genauigkeit\n\nOption 3 — Dataset Loss E[l(ŷ, y)]:\n  → Durchschnittlicher Fehler über ganzen Datensatz\n  → Global\n  → Permutation Tests nutzen dies\n\nOption 4 — Conditional Expectation:\n  → Andere Varianten je nach Kontext\n\nDie Wahl hier entscheidet Local vs. Global!",
  },
  {
    q: "Erkläre den Unterschied zwischen den Feature-Removal-Optionen im Framework!",
    a: "① Default Values (Zero / Mean):\n  Setze Feature auf Konstante (meist 0 oder Mittelwert)\n  Pro: Einfach\n  Contra: Kann Out-of-Distribution sein\n\n② Random Sampling / Permutation:\n  Zufallswert aus Training-Datensatz oder Verteilung\n  Pro: Realistischer\n  Contra: Zerstört Abhängigkeiten\n\n③ Separate Models:\n  Trainiere Modell nur ohne dieses Feature\n  Pro: Sehr realistisch\n  Contra: Teuer, mehrfaches Training\n\n④ Blurring (für Bilder):\n  Unscharfmachen statt Löschen\n  Pro: Natürlicher für Bilder\n  Contra: Nicht für Tabular Data\n\n⑤ Generative Model:\n  Nutze VAE/GAN um realistische Werte zu samplen\n  Pro: Sehr realistisch, erhält Abhängigkeiten\n  Contra: Komplex, zeitaufwändig",
  },
  {
    q: "Warum funktioniert Permutation Feature Importance trotz der Korrelationsprobleme?",
    a: "Permutation Importance IST model-agnostic und gibt aussagekräftige\nErgebnisse, weil:\n\n1. Empirisch sehr praktisch:\n   Funktioniert in der Praxis überraschend gut,\n   auch mit korrelierten Features.\n\n2. Testet 'wie würde sich das Modell verhalten,\n  wenn dieses Feature zufällig wäre':\n   → Dadurch wird die relative Wichtigkeit\n      gegenüber anderen Features gemessen\n   → Nicht absolute, sondern relative Ranking\n\n3. Interaktionen werden automatisch erfasst:\n   Wenn Feature A mit B interagiert,\n   wird diese Interaction im Score sichtbar.\n\nABER:\n  Deshalb heißt es 'trotz der Probleme':\n  → Bei hohen Korrelationen kann das Ranking\n     verzerrt sein (Importance Splitting)\n  → Man sollte Korrelationen im Datensatz kennen\n  → Alternative: Conditional Feature Importance",
  },
  {
    q: "Erkläre die Notation x_S und S̄!",
    a: "S = Subset der Feature-Indizes\n  → S ⊆ D = {1, 2, ..., d}\n  → Bsp: S = {1, 3} (Indices, nicht Werte!)\n\nx_S = Feature Subset (die echten Werte aus S)\n  → x_S = {xᵢ : i ∈ S}\n  → Bsp: x_S = {x₁, x₃} (actual values!)\n\nS̄ = Complement von S\n  → S̄ = D \\ S (alle Indices NICHT in S)\n  → Bsp wenn S = {1, 3}, dann S̄ = {2, 4, 5, ...}\n\nWichtiger Unterschied:\n  • S = INDEX-MENGE (abstract, Nummern)\n  • x_S = VALUE-MENGE (konkrete Featurewerte)\n\nBeispiel:\n  Datensatz mit 3 Features (d=3)\n  x = (5.2, 3.1, 8.7) (konkrete Werte)\n  S = {1, 3} (indices)\n  x_S = {5.2, 8.7} (Werte von Index 1 und 3)\n  S̄ = {2} (nur Index 2 bleibt)\n  x_S̄ = {3.1}",
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