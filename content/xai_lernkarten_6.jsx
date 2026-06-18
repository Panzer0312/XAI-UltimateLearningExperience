import { useState } from "react";

const TOPIC_TITLE = "Concept-based Explanations II";
const TOPIC_DESCRIPTION = "Erklärbare KI durch konzeptbasierte Erklärungen: Bottleneck-Modelle, Concept Activation Vectors und lokale sowie globale Sensitivitätsanalysen";
const LECTURE_NUM = "7";
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
    title: "Konzeptbasierte Erklärungen – Grundlagen",
    border: "#534AB7",
    color: "#EEEDFE",
    points: [
      "Konzeptbasierte Erklärungen betrachten die Rolle von hochrangigen Konzepten anstelle von Eingaben",
      "Konzepte sind Zwischendarstellungen (z.B. Farbe, Textur, Objektteile, Form) die komprimiert sind und minimale Information opfern",
      "Diese Konzepte tragen intuitive Bedeutung und haben eine einfachere Beziehung zur Ausgabe als Rohpixel",
      "Zwei Hauptansätze in der Gruppe: Concept Bottleneck Models und Concept Activation Vectors",
      "Ziel: Model-Entscheidungen durch menschlich verständliche Konzepte erklären"
    ]
  },
  {
    title: "Concept Bottleneck Models – Architektur",
    border: "#0F6E56",
    color: "#E1F5EE",
    points: [
      "Concept Bottleneck Models zwingen tiefe Lernmodelle, spezifische Konzepte vor einer Vorhersage darzustellen",
      "Erste Phase: Input x wird auf eine Menge von Konzepten c abgebildet: ĉ = g(x)",
      "Zweite Phase: Die vorhergesagten Konzepte werden zur Ausgagevorhersage verwendet: ŷ = f(g(x))",
      "Architektur mit Bottleneck-Schicht: eine Schicht wird auf die Anzahl der bereitgestellten Konzepte angepasst",
      "Zwischenverlust (Intermediate Loss): ermutigt Neuronen dieser Schicht, sich komponentenweise an die bereitgestellten Konzepte auszurichten"
    ]
  },
  {
    title: "Training von Concept Bottleneck Models",
    border: "#185FA5",
    color: "#E6F1FB",
    points: [
      "Feature Engineering: Im Gegensatz zur traditionellen Feature-Engineering werden keine Low-Level-Features aus Rohdaten berechnet, sondern hochrangige Konzepte",
      "Trainingsdaten-Anforderung: Für jeden Datenpunkt werden nicht nur (x, y) sondern (x^(i), c^(i), y^(i)) benötigt",
      "Die Eingabe x muss mit Konzepten c annotiert und mit Zielabels y versehen werden",
      "Trainingsphase: Das Modell wird darauf trainiert, sowohl Konzepte als auch Labels genau vorherzusagen",
      "Zwei Trainingsmöglichkeiten: gemeinsam (jointly) oder sequentiell (sequentially)"
    ]
  },
  {
    title: "Test-Zeit Interventionen und Erklärungen",
    border: "#993C1D",
    color: "#FAECE7",
    points: [
      "Test-Zeit Interventionen: Durch die Konstruktion können vorhergesagte Konzeptwerte der Bottleneck-Modelle editiert werden",
      "Wenn Konzeptwerte manuell korrigiert werden, können Änderungen in der finalen Vorhersage beobachtet werden",
      "Analyse: Wie reagiert das Modell auf Änderungen in vorhergesagten Konzepten?",
      "Verbesserung von Vorhersagen: Durch Ersetzen fehlerhaft vorhergesagter Konzepte mit wahren Konzeptwerten",
      "Dies führt zu reicherer Mensch-Modell Interaktion und kann Modellvorhersagen verbessern"
    ]
  },
  {
    title: "Robustheit gegen Hintergrund-Verschiebungen",
    border: "#3B6D11",
    color: "#EAF3DE",
    points: [
      "Concept Bottleneck Models können robuster gegen spurlose Korrelationen sein als Standard-Modelle",
      "Beispiel: Ein Modell könnte den Bildhintergrund spurlos mit dem Label assoziieren",
      "Wenn sich die Hintergrund-Label Beziehung in der Testverteilung ändert, macht das Modell mehr Fehler",
      "Testen mit TravelingBirds Dataset: Vögel werden aus dem Original-Hintergrund ausgeschnitten",
      "Die Vögel werden auf neue Hintergründe mit eindeutigen und zufällig gewählten Orten-Kategorien für jede Vogelklasse platziert"
    ]
  },
  {
    title: "Concept Bottleneck Models – Vor- und Nachteile",
    border: "#993556",
    color: "#FBEAF0",
    points: [
      "Vorteile: Das Modell operiert auf einem bekannten Satz von Konzepten (und nichts anderem)",
      "Konzept Bottleneck Models ermöglichen Intervention und Erklärung durch Konzepte",
      "Könnten robuster gegen unerwünschte (Hintergrund-)Features sein",
      "Nachteile: Erfordert modifizierte Architektur und ist nicht auf existierende Modelle anwendbar",
      "Benötigt einen umfassenden Satz von Konzepten für hohe Genauigkeit und konzept-annotierte Trainingsdaten"
    ]
  },
  {
    title: "Concept Activation Vectors – Post-hoc Ansatz",
    border: "#854F0B",
    color: "#FAEEDA",
    points: [
      "Concept Activation Vectors (CAVs) sind ein Post-hoc Ansatz zur Identifikation von Konzepten im latenten Raum eines Modells",
      "Alternative zu Concept Bottleneck Models: Keine architektur-spezifischen Änderungen erforderlich",
      "Nach dem Modelltraining werden Konzept-Beispiele verwendet, um CAVs zu finden",
      "CAV ist die numerische Darstellung, die ein Konzept im Aktivierungsraum einer Neuronenschicht verallgemeinert",
      "Ziel: Vorhersagen auf Sensitivität gegenüber Konzepten zu untersuchen"
    ]
  },
  {
    title: "CAV Berechnung und Sanity Checks",
    border: "#5F5E5A",
    color: "#F1EFE8",
    points: [
      "CAV Berechnung: Embeddings für positive und negative Konzept-Beispiele berechnen",
      "Ein linearer Klassifizierer wird trainiert, um diese zu trennen",
      "CAV ist orthogonal zur Klassifikationsgrenze und liegt in der Aktivierungsebene",
      "Sanity Checks: Für ein gegebenes Konzept CAV berechnen",
      "Bilder untersuchen, die stark entlang der CAV-Richtung aktiviert werden, um die Validität zu prüfen"
    ]
  },
  {
    title: "Conceptual Sensitivity und Lokale Erklärungen",
    border: "#0F6E6E",
    color: "#E0F5F5",
    points: [
      "Conceptual Sensitivity geht um kleine Änderungen in der Konzept-Intensität: S_C,k,l(x) ∈ R",
      "Berechnet die Auswirkung kleiner Störungen in der CAV-Richtung (äquivalent zur richtungsabhängigen Ableitung)",
      "Formel: S_C,k,l(x) = lim ε→0 [h_l,k(f_l(x) + εv_C^l) - h_l,k(f_l(x))] / ε = ∇h_l,k(f_l(x)) · v_C^l",
      "Kann durch Skalarprodukt erhalten werden: CAV und Gradient des Output",
      "Interpretation: S_C,k,l(x) > 0 bedeutet, dass Konzept C das Modell ermutigt, x als Klasse k zu klassifizieren"
    ]
  },
  {
    title: "Global Explanations mit TCAV Score",
    border: "#534AB7",
    color: "#EEEDFE",
    points: [
      "Testing Concept Activation Score (TCAV): Fasst viele lokale Erklärungen zusammen",
      "Formel: TCAV_C,k,l = |{x ∈ X_k: S_C,k,l(x) > 0}| / |X_k|",
      "Berechnet den Anteil der Eingaben mit positiven konzeptuellen Sensitivitäten für eine Klasse",
      "Bestimmung der Bedeutsamkeit: CAV wird basierend auf benutzergewähltem Konzept und Zufallsdatensätzen trainiert",
      "Wenn die verwendeten Datensätze schlecht sind, können Erklärungen irreführend sein",
      "Statistische Signifikanztests empfohlen: mehrere CAVs mit verschiedenen Zufallsdatensätzen trainieren"
    ]
  }
];

