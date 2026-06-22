'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';

const EXAM_DATE = "29. Juni – 3. Juli 2026";

const EXAM_TIPS = [
  { icon: "✓", text: "Präzise und korrekte Antworten direkt auf die Frage — keine Umschweife" },
  { icon: "✓", text: "XAI-Terminologie aktiv verwenden: explanandum, SHAP, faithfulness, etc." },
  { icon: "✓", text: "Immer: Characteristics, Advantages, Disadvantages einer Methode nennen" },
  { icon: "✓", text: "Klare Struktur: Erst Definition, dann Funktionsweise, dann Einordnung" },
  { icon: "✓", text: "Thought Experiments: XAI in konkretem Szenario → welche Methode, warum?" },
];

const EXAM_TOPICS = [
  {
    id: 1,
    lernkarteId: 1,
    slideRef: "VL 02",
    title: "Einführung in XAI",
    examHints: "Motivation, XAI Ingredients, Types of XAI, Terminology, XQI Taxonomy, Evaluation",
    color: "#534AB7",
    bg: "#EEEDFE",
    questions: [
      {
        q: "Was ist Explainable AI (XAI) und warum brauchen wir es?",
        a: "XAI ist ein Forschungsbereich, der Methoden entwickelt, um ML-Modellentscheidungen für Menschen verständlich zu machen.\n\nGründe:\n• Legal/Ethisch: GDPR 'right to explanation', Nicht-Diskriminierung\n• Vertrauen: Nutzer und Stakeholder müssen Modellentscheidungen vertrauen können\n• Debugging: Entwickler müssen Modellverhalten analysieren und verbessern können\n• High-Stakes Anwendungen: Medizin, Finanzen, Rechtsprechung\n\nSpannung: Leistungsfähigste Modelle (Deep Learning, Ensemble) sind oft Black Boxes.",
      },
      {
        q: "Was sind die drei 'Ingredients' (Zutaten) von XAI?",
        a: "Die drei Ingredients nach der Vorlesung:\n\n1. MODEL: Das ML-Modell, das erklärt werden soll (Black Box oder interpretierbar)\n2. DATA: Die Daten, auf denen das Modell trainiert wurde / die als Input dienen\n3. QUESTION: Die spezifische Erklärungsfrage des Nutzers\n\n→ Eine XAI-Methode muss alle drei berücksichtigen. Verschiedene Fragen an dasselbe Modell erfordern verschiedene Erklärungsansätze.",
      },
      {
        q: "Was sind die drei Haupttypen von XAI-Erklärungen?",
        a: "Drei Typen nach Thema der Erklärung:\n\n1. Importance of Features: Welche Input-Features haben die Entscheidung beeinflusst? (z.B. SHAP, LIME, Permutation Importance)\n\n2. Importance of Concepts: Welche höherstufigen Konzepte (nicht einzelne Features) beeinflussen das Modell? (z.B. Concept Activation Vectors, TCAV)\n\n3. Importance of Samples: Welche Trainingsbeispiele haben die Entscheidung beeinflusst? (z.B. Influence Functions, Prototypen)",
      },
      {
        q: "Erkläre den Unterschied zwischen explainability, interpretability, explanation und justification.",
        a: "Terminologie nach der Vorlesung:\n\n• Interpretability: Grad, zu dem ein Mensch die Ursache einer Entscheidung verstehen kann. Eigenschaft eines Modells.\n• Explainability: Fähigkeit, das interne Verhalten eines Modells in menschenverständlicher Form darzustellen. Aktiver Prozess.\n• Explanation: Das konkrete Ergebnis einer XAI-Methode – z.B. eine Feature-Wichtigkeitsliste.\n• Justification: Begründung/Rechtfertigung einer Entscheidung, oft ohne Details zum internen Mechanismus.\n\nSchlüssel: Interpretability ist eine Eigenschaft des Modells, Explainability ist ein Prozess.",
      },
      {
        q: "Was bedeuten explanandum, explanans, explainer und explainee?",
        a: "Die vier XAI-Rollen/Komponenten:\n\n• Explanandum: Das zu Erklärende – die Entscheidung/Vorhersage des Modells, die erklärt werden soll\n• Explanans: Die Erklärung selbst – der Inhalt, der das Explanandum erklärt\n• Explainer: Die Methode oder Person, die die Erklärung liefert (XAI-System)\n• Explainee: Die Person/Gruppe, die die Erklärung empfängt (z.B. Arzt, Entwickler, Laie)\n\n→ Wichtig: Die Qualität einer Erklärung hängt stark vom Explainee ab!",
      },
      {
        q: "Erkläre die XQI Taxonomy mit ihren fünf Dimensionen.",
        a: "XQI Taxonomy klassifiziert XAI-Methoden nach:\n\n1. SCOPE: Global (gesamtes Modell) vs. Local (einzelne Entscheidung)\n2. RESULT: Feature importance, Concept importance, Example-based, etc.\n3. FORMAT: Text, Bild, Feature-Wert, Regel, Prototyp\n4. FUNCTIONING: Model-agnostic vs. Model-specific; Post-hoc vs. Intrinsic\n5. STAGE: Pre-model, In-model, Post-model\n\nAnwendung: SHAP wäre: Local/Global, Feature importance, Numerisch, Model-agnostic, Post-hoc",
      },
      {
        q: "Was sind die Vor- und Nachteile von Blackbox-Modellen?",
        a: "Vorteile (Blackbox / komplexe Modelle):\n• Höhere Genauigkeit auf komplexen Aufgaben\n• Keine Annahmen über Datenstruktur nötig\n• Gut für unstrukturierte Daten (Bilder, Text)\n\nNachteile:\n• Keine inhärente Interpretierbarkeit\n• Schwer zu debuggen und zu vertrauen\n• Rechtliche Probleme (GDPR, Compliance)\n• Fehler schwer zu erkennen und zu beheben\n\n→ Trade-off: Accuracy vs. Interpretability – je nach Anwendung unterschiedlich gewichten",
      },
      {
        q: "Was sind die Typen von XAI Evaluation?",
        a: "Drei Evaluationstypen:\n\n1. Application-grounded: Evaluation mit echten Endnutzern im echten Anwendungskontext – goldstandard, aber teuer\n\n2. Human-grounded: Evaluation mit Menschen, aber vereinfachter Aufgabe (Crowd-Worker statt Domänenexperten)\n\n3. Functionally-grounded: Evaluation ohne Menschen, mit formalen Proxies (z.B. Faithfulness-Metriken, Simulierbarkeitsscores)\n\n→ Trade-off: Realismus vs. Aufwand/Kosten",
      },
      {
        q: "Welche Anforderungen und Ziele verfolgt Transparenz in ML-Systemen? Diskutiere verschiedene Transparenz-Grade.",
        a: "Transparenz-Grade in ML-Systemen:\n\n1. ALGORITHMISCHE TRANSPARENZ: Zugrundeliegendes Modelldesign ist nachvollziehbar (z.B. Entscheidungsbaum)\n2. DATEN-TRANSPARENZ: Verwendete Datenquellen und Qualität sind dokumentiert\n3. ENTSCHEIDUNGS-TRANSPARENZ: Einzelne Vorhersagen werden erklärt\n\nAnforderungen entstehen durch:\n• Regulatorische Vorgaben (GDPR, AI Act)\n• Ethische Anforderungen (Fairness, Nicht-Diskriminierung)\n• Praktischer Bedarf in sicherheitskritischen Domänen\n\nVorteil höherer Transparenz: Bessere Kontrolle und Vertrauen\nNachteil: Kann Komplexität erhöhen und proprietäre Modellgeheimnisse gefährden\n\n→ Richtiger Grad hängt von Anwendungskontext und Stakeholder-Anforderungen ab",
      },
      {
        q: "Erkläre den Unterschied zwischen Model-Level und Instance-Level Explanations. Wann ist welche geeignet?",
        a: "Model-Level Explanations:\n• Erklären Gesamtverhalten des trainierten Modells (global)\n• Beantworten: 'Welche Features sind generell wichtig?'\n• Geeignet für: Modellvalidation, Debugging, Bias-Erkennung\n• Nachteil: Durchschnittliche Erklärungen können irreführend sein\n\nInstance-Level Explanations:\n• Erklären einzelne spezifische Vorhersagen (local)\n• Beantworten: 'Warum wurde DIESER Patient als krank klassifiziert?'\n• Geeignet für: Endnutzer-Vertrauen, regulatorisches Erklärungsrecht (GDPR Art. 22), Fehleranalyse\n• Nachteil: Hoher Rechenaufwand für viele Instanzen\n\n→ Beide ergänzen sich optimal: Model-Level für globales Verständnis, Instance-Level für konkrete Entscheidungen",
      },
      {
        q: "Diskutiere die Scope-Dimension der XQI Taxonomy: Model-specific vs. Model-agnostic. Praktische Implikationen?",
        a: "Model-specific Methoden:\n• Nutzen Internals des Modells (Gradienten, Gewichte, Aktivierungen)\n• Beispiele: Saliency Maps (CNN), Attention Weights (Transformer)\n• Vorteil: Höhere Genauigkeit, effizient, tieferes Verständnis\n• Nachteil: Nicht auf andere Modelltypen übertragbar\n\nModel-agnostic Methoden:\n• Behandeln das Modell als Black-Box, brauchen nur Input/Output-Zugang\n• Beispiele: LIME, SHAP (KernelSHAP), Permutation Importance\n• Vorteil: Universell anwendbar, flexibel, modellunabhängig\n• Nachteil: Weniger präzise, höherer Rechenaufwand\n\nWahl abhängig von: Verfügbaren Ressourcen, Modellkomplexität, Genauigkeitsanforderung und ob Modell-Internals zugänglich sind",
      },
      {
        q: "Erkläre den Zusammenhang zwischen XAI-Ingredients (Model, Data, Question) und dem triadic Framework (Explanandum, Explanans, Explainer).",
        a: "XAI-Ingredients bilden die Basis:\n• MODEL: das zu erklärende System\n• DATA: die Eingaben\n• QUESTION: die Erklärungsfrage des Nutzers\n\nTriadic Framework präzisiert:\n• EXPLANANDUM: das zu erklärende Phänomen (= spezifische Vorhersage)\n• EXPLANANS: die Erklärfaktoren (= Feature-Werte, Konzepte)\n• EXPLAINER: der Agent, der erklärt (= XAI-Methode)\n\nZusammenhang: Die QUESTION bestimmt, welche Ingredients-Kombination relevant ist.\n\nBeispiel: Gleiche Vorhersage, unterschiedliche Question → anderes Explanandum:\n• Arzt: 'Warum Tumor?' → lokale Erklärung\n• Regulierer: 'Ist das Modell fair?' → globale Erklärung\n\n→ Verschiedene Stakeholder brauchen verschiedene Erklärungen für dasselbe Modell",
      },
    ],
  },
  {
    id: 2,
    lernkarteId: 2,
    slideRef: "VL 03",
    title: "Feature Importance Explanations I",
    examHints: "Removal-based vs. propagation-based, local vs. global, feature attribution vs. selection, permutation tests, occlusion",
    color: "#0F6E56",
    bg: "#E1F5EE",
    questions: [
      {
        q: "Was ist der Unterschied zwischen removal-based und propagation-based explanations?",
        a: "Removal-based explanations:\n• Entfernen oder maskieren Features und messen die Auswirkung auf die Modellausgabe\n• Beispiele: Permutation Importance, LIME, SHAP, Occlusion\n• Model-agnostic möglich\n• Rechenintensiv bei vielen Features\n\nPropagation-based explanations:\n• Propagieren den Output-Fehler oder die Aktivierung zurück durch das Netzwerk\n• Beispiele: Gradient-based saliency, GradCAM, LRP, DeconvNet\n• Model-specific (nur für NN)\n• Schneller, aber Interpretation schwieriger\n\nSchlüsselunterschied: Removal ändert Input, Propagation analysiert den Informationsfluss im Modell",
      },
      {
        q: "Was ist der Unterschied zwischen model importance explanation und feature importance explanation?",
        a: "Feature Importance Explanation:\n• Bewertet, wie viel jede einzelne Feature zur Vorhersage beigetragen hat\n• Bezieht sich auf eine spezifische Vorhersage (local) oder das gesamte Modell (global)\n• Ergebnis: Ranking oder Gewichtung von Features\n• Beispiel: 'Das Gehalt war der wichtigste Faktor für die Kreditentscheidung'\n\nModel Importance Explanation:\n• Bewertet die Wichtigkeit von Features über das gesamte Modellverhalten\n• Aggregiert über viele Instanzen\n• Zeigt, was das Modell generell gelernt hat\n• Beispiel: 'Der Entscheidungsbaum nutzt primär Feature X'\n\nSchlüssel: Local vs. Global Scope",
      },
      {
        q: "Was bedeutet local vs. global explanation? Gib Beispiele.",
        a: "Local explanation:\n• Erklärt eine einzelne spezifische Vorhersage\n• 'Warum wurde dieser Patient als krank klassifiziert?'\n• Methoden: LIME, local SHAP\n• Vorteil: Konkreter Bezug, für Endnutzer verständlich\n• Nachteil: Kein Überblick über Gesamtmodellverhalten\n\nGlobal explanation:\n• Erklärt das Gesamtverhalten des Modells\n• 'Welche Features sind insgesamt am wichtigsten?'\n• Methoden: Global feature importance, Partial Dependence Plots\n• Vorteil: Modellverständnis auf hoher Ebene\n• Nachteil: Kann nicht einzelne Vorhersagen erklären",
      },
      {
        q: "Was ist der Unterschied zwischen feature attribution und feature selection?",
        a: "Feature Attribution:\n• Weist jedem Feature einen Attributionswert zu (positiv/negativ/neutral)\n• Continuous Score: Wie stark beeinflusst Feature X die Entscheidung?\n• Ergebnis: Gewichtetes Ranking aller Features\n• Beispiel: SHAP-Werte, Gradientenbasierte Saliency Maps\n\nFeature Selection:\n• Binäre Entscheidung: Ist Feature X relevant oder nicht?\n• Typisch für Vorverarbeitung / Dimensionsreduktion\n• Keine Gewichtung, nur In/Out\n• Beispiel: Lasso Regression, Mutual Information\n\nSchlüssel: Attribution = Wie viel? Selection = Ob überhaupt?",
      },
      {
        q: "Erkläre den Permutation Test als XAI-Methode. Wie funktioniert er, was sind Vor- und Nachteile?",
        a: "Permutation Importance:\n1. Trainiere Modell und berechne Baseline-Performance\n2. Permutiere (mische) die Werte eines Features zufällig\n3. Berechne neue Performance auf permutierten Daten\n4. Feature Importance = Performance-Abfall\n5. Wiederhole für alle Features\n\nVorteile:\n• Model-agnostic\n• Keine Gradientenberechnung nötig\n• Intuitiv verständlich\n\nNachteile:\n• Korrelierte Features können sich gegenseitig beeinflussen\n• Extrapolation außerhalb des Datenbereichs möglich\n• Rechenintensiv (n_features × n_permutations)\n• Globale Methode (kein Local Explanation möglich)",
      },
      {
        q: "Was ist Occlusion als XAI-Methode und wann wird sie eingesetzt?",
        a: "Occlusion (Verdeckung):\n• Verdecke/ersetze einen Bereich des Inputs (z.B. Bildpatch) mit Nullen oder Durchschnittswert\n• Berechne Modellausgabe mit verdecktem Input\n• Feature Importance = Abfall in der Confidence\n• Schiebe Patch über das gesamte Bild (sliding window)\n\nHeatmap: Bereiche mit großem Confidence-Abfall = wichtig für Klassifikation\n\nTypische Anwendung: Bildklassifikation (CNNs)\n\nVorteile:\n• Intuitiv und visuell interpretierbar\n• Model-agnostic\n\nNachteile:\n• Rechenintensiv (O(n_pixel))\n• Patchgröße beeinflusst Ergebnis stark\n• Kontexteffekte durch Verdeckung möglich",
      },
      {
        q: "Vergleiche Removal-based und Propagation-based Explanations hinsichtlich Rechenkomplexität und Anwendungsfall. Wann ist welche vorzuziehen?",
        a: "Removal-based (z.B. Permutation, SHAP, Occlusion):\n• Messen Auswirkung durch Entfernen/Maskieren von Features\n• Nutzen tatsächlichen Modell-Output\n• Model-agnostic möglich\n• Vorteil: Hohe Interpretierbarkeit, direkt validierbar\n• Nachteil: Hoher Rechenaufwand (mehrfache Forward-Passes), kann Feature-Abhängigkeiten vernachlässigen\n\nPropagation-based (z.B. Gradient Saliency, GradCAM, LRP):\n• Analysieren Informationsfluss durch das Modell via Backpropagation\n• Vorteil: Effizient (ein Backward-Pass), analytisch präzise\n• Nachteil: Model-specific, kann bei spärlichen Gradienten irreführend sein\n\nWahl:\n• Black-Box Modell / hohe Genauigkeit → Removal-based\n• Echtzeitanforderungen / NN-Internals zugänglich → Propagation-based",
      },
      {
        q: "Erkläre, warum der Permutation Test bei korrelierten Features problematisch sein kann. Welche Lösungen gibt es?",
        a: "Problem mit korrelierten Features:\nWenn Feature A und Feature B stark korreliert sind und permutiert wird A, bleiben B-Werte realistisch – das Modell kann dennoch über B ähnliche Vorhersagen machen. Das führt zu unterschätzter Wichtigkeit von A.\n\nUmgekehrt: Wenn man erst A dann B permutiert, variieren Ergebnisse je nach Reihenfolge → Order Bias\n\nLösungsansätze:\n1. Conditional Permutation: Permutiere A gegeben B (respektiert Abhängigkeitsstruktur)\n2. Ensemble-Permutation: Mehrfach permutieren und mitteln\n3. Shaley Values: Alle Feature-Koalitionen berücksichtigen (methodisch sauberer)\n4. Korrelationsanalyse vorab: Korrelierte Features identifizieren und gemeinsam betrachten\n\nPraktisch: Permutation Importance trotzdem nützlich als schnelle Approximation, aber Ergebnisse bei korrelierten Features mit Vorsicht interpretieren",
      },
      {
        q: "Beschreibe Varianten der Occlusion-Methode. Warum ist die Wahl der Patch-Größe und des Ersatz-Werts kritisch?",
        a: "Occlusion-Varianten:\n1. Feste Patch-Größe (sliding window): Einfach, aber grob\n2. Variable Patch-Größe: Feinere Auflösung möglich, aber rechenintensiver\n3. Superpixel-basiert: Segmentiere semantisch sinnvolle Regionen (z.B. mit SLIC), okludiere ganze Objekte\n4. Random Occlusion (RISE): Zufällige Masken statt systematisch\n\nWarum Patch-Größe kritisch:\n• Zu klein: Rauschen dominiert, Ergebnis instabil\n• Zu groß: Wichtige Bildregionen überspannen mehrere Patches → verwaschene Heatmap\n• Kompromiss hängt von Bildauflösung und Aufgabe ab\n\nWarum Ersatz-Wert kritisch:\n• Nullen/Grau: Kann unnatürliche Modell-Reaktionen auslösen (out-of-distribution)\n• Durchschnitt des Datensatzes: Realistischer, aber Feature-Kontext geht verloren\n• Blur: Sanftere Transition, semantisch sinnvoller\n\n→ Schlechte Wahl erzeugt Artefakte, nicht echte Feature-Wichtigkeit",
      },
      {
        q: "Diskutiere den Zusammenhang zwischen Feature Attribution und Fairness/Bias-Erkennung in ML-Modellen.",
        a: "Feature Attribution zur Bias-Erkennung:\nGlobale Feature-Attributionen zeigen, ob das Modell auf geschützte Merkmale (Geschlecht, Herkunft, Alter) angewiesen ist.\n\nVorgehen:\n1. Trainiere Modell\n2. Berechne globale Feature Importance (z.B. SHAP Global, Permutation)\n3. Prüfe: Haben sensible Attribute hohe Importance?\n4. Analysiere: Sind Entscheidungen für verschiedene Gruppen unterschiedlich erklärt?\n\nBeispiel: Kreditmodell hat 'Postleitzahl' als wichtigstes Feature → möglicherweise Proxy für ethnische Zugehörigkeit (Redlining)\n\nLimitierungen:\n• Hohe Importance ≠ unfaire Entscheidung (kann legitim sein)\n• Proxy-Diskriminierung schwer zu erkennen (Feature selbst neutral)\n• Local vs. Global: Global erklärt Muster, Local zeigt individuelle Fälle\n\n→ Feature Attribution ist notwendig aber nicht hinreichend für vollständige Fairness-Analyse",
      },
    ],
  },
  {
    id: 3,
    lernkarteId: 3,
    slideRef: "VL 04",
    title: "Shapley Values & SHAP",
    examHints: "Grundidee, Fairness-Axiome, von Cooperative Game Theory zu ML, SHAP, KernelSHAP, TreeSHAP",
    color: "#185FA5",
    bg: "#E6F1FB",
    questions: [
      {
        q: "Was ist die Grundidee von Shapley Values und woher stammt sie?",
        a: "Ursprung: Cooperative Game Theory (Lloyd Shapley, 1953)\n\nGrundidee: Wie verteilt man den Gewinn einer Koalition fair auf alle Spieler?\n→ Angewandt auf XAI: Features = Spieler, Modellvorhersage = Gewinn\n\nShapley Value eines Features = durchschnittlicher Beitrag dieses Features über alle möglichen Feature-Koalitionen.\n\nBerechnung: Betrachte alle möglichen Teilmengen der anderen Features, berechne den Marginaleffekt des Features für jede Teilmenge, gewichte und mittele.\n\nWichtig: Exakte Berechnung ist 2^n aufwendig → Approximationen notwendig",
      },
      {
        q: "Nenne und erkläre die vier Fairness-Axiome der Shapley Values.",
        a: "Die vier Axiome (notwendig und hinreichend für eine faire Auszahlung):\n\n1. EFFICIENCY: Die Summe aller Shapley Values = Gesamtbeitrag (v(N) - v(∅))\n   → Vorhersage kann vollständig auf Features aufgeteilt werden\n\n2. SYMMETRY: Zwei Features mit identischem Beitrag in allen Koalitionen erhalten denselben Shapley Value\n   → Keine willkürliche Bevorzugung\n\n3. DUMMY (Nullspieler): Ein Feature, das in keiner Koalition beiträgt, erhält den Shapley Value 0\n\n4. ADDITIVITY (Linearität): Shapley Value(f1+f2) = Shapley Value(f1) + Shapley Value(f2)\n   → Für additive Kombinationen von Spielen\n\n→ Shapley Values sind die EINZIGE Lösung, die alle vier Axiome erfüllt.",
      },
      {
        q: "Was ist SHAP und wie unterscheidet es sich von rohen Shapley Values?",
        a: "SHAP (SHapley Additive exPlanations, Lundberg & Lee 2017):\n• Verwendet Shapley Values als Grundlage\n• Fügt additive Feature Attribution als formales Framework hinzu\n• Vereinheitlicht viele XAI-Methoden unter einem gemeinsamen Framework\n\nWichtige Eigenschaften:\n• Local accuracy: Erklärt jede Vorhersage präzise\n• Missingness: Fehlende Features erhalten SHAP-Value 0\n• Consistency: Wenn Feature in retrainetem Modell mehr beiträgt, steigt SHAP-Value\n\nPraktisch: Visualisierung als Beeswarm Plots, Force Plots, Waterfall Plots\n\nVorteil gegenüber rohen Shapley Values: Effiziente Approximationsalgorithmen (KernelSHAP, TreeSHAP)",
      },
      {
        q: "Was ist KernelSHAP und wie funktioniert es?",
        a: "KernelSHAP (Lundberg & Lee 2017):\n• Model-agnostic Approximation von SHAP-Werten\n• Basiert auf LIME Framework mit SHAP-spezifischem Kernel\n\nVorgehen:\n1. Sampling: Zufällige Teilmengen der Features wählen\n2. Prediction: Modellvorhersage für maskierte Inputs berechnen\n3. Gewichtung: SHAP-Kernel gewichtet Koalitionen (extremale Koalitionen bekommen höheres Gewicht)\n4. Regression: Weighted Linear Regression löst das Optimization Problem\n\nVorteile: Model-agnostic, theoretisch fundiert\nNachteile: Rechenintensiv, Approximationsfehler bei wenig Samples",
      },
      {
        q: "Was ist TreeSHAP und warum ist es schneller als KernelSHAP?",
        a: "TreeSHAP (Lundberg et al. 2018):\n• Model-specific Algorithmus für baumbasierte Modelle (Random Forest, XGBoost, etc.)\n• Exakte Berechnung der SHAP-Werte in polynomialer Zeit O(TLD²) statt exponentialer Zeit\n\nWie? Ausnutzen der Baumstruktur:\n• Für jeden Knoten im Baum kann der Beitrag eines Features analytisch berechnet werden\n• Keine Sampling-Approximation nötig\n• Nutzt Path-dependent Conditional Expectation\n\nVorteile: Schnell, exakt (kein Approximationsfehler), erklärt auch Interaktionen\nNachteile: Nur für Baummodelle, nicht model-agnostic",
      },
      {
        q: "Erkläre das Additivity-Axiom der Shapley Values und warum es für Ensemble-Modelle besonders relevant ist.",
        a: "Additivity-Axiom:\nFür zwei unabhängige Spiele v₁ und v₂ gilt: φᵢ(v₁ + v₂) = φᵢ(v₁) + φᵢ(v₂)\n\nBedeutung für ML: Wenn ein Modell als Summe zweier unabhängiger Funktionen darstellbar ist, können Shapley Values modular berechnet und addiert werden.\n\nRelevanz für Ensemble-Modelle:\n• Random Forest = Summe von Entscheidungsbäumen\n• SHAP (TreeSHAP) nutzt dieses Axiom: Shapley Values des Forests = Summe der Shapley Values jedes Baums\n• Ermöglicht effiziente, konsistente Erklärungen für komplexe Ensembles\n\nVorteil: Skalierbarkeit und Konsistenz über viele Teilmodelle\nNachteil: Gilt nur bei echter Unabhängigkeit der Teilmodelle – Interaktionen werden nicht vollständig erfasst\n\n→ Ist Basis für SHAP's Fähigkeit, beliebig komplexe additive Modelle zu erklären",
      },
      {
        q: "Was ist der Dummy-Axiom bei Shapley Values? Gib ein Praxisbeispiel und erkläre, warum dieses Axiom für XAI wichtig ist.",
        a: "Dummy-Axiom (Null Player Axiom):\nEin Feature, das in KEINER Koalition einen Marginaleffekt hat (v(S ∪ {i}) = v(S) für alle S), erhält Shapley Value = 0.\n\nPraxisbeispiel:\n• Kreditmodell mit Feature 'Schuhgröße' – hat keinen Einfluss auf Kreditwürdigkeit\n• In allen möglichen Feature-Koalitionen trägt Schuhgröße 0 bei\n• → SHAP-Wert = 0\n\nWarum wichtig für XAI:\n1. Verhindert, dass bedeutungslose Features künstlich wichtig erscheinen\n2. Garantiert: Keine Erklärung irrelevanter Features in Begründungen\n3. Unterscheidet SHAP von anderen Methoden (z.B. Random Forest Feature Importance kann irrelevante Features bewerten)\n4. Korrektheitsgarantie: Erklärt nur was wirklich relevant ist\n\n→ Zusammen mit Efficiency-Axiom: SHAP-Werte erklären vollständig und korrekt, was das Modell tut",
      },
      {
        q: "Diskutiere Approximationsmethoden für Shapley Values. Welche Kompromisse entstehen bei Sampling-basierten Ansätzen?",
        a: "Exakte Shapley-Berechnung: O(2^n) – bei n=20 Features schon 1 Million Koalitionen → unpraktikabel\n\nApproximationsmethoden:\n1. Monte-Carlo Sampling: Zufällige Teilmengen auswählen und mitteln → O(k * n) für k Samples\n2. KernelSHAP: LIME-ähnliches gewichtetes Sampling mit SHAP-Kernel\n3. TreeSHAP: Exakt für Bäume (kein Approximationsfehler)\n4. DeepSHAP: Approximation für tiefe Netze via Backpropagation\n\nKompromisse bei Sampling:\n• Varianz: Wenige Samples → instabile Erklärungen, Konfidenzintervalle breit\n• Bias: Unvollständiges Sampling → systematische Fehler bei bestimmten Feature-Kombinationen\n• Konvergenzgeschwindigkeit: Langsam bei Modellen mit starken Feature-Interaktionen\n• Rechenaufwand: k Samples × Modell-Forward-Pass-Zeit\n\nPraktisch: 1000-2000 Samples oft ausreichend. Immer Konfidenzintervalle mit angeben!",
      },
    ],
  },
  {
    id: 4,
    lernkarteId: 4,
    slideRef: "VL 05",
    title: "Feature Importance Explanations II",
    examHints: "Removal-based Framework, drei Design Choices, PredDiff, RISE, LIME, Local Surrogate Models",
    color: "#993C1D",
    bg: "#FAECE7",
    questions: [
      {
        q: "Was ist das Removal-based Explanation Framework und was sind die drei Design Choices?",
        a: "Das Framework (Covert et al., 2021) vereinheitlicht removal-based Methoden:\n\nGrundprinzip: Entferne Features und messe den Effekt auf die Modellausgabe.\n\nDie drei Design Choices:\n\n1. FEATURE REMOVAL APPROACH: Wie werden Features entfernt/ersetzt?\n   • Zeroing, Blurring, Mean-imputation, Marginalization, conditional\n\n2. MODEL BEHAVIOR: Welche Modellausgabe wird gemessen?\n   • Prediction, Loss, Confidence, Log-Odds\n\n3. SUMMARIZATION TECHNIQUE: Wie wird über viele Koalitionen zusammengefasst?\n   • Averaging (Shapley), Maximum, Thresholding\n\n→ LIME, SHAP, PredDiff, RISE sind alle spezielle Instanzen dieses Frameworks",
      },
      {
        q: "Was ist PredDiff und wie funktioniert es?",
        a: "PredDiff (Prediction Difference Analysis, Zintgraf et al. 2017):\n\nIdee: Messe den Unterschied in der Vorhersage, wenn ein Feature entfernt wird.\n\nVorgehen:\n1. Berechne Baseline-Vorhersage mit allen Features\n2. Marginalisiere ein Feature (ersetze durch bedingte Erwartung)\n3. PredDiff = Vorhersage_vollständig - Vorhersage_ohne_Feature\n\nBesonderheit: Verwendet bedingte Marginalisierung statt einfachem Ersetzen → berücksichtigt Feature-Korrelationen\n\nVorteile: Theoretisch fundiert, berücksichtigt Korrelationen\nNachteile: Berechnung der bedingten Erwartung schwierig, rechenintensiv",
      },
      {
        q: "Was ist LIME, wie funktioniert es und was sind die Vor- und Nachteile?",
        a: "LIME (Local Interpretable Model-Agnostic Explanations, Ribeiro et al. 2016):\n\nGrundidee: Approximiere lokal das komplexe Modell durch ein einfaches, interpretierbares Modell.\n\nVorgehen:\n1. Wähle eine Instanz x, die erklärt werden soll\n2. Generiere Datenvariationen (Perturbationen) um x\n3. Hole Modellvorhersagen für alle Variationen\n4. Gewichte Variationen nach Nähe zu x\n5. Trainiere gewichtetes lineares Modell als lokaler Surrogate\n6. Koeffizienten = Feature Importance\n\nVorteile: Model-agnostic, intuitiv, lokal treu\nNachteile: Instabil (zufällige Sampling), keine Faithfulness-Garantie global, Perturbations out-of-distribution",
      },
      {
        q: "Was sind Local Surrogate Models? Beschreibe den vollständigen Prozess.",
        a: "Local Surrogate Models:\nEinfache, interpretierbare Modelle, die das komplexe ML-Modell lokal approximieren.\n\nProzess:\n1. Wähle Instanz x (zu erklärende Vorhersage)\n2. Sample Datenvariationen in der Nähe von x\n3. Hole Labels vom Blackbox-Modell (nicht Ground-Truth!)\n4. Gewichte Samples nach Nähe zu x (Kernel-Funktion)\n5. Trainiere interpretierbares Modell (Linear, Decision Tree) auf gewichteten Samples\n6. Extrahiere Erklärung aus Surrogate (Koeffizienten, Regeln)\n\nVorteile:\n• Model-agnostic\n• Intuitiv interpretierbar\n• Anpassbar (Komplexität des Surrogate)\n\nNachteile:\n• Keine Faithfulness-Garantie\n• Instabil (abhängig vom Sampling)\n• Lokale Approximation kann global falsch sein",
      },
      {
        q: "Was ist RISE und wie unterscheidet es sich von LIME?",
        a: "RISE (Randomized Input Sampling for Explanation, Petsiuk et al. 2018):\n\nIdee: Erkläre Bildklassifikatoren durch zufällige Maskierungen.\n\nVorgehen:\n1. Generiere viele zufällige binäre Masken M_i\n2. Wende jede Maske auf das Eingabebild an (maskierte Pixel → unscharf)\n3. Berechne Modellvorhersage für jedes maskierte Bild\n4. RISE Saliency = gewichteter Durchschnitt der Masken, gewichtet mit Vorhersage\n\nUnterschied zu LIME:\n• RISE: pixelbasiert, für Bilder, keine Surrogate-Model\n• LIME: superpixelbasiert, braucht Surrogate, model-agnostic für viele Typen\n\nVorteile: Einfach, model-agnostic für Bilder\nNachteile: Rechenintensiv (viele Forward Passes), pixelweise",
      },
      {
        q: "Erkläre die drei Design Choices des Removal-based Frameworks anhand eines konkreten Beispiels. Zeige wie verschiedene Kombinationen zu verschiedenen Methoden führen.",
        a: "Framework (Covert et al. 2021): Drei modulare Design Choices:\n\n1. FEATURE REMOVAL APPROACH: Wie entfernt man Features?\n   • Zeroing, Blurring, Marginalization, Conditional Expectation\n\n2. MODEL BEHAVIOR: Was messen wir?\n   • Output-Differenz, Wahrscheinlichkeit, Log-Odds\n\n3. SUMMARIZATION TECHNIQUE: Wie aggregieren?\n   • Averaging über Koalitionen (Shapley), Maximum, Threshold\n\nBeispiel-Kombinationen:\n• LIME: Random Perturbation + Prediction + Local Weighted Regression\n• SHAP: Marginalization + Log-Odds + Shapley Averaging\n• PredDiff: Conditional Marginalization + Prediction-Differenz + Direkt\n• RISE: Random Masking + Confidence + Weighted Sum\n\nVorteil dieser Sichtweise: Verschiedene Methoden explizit vergleichbar, neue Methoden durch Kombination kreierbar",
      },
      {
        q: "Beschreibe den LIME-Prozess detailliert. Warum ist die Datengenerierungsstrategie kritisch für Erklärungsqualität?",
        a: "LIME-Prozess (Ribeiro et al. 2016):\n1. Wähle Instanz x zu erklären\n2. Generiere perturbed Samples (Features zufällig entfernen/maskieren)\n3. Hole Modellvorhersagen für alle Samples\n4. Gewichte Samples nach Nähe zu x (Kernel-Funktion)\n5. Trainiere interpretierbarers Modell (linear) auf gewichteten Daten\n6. Koeffizienten = lokale Feature Importance\n\nWarum Datengenerierung kritisch:\n• Zu radikale Perturbationen → unrealistische Samples (out-of-distribution) → Modell reagiert unerwartet\n• Zu konservative Perturbationen → kein Kontrast → schwache Erklärung\n• Feature-Abhängigkeiten ignoriert → korrelierte Features getrennt behandelt → verzerrte Importance\n\nGute Strategie: Feature-Korrelationen berücksichtigen, realistische Verteilungen samplen\n\nFolge: LIME-Erklärungen variieren je nach Datengenerierungsimplementierung",
      },
      {
        q: "Vergleiche PredDiff und Meaningful Perturbations. In welchen Domänen ist jeweils welcher Ansatz besser geeignet?",
        a: "PredDiff (Zintgraf et al. 2017):\n• Entfernt Features durch Marginalisierung über empirische Verteilung\n• Berechnet: f(x) - f(x_{-i})\n• Model-agnostic, universell einsetzbar\n• Vorteil: Theoretisch fundiert, berücksichtigt Korrelationen via Marginalisierung\n• Nachteil: Marginalisierung kann unrealistische Instanzen erzeugen\n• Geeignet: Tabellarische Daten, generelle Verwendung\n\nMeaningful Perturbations:\n• Semantisch sinnvolle Störungen, die Datenstruktur respektieren\n• Für Bilder: Superpixel entfernen statt einzelne Pixel → kohärenteres Bild\n• Vorteil: Realistischere Perturbationen, bessere Erklärungen für komplexe Datenstrukturen\n• Nachteil: Domänenspezifisch, komplexer zu implementieren\n• Geeignet: Bilder, Text, Zeitreihen mit starker Struktur\n\nFazit: PredDiff allgemeiner, Meaningful Perturbations ausdrucksstärker für strukturierte Daten",
      },
      {
        q: "Diskutiere Erklärungsinstabilität bei Removal-based Methoden. Welche Maßnahmen adressieren das Problem?",
        a: "Problem: Kleine Eingabe-Änderungen → drastisch unterschiedliche Feature-Importance\n\nUrsachen:\n1. Feature-Abhängigkeiten: Kleine Störungen ändern Marginalverteilung stark\n2. Nicht-glatte Modelle: Entscheidungsgrenzen-Sprünge bei kleinen Input-Änderungen\n3. Sampling-Varianz: Zufällige Samples → unterschiedliche Ergebnisse bei LIME/KernelSHAP\n\nAdversarial Attack: Manipulierung der Erklärung ohne Modellverhalten zu ändern (Slack et al. 2020)\n\nMaßnahmen:\n1. Konsistenz-Checks: Erklärungen auf ähnlichen Instanzen vergleichen\n2. Ensemble-Methoden: Mehrere LIME-Läufe mitteln\n3. Shapley Values: Mathematisch eindeutige Lösung (minimiert Instabilität)\n4. Smooth Gradients (für NN): Gradient über perturbed Inputs mitteln\n5. Konfidenzintervalle angeben\n\nPraktisch: Keine Methode ist vollständig stabil – immer Robustheit testen",
      },
    ],
  },
  {
    id: 5,
    lernkarteId: 5,
    slideRef: "VL 06",
    title: "Concept-based Explanations I",
    examHints: "Setup, Motivation, Beispiele, Challenges, Concept Bottleneck Models, Concept Activation Vectors",
    color: "#3B6D11",
    bg: "#EAF3DE",
    questions: [
      {
        q: "Was sind concept-based explanations und was motiviert diesen Ansatz?",
        a: "Concept-based Explanations:\nStatt Features (einzelne Pixel/Werte) werden höherstufige semantische Konzepte zur Erklärung genutzt.\n\nMotivation:\n• Pixel und einzelne Features sind schwer für Menschen zu interpretieren\n• Menschen denken in Konzepten: 'Zebra hat Streifen' nicht '42% Helligkeit in Pixel (34,67)'\n• Konzepte sind portierbar und verständlich für Domänenexperten\n\nBeispiele für Konzepte:\n• Bildklassifikation: 'Streifen', 'Flügel', 'Pelz'\n• Medizin: 'Tumor-Morphologie', 'Gewebefarbe'\n• Text: 'negative Stimmung', 'rechtlicher Begriff'\n\nSetup: Konzepte müssen definiert und annotiert werden → aufwendig",
      },
      {
        q: "Was sind die größten Challenges bei concept-based explanations?",
        a: "Herausforderungen:\n\n1. KONZEPTDEFINITION: Wer definiert die Konzepte? Domänenexperten nötig, subjektiv\n\n2. KONZEPTANNOTATION: Für viele Beispiele braucht man annotierte Konzept-Labels → teuer\n\n3. VOLLSTÄNDIGKEIT: Sind die definierten Konzepte vollständig? Wichtige Konzepte könnten fehlen\n\n4. KONSISTENZ: Verschiedene Annotatorien annotieren Konzepte unterschiedlich\n\n5. SKALIERBARKEIT: Skaliert nicht gut auf viele Konzepte\n\n6. ENTANGLEMENT: Konzepte können sich im Feature-Space überlappen\n\n7. FAITHFULNESS: Erklärungen durch Konzepte müssen nicht dem tatsächlichen Reasoning entsprechen",
      },
      {
        q: "Vergleiche concept-based explanations mit feature-based explanations. Welche Vorteile bietet der konzeptbasierte Ansatz und was sind seine Grenzen?",
        a: "Feature-based explanations:\n• Nutzen Low-Level-Features (Pixel, Aktivierungen)\n• Problem: Semantic Gap – abstrakte Werte schwer für Menschen interpretierbar\n• Beispiel: 'Pixel (34,67) hatte Wichtigkeit 0.42' → unverständlich\n\nConcept-based explanations:\n• Nutzen abstrakte, semantische Konzepte (Streifen, Flügel, Textur)\n• Vorteile: Entsprechen menschlichen Kategorien, direkt von Domänenexperten interpretierbar, transferierbar über Modelle\n• Beispiel: 'Vorhersage basiert zu 60% auf Konzept Flügel'\n\nGrenzen von Concept-based:\n• Konzept-Auswahl subjektiv → falsche Sicherheit bei schlechten Konzepten\n• Konzepte abstrahieren echte Mechanismen weg\n• Mehrere orthogonale Konzept-Sets möglich → Perspektiven-Abhängigkeit\n• Hoher Aufwand für Annotation\n\n→ Konzepte sind für Endnutzer-Kommunikation ideal, Feature-Methoden für technisches Debugging",
      },
      {
        q: "Welche praktischen Herausforderungen entstehen bei concept-based explanations und welche Lösungsansätze gibt es?",
        a: "Herausforderung 1 – Konzept-Definition:\n• Experten müssen relevante Konzepte a priori definieren → zeitaufwendig, subjektiv\n• Lösungsansatz: Automated Concept Extraction (ACE) reduziert manuelle Annotation\n\nHerausforderung 2 – Konzept-Polysemie:\n• Ein Konzept kann in verschiedenen Kontexten verschiedenes bedeuten\n• Lösungsansatz: Kontextualisierte Konzepte oder hierarchische Konzeptstrukturen\n\nHerausforderung 3 – Validierung:\n• Wie zeigen, dass extrahierte Konzepte tatsächlich vom Modell genutzt werden?\n• Lösungsansatz: Causal Probing, Interventionstudien, TCAV-Score\n\nHerausforderung 4 – Skalierbarkeit:\n• Viele Konzepte = hohe Komplexität\n• Lösungsansatz: Hierarchische Strukturen, Dimensionsreduktion\n\n→ Keine Methode löst alle Probleme. Kombination verschiedener Ansätze + Domänenexperten nötig",
      },
      {
        q: "Was sind Concept Bottleneck Models (CBM) und wie funktionieren sie?",
        a: "Concept Bottleneck Models (Koh et al., 2020):\n\nArchitektur:\n1. Erster Teil: Bild → Konzept-Vorhersagen (z.B. P(Streifen), P(Flügel))\n2. Zweiter Teil: Konzept-Vorhersagen → Finale Klasse\n\nBottleneck = Die Konzeptschicht: Das Modell muss alles durch Konzepte 'pressen'\n\nVorteil: Vollständige Transparenz – man kann sehen, welche Konzepte warum wichtig waren\n\nIntervention: Nutzer kann Konzepte manuell korrigieren → Fehler korrigieren\n\nNachteile:\n• Konzepte müssen vorher definiert und annotiert werden\n• Performance-Einbuße möglich\n• Konzepte können Leakage enthalten (mehr Info als gewollt)",
      },
      {
        q: "Was sind Concept Activation Vectors (CAV) und wie werden sie berechnet?",
        a: "Concept Activation Vectors / TCAV (Testing with CAVs, Kim et al. 2018):\n\nIdee: Finde den Vektor im Hidden-Space eines NN, der ein Konzept repräsentiert.\n\nBerechnung:\n1. Sammle positive Beispiele (hat Konzept) und negative Beispiele (hat Konzept nicht)\n2. Extrahiere Aktivierungen aus einem Layer des Netzwerks für beide Gruppen\n3. Trainiere linearen Classifier im Aktivierungsraum\n4. CAV = Normalvektor der Entscheidungsgrenze\n\nTCAV-Score: Wie oft beeinflusst das Konzept die Vorhersage positiv?\n→ Misst den Einfluss eines Konzepts auf eine Klasse\n\nVorteile: Nutzt bestehende NN ohne Retraining, konzeptbasiert\nNachteile: Benötigt annotierte Konzeptbeispiele, linear approximiert",
      },
    ],
  },
  {
    id: 6,
    lernkarteId: 6,
    slideRef: "VL 07",
    title: "Concept-based Explanations II",
    examHints: "Fortgeschrittene Concept-based Methods, ACE, SpRAy, CBM Varianten",
    color: "#854F0B",
    bg: "#FAEEDA",
    questions: [
      {
        q: "Was sind die Limitierungen von TCAV und wie werden sie adressiert?",
        a: "TCAV-Limitierungen:\n\n1. LINEARE APPROXIMATION: CAV ist ein linearer Vektor → Nicht-lineare Konzeptgrenzen werden nicht erfasst\n\n2. KONZEPTAUSWAHL: Nutzer muss Konzepte vorab definieren → Wichtige Konzepte könnten fehlen\n\n3. LAYER-SENSITIVITÄT: Ergebnisse variieren je nach gewähltem Layer\n\n4. STATISTISCHE SIGNIFIKANZ: Zufällige CAVs können signifikante Scores erzielen → Braucht statistische Tests\n\nAdressierung:\n• Automated Concept Extraction (ACE): Automatische Konzeptfindung via Clustering\n• Non-linear CAVs: Kernelbasierte Methoden\n• Statistische Tests: TCAV schlägt Two-sample Permutation Test vor",
      },
      {
        q: "Was ist Automated Concept Explanation (ACE) und wie funktioniert es?",
        a: "ACE (Ghorbani et al. 2019):\nAutomatische Extraktion von Konzepten ohne manuelle Annotation.\n\nVorgehen:\n1. Segmentiere Bilder in Segmente verschiedener Granularität\n2. Extrahiere Aktivierungen aus einem NN-Layer für alle Segmente\n3. Cluster die Aktivierungen → ähnliche Segmente = ein Konzept\n4. Berechne TCAV-Score für jeden Cluster\n5. Konzepte mit hohem Score = wichtige Konzepte\n\nVorteil: Keine manuelle Konzeptannotation nötig\nNachteile: Konzepte nicht immer semantisch bedeutsam, abhängig von Segmentierung und Clustering",
      },
      {
        q: "Erkläre den Unterschied zwischen intrinsic und post-hoc XAI-Methoden.",
        a: "Intrinsic (auch: ante-hoc / transparent):\n• Das Modell ist selbst interpretierbar – keine zusätzliche Erklärungsmethode nötig\n• Beispiele: Entscheidungsbäume, lineare Regression, regelbasierte Systeme\n• Vorteil: Direkter Einblick, keine Approximation\n• Nachteil: Oft geringere Genauigkeit als Black-Box\n\nPost-hoc:\n• Erklärung wird nach dem Training des Modells generiert\n• Modell selbst ist Black Box\n• Beispiele: SHAP, LIME, Grad-CAM, TCAV\n• Vorteil: Anwendbar auf beliebige Modelle\n• Nachteil: Erklärt Approximation, nicht das Modell selbst → Faithfulness-Problem\n\n→ CBMs sind ein Versuch, intrinsic concept-based zu sein",
      },
      {
        q: "Beschreibe die Architektur von Concept Bottleneck Models (CBM). Welche Probleme entstehen durch den Bottleneck?",
        a: "CBM-Architektur (Koh et al. 2020):\nEingang → Konzept-Predictor → Bottleneck-Schicht → Klassifikator → Ausgabe\n\nDas Modell muss erst Konzepte predikieren (z.B. P(Streifen), P(Flügel)), dann erst die Klasse.\n\nVorteil: Jede Vorhersage nachverfolgbar – Human-in-the-Loop Korrekturen möglich\n\nProbleme:\n1. ACCURACY-VERLUST: Bottleneck-Architektur reduziert Modellkapazität\n2. CONCEPT LEAKAGE: Klassifikationsmodul kann indirekt auf Raw-Inputs zugreifen → Konzepte werden ignoriert\n3. KONZEPT-DEFINITION manuell → kritische Konzepte könnten fehlen\n4. VOLLSTÄNDIGKEIT: Nicht alle für Klassifikation relevanten Infos sind in definierten Konzepten komprimierbar\n\n→ CBMs sind interpretierbar aber erkaufen Transparenz mit Performance-Einbuße",
      },
      {
        q: "Erkläre TCAV (Testing with Concept Activation Vectors) und seine Limitierungen.",
        a: "TCAV (Kim et al. 2018):\nTestet post-hoc, ob ein Modell sensitiv auf benutzerdefinierte Konzepte reagiert.\n\nProzess:\n1. User definiert Konzepte + sammelt Positiv/Negativ-Beispiele\n2. CAV = SVM-Grenzlinie im Aktivierungsraum einer Schicht\n3. TCAV-Score: Wie stark ändern sich Logits bei Konzept-Perturbationen?\n\nUnterschied zu Standard-CAVs: TCAV ist post-hoc, keine Architektur-Änderungen nötig\n\nLimitierungen:\n• Abhängig von Datenbeschaffung – Beispiele können bias-behaftet sein\n• SVM-Training instabil bei kleinen Datensätzen\n• KAUSALITÄT unklar – TCAV zeigt Korrelation, nicht Kausalität\n• Sensitivität gegenüber Layer-Auswahl\n• Jain & Wallace-Kritik gilt analog: Konzept-Score ≠ kausale Erklärung",
      },
      {
        q: "Vergleiche intrinsische und extrinsische Konzept-Extraktion. Wann ist welcher Ansatz geeignet?",
        a: "Intrinsisch (vom Modell gelernt):\n• Modell lernt Konzepte während des Trainings (z.B. CBM, Multi-Task Learning)\n• Vorteil: Konzepte kausal relevant (Optimierungsprozess selektiert sie)\n• Nachteil: Gelernte Konzepte oft nicht semantisch interpretierbar\n• Geeignet: Regulierte Domänen (Medizin, Finanzen) – Kausalität nachweisbar\n\nExtrinsisch (post-hoc extrahiert):\n• Konzepte post-hoc aus Aktivierungen extrahiert (z.B. ACE via Clustering)\n• Vorteil: Semantisch interpretierbar, keine Architektur-Änderung\n• Nachteil: Keine Garantie auf Kausalität, Konzepte können Extraktions-Artefakte sein\n• Geeignet: Exploratorische Analyse, Feature-Engineering\n\nHybrid: Intrinsisch für Basis + ACE für Erweiterung der Konzept-Menge",
      },
    ],
  },
  {
    id: 7,
    lernkarteId: 7,
    slideRef: "VL 08",
    title: "Neural Network Interpretation",
    examHints: "Motivation, Key Challenges, DeconvNet, Attention, Attention is (not) not explanation",
    color: "#993556",
    bg: "#FBEAF0",
    questions: [
      {
        q: "Was ist die Motivation für Neural Network Interpretation und was sind die Key Challenges?",
        a: "Motivation:\n• Neuronale Netze (besonders DNNs) sind besonders undurchsichtige Black Boxes\n• Für Computer Vision: Was hat das Netz 'gesehen'? Welche Bildregionen sind wichtig?\n• Fehlerdiagnose: Warum macht das Modell bestimmte Fehler?\n• Vertrauen und Compliance in kritischen Anwendungen\n\nKey Challenges:\n1. HIGH DIMENSIONALITY: Viele Millionen Parameter, nicht einzeln interpretierbar\n2. NON-LINEARITY: Keine linearen Beziehungen interpretierbar\n3. ENTANGLEMENT: Features werden über viele Neuronen verteilt repräsentiert\n4. POLYSEMANTICITY: Ein Neuron kodiert mehrere Konzepte gleichzeitig\n5. SKALIERUNG: Was bei kleinen Netzen funktioniert, skaliert nicht zu GPT-4",
      },
      {
        q: "Was ist DeconvNet und wie hilft es bei der Visualisierung von CNN-Features?",
        a: "DeconvNet (Zeiler & Fergus, 2014):\nVisualisiert, welche Inputmuster maximale Aktivierung in einem CNN-Filter erzeugen.\n\nVorgehen:\n1. Forward-Pass: Bild durch CNN, merke Aktivierungen\n2. Deconvolution: Kehre den Forward-Pass um (Unpooling, Filtered Backpropagation)\n3. Projiziere Aktivierungen zurück in Inputraum\n4. Ergebnis: Visualisierung, welcher Bildbereich den Filter aktiviert\n\nMax-Pooling-Problem: Unpooling nutzt Switch-Variables aus Forward-Pass\n\nErkenntnisse: Frühe Layer = einfache Kanten/Texturen; Tiefe Layer = komplexe Muster/Objektteile\n\nVorteile: Direkte Visualisierung, keine extra Annotation\nNachteile: Nur für CNNs, Visualisierungen interpretationsbedürftig",
      },
      {
        q: "Was ist Attention in Transformers und warum ist die Frage 'Attention as Explanation' umstritten?",
        a: "Attention in Transformers:\n• Mechanismus, der bestimmt, welche Tokens bei der Verarbeitung eines Tokens berücksichtigt werden\n• Attention Weight A(i,j) = Wie sehr beachtet Token i Token j?\n• Intuitiv als Erklärung: 'Das Modell hat auf Token j geachtet' → wichtig für Vorhersage\n\nPro Attention als Erklärung (Bahdanau et al. 2015, Xu et al. 2015):\n• Attention ist inhärent im Modell → intrinsisch\n• Hohe Attention = wichtige Tokens\n\nContra (Jain & Wallace, 2019; Wiegreffe & Pinter, 2019):\n• Attention ≠ Explanation: Gleiche Vorhersagen mit anderen Attention Weights möglich\n• Adversarielle Attention: Attention kann manipuliert werden ohne Vorhersage zu ändern\n• Attention ist nicht FAITHFULL zur Modellentscheidung\n• 'Attention is not not Explanation' (Wiegreffe & Pinter) – differenzierter Blick nötig",
      },
      {
        q: "Was ist GradCAM und wie unterscheidet es sich von einfachen Gradienten-Saliency Maps?",
        a: "Gradient-based Saliency (Simonyan et al. 2013):\n• Berechne Gradient der Klassen-Score bezüglich der Input-Pixel\n• Saliency Map = |∂y_c/∂x_i|\n• Problem: Sehr rauschartig, schwer zu interpretieren\n\nGradCAM (Selvaraju et al. 2017):\n• Nutzt Gradienten der letzten Convolutional Layer (nicht Input)\n• Gewichte jede Feature Map mit dem globalen durchschnittlichen Gradienten\n• Wende ReLU an → nur positive Einflüsse\n• Upsample auf Inputgröße\n\nVorteil GradCAM:\n• Klassenspezifisch und grobkörnig (Objekt-Level)\n• Robuster als pixelbasierte Saliency\n• Kombinierbar mit Guided Backpropagation\n\nNachteile: Nur für CNNs, Gradienten können instabil sein",
      },
      {
        q: "Erkläre das DeconvNet-Verfahren von Zeiler & Fergus. Welche Interpretationsprobleme entstehen?",
        a: "DeconvNet (Zeiler & Fergus 2014):\nVisualisiert, welche Inputmuster maximale Aktivierung in CNN-Filtern erzeugen.\n\nFunktionsweise:\n1. Forward-Pass mit gespeicherten Pooling-Indizes\n2. Aktivierung interessanter Neuronen isolieren (andere = 0)\n3. Deconvolution: Filter invertieren\n4. Unpooling: gespeicherte Indizes nutzen\n5. Ergebnis: visuelles Prototyp\n\nVorteil: Konkrete, visuell interpretierbare Ausgaben\n\nInterpretationsprobleme:\n• Rekonstruktion ist Approximation, nicht exakte Inverse des Forward-Pass\n• Visuelles Muster muss nicht kausal sein – könnte Artefakt sein\n• Auswahlbias: Welche Aktivierungen man visualisiert beeinflusst Ergebnis\n• Keine quantitative Validierung\n• Skaliert schlecht zu modernen tiefen Architekturen (Transformers)",
      },
      {
        q: "Diskutiere die Kontroverse 'Attention is not Explanation' vs. 'Attention is not not Explanation'. Welche Position ist praktikabler?",
        a: "Jain & Wallace (2019) – Attention is not Explanation:\n• Attention-Gewichte sind keine verlässlichen Erklärungen\n• Beweis: Attention permutieren → Vorhersage unverändert\n• Schluss: Attention misst keine kausale Relevanz\n\nWiegreffe & Pinter (2019) – Attention is not not Explanation:\n• Absolutes Kausalitäts-Requirement ist zu streng\n• Attention bietet gewisse Garantien unter kontrollierten Bedingungen\n• Gradierte Sichtweise: Attention als eines von mehreren Signalen\n\nPraktische Bewertung: Wiegreffe & Pinter ist praktikabler:\n• Absolutes Kausalitäts-Requirement disqualifiziert die meisten XAI-Methoden\n• Attention in Kombination mit anderen Methoden (Triangulation) wertvoll\n• Empfehlung: Attention als lokales Feature-Ranking nutzen, aber nicht als alleinige Erklärung\n• Immer mehrere Methoden kombinieren!",
      },
      {
        q: "Erkläre GradCAM technisch und warum es gegenüber pixel-basierten Saliency Maps bevorzugt wird.",
        a: "GradCAM (Gradient-weighted Class Activation Mapping, Selvaraju et al. 2017):\n\nTechnische Funktionsweise:\n1. Gradienten der Zielklasse bezüglich letzter Conv-Schicht berechnen\n2. Global Average Pooling der Gradienten → Gewichte w_c^k\n3. Gewichtete Summe der Feature Maps: Σ_k w_c^k * A^k\n4. ReLU anwenden → nur positive Kontributionen\n5. Upsample auf Inputgröße → Heatmap\n\nVorteile gegenüber pixelbasierter Saliency:\n• Lokalisierung auf Objekt-Ebene (grob, aber semantisch sinnvoll)\n• Klassenspezifisch (separates Ergebnis pro Klasse)\n• Robuster (räumlich geglättet)\n• Quantitativ validierbar (pointing game, IoU)\n• Model-agnostisch für CNN-Familien\n\nNachteile: Zeigt nur räumliche Lokalisierung, nicht semantischen Inhalt. Nicht für Transformer direkt anwendbar.",
      },
    ],
  },
  {
    id: 8,
    lernkarteId: 8,
    slideRef: "VL 09",
    title: "Mechanistic Interpretability",
    examHints: "Was ist es, Circuit Analysis, Activation Patching, Logit Lens, warum gebraucht",
    color: "#0F6E6E",
    bg: "#E0F5F5",
    questions: [
      {
        q: "Was ist Mechanistic Interpretability und warum wird es gebraucht?",
        a: "Mechanistic Interpretability:\nVersteht die internen Mechanismen und Schaltkreise in Neuronalen Netzen auf algorithmischer Ebene.\n\nZiel: Nicht 'was hat das Netz entschieden' (post-hoc), sondern 'wie hat es entschieden' (mechanistisch)\n\nWarum gebraucht:\n• Klassische XAI erklärt Output, nicht Mechanismus\n• Safety/Alignment: Verstehen, ob Modell 'schlechte' Reasoning-Muster gelernt hat\n• Superposition: Neuronen kodieren viele Konzepte gleichzeitig → braucht Mechanismus-Analyse\n• Skalierung: LLMs und andere große Modelle sind so komplex, dass Mechanismus-Analyse der einzige Weg zu echtem Verständnis ist",
      },
      {
        q: "Was ist Circuit Analysis und wie funktioniert sie?",
        a: "Circuit Analysis (Olah et al., Elhage et al.):\nIdentifiziert minimale Sub-Netzwerke ('Circuits') in einem NN, die für eine spezifische Aufgabe verantwortlich sind.\n\nVorgehen:\n1. Definiere eine Aufgabe (z.B. Completion von 'Harry Potter ist der Sohn von...')\n2. Aktivierungen auf allen Schichten analysieren\n3. Pruning: Entferne Edges/Knoten, die nicht zur Aufgabe beitragen\n4. Identifiziere minimal notwendiges Sub-Netzwerk = Circuit\n\nBeispiele:\n• Indirect Object Identification Circuit in GPT-2\n• Modular Arithmetic Circuit\n\nVorteile: Mechanistisches Verständnis, nicht nur Korrelation\nNachteile: Extrem aufwendig, skaliert nicht auf große Modelle",
      },
      {
        q: "Was ist Activation Patching und was kann damit gezeigt werden?",
        a: "Activation Patching (auch: Causal Tracing / Causal Mediation Analysis):\n\nIdee: Ersetze ('patche') Aktivierungen aus einem Run durch Aktivierungen aus einem anderen Run und beobachte den Effekt.\n\nVorgehen:\n1. Run A: Normaler Forward-Pass mit Eingabe A → Aktivierungen speichern\n2. Run B: Forward-Pass mit Eingabe B\n3. Patch: Ersetze Aktivierung in Schicht l durch Aktivierung aus Run A\n4. Beobachte: Ändert sich der Output in Richtung von Run A's Output?\n\nErkenntnisse: Welche Schichten/Positionen sind kausal verantwortlich für bestimmte Vorhersagen?\n\nBeispiel: ROME (Meng et al. 2022) zeigt, dass Faktenwissen in mittleren MLP-Layern gespeichert ist",
      },
      {
        q: "Was ist Logit Lens und was zeigt es über LLMs?",
        a: "Logit Lens (nostalgebraist, 2020):\n\nIdee: Projiziere Hidden States jeder Schicht durch den LM Head (Output-Layer) in den Vokabular-Raum.\n\nVorgehen:\n1. Forward-Pass\n2. Extrahiere Hidden State h_l an jeder Schicht l\n3. Wende LM Head an: p_l = softmax(W_E * h_l)\n4. Dekodiere Top-Token → Zwischenvorhersage an Schicht l\n\nErkenntnisse:\n• Frühe Schichten: Unklare, oft zufällige Token\n• Mittlere Schichten: Konzepte beginnen sich zu formen\n• Späte Schichten: Finale Vorhersage konvergiert\n• 'Was würde das Modell vorhersagen, wenn es jetzt aufhören würde?'\n\nNutzung: Debugging, Understanding Reasoning, Language Mixing Analysis",
      },
      {
        q: "Was ist Polysemanticity in neuronalen Netzen und warum stellt es eine besondere Herausforderung für Mechanistic Interpretability dar?",
        a: "Polysemanticity: Ein einzelnes Neuron kodiert mehrere semantisch unzusammenhängende Konzepte gleichzeitig.\n\nBeispiel: Ein Neuron reagiert sowohl auf Katzenbilder als auch auf bestimmte Textstile.\n\nUrsache: Superposition – Modelle kodieren mehr Konzepte als Dimensionen verfügbar sind (wenn Konzepte spärlich auftreten)\n\nWarum Herausforderung für Mech. Interp.:\n• Klassische Annahme: 1 Neuron = 1 Konzept → bei Polysemanticity falsch\n• Feature-Visualisierungen werden irreführend\n• Circuits aus polysemantischen Neuronen schwer analysierbar\n\nLösungsansätze:\n• Toy Models (Elhage et al.): Superposition unter kontrollierten Bedingungen studieren\n• Dictionary Learning / Sparse Autoencoders: Überständige Repräsentationen finden\n\nFazit: Skaliert schlecht – Milliarden polysemantischer Neuronen in modernen LLMs",
      },
      {
        q: "Was sind Toy Models in Mechanistic Interpretability? Warum werden sie eingesetzt und was sind ihre Grenzen?",
        a: "Toy Models: Bewusst vereinfachte, kleine NNs für kontrollierte Interpretabilitätsexperimente.\n\nEinsatzzweck:\n• Hypothesen unter kontrollierten Bedingungen testen\n• Phänomene aus komplexen Modellen in isolierter Form studieren\n• Kausalbeziehungen nachweisen (nicht nur Korrelationen)\n\nBeispiel: Elhage et al. 2022 zeigen via Toy Models, wann und warum Superposition entsteht (spärliche, unabhängige Features)\n\nVorteile:\n• Vollständige Kontrollierbarkeit\n• Ground-Truth Mechanismen bekannt\n• Schnell iterierbar\n\nGrenzen:\n• Befunde müssen nicht auf LLMs (GPT-4, Claude) übertragbar sein\n• Vereinfachungen können kritische Eigenschaften weglassen\n• Überverallgemeinerung: Toy-Model-Erkenntnisse auf echte Modelle anwenden birgt Risiken\n\n→ Toy Models sind epistemologisches Werkzeug, kein Ersatz für echte Modellanalyse",
      },
      {
        q: "Vergleiche Circuit Analysis und Activation Patching als Methoden. Wann setzt man welche ein?",
        a: "Circuit Analysis:\n• Ziel: Identifiziere minimales Sub-Netzwerk (Circuit) für eine Aufgabe\n• Vorgehen: Aktivierungen analysieren, Edges prunen bis minimales Circuit\n• Ergebnis: Strukturelles Verständnis – welche Komponenten zusammenarbeiten\n• Nachteil: Extrem aufwendig, manuell, nicht skalierbar\n\nActivation Patching (Causal Tracing):\n• Ziel: Welche spezifischen Positionen/Schichten sind kausal für einen Effekt?\n• Vorgehen: Aktivierungen aus Run A in Run B patchen, Effekt messen\n• Ergebnis: Kausale Lokalisierung – WO Information gespeichert ist\n• Vorteil: Gerichteter, schneller, automatisierbarer\n\nWann welche:\n• Circuit Analysis: Mechanistisches Gesamtbild einer Aufgabe gesucht\n• Activation Patching: Gezielte Hypothese über Speicherort testen\n\n→ Patching zur Lokalisierung, Circuit-Analyse zur Strukturierung – ergänzen sich",
      },
    ],
  },
  {
    id: 9,
    lernkarteId: 9,
    slideRef: "VL 10",
    title: "Gute Erklärungen & Self-Explanations",
    examHints: "Plausibility, Faithfulness, wann Faithfulness nötig, Self-Explanation Methoden, Faithfulness Measures",
    color: "#534AB7",
    bg: "#EEEDFE",
    questions: [
      {
        q: "Was macht eine Erklärung 'gut'? Erkläre Plausibility vs. Faithfulness.",
        a: "Zwei Qualitätsdimensionen:\n\nPLAUSIBILITY:\n• Wirkt die Erklärung überzeugend und ist kohärent mit menschlichem Denken?\n• Kriterium: Mensch findet die Erklärung einleuchtend\n• Problem: Plausibel ≠ Wahr\n\nFAITHFULNESS:\n• Spiegelt die Erklärung das tatsächliche interne Reasoning des Modells wider?\n• Kriterium: Erklärung = Was das Modell wirklich getan hat\n• Problem: Schwer zu messen, LLMs optimieren nicht für Faithfulness\n\nHilton (1990): 'Erklären ist ein dreistelliges Prädikat' → Erklärungsqualität ist nutzerabhängig\n\nLLMs tendieren zu Plausibilität über Faithfulness (RLHF, Training auf menschlichem Text)",
      },
      {
        q: "Wann ist Faithfulness wichtiger als Plausibility?",
        a: "Faithfulness wichtiger in High-Stakes Domänen:\n• Medizin/Healthcare: Falsche Erklärung → falsches Vertrauen → gefährliche Entscheidung\n• Finanzen/Kredit: Rechtliche Anforderungen, Nicht-Diskriminierung\n• Rechtsprechung/Strafverfolgung: Falsche Begründung kann Leben zerstören\n• Safety-kritische Systeme: Autonomes Fahren, Luftfahrt\n\nPlausibility ausreichend in Low-Stakes:\n• Bildungsanwendungen: Lernen wird durch plausible Erklärungen gefördert\n• Kreativität/Unterhaltung: Überzeugung wichtiger als technische Korrektheit\n• Allgemeiner Chatbot-Einsatz\n\nFazit: 'It depends' – immer Anwendungskontext und Stakeholder berücksichtigen",
      },
      {
        q: "Was sind Self-Explanations (SE) und was ist der Key Difference zu anderen XAI-Methoden?",
        a: "Self-Explanations:\nErklärungen, die vom Modell selbst generiert werden – nicht von einer externen XAI-Methode.\n\nKey Difference:\n• Andere XAI (SHAP, LIME, CAV): Externe Methode analysiert Black Box\n• Self-Explanation: Das Modell selbst erklärt seine Entscheidung in natürlicher Sprache\n\nDrei Hauptformen:\n1. Chain-of-Thought: Schrittweise Denkschritte\n2. Token Importance: Hervorheben wichtiger Tokens\n3. Counterfactual Explanations: Was-wäre-wenn Szenarien\n\nProblem: Self-Explanations haben KEINE Faithfulness-Garantie – das Modell kann überzeugend klingende Erklärungen generieren, die nicht dem internen Reasoning entsprechen",
      },
      {
        q: "Was ist Chain-of-Thought (CoT) und warum kann es unfaithful sein?",
        a: "Chain-of-Thought (Wei et al. 2023):\nDas Modell generiert eine Sequenz von Zwischenschritten, bevor es die finale Antwort gibt.\n\nVorteil: Verbessert Leistung bei Math/Logic, zeigt Reasoning\n\nUNFAITHFULNESS (Turpin et al. 2023):\n• Modell entscheidet Antwort ZUERST, generiert dann passende Begründung (post-hoc)\n• Test: Vertausche Antwortoptionen (A)↔(B) → Modell ändert Antwort UND Begründung\n• CoT = Rationalisierung, nicht echtes Reasoning\n\nMessung: Biasing features in Input → CoT erwähnt sie nicht, obwohl sie Antwort verändern\n\nFazit: 'LLM-Erklärungen = plausible Fiktion' (Agarwal et al. 2024)",
      },
      {
        q: "Erkläre die Faithfulness-Messmethoden Early Answering und Adding Mistakes.",
        a: "Beide nach Lanham et al. (2023):\n\nEARLY ANSWERING:\n• Schneide CoT-Erklärung mittendrin ab, frage nach finaler Antwort\n• Wenn Antwort sich nicht ändert trotz abgeschnittener Erklärung → post-hoc generiert\n• Faithfulness = Area over curve (Erklärungsanteil vs. Anteil konsistenter Antworten)\n\nADDING MISTAKES:\n• Füge absichtlich Fehler in die CoT-Erklärung ein\n• Wenn Antwort sich NICHT ändert trotz Fehler → Modell ignoriert Erklärung\n• Hohe Robustheit gegenüber Fehlern = geringe Faithfulness\n\nBride Methoden zeigen: CoT ist oft unabhängig von der Entscheidung",
      },
      {
        q: "Was ist Faithful CoT und wie garantiert es Faithfulness?",
        a: "Faithful CoT (Lyu et al. 2023):\nKonvertiert natürlichsprachliche Erklärungen in symbolische Reasoning-Ketten mit deterministischem Solver.\n\nZwei Schritte:\n1. TRANSLATION: LLM übersetzt NL-Frage → symbolische Reasoning-Kette (Formeln, Prolog, Python)\n2. PROBLEM SOLVING: Deterministischer Solver löst symbolische Kette → garantierte Korrektheit\n\nWie wird Faithfulness garantiert?\n• Der Solver ist deterministisch – kein Post-hoc Rationalisieren möglich\n• Die Reasoning-Kette ist die ECHTE Grundlage der Antwort, nicht eine Rationalisierung\n\nProblem: Solver reflektiert menschlich definierte Regeln → Faithfulness nur so gut wie die Regeln korrekt sind",
      },
      {
        q: "Was bedeutet 'Faithfulness stagniert' bei größeren LLMs und was impliziert das für die Praxis?",
        a: "Befund (Agarwal et al. 2024): Größere LLMs verbessern Erklärungsqualität (Plausibilität), aber nicht Faithfulness.\n\nWas stagniert:\n• Narrative Qualität von CoT steigt mit Modellgröße\n• Faithfulness-Scores (Early Answering, Adding Mistakes) verbessern sich NICHT proportional\n• Größere Modelle = überzeugendere Erklärungen, aber nicht faithfullere\n\nGrund:\n• Skalierung verbessert Sprachkompetenz, nicht interne Mechanismen\n• Training-Incentives bleiben gleich: RLHF belohnt Plausibilität\n\nPraktische Implikationen:\n• GPT-4 Erklärungen nicht inherent faithfuller als GPT-3.5\n• Größere Modelle können überzeugender 'lügen'\n• Für High-Stakes: Modellgröße allein kein Qualitätskriterium\n• Dedicated Faithfulness-Methoden nötig (Faithful CoT, RoG)",
      },
      {
        q: "Erkläre 'Simulating Counterfactual Inputs' als Faithfulness-Messmethode. Wie unterscheidet es sich von Early Answering?",
        a: "Simulating Counterfactual Inputs (Turpin et al. 2023):\n• Füge biasing features in Input ein (z.B. 'Ich denke die Antwort ist (A)')\n• Erwartung: Wenn Modell Bias folgt, sollte CoT ihn erwähnen\n• Befund: Modelle ändern Antwort, ohne Bias in CoT zu erwähnen → unfaithful\n\nUnterschied zu Early Answering:\n• Simulating Counterfactuals: Manipuliert INPUT, testet ob Erklärung echten Einflussfaktor nennt\n• Early Answering: Manipuliert ERKLÄRUNG (kürzt ab), testet ob Antwort sich ändert\n\nKomplementarität:\n• Counterfactuals → zeigt Erklärung verschweigt echte Einflussfaktoren\n• Early Answering → zeigt Erklärung war nicht Grundlage der Antwort\n\n→ Beide zusammen = starkes Argument für post-hoc Rationalisierung in LLMs",
      },
      {
        q: "Was unterscheidet Reasoning on Graphs (RoG) konzeptuell von Faithful CoT? Wann ist welcher Ansatz geeigneter?",
        a: "Faithful CoT (Lyu et al.):\n• NL-Frage → symbolische Kette → deterministischer Solver\n• Faithfulness durch: Solver ist deterministisch\n• Limitierung: Menschlich definierte Regeln nötig\n• Geeignet: Geschlossene Domänen (Mathematik, Logik)\n\nReasoning on Graphs (RoG, Luo et al. 2024):\n• LLM + Knowledge Graph: Planning → KG-Retrieval → Reasoning über Pfade\n• Faithfulness durch: Antworten basieren auf verifizierbaren KG-Pfaden\n• Keine symbolischen Regeln nötig\n• Geeignet: Faktenwissen, offene Domänen, Multihopp-Reasoning\n\nKonzeptueller Unterschied:\n• Faithful CoT: Faithfulness durch formale Logik/Solver\n• RoG: Faithfulness durch Verankerung in externem Wissensgraph\n\n→ Faithful CoT für regelbasierte Aufgaben, RoG für Faktenwissen",
      },
    ],
  },
  {
    id: 10,
    lernkarteId: 10,
    slideRef: "VL 12",
    title: "Mechanistic Interpretability II: Language Mixing",
    examHints: "Language Mixing Phänomen, Patterns, Impact via Constrained Decoding, Internal Causes via Logit Lens",
    color: "#0F6E56",
    bg: "#E1F5EE",
    questions: [
      {
        q: "Was ist Language Mixing in Reasoning Language Models (RLMs)?",
        a: "Language Mixing (Wang et al., EMNLP 2025):\nReasoning Language Models (RLMs) wie DeepSeek-R1 oder o1 wechseln während ihrer Denkschritte (Reasoning Trace) die Sprache – auch wenn Eingabe und Ausgabe in einer einzigen Sprache sind.\n\nBeispiel: Arabische Frage → RLM denkt auf Englisch/Chinesisch → Antwort auf Arabisch\n\nXAI-Relevanz: Ist dies ein authentisches Signal des internen Modellzustands oder Rauschen?\n→ Logit-Lens zeigt: Es ist ein echtes Signal (Korrelation r ≈ 0.74–0.99)\n\nForschungsfragen: Muster, Auswirkungen, Interne Ursachen",
      },
      {
        q: "Wann tritt Language Mixing besonders häufig auf (Patterns)?",
        a: "Drei Hauptmuster:\n\n1. EINGABESPRACHE: Am häufigsten bei Sprachen die weder Englisch noch Chinesisch sind (Arabisch, Hindi, Japanisch, Französisch). RLMs mischen dann zu Englisch/Chinesisch.\n\n2. AUFGABENTYP: STEM-Fächer (Mathematik, Physik, Informatik) > Geisteswissenschaften\n→ Komplexere logische Aufgaben = mehr Mixing\n\n3. SCHWIERIGKEITSGRAD: Schwierigere Aufgaben = höhere Language Mixing Entropy\n→ Bei Knights-and-Knaves: 8-Personen-Puzzle mehr Mixing als 2-Personen\n\nFinale Antworten: Fast immer in der Eingabesprache – Mixing nur im Reasoning Trace",
      },
      {
        q: "Was zeigt Script Control via Constrained Decoding über Language Mixing?",
        a: "Constrained Decoding: Erzwinge, dass der Reasoning Trace in einem bestimmten Schriftsystem bleibt:\n• Lateinisch (Englisch), Han (Chinesisch), oder Natives Skript der Eingabesprache\n\nErgebnisse für Arabisch, Hindi, Japanisch:\n• Erzwungenes LATEIN-Reasoning: +37% bis +115% Performance-Steigerung!\n• Erzwungenes HAN-Reasoning: Ebenfalls signifikante Verbesserungen\n• NATIVES Skript: Oft schlechteste Performance\n\nInterpretation:\n• Modelle sind intern 'Latein/Han-Denker'\n• Language Mixing ist KEINE Fehlfunktion, sondern funktionale Adaptation\n• Eliminieren von Language Mixing könnte Performance verschlechtern",
      },
      {
        q: "Was zeigt Logit Lens über die internen Ursachen von Language Mixing?",
        a: "Logit Lens auf RLMs:\n• Projiziert Hidden States jeder Schicht in Vokabular-Raum\n• Analysiert: Welches Schriftsystem dominiert intern an welchem Layer?\n\nErgebnisse:\n• Mit steigender Aufgabenschwierigkeit: Mehr Latein-Skript in internen Aktivierungen\n• Starke Korrelation zwischen internem Skriptgebrauch und externem Reasoning Trace:\n  - Arabisch: r ≈ 0.74–0.99\n  - Hindi: r ≈ 0.88–0.93\n\nSchlussfolgerung:\n• Language Mixing = authentisches XAI-Signal (kein Artefakt)\n• Im Gegensatz zu unfaithful CoT: Der Reasoning Trace spiegelt echtes internes Verhalten wider\n• Language Mixing ist ein GEGENBEISPIEL zu 'plausible Fiktion'",
      },
      {
        q: "Was ist das Teacher-Student Paradigma bei DeepSeek-R1 und welche Implikationen hat es für Language Mixing?",
        a: "Teacher (DeepSeek-R1 671B MoE):\n• Reines RL-Training, CoT emergent entwickelt\n• Trainiert mit Language Consistency Reward\n\nStudents (Distill-Qwen/Llama):\n• Dense Transformer, trainiert via Knowledge Distillation auf Teacher-Traces\n• Imitieren Reasoning-Muster des Teachers\n\nImplikationen für Language Mixing:\n• Students erben Language-Mixing-Muster des Teachers\n• Da Teacher auf Englisch/Chinesisch stark → Mixing in Traces → Mixing in Students\n• Destillation kann Mixing verstärken, nicht abschwächen\n\nBemerkenswert:\n• Trotz Language Consistency Reward persistiert Mixing in allen Modellen\n• Zeigt: Mixing tief im gelernten Reasoning verankert\n\n→ Mechanismus hinter Mixing wird via Destillation weitervererbt",
      },
      {
        q: "Wie nutzt Wang et al. (2025) Logit Lens um interne Ursachen von Language Mixing nachzuweisen?",
        a: "Wang et al. Erweiterung des klassischen Logit Lens (nostalgebraist 2020):\n\nKlassisch: Zeigt welches Token ein Modell an Schicht l vorhersagen würde\n\nWang et al.: Analysiert nicht Token sondern SKRIPT der Hidden-State-Projektionen:\n• Klassifiziert: Latein vs. Han vs. Devanagari etc. pro Schicht\n• Misst Skriptverteilung über alle Schichten\n\nErkenntnisse:\n• Mit steigender Aufgabenschwierigkeit: Lateinanteil in internen Aktivierungen steigt\n• Starke Korrelation intern↔extern: Arabisch r ≈ 0.74–0.99, Hindi r ≈ 0.88–0.93\n\nBedeutung für XAI:\n• Externes Language Mixing = authentisches Signal des internen Zustands\n• Gegenbeweis zu 'alle LLM-Outputs sind post-hoc'\n• Reasoning Trace als Fenster in Hidden States validiert",
      },
      {
        q: "Welche Trade-offs entstehen beim Einsatz von Constrained Decoding zur Language-Mixing-Kontrolle? Sollte Mixing eliminiert werden?",
        a: "Constrained Decoding Ergebnisse:\n• Latein/Han erzwingen: +37–115% Performance für Arabisch, Hindi, Japanisch\n• Natives Skript erzwingen: Meist schlechteste Performance\n\nTrade-offs:\n1. CONTROL vs. PERFORMANCE: Natives Skript = 'faire' Nutzererfahrung, aber Performance-Verlust\n2. SPRACHGERECHTIGKEIT vs. AUFGABENQUALITÄT: Kulturell problematisch, faktisch besser auf Latein\n3. INTERPRETIERBARKEIT vs. EFFEKTIVITÄT: Nutzer bevorzugen ihre Sprache, Modell ist auf Englisch besser\n\nSollte Language Mixing eliminiert werden? NEIN:\n• Mixing ist funktionale Adaptation für multilinguales Reasoning\n• Vollständige Elimination = Performance-Verschlechterung\n• Intelligente Steuerung besser: Latein für STEM, Nativ für Sozialwissenschaften\n\n→ Nicht Elimination, sondern kontrolliertes Mixing ist das Ziel",
      },
    ],
  },
];

