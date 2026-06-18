import { useState } from "react";

const TOPIC_TITLE = "Shapley Values & SHAP";
const TOPIC_DESCRIPTION = "Kooperative Spieltheorie, Shapley-Axiome, SHAP-Varianten und Anwendungen";
const LECTURE_NUM = "4";
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
    title: "Removal-based Explanations (Recap)",
    border: "#534AB7",
    points: [
      "Feature Importance basiert auf Removal-Strategien: wie werden Features entfernt, was wird erklärt, wie wird zusammengefasst",
      "Feature Removal: Default-Werte, Zufallswerte, Permutation, Occlusion",
      "Model Behavior: einzelne Prediction oder Dataset Loss",
      "Summarization: Feature Attribution oder Feature Selection",
      "Konkrete Methoden: Ablation Study (schrittweise Entfernung), Permutation Test (korrupte Feature-Werte), Occlusion (Bildbereiche verdecken)",
    ],
  },
  {
    title: "Cooperative Game Theory – Grundlagen",
    border: "#0F6E56",
    points: [
      "Shapley Values stammen aus der Cooperative Game Theory (Lloyd Shapley, 1953), nicht von AI/ML",
      "Shapley erhielt 2012 den Nobel Memorial Prize in Economics",
      "Abgrenzung: Non-cooperative Game Theory (z.B. Nash Equilibrium) betrachtet Gegner; Cooperative Game Theory betrachtet Koalitionen",
      "Formale Definition: Set of Players D = {1, ..., d}; Characteristic Function v: 2^D → ℝ weist jeder Coalition S ⊆ D einen Wert zu",
      "Grand Coalition: v(D) = Gesamtwert aller Spieler; Null Coalition: v(∅) = 0",
    ],
  },
  {
    title: "Shapley Values – Idee und Fairness Axioms",
    border: "#185FA5",
    points: [
      "Shapley Values lösen das Credit Allocation Problem: faire Aufteilung des Gewinns der Grand Coalition auf alle Spieler",
      "Efficiency Axiom: Summe aller Credits = v(D) − v(∅), der gesamte Wert wird verteilt",
      "Symmetry Axiom: gleich beitragende Spieler erhalten denselben Credit",
      "Null Player Axiom: Spieler ohne Beitrag erhalten kein Credit",
      "Linearity/Additivity Axiom: Credits verhalten sich linear bei Linearkombinationen von Games",
      "Axiomatic Uniqueness: Shapley Value ist die EINZIGE Funktion, die alle vier Axioms erfüllt",
    ],
  },
  {
    title: "Shapley Value – Formel und Interpretation",
    border: "#993C1D",
    points: [
      "Formel: φ_i(v) = Σ_{S ⊆ D\\{i}} [ |S|!(d−1−|S|)! / d! ] · [ v(S∪{i}) − v(S) ]",
      "v(S∪{i}) − v(S) ist der marginale Beitrag von Spieler i zu Coalition S",
      "Gewichtungsfaktor |S|!(d−1−|S|)!/d! gibt Häufigkeit dieser Coalition-Größe in zufälliger Ordnung an",
      "Alternative: φ_i(v) = (1/d!) · Σ_{π∈Π} marginaler Beitrag von i in Ordnung π",
      "Interpretation: Durchschnitt des marginalen Beitrags über alle möglichen Coalition-Ordnungen",
    ],
  },
  {
    title: "Mapping auf ML: das Apartment-Beispiel",
    border: "#3B6D11",
    points: [
      "Game → Prediction Task für eine einzelne Instanz",
      "Gain/Payout → Aktuelle Prediction minus durchschnittliche Prediction über alle Instanzen",
      "Players → Feature-Werte der erklärenden Instanz",
      "Beispiel Apartment: Features (cat-banned, park-nearby, area-50, floor-2nd), Prediction 300.000€, Durchschnitt 310.000€",
      "Für jedes Feature werden alle 2^(d-1) Coalitions der anderen Features betrachtet",
      "Feature Removal in der Praxis: nicht-koalierte Features durch zufällig gezogene Datensatz-Werte ersetzen (Conditional Expectation approximieren)",
      "Problem: Exponentielles Wachstum 2^d macht exakte Berechnung für viele Features unpraktikabel",
    ],
  },
  {
    title: "SHAP (Shapley Additive exPlanations)",
    border: "#993556",
    points: [
      "SHAP wurde 2017 von Lundberg & Lee (NeurIPS) eingeführt und popularisierte Shapley Values für ML",
      "SHAP erklärt individuelle Predictions durch Feature Attribution",
      "Feature Removal: F(x_S) = E_{x_S̄|x_S}[f(x_S, x_S̄)] – Conditional Expectation gegeben verfügbare Features",
      "Model Behavior: v(S) = F_y(x_S) → Prediction",
      "Summary: a_i = φ_i(v) → Shapley Value mit Efficiency Guarantee",
      "Approximationsverfahren: KernelSHAP (model-agnostisch, gewichtete Regression) und TreeSHAP (model-spezifisch für Bäume, polynomial)",
    ],
  },
  {
    title: "SHAP vs. LIME",
    border: "#854F0B",
    points: [
      "SHAP: Quantitative Feature Attribution – jedes Feature erhält einen numerischen SHAP-Wert",
      "SHAP-Summe = Prediction − Durchschnittsprediction (Efficiency Axiom garantiert vollständige Aufteilung)",
      "SHAP ist theoretisch durch Fairness Axioms fundiert",
      "LIME: Feature Selection/Ranking – antwortet nur auf 'welches Feature ist wichtig?'",
      "LIME: keine faire Aufteilung des Gesamtbeitrags, kein äquivalentes theoretisches Fundament",
      "Vorteil SHAP: vollständig, fair, theoretisch fundiert; Vorteil LIME: einfacher und schneller zu berechnen",
    ],
  },
];