const MNEMONICS = [
  {
    title: "CBM – Concept Bottleneck Model",
    keywords: ["Architektur", "Konzepte", "Bottleneck"],
    mnemonic: "C – Concepts (Konzepte als Zwischenschicht)\nB – Bottleneck (Engpass-Schicht für Konzepte)\nM – Model (tiefes Lernmodell mit zwei Phasen)\n\nZwei Phasen: Input → Concepts → Output\nJede Phase ist trainierbar und interpretierbar"
  },
  {
    title: "CAV – Concept Activation Vector",
    keywords: ["Post-hoc", "Vektor", "Latent"],
    mnemonic: "C – Concept (menschliches Konzept)\nA – Activation (im neuronalen Netzwerk)\nV – Vector (numerische Richtung im Raum)\n\nNach dem Training: Konzept-Beispiele finden → linearen Klassifizierer trainieren → CAV"
  },
  {
    title: "SANITY – Überprüfung der CAV-Validität",
    keywords: ["Validierung", "Bilder", "Richtung"],
    mnemonic: "S – Samples (CAV für Konzept berechnen)\nA – Analyze (stark aktivierte Bilder prüfen)\nN – Neuro (neuronale Aktivierungen entlang CAV)\nI – Images (Bilder sollten dem Konzept entsprechen)\nT – Test (Sanity Check bestätigt Validität)\nY – Yes/No (Ergebnisse sind plausibel oder nicht)"
  },
  {
    title: "CS – Conceptual Sensitivity",
    keywords: ["Sensitivität", "Ableitung", "Konzept"],
    mnemonic: "C – Conceptual (bezüglich Konzepts)\nS – Sensitivity (wie empfindlich ist die Ausgabe?)\n\nFormel: S = ∇h(f(x)) · v_C\n∇ = Gradient der Output-Funktion\n· = Skalarprodukt mit CAV"
  },
  {
    title: "TCAV – Testing Concept Activation Score",
    keywords: ["Global", "Score", "Klasse"],
    mnemonic: "T – Testing (Bewertungsmetrik)\nC – Concept (auf Konzept-Basis)\nA – Activation (CAV-Aktivierungen)\nV – Vector (für spezifischen Vektor)\n\nFormula: (Positive Sensitivitäten) / (Alle Beispiele einer Klasse)"
  },
  {
    title: "ICPE – Input-Concept-Prediction-Ende",
    keywords: ["Training", "Daten", "Annotation"],
    mnemonic: "I – Input (rohes Datum x)\nC – Concept (annotierte Konzepte c)\nP – Prediction (Zielabel y)\nE – Ensemble (alle drei zusammen trainieren)\n\nTrainingsdaten: (x^(i), c^(i), y^(i)) statt nur (x^(i), y^(i))"
  },
  {
    title: "GIGO – Garbage In, Garbage Out",
    keywords: ["Daten", "Zuverlässigkeit", "Test"],
    mnemonic: "G – Garbage In (schlechte CAV-Trainingsdatensätze)\nI – Input (führen zu unreliablen Ergebnissen)\nG – Garbage Out (irreführende Erklärungen)\nO – Out (deshalb: statistische Signifikanztests nutzen)"
  },
  {
    title: "GRAD – Gradient-based Directional Derivative",
    keywords: ["Mathematik", "Richtung", "Ableitung"],
    mnemonic: "G – Gradient (∇h_l,k(f_l(x)))\nR – Result (numerischer Wert)\nA – Activation (CAV-Richtung)\nD – Derivative (richtungsabhängige Ableitung)\n\nS_C,k,l(x) = ∇h · v_C = direkte Sensitivität"
  }
];