const THOUGHT_EXPERIMENTS = [
  {
    scenario: "Kreditvergabe in einer Bank",
    details: "Ein Kreditinstitut setzt ein ML-Modell ein, das Kreditanträge automatisch bewertet. Stakeholder: Kreditnehmer, Kreditsachbearbeiter, Compliance-Abteilung, Regulator.",
    questions: [
      "Ist XAI hier wichtig? Warum?",
      "Welche XAI-Methode wäre geeignet (local vs. global)?",
      "Brauchen Sie eher Faithfulness oder Plausibility?",
      "Was sind die rechtlichen Anforderungen (GDPR Art. 22)?",
    ],
    hint: "Ja, sehr wichtig. GDPR Art. 22 Recht auf Erklärung. Local explanation für Kreditnehmer (warum abgelehnt). Global für Compliance (diskriminiert das Modell?). Faithfulness essenziell – falsche Erklärungen = rechtliche Haftung. SHAP für local, Feature Importance global.",
  },
  {
    scenario: "Medizinische Diagnose-KI",
    details: "Ein CNN klassifiziert medizinische Bilder (z.B. Hautkrebs). Stakeholder: Radiologen, Patienten, Krankenhausleitung.",
    questions: [
      "Welche Art von Erklärung ist am nützlichsten für den Radiologen?",
      "Reicht Attention als Erklärung?",
      "Sollte das Modell intrinsisch erklärbar sein oder reicht post-hoc?",
    ],
    hint: "Für Radiologen: Visuelle Saliency Maps (GradCAM, Occlusion) – zeigen wo das Modell 'hinsieht'. Attention allein reicht NICHT (unfaithful). Concept-based Explanations wären ideal (Tumor-Morphologie). High-Stakes → Faithfulness wichtig. Intrinsisch wäre besser, aber Post-hoc + Validierung akzeptabel.",
  },
  {
    scenario: "Empfehlungssystem für Stellenausschreibungen",
    details: "Ein HR-System rankt Kandidaten für Stellen. Stakeholder: Bewerber, HR-Manager, Personalabteilung, Antidiskriminierungsbehörde.",
    questions: [
      "Welche Biases könnten im Modell stecken und wie erkennt man sie?",
      "Welche XAI-Methode eignet sich zur Bias-Erkennung?",
      "Ist global oder local explanation relevanter?",
    ],
    hint: "Biases: Geschlecht, Herkunft, Alter in Features kodiert. Erkennung: Global Feature Importance (SHAP global), Fairness-Analysen. Local für Bewerber: 'Warum wurde meine Bewerbung abgelehnt?' LIME/SHAP local. Beide Scopes wichtig. Konzept 'Ablation Study' um einzelne Features auszuschließen.",
  },
];