const MNEMONICS = [
  {
    title: "SHAP-Essenz",
    keywords: ["Shape", "Additive", "Fair"],
    mnemonic: `S - Shapley: Faire Credit-Aufteilung aus Spieltheorie
H - How much: Jedes Feature bekommt einen Anteilswert
A - Additive: SHAP-Werte addieren sich exakt zur Abweichung
P - Prediction: Erklärt, warum ein Modell diese Vorhersage machte`,
  },
  {
    title: "Die 4 Fairness Axioms",
    keywords: ["Efficiency", "Symmetry", "Null", "Linearity"],
    mnemonic: `E - Efficiency: Alle Credits summieren zu v(D) − v(∅)
S - Symmetry: Gleiche Beiträge → gleiche Credits
N - Null Player: Kein Beitrag → kein Credit
L - Linearity: Linear in Game-Kombinationen`,
  },
  {
    title: "Coalition-Berechnung",
    keywords: ["2^d", "Marginal", "Exponential"],
    mnemonic: `2^d Coalitions für d Features
Für jede: marginaler Beitrag = v(S∪{i}) − v(S)
Gewichten nach Häufigkeit in zufälliger Ordnung
Problem: exponentiell, für d>15 praktisch unmöglich exakt`,
  },
  {
    title: "Feature Removal im Detail",
    keywords: ["Conditional", "Expectation", "Datensatz"],
    mnemonic: `F(x_S) = E[f(x_S, x_S̄)]
Fixiere verfügbare Features x_S
Nicht-verfügbare Features x_S̄ durch Datensatz-Werte ersetzen
Ergebnis: erwarteter Output gegeben x_S`,
  },
  {
    title: "Removal-Framework (3 Komponenten)",
    keywords: ["Feature", "Model", "Summarization"],
    mnemonic: `Wie entfernen: Default, Zufallswerte, Permutation, Occlusion
Was erklären: einzelne Prediction oder Dataset Loss
Wie zusammenfassen: Feature Attribution (SHAP) oder Selection (LIME)`,
  },
  {
    title: "Apartment-Beispiel (Memory Aid)",
    keywords: ["cat-banned", "park", "area", "floor"],
    mnemonic: `4 Features: Katze verboten, Park nah, Größe 50m², 2. Stock
Prediction: 300k€, Durchschnitt: 310k€, Abweichung: −10k€
Jedes Feature wird über 2³=8 Coalitions der anderen bewertet
Shapley Value = gewichteter Durchschnitt der 8 marginalen Beiträge`,
  },
  {
    title: "SHAP vs. LIME Quick Distinction",
    keywords: ["Fair", "Additive", "Theory"],
    mnemonic: `SHAP: Fair additive exPlanations
  → Jedes Feature: genaue Zahl (positiv/negativ)
  → Summe = exakte Abweichung vom Durchschnitt
  → Fundiert durch Axioms

LIME: Local Interpretable Model-agnostic
  → Nur Ranking: welches Feature zählt?
  → Keine Aufteilung des Gesamteffekts
  → Schneller zu berechnen`,
  },
  {
    title: "KernelSHAP vs. TreeSHAP",
    keywords: ["Model-agnostic", "Polynomial", "Sampling"],
    mnemonic: `KernelSHAP: Sampelt zufällig Coalitions, löst gewichtete Regression
  → Funktioniert auf jedem Modell
  → Langsamer, aber flexibel

TreeSHAP: Nutzt Baumstruktur direkt
  → Nur für Entscheidungsbäume, Gradient Boosting
  → Exakt und polynomial schnell
  → Bevorzugt für baumbasierte Modelle`,
  },
];