const FLASHCARDS = [
  {
    q: "Was ist der Hauptunterschied zwischen Concept Bottleneck Models und standard Deep Learning Modellen?",
    a: "Concept Bottleneck Models zwingen das Modell, zunächst hochrangige Konzepte vorherzusagen, bevor die Endbeschäftigung gemacht wird. Das ist ein zwei-Phasen-Prozess:\n1. Input x → Konzepte c vorhersagen: ĉ = g(x)\n2. Konzepte c → Label y vorhersagen: ŷ = f(g(x))\n\nStandard-Modelle sagen direkt: Input x → Label y"
  },
  {
    q: "Welche Trainingsdaten werden für Concept Bottleneck Models benötigt?",
    a: "Im Gegensatz zu standard Modellen mit (x, y) benötigen CBM Trainingsdaten mit drei Komponenten:\n- x: die Eingabe\n- c: die Konzept-Labels (menschlich annotiert)\n- y: das Ziel-Label\n\nAlso (x^(i), c^(i), y^(i)) für jeden Datenpunkt\n\nDies bedeutet, dass jedes Trainingsbeispiel mit relevanten Konzepten annotiert werden muss"
  },
  {
    q: "Was sind Concept Activation Vectors (CAVs) und wie unterscheiden sie sich von Concept Bottleneck Models?",
    a: "CAVs sind ein Post-hoc Ansatz (nach dem Training), während CBM ein Architektur-Ansatz ist:\n\nCAV:\n- Kann auf bereits trainierten Modellen angewendet werden\n- Erfordert keine architektur-Änderungen\n- Benötigt Konzept-Beispiele zum Trainieren eines linearen Klassifizierers\n- CAV ist ein Vektor im Aktivierungsraum\n\nCBM:\n- Erfordert spezielle Architektur mit Bottleneck-Schicht\n- Erzwingt Modell-Verhalten während des Trainings\n- Benötigt Konzept-annotierte Trainingsdaten"
  },
  {
    q: "Wie wird ein Concept Activation Vector berechnet?",
    a: "CAV-Berechnung erfolgt in drei Schritten:\n\n1. Embeddings vorbereiten: Berechne Embeddings für alle positiven und negativen Konzept-Beispiele an einer gewählten Schicht l\n\n2. Linearen Klassifizierer trainieren: Trainiere einen linearen Klassifizierer, um positive und negative Beispiele zu trennen\n\n3. CAV extrahieren: Der Normalvektor der Klassifikationsgrenze ist der CAV\n\nDer CAV ist orthogonal zur Klassifikationsgrenze und liegt im Aktivierungsraum der Schicht"
  },
  {
    q: "Was sind 'Sanity Checks' bei der Verwendung von CAVs und warum sind sie wichtig?",
    a: "Sanity Checks sind Validierungsverfahren zur Überprüfung der CAV-Qualität:\n\n1. CAV für ein Konzept berechnen (z.B. 'Streifen')\n2. Bilder finden, die stark entlang der CAV-Richtung aktiviert werden\n3. Visuelle Prüfung: Sind diese Bilder tatsächlich Beispiele des Konzepts?\n\nWichtig, weil:\n- CAVs können sinnlos sein, wenn schlecht trainiert\n- Sanity Checks zeigen, ob der CAV wirklich das Konzept erfasst\n- Beispiel: Top-3 Bilder für 'Streifen' sollten tatsächlich gestreifte Muster zeigen"
  },
  {
    q: "Was ist Conceptual Sensitivity und wie wird sie berechnet?",
    a: "Conceptual Sensitivity S_C,k,l(x) misst, wie empfindlich eine Vorhersage auf kleine Änderungen in der Konzept-Intensität reagiert.\n\nFormel:\nS_C,k,l(x) = lim ε→0 [h_l,k(f_l(x) + εv_C) - h_l,k(f_l(x))] / ε\n\nDies ist äquivalent zu einer richtungsabhängigen Ableitung:\nS_C,k,l(x) = ∇h_l,k(f_l(x)) · v_C\n\nwobei:\n- ∇h_l,k = Gradient der Output-Funktion\n- v_C = CAV (Konzept Activation Vector)\n- · = Skalarprodukt"
  },
  {
    q: "Wie interpretiert man Conceptual Sensitivity Werte?",
    a: "Die Interpretation von S_C,k,l(x):\n\n1. S_C,k,l(x) > 0: \n   Das Konzept C ermutigt das Modell, die Eingabe x als Klasse k zu klassifizieren\n   Positive Beziehung zwischen Konzept und Klasse\n\n2. S_C,k,l(x) < 0:\n   Das Konzept C verhindert, dass das Modell die Eingabe als Klasse k klassifiziert\n   Negative Beziehung zwischen Konzept und Klasse\n\n3. S_C,k,l(x) ≈ 0:\n   Das Konzept C hat wenig bis keine Auswirkung auf die Klassifizierung\n   Konzept ist für diese Vorhersage irrelevant"
  },
  {
    q: "Was ist der TCAV Score und wie wird er berechnet?",
    a: "TCAV (Testing Concept Activation Score) fasst viele lokale Erklärungen zusammen:\n\nFormel:\nTCAV_C,k,l = |{x ∈ X_k: S_C,k,l(x) > 0}| / |X_k|\n\nBedeutung:\n- Zähler: Anzahl der Eingaben in Klasse k mit positiver Conceptual Sensitivity\n- Nenner: Gesamtzahl der Eingaben in Klasse k\n- Ergebnis: Anteil (0 bis 1), wie relevant das Konzept für die Klasse ist\n\nInterpretation:\n- TCAV = 0.9: 90% der Klassenbeispiele zeigen positive Sensitivität\n- TCAV = 0.1: Nur 10% zeigen positive Sensitivität (Konzept wenig relevant)"
  },
  {
    q: "Wie überprüft man die Bedeutsamkeit von TCAV Scores?",
    a: "Bestimmung der Bedeutsamkeit eines TCAV Scores:\n\n1. Erste Beobachtung:\n   TCAV wird basierend auf dem benutzergewählten Konzept UND einem Zufallsdatensatz trainiert\n\n2. Problem:\n   Wenn der Zufallsdatensatz schlecht ist, kann der TCAV Score irreführend sein\n   CAV könnte irrelevante Muster erfassen\n\n3. Lösung - Statistische Signifikanztests:\n   - Multiple CAVs trainieren mit verschiedenen zufälligen Datensätzen\n   - TCAV Scores vergleichen\n   - Ein konsistenter TCAV Score über verschiedene Datensätze hindurch ist aussagekräftig\n   - Signifikanzniveau z.B. p < 0.05 verwenden"
  },
  {
    q: "Erklären Sie die zwei Phasen eines Concept Bottleneck Models mit Formeln.",
    a: "Phase 1 - Konzept-Vorhersage (Feature Engineering):\nĉ = g(x)\n\nwobei:\n- x: die Eingabe (z.B. Bild)\n- g: ein neuronales Netzwerk, das Konzepte vorhersagt\n- ĉ: die vorhergesagten Konzeptwerte\n\nPhase 2 - Label-Vorhersage:\nŷ = f(g(x)) = f(ĉ)\n\nwobei:\n- f: ein lineares oder einfaches Modell, das Konzepte zu Labels abbildet\n- ŷ: die finale Vorhersage\n\nGemeinsam: ŷ = f(g(x))\n\nVorteil: Zwischen Konzepten ĉ können editiert und Effekte beobachtet werden"
  },
  {
    q: "Was ist eine Intermediate Loss bei Concept Bottleneck Models?",
    a: "Intermediate Loss ist ein zusätzlicher Trainings-Verlust in der Bottleneck-Schicht:\n\nZweck:\n- Ermutigt Neuronen in der Bottleneck-Schicht, sich komponentenweise an die bereitgestellten Konzepte auszurichten\n- Stellt sicher, dass die Schicht tatsächlich Konzepte darstellt\n\nFunktion:\n- Vergleicht die Neuron-Aktivierungen mit den annotierten Konzepten\n- Straft Abweichungen ab\n- Wird mit dem Hauptvorhersage-Verlust kombiniert\n\nErgebnis:\n- Bottleneck-Schicht wird gezwungen, ein konzeptuelles Zwischen-Verständnis zu entwickeln"
  },
  {
    q: "Beschreiben Sie die Test-Zeit Interventionen bei Concept Bottleneck Models.",
    a: "Test-Zeit Interventionen ermöglichen es, Modellvorhersagen zu manipulieren:\n\nProzeß:\n1. Führe Eingabe x durch Phase 1 aus: ĉ = g(x)\n2. Erhalte falsche Konzeptvorhersage (z.B. 'narrow joint space' wird als 1.69 statt 1.0 vorhergesagt)\n3. Editiere den Konzeptwert manuell: ĉ_edited = [1.12, 1.0, 0.31] statt [1.12, 1.69, 0.31]\n4. Führe editierte Konzepte durch Phase 2 aus: ŷ = f(ĉ_edited)\n\nErgebnis:\n- Vorhersage ändert sich von 'falsch' zu 'richtig'\n- Zeigt den kausalen Zusammenhang zwischen Konzepten und Vorhersage\n- Demonstriert Interpretierbarkeit und Kontrollierbarkeit des Modells"
  },
  {
    q: "Wie tragen Concept Bottleneck Models zur Robustheit gegen Hintergrund-Verschiebungen bei?",
    a: "Robustheit gegen spurlose Korrelationen:\n\nProblem bei Standard-Modellen:\n- Ein Modell könnte spurlos den Hintergrund mit dem Label assoziieren\n- Wenn sich die Hintergrund-Label Beziehung in der Testverteilung ändert, macht das Modell Fehler\n- Beispiel: Modell lernt 'Vogel ist Herring Gull wegen Wasser im Hintergrund'\n\nCBM Lösung:\n- Modell operiert nur auf expliziten Konzepten\n- Wenn Trainingsdaten Konzepte wie 'wing color' und 'undertail color' korrekt annotieren\n- Der Hintergrund wird NICHT als Konzept definiert\n- Das Modell kann die spurlose Hintergrund-Korrelation nicht lernen\n- Daher robuster gegen Hintergrund-Verschiebungen"
  },
  {
    q: "Beschreiben Sie das TravelingBirds Dataset und seinen Zweck.",
    a: "TravelingBirds Dataset zum Testen der Robustheit:\n\nKonstruktion:\n1. Original-Vogel-Bilder mit verschiedenen Hintergründen\n2. Vögel aus dem Original-Hintergrund ausschneiden\n3. Jede Vogelart auf eine neue, eindeutige Hintergrund-Kategorie (Ort) platzieren\n4. Jede Klasse bekommt zufällig gewählte Orte als Hintergründe\n\nZweck:\n- Teste robustness gegen drastische Hintergrund-Änderungen\n- Standard-Modelle, die Hintergrund lernen, scheitern\n- CBMs, die nur Vogel-Konzepte nutzen, sollten besser abschneiden\n- Zeigt Vorteil von konzeptbasierten Erklärungen"
  },
  {
    q: "Was sind die Vorteile von Concept Activation Vectors gegenüber Concept Bottleneck Models?",
    a: "CAV Vorteile:\n\n1. Post-hoc Ansatz:\n   - Keine Architektur-Änderungen notwendig\n   - Kann auf bereits trainierten Modellen angewendet werden\n   - Flexibel und schnell implementierbar\n\n2. Weniger Annotationen:\n   - Keine Konzept-annotierten Trainingsdaten erforderlich\n   - Nur Konzept-Beispiele zum Trainieren des CAV-Klassifizierers\n   - Deutlich weniger Labelingaufwand\n\n3. Anwendbarkeit:\n   - Funktioniert mit existierenden Modellen\n   - Keine Retraining notwendig\n   - Kann auf verschiedene Modellarchitekturen angewendet werden"
  },
  {
    q: "Was sind die Nachteile von Concept Activation Vectors?",
    a: "CAV Nachteile:\n\n1. Repräsentation komplexer Konzepte:\n   - Eine einzelne CAV-Richtung könnte komplexe Konzepte nicht vollständig erfassen\n   - Lineare Approximation kann zu Informationsverlust führen\n\n2. Konzept-Definition:\n   - Das Konzept wird nur über sein Konzept-Dataset definiert\n   - Gefährlich bei unbalancierten Datasets\n   - Beispiel: Alle 'Streifen'-Beispiele sind auch rot → CAV erfasst möglicherweise 'rot'\n\n3. Sensitivität:\n   - Conceptual Sensitivity zu kleinen Änderungen könnte nicht aussagekräftig sein\n   - Kleine Störungen könnten keine großen Effekte zeigen\n\n4. Layer-Abhängigkeit:\n   - Ergebnisse hängen von der gewählten Schicht ab\n   - Verschiedene Schichten geben verschiedene Ergebnisse"
  },
  {
    q: "Erklären Sie das Konzept der linearen Interpretierbarkeit bei CAVs.",
    a: "Lineare Interpretierbarkeit:\n\nGrundidee:\n- Der hochdimensionale Zustand eines ML-Modells kann als zwei Vektorräume angesehen werden\n- E_m: Raum aufgespannt durch Basis-Vektoren e_m (entspricht Input-Features und Neural Activations)\n- E_h: Raum aufgespannt durch implizite Vektoren e_h (entspricht unbekannten menschlichen Konzepten)\n\nInterpretation als Funktion:\n- g: E_m → E_h ist linear interpretierbar\n- Die hochdimensionale Aktivierung kann als Linearkombination von Konzepten verstanden werden\n- CAVs bilden eine Basis für E_h\n\nLimitierung:\n- Lineare Interpretierbarkeit ist nicht perfekt\n- Die Funktion g kann nicht alle Aspekte des Input-Raums E_m erklären"
  },
  {
    q: "Wie wählt man geeignete Konzepte für Concept Bottleneck Models?",
    a: "Auswahl geeigneter Konzepte:\n\n1. Menschliche Relevanz:\n   - Konzepte müssen für die Aufgabe relevant sein\n   - Beispiel: Für Vogel-Klassifizierung relevant: 'wing color', 'beak length'\n   - Nicht relevant: 'Größe des Hintergrundes'\n\n2. Definierbarkeit:\n   - Konzepte müssen eindeutig definierbar sein\n   - Mit Bildern illustrierbar\n   - Nicht mehrdeutig\n\n3. Repräsentation:\n   - Zusammen sollten alle Konzepte das Ziel-Phänomen abdecken\n   - Redundanzen minimieren\n   - Kompletheit maximieren\n\n4. Anzahl:\n   - Zu wenige: Modell kann Vorhersage nicht machen\n   - Zu viele: Overfitting und hoher Annotationsaufwand\n   - Goldene Mitte finden durch Experimente"
  },
  {
    q: "Erkläre den Unterschied zwischen globalen und lokalen Erklärungen in der CAV-Methode.",
    a: "Lokale Erklärungen (Conceptual Sensitivity):\n- S_C,k,l(x): Sensitivität für eine spezifische Eingabe x\n- Antwortet: 'Wie wichtig ist Konzept C für die Vorhersage dieser einen Eingabe?'\n- Ein Wert pro Eingabe pro Konzept\n- Hilft zu verstehen: Was hat das Modell für DIESE Entscheidung berücksichtigt?\n\nGlobale Erklärungen (TCAV Score):\n- TCAV_C,k,l: Durchschnitt über alle Eingaben einer Klasse\n- Antwortet: 'Wie wichtig ist Konzept C für die gesamte Klasse k?'\n- Ein Wert pro Konzept pro Klasse\n- Hilft zu verstehen: Was berücksichtigt das Modell GENERELL für diese Klasse?\n\nBeziehung:\n- TCAV fasst lokale Sensitivitäten zusammen\n- TCAV = Anteil der Eingaben mit positiver Conceptual Sensitivity"
  },
  {
    q: "Wie können Gradient-basierte Erklärungen zur Überprüfung von CAVs verwendet werden?",
    a: "Gradient-basierte Erklärungen und CAVs:\n\n1. Verbindung:\n   - Conceptual Sensitivity ist selbst eine Gradient-basierte Erklärung\n   - S_C,k,l(x) = ∇h_l,k(f_l(x)) · v_C\n   - ∇h_l,k ist der Gradient der Output-Funktion\n\n2. Verifikation:\n   - Gradient-Saliency Maps können zeigen, welche Pixel wichtig sind\n   - Man kann überprüfen, ob CAV-aktivierte Regionen mit Gradient-Saliency übereinstimmen\n   - Beide sollten auf ähnliche Regionen hindeuten\n\n3. Complementarität:\n   - Saliency Maps: Pixel-Level Wichtigkeit\n   - CAVs: Konzept-Level Wichtigkeit\n   - Kombinieren gibt umfassenderes Verständnis"
  },
  {
    q: "Was ist der Unterschied zwischen Removal-based und Gradient-based Explanations im Kontext von Concept-based Explanations?",
    a: "Im Kontext von Concept Bottleneck Models:\n\nRemoval-based Explanations:\n- Editiere einen Konzeptwert (z.B. 'joint space narrowing' von 1.69 zu 1.0)\n- Beobachte die Änderung in der finalen Vorhersage\n- Frage: 'Wie sehr ändert sich die Vorhersage, wenn ich dieses Konzept entferne/ändere?'\n- Direkt und intuitiv\n- Test-Zeit Interventionen bei CBMs\n\nGradient-based Explanations:\n- Berechne Gradient der Output bezüglich Konzepte\n- Conceptual Sensitivity: S = ∇h · v_C\n- Frage: 'Wie empfindlich reagiert die Vorhersage auf kleine Änderungen dieses Konzepts?'\n- Mathematisch elegant\n- Funktioniert mit CAVs\n\nVergleich:\n- Ähnlich, aber Removal ist diskret, Gradient ist kontinuierlich\n- Removal zeigt größere Effekte, Gradient zeigt lokale Sensitivität"
  },
  {
    q: "Erkläre das Konzept der Interpretation über Vektor-Räume bei CAVs.",
    a: "Vektor-Raum-Interpretation:\n\nGrundkonzept:\n- Modell-Zustand wird als Vektor im hochdimensionalen Raum dargestellt\n- Zwei hauptsächliche Vektorräume:\n  1. E_m: Input/Feature Space (Embeddings der Eingabe)\n  2. E_h: Human-Concept Space (menschlich verständliche Konzepte)\n\nCAVs als Basis:\n- CAVs spannen eine Basis des Concept-Raums E_h auf\n- Jedes Konzept ist ein Basisvektor\n- Aktivierungen sind Koeffizienten dieser Basis\n\nLineare Interpretation:\n- Eine Aktivierung f_l(x) kann als Linearkombination von CAVs ausgedrückt werden\n- f_l(x) ≈ Σ α_i · v_i (wobei v_i CAVs sind)\n- Dies erlaubt 'Lesen' der Aktivierung in Konzepten\n\nLimitierung:\n- Diese Interpretation ist nicht perfekt\n- Nicht alle Aspekte können erfasst werden\n- Aber bietet einen praktischen Zugang zur Interpretierbarkeit"
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