function TopicSection({ topic }) {
  const [open, setOpen] = useState(false);
  const [activeQ, setActiveQ] = useState(null);

  return (
    <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderLeft: `3px solid ${topic.color}`, borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
      <button
        onClick={() => { setOpen(o => !o); setActiveQ(null); }}
        style={{ width: '100%', background: 'none', border: 'none', padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', textAlign: 'left', gap: '1rem' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <span style={{ fontSize: 12, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: topic.bg, color: topic.color }}>{topic.slideRef}</span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)' }}>{topic.title}</h3>
          </div>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--color-text-tertiary)' }}>{topic.examHints}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{topic.questions.length} Fragen</span>
          <Link href={`/topics/${topic.lernkarteId}`} onClick={e => e.stopPropagation()} style={{ fontSize: 12, padding: '3px 10px', border: `1px solid ${topic.color}`, borderRadius: 4, color: topic.color, textDecoration: 'none' }}>Lernkarte →</Link>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--color-border-tertiary)' }}>
          {topic.questions.map((qa, i) => (
            <div key={i} style={{ borderBottom: i < topic.questions.length - 1 ? '1px solid var(--color-border-tertiary)' : 'none' }}>
              <button
                onClick={() => setActiveQ(activeQ === i ? null : i)}
                style={{ width: '100%', background: activeQ === i ? 'var(--color-background-secondary)' : 'none', border: 'none', padding: '0.9rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', gap: '1rem' }}
              >
                <p style={{ margin: 0, fontSize: 14, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{qa.q}</p>
                <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', flexShrink: 0 }}>{activeQ === i ? '▲' : '▼'}</span>
              </button>
              {activeQ === i && (
                <div style={{ padding: '0 1.25rem 1rem 1.25rem', background: 'var(--color-background-secondary)' }}>
                  <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)', color: 'var(--color-text-primary)', borderLeft: `2px solid ${topic.color}`, paddingLeft: '0.75rem' }}>{qa.a}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThoughtExperimentsSection() {
  const [activeExp, setActiveExp] = useState(null);
  const [showHint, setShowHint] = useState({});

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>Thought Experiments</h2>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: '0 0 1rem' }}>
        Laut Prüfungs-Slides: "Assume you are in situation X, stakeholders are Z — is XAI important / which methods are suitable?"
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {THOUGHT_EXPERIMENTS.map((exp, i) => (
          <div key={i} style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderLeft: '3px solid #854F0B', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
            <button onClick={() => { setActiveExp(activeExp === i ? null : i); setShowHint({}); }} style={{ width: '100%', background: 'none', border: 'none', padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>Szenario: {exp.scenario}</h4>
                <p style={{ margin: '0.3rem 0 0', fontSize: 13, color: 'var(--color-text-secondary)' }}>{exp.details}</p>
              </div>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: 14, flexShrink: 0, marginLeft: '1rem' }}>{activeExp === i ? '▲' : '▼'}</span>
            </button>
            {activeExp === i && (
              <div style={{ borderTop: '1px solid var(--color-border-tertiary)', padding: '1rem 1.25rem', background: 'var(--color-background-secondary)' }}>
                <p style={{ margin: '0 0 0.75rem', fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)' }}>Mögliche Prüfungsfragen:</p>
                <ul style={{ margin: '0 0 1rem', paddingLeft: 18 }}>
                  {exp.questions.map((q, j) => (
                    <li key={j} style={{ fontSize: 14, color: 'var(--color-text-primary)', marginBottom: 4 }}>{q}</li>
                  ))}
                </ul>
                <button onClick={() => setShowHint(h => ({ ...h, [i]: !h[i] }))} style={{ fontSize: 13, padding: '4px 14px', border: '1px solid #854F0B', borderRadius: 4, background: showHint[i] ? '#FAEEDA' : 'transparent', color: '#854F0B', cursor: 'pointer' }}>
                  {showHint[i] ? 'Hinweis ausblenden' : 'Hinweis anzeigen'}
                </button>
                {showHint[i] && (
                  <p style={{ margin: '0.75rem 0 0', fontSize: 13, lineHeight: 1.6, color: 'var(--color-text-primary)', borderLeft: '2px solid #854F0B', paddingLeft: '0.75rem' }}>{exp.hint}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KlausurPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const totalQ = EXAM_TOPICS.reduce((acc, t) => acc + t.questions.length, 0);

  const visibleTopics = selectedTopics.size === 0
    ? EXAM_TOPICS
    : EXAM_TOPICS.filter(t => selectedTopics.has(t.id));

  function toggleTopic(id) {
    setSelectedTopics(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <NavBar />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: '0 0 0.4rem', color: 'var(--color-text-primary)' }}>Klausur-Vorbereitung</h1>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', margin: 0 }}>
            Explainable AI · Hochschule Karlsruhe · Mündliche Prüfung {EXAM_DATE}
          </p>
        </div>

        {/* Exam Tips */}
        <div style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 'var(--border-radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.6rem', fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prüfungshinweise (aus VL 11)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {EXAM_TIPS.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#0F6E56', fontWeight: 700, flexShrink: 0 }}>{tip.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{tip.text}</span>
              </div>
            ))}
          </div>
          <p style={{ margin: '0.75rem 0 0', fontSize: 12, color: 'var(--color-text-tertiary)', borderTop: '1px solid var(--color-border-tertiary)', paddingTop: '0.75rem' }}>
            Bewertung: Correctness & Precision · Understanding of Concepts · Application of Knowledge · Depth of Argumentation
          </p>
        </div>

        {/* Stats + Filter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            {EXAM_TOPICS.length} Themen · {totalQ} Beispielfragen
            {selectedTopics.size > 0 && ` · ${selectedTopics.size} ausgewählt`}
          </span>
          <button onClick={() => setFilterOpen(o => !o)} style={{ fontSize: 13, padding: '4px 14px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 4, background: 'transparent', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
            Filter {filterOpen ? '▲' : '▼'}
          </button>
        </div>

        {filterOpen && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1rem', padding: '0.75rem', background: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius-md)', border: '0.5px solid var(--color-border-tertiary)' }}>
            {EXAM_TOPICS.map(t => (
              <button key={t.id} onClick={() => toggleTopic(t.id)} style={{ fontSize: 12, padding: '3px 12px', border: `1px solid ${selectedTopics.has(t.id) ? t.color : 'var(--color-border-tertiary)'}`, borderRadius: 4, background: selectedTopics.has(t.id) ? t.bg : 'transparent', color: selectedTopics.has(t.id) ? t.color : 'var(--color-text-secondary)', cursor: 'pointer' }}>
                {t.slideRef}: {t.title.split(':')[0].trim()}
              </button>
            ))}
            {selectedTopics.size > 0 && (
              <button onClick={() => setSelectedTopics(new Set())} style={{ fontSize: 12, padding: '3px 12px', border: '1px solid var(--color-border-tertiary)', borderRadius: 4, background: 'transparent', color: 'var(--color-text-tertiary)', cursor: 'pointer' }}>
                Alle anzeigen ×
              </button>
            )}
          </div>
        )}

        {/* Topic Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visibleTopics.map(topic => (
            <TopicSection key={topic.id} topic={topic} />
          ))}
        </div>

        {/* Thought Experiments */}
        {(selectedTopics.size === 0) && <ThoughtExperimentsSection />}
      </div>
    </>
  );
}