const FLASHCARDS = [
  {
    q: "Was sind Shapley Values, und woher stammen sie ursprünglich?",
    a: `Shapley Values sind eine Methode zur fairen Credit Allocation in kooperativen Spielen.

Herkunft: Cooperative Game Theory, Lloyd Shapley (1953)
Nobel Memorial Prize in Economics 2012
Ursprünglich NICHTS mit AI/ML zu tun

Grundidee: Jeder Spieler erhält den gewichteten Durchschnitt
seines marginalen Beitrags über alle möglichen Coalitions.

In ML: Features = Spieler, Prediction = Payout,
Shapley Value = Anteil des Features an der Abweichung vom Durchschnitt`,
  },
  {
    q: "Welche vier Fairness Axioms definieren Shapley Values eindeutig?",
    a: `1. EFFICIENCY:
   Σ_{i∈D} φ_i(v) = v(D) − v(∅)
   Credits summieren exakt zum Grand Coalition Wert

2. SYMMETRY:
   v(S∪{i}) = v(S∪{j}) ∀S  ⟹  φ_i(v) = φ_j(v)
   Gleich beitragende Spieler bekommen gleichen Credit

3. NULL PLAYER:
   v(S∪{i}) = v(S) ∀S  ⟹  φ_i(v) = 0
   Kein Beitrag = kein Credit

4. LINEARITY:
   φ(c₁v₁ + c₂v₂) = c₁φ(v₁) + c₂φ(v₂)
   Lineare Kombination von Games → lineare Credits

AXIOMATIC UNIQUENESS: Dies ist die EINZIGE Funktion φ,
die alle vier Axioms gleichzeitig erfüllt.`,
  },
  {
    q: "Schreibe die Shapley Value Formel auf und erkläre jeden Term.",
    a: `φ_i(v) = Σ_{S ⊆ D\\{i}} [ |S|! · (d−1−|S|)! / d! ] · [ v(S∪{i}) − v(S) ]

TERME:
- v(S∪{i}) − v(S): Marginaler Beitrag von Spieler i zu Coalition S
- |S|!(d−1−|S|)!/d!: Gewichtungsfaktor
  → Gibt an, wie wahrscheinlich diese Coalition-Größe
    in einer zufälligen Ordnung auftritt
- Summe über alle S ⊆ D OHNE Spieler i

RESULTAT: Gewichteter Durchschnitt aller marginalen Beiträge`,
  },
  {
    q: "Erkläre die Interpretation des Shapley Values über Ordnungen (Permutationen).",
    a: `φ_i(v) = (1/d!) · Σ_{π∈Π} [ v({j | π⁻¹(j) ≤ π⁻¹(i)}) − v({j | π⁻¹(j) < π⁻¹(i)}) ]

INTUITION:
- Betrachte alle d! möglichen Ordnungen π der Spieler
- Für jede Ordnung: messe, was Spieler i beiträgt,
  wenn er an seiner Position hinzukommt (zu bereits anwesenden Spielern)
- Der Shapley Value ist der Durchschnitt über alle d! Beiträge

ÄQUIVALENZ: Diese Formulierung ist äquivalent zur Coalition-Formel.
Sie zeigt: Shapley = durchschnittlicher MARGINALER Beitrag über Ordnungen`,
  },
  {
    q: "Wie wird ein ML-Prediction-Problem auf das Cooperative Game Framework gemappt?",
    a: `MAPPING:
Game       → Prediction Task für eine einzelne Instanz
Gain/Payout → Aktuelle Prediction minus durchschnittliche Prediction
Players     → Feature-Werte der erklärenden Instanz

CONCRETE:
v(S) = erwarteter Modelloutput, wenn nur die Features in S bekannt sind
(nicht in S: durch zufällige Datensatz-Werte ersetzt)

ZIEL: Wie viel hat jedes Feature zur Abweichung vom Durchschnitt beigetragen?

EFFICIENCY: Summe aller Shapley Values = Prediction − Durchschnittsprediction`,
  },
  {
    q: "Beschreibe die Shapley Value Berechnung am Apartment-Beispiel für cat-banned.",
    a: `SETUP:
Features: cat-banned, park-nearby, area-50, floor-2nd
Prediction: 300.000€, Durchschnitt: 310.000€
Abweichung: −10.000€

FÜR FEATURE cat-banned:
Betrachte alle 2³ = 8 Coalitions der 3 ANDEREN Features:
∅, {park-nearby}, {area-50}, {floor-2nd},
{park-nearby, area-50}, {park-nearby, floor-2nd},
{area-50, floor-2nd}, {park-nearby, area-50, floor-2nd}

PRO COALITION S:
v(S ∪ {cat-banned}) = Vorhersage MIT cat-banned
v(S) = Vorhersage OHNE cat-banned
→ Differenz = marginaler Beitrag

Features außerhalb S: durch zufällige Datensatz-Werte ersetzen
(approximiert Conditional Expectation)

SHAPLEY VALUE: gewichteter Durchschnitt aller 8 marginalen Beiträge`,
  },
  {
    q: "Was ist SHAP, und wie unterscheidet es sich von exakten Shapley Values?",
    a: `SHAP = Shapley Additive exPlanations (Lundberg & Lee, NeurIPS 2017)
Popularisierte Shapley Values für ML Explainability.

UNTERSCHIED:
Exakte Shapley Values erfordern 2^d Coalition-Auswertungen (exponentiell)
Für viele Features praktisch unmöglich (d = 30 → 10^9 Auswertungen)

SHAP APPROXIMIERT VIA:
1. KernelSHAP: model-agnostisch, gewichtete lineare Regression
   über coalition samples (ähnlich LIME-Prinzip, aber SHAP-konform)

2. TreeSHAP: model-spezifisch für Tree-basierte Modelle
   Exakte Berechnung in polynomieller Zeit O(d²·2^d)

GEMEINSAMKEIT: Beide liefern Feature Attributions a_i = φ_i(v),
die die Shapley Axioms (insbes. Efficiency) erfüllen.`,
  },
  {
    q: "Was ist der Feature Removal Operator F(x_S) in SHAP? Formal und intuitiv.",
    a: `FORMAL:
F(x_S) = E_{x_S̄|x_S}[f(x_S, x_S̄)]
       = Σ_{x_S̄} f(x_S, x_S̄) · p(x_S̄ | x_S)
       mit p(x_S̄ | x_S) = p(x_S, x_S̄) / p(x_S)

INTUITIV:
- Fixiere Instanz x und verfügbare Features x_S
- Für alle möglichen Werte der nicht-verfügbaren Features x_S̄:
  berechne Modelloutput f(x_S, x_S̄)
  gewichte nach Conditional Probability p(x_S̄ | x_S)
→ Ergebnis: erwarteter Modelloutput gegeben x_S

SHAP FRAMEWORK:
1. Feature Removal:  F(x_S) = E_{x_S̄|x_S}[f(x_S, x_S̄)]
2. Model Behavior:   v(S) = F_y(x_S)  → Prediction
3. Summary:          a_i = φ_i(v)     → Shapley Value`,
  },
  {
    q: "Was ist der Unterschied zwischen SHAP und LIME bei Feature Attribution?",
    a: `SHAP:
- Quantitative Feature Attribution
- Jedes Feature erhält einen SHAP-Wert (positiv oder negativ)
- Summe aller SHAP-Werte = Prediction − Durchschnittsprediction (Efficiency)
- Theoretisch fundiert durch die 4 Fairness Axioms
- Höhere Rechenkomplexität
- Antwortet auf: "Wie viel trägt jedes Feature bei?"

LIME (Local Interpretable Model-agnostic Explanations):
- Feature Selection / Ranking: welche Features sind wichtig?
- Keine faire quantitative Aufteilung des Gesamtbeitrags
- Kein Äquivalent zu den Shapley Axioms
- Einfacher und schneller zu berechnen
- Antwortet auf: "Welche Features sind am wichtigsten?"

KERNUNTERSCHIED:
SHAP → "Wie viel?" (mit Fairness-Garantien)
LIME → "Welche?" (nur Ranking)`,
  },
  {
    q: "Warum ist exakte Shapley Value Berechnung für große Feature-Mengen unpraktikabel?",
    a: `PROBLEM:
Anzahl der Coalitions = 2^d (exponentiell in d)
Für jeden Feature-Wert müssen ALL 2^d Coalitions ausgewertet werden

BEISPIELE:
d = 10 Features  → 2^10 = 1.024 Coalitions
d = 20 Features  → 2^20 ≈ 1 Million Coalitions
d = 30 Features  → 2^30 ≈ 1 Milliarde Coalitions

KONSEQUENZ:
Bei d = 30: ~10^9 Modellaufrufe pro Feature
Praktisch unmöglich in akzeptabler Zeit

LÖSUNGEN:
1. Approximation (SHAP):
   - KernelSHAP: sampelt zufällig Coalitions, löst gewichtete Regression
   - TreeSHAP: nutzt Baumstruktur, exakt aber polynomial für Trees

2. Exakte Berechnung nur praktikabel für kleine d (< ~15 Features)`,
  },
  {
    q: "Was sind die drei Komponenten des Removal-based Explanation Frameworks?",
    a: `1. FEATURE REMOVAL – Wie werden nicht-koalierte Features entfernt?
   Ablation:    Ersetze durch Default-Wert (z.B. 0 oder Mittelwert)
   Permutation: Ersetze durch permutierte Datensatz-Werte
   SHAP:        F(x_S) = E_{x_S̄|x_S}[f(x_S, x_S̄)]
                (Conditional Expectation via zufällige Datensatz-Werte)

2. MODEL BEHAVIOR – Was wird erklärt?
   SHAP: v(S) = F_y(x_S) → individuelle Prediction einer Instanz
   Alternative: Dataset Loss, Average Prediction, etc.

3. SUMMARIZATION TECHNIQUE – Wie wird der Einfluss zusammengefasst?
   SHAP:          Feature Attribution via Shapley Value a_i = φ_i(v)
                  (quantitativ, mit Effizienzgarantie)
   Alternative:   Feature Selection (z.B. Top-k wichtigste Features)`,
  },
  {
    q: "Was bedeutet Efficiency als Shapley Axiom, und warum ist es wichtig für ML?",
    a: `FORMAL:
Σ_{i∈D} φ_i(v) = v(D) − v(∅)

BEDEUTUNG:
Die Summe aller Shapley Values der d Features entspricht EXAKT
dem Wert der Grand Coalition minus dem Wert der leeren Coalition.

IN ML:
v(D) = Prediction der erklärenden Instanz
v(∅) = durchschnittliche Prediction über den Datensatz
→ Summe aller SHAP-Werte = Prediction − Durchschnittsprediction

WARUM WICHTIG:
1. Die gesamte Abweichung vom Erwartungswert wird VOLLSTÄNDIG
   und OHNE REST auf alle Features aufgeteilt

2. Es gibt keine "unerklärte" Residualgröße

3. SHAP-Erklärungen sind KONSISTENT und ÜBERPRÜFBAR:
   Man kann die SHAP-Werte einfach addieren und erhält exakt die
   Gesamtabweichung der Prediction vom Durchschnitt

4. Dies unterscheidet SHAP fundamentally von anderen Methoden wie LIME`,
  },
  {
    q: "Erkläre den Unterschied zwischen Non-cooperative und Cooperative Game Theory.",
    a: `NON-COOPERATIVE GAME THEORY:
- Spieler sind Gegner und konkurrieren miteinander
- Jeder Spieler versucht, seinen eigenen Gewinn zu maximieren
- Fokus auf Nash Equilibrium (Gleichgewichtszustand, keine Seite kann einseitig gewinnen)
- Beispiel: "A Beautiful Mind" – Nash Equilibrium in Beziehungen/Strategien

COOPERATIVE GAME THEORY:
- Spieler können Koalitionen bilden und kooperieren
- Gemeinsames Ziel: Gesamtgewinn maximieren
- Fokus auf faire Aufteilung des gemeinsamen Gewinns
- Fragestellung: "Wie viel Credit bekommt jeder Spieler?"

FÜR SHAPLEY VALUES RELEVANT:
Shapley Values adressieren das Credit Allocation Problem in KOOPERATIVEN Games:
Wie teilt man den Gewinn einer Grand Coalition fair auf alle Spieler auf?`,
  },
  {
    q: "Wie funktioniert KernelSHAP technisch?",
    a: `KernelSHAP: Model-agnostische Approximation von Shapley Values

ALGORITHMUS:
1. Generiere zufällige Coalition-Samples:
   - Für jedes Feature: 0 oder 1 mit 50% Wahrscheinlichkeit
   - 0 = Feature nicht in Coalition, 1 = Feature in Coalition
   - Typisch: 1000-5000 Samples statt 2^d exakte Coalitions

2. Für jedes Sample S:
   - Berechne Vorhersage f(x_S, x_S̄)
   - (Features nicht in S: zufällige Datensatz-Werte)
   - Berechne Gewicht: w(S) = (d-1) / (C(d, |S|) · |S| · (d-|S|))
   - C(d,|S|) = Binomialkoeffizient

3. Löse gewichtete lineare Regression:
   y ≈ b_0 + Σ_i a_i · z_i

   mit Gewichten w(S), wobei z_i ∈ {0,1} die Coalition-Zugehörigkeit anzeigt

4. SHAP-Werte ≈ Regressionskoeffizienten a_i

VORTEIL: Funktioniert auf jedem Modell
NACHTEIL: Approximation, nicht exakt; langsamer als TreeSHAP`,
  },
  {
    q: "Was ist TreeSHAP, und wann sollte man es verwenden?",
    a: `TreeSHAP: Model-spezifische Methode für baumbasierte Modelle

FUNKTIONIERT FÜR:
- Entscheidungsbäume
- Random Forests
- Gradient Boosting (XGBoost, LightGBM, CatBoost)

TECHNIK:
- Nutzt direkt die Baumstruktur aus
- Berechnet Shapley Values exakt (nicht approximiert)
- Rechenzeit: O(d² · 2^d) polynom in d (statt 2^d exponentiell)
- Praktisch oft 100-1000x schneller als KernelSHAP

WIE ES FUNKTIONIERT:
- Für jeden Knoten im Baum: berechne Anteil an der Vorhersage
- Aggregiere diese Anteile über alle Bäume/Entscheidungspfade
- Resultat: exakte SHAP-Werte mit Efficiency Guarantee

WANN VERWENDEN:
- Bevorzugte Methode für Tree-basierte Modelle
- Schnell genug auch für große Feature-Mengen
- Exakte Ergebnisse, nicht approximiert`,
  },
  {
    q: "Was ist eine Characteristic Function v in der Cooperative Game Theory?",
    a: `DEFINITION:
Eine Characteristic Function ist eine Funktion v: 2^D → ℝ,
die jeder Coalition S ⊆ D einen reellen Wert zuweist.

2^D = Potenzmenge (Menge aller Subsets von D)
S = eine Coalition (Subset von Spielern)
v(S) = der Wert/Gewinn dieser Coalition

BEISPIELE:
- Leere Coalition: v(∅) = 0 (keine Spieler, kein Gewinn)
- Single Player {i}: v({i}) = individueller Wert von i
- Grand Coalition D: v(D) = Gesamtwert aller Spieler
- Subset S: v(S) = Wert, den Coalition S OHNE die anderen erzielen kann

IN ML:
- D = Menge aller Features
- S = Subset von Features (in der Coalition)
- v(S) = erwartete Vorhersage, wenn nur Features aus S verfügbar sind

EIGENSCHAFTEN:
- Typisch angenommen: v(∅) = 0 (normalized game)
- v ist beliebig definierbar (beliebige reelle Werte für jedes S)
- v charakterisiert das gesamte Game vollständig`,
  },
  {
    q: "Erkläre anhand des Apartment-Beispiels, warum Feature Removal praktisch zufällige Datensatz-Werte verwendet.",
    a: `PROBLEM MIT FIXEN DEFAULT-WERTEN:
Wenn man ein Feature auf 0 oder Mittelwert setzt, ändert sich nicht nur
dessen Beitrag, sondern auch die Feature-Abhängigkeiten (Korrelationen).

BEISPIEL (Apartment):
- Feature: area-50 (Wohnfläche 50m²)
- Default auf 0: Unnatürlich, unrealistische Instanz
- Modell sieht: Wohnfläche 0 + park-nearby + floor
  → Vorhersage könnte völlig verfälscht sein

LÖSUNG: ZUFÄLLIGE DATENSATZ-WERTE
Ersetze area-50 mit zufälligen ECHTEN Wohnflächenwerten aus dem Datensatz
→ Realistische Feature-Abhängigkeiten bleiben erhalten

MATHEMATISCH:
F(x_S) = E_{x_S̄|x_S}[f(x_S, x_S̄)]

p(x_S̄ | x_S) = Conditional Probability – wie wahrscheinlich sind die
nicht-verfügbaren Features GEGEBEN die verfügbaren?

APPROXIMATION:
In der Praxis: ziehe x_S̄ zufällig aus dem Datensatz (empirische Approximation
der bedingten Verteilung) und bilde Durchschnitt

WARUM BESSER:
Respektiert natürliche Feature-Korrelationen
Ergebnisse sind realistischer und interpretierbarer`,
  },
  {
    q: "Was ist eine 'Null Coalition' und ein 'Null Player' in der Spieltheorie?",
    a: `NULL COALITION:
Die leere Coalition ∅ (kein Spieler dabei)
v(∅) = 0 (kein Gewinn ohne Spieler)
Dies ist eine Standard-Annahme (normalisiertes Spiel)

NULL PLAYER (Spieler i mit Null-Eigenschaft):
Ein Spieler i wird "Null Player" genannt, wenn:
v(S ∪ {i}) = v(S) für ALLE Coalitions S ⊆ D ohne i

Bedeutung: Der Spieler leistet KEINEN marginalen Beitrag zu IRGENDWELCHEN Coalitions
Er trägt nichts zum Spielwert bei, egal in welcher Coalition er hinzukommt

NULL PLAYER AXIOM:
Wenn i ein Null Player ist, sollte sein Shapley Value 0 sein:
φ_i(v) = 0

INTUITION:
Ein Spieler, der niemals etwas beiträgt, sollte auch keine Credits bekommen.

IN ML:
Ein Feature könnte ein "Null Player" sein, wenn es keinen Einfluss auf
die Prediction hat, egal in welcher Coalition von anderen Features.
→ Dessen SHAP-Wert ist immer 0 (korrekt!)`,
  },
  {
    q: "Wie interpretiert man positive und negative SHAP-Werte?",
    a: `SHAP-WERT: Maßzahl für den Beitrag eines Features zur Prediction

POSITIVE SHAP-Werte:
- Feature trägt zur Erhöhung der Prediction bei
- Prediction > Durchschnittsprediction
- Beispiel: cat-banned = true → niedriger Apartment-Preis
  Wenn SHAP-Wert negativ ist, zieht Feature den Preis runter

NEGATIVE SHAP-Werte:
- Feature trägt zur Senkung der Prediction bei
- Beispiel: area-50 = kleine Wohnfläche → negativer SHAP-Wert
  (zieht Preis nach unten relativ zum Durchschnitt)

MAGNITUDE (Absolutwert):
|SHAP-Wert| = wie stark der Einfluss ist
Großer Wert = großer Einfluss auf Prediction

INTERPRETATION:
"Gegeben alle anderen Features, hat dieses Feature um X zur Abweichung
der Prediction vom Durchschnitt beigetragen."

EFFICIENCY CHECK:
Σ aller SHAP-Werte = Prediction − Durchschnittsprediction
→ Man kann alle SHAP-Werte addieren und erhält die gesamte Abweichung

ACHTUNG:
SHAP-Wert ≠ Feature Importance (z.B. Tree Split Count)
SHAP-Wert = individueller Beitrag zur konkreten Prediction`,
  },
  {
    q: "Welche praktischen Herausforderungen gibt es bei der Anwendung von SHAP?",
    a: `HERAUSFORDERUNG 1: Rechenzeit
- KernelSHAP: Langsam für viele Features (>30-50)
- TreeSHAP: Schnell nur für baumbasierte Modelle
- Deep Learning: Keine native Unterstützung, Approximationen nötig

HERAUSFORDERUNG 2: Abhängigkeitsstruktur
- Conditional Expectation schwer zu approximieren
- Feature-Korrelationen können zu unrealistischen Instanzen führen
- Zufälliges Sampling aus Datensatz ist nur Näherung

HERAUSFORDERUNG 3: Große Feature-Mengen
- Bei d > 100 Features wird SHAP sehr langsam
- Must-Have: Feature Selection oder Dimensionalitätsreduktion vorab

HERAUSFORDERUNG 4: Interpretierbarkeit
- SHAP-Werte sind mathematisch exakt, aber nicht immer intuitiv
- Nutzer erwarten oft einfachere Erklärungen (z.B. "dieses Feature ist wichtig")
- Kann zu Überinterpretation führen

HERAUSFORDERUNG 5: Abhängigkeit vom Durchschnitt
- SHAP vergleicht zur durchschnittlichen Prediction
- Bei skewed Daten oder Outliers kann Durchschnitt misleading sein

LÖSUNGEN:
- TreeSHAP für baumbasierte Modelle verwenden
- KernelSHAP mit weniger Samples für schnellere Approximation
- Feature Engineering und Selection vorab
- Visualisierungen nutzen (SHAP Plots) für bessere Interpretierbarkeit`,
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
