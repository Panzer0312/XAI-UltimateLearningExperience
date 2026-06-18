import { useState } from "react";

const TOPIC_TITLE = "Neural Network Interpretation";
const TOPIC_DESCRIPTION = "Verfahren zur Interpretation und Visualisierung interner Strukturen und Entscheidungen von neuronalen Netzen, einschließlich Aufmerksamkeitsmechanismen und Layer-Visualisierung";
const LECTURE_NUM = "8";
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
    title: "Neuron Interpretation & Feature-Level Erklärungen",
    border: "#534AB7",
    color: "#EEEDFE",
    points: [
      "Neuron Interpretation ist ein detailliertes Verfahren zur Analyse interner Neuronen, Filter und Schichten",
      "Ziel: Verständnis für interne Features von Modellen entwickeln, nicht nur Eingabe-Ausgabe-Zusammenhänge",
      "Ältere Ansätze: Feature/Konzept-Wichtigkeit für einzelne Vorhersagen (coarse-grained)",
      "Neuron Interpretation: Fein-granulierter Ansatz zur Analyse einzelner Neuronen und ihrer Aktivierungsmuster",
      "Visualisierungen zeigen oft, was spezifische neuronale Einheiten erkennen und verarbeiten"
    ]
  },
  {
    title: "Attention Mechanismen in neuronalen Netzen",
    border: "#0F6E56",
    color: "#E1F5EE",
    points: [
      "Aufmerksamkeit wird häufig in NLP-Modellen zur Erklärung von Vorhersagen verwendet",
      "Attention Weights (αt,i): gewichtete Summe von Encoder-Ausgaben ct = Σ αt,i * hi",
      "Softmax-normalisierte Alignment-Scores: αt,i = exp(score(st-1, hi)) / Σ exp(score(st-1, hi'))",
      "Attention zeigt konzeptionell, welche Eingabeteile für eine bestimmte Ausgabe wichtig sind",
      "Wird in Transformer-basierten Modellen als Kernmechanismus eingesetzt (Vaswani et al. 2017)"
    ]
  },
  {
    title: "Aufmerksamkeit ist KEINE garantierte Erklärung",
    border: "#185FA5",
    color: "#E6F1FB",
    points: [
      "Wichtige Warnung: Attention Weights müssen nicht mit Feature-Wichtigkeit korrelieren",
      "Forschungsergebnisse zeigen: Moderate bis schwache Korrelation mit gradientenbasierten Maßstäben",
      "Alternative Aufmerksamkeitsverteilungen können ähnliche Vorhersagen ermöglichen",
      "Kritische Schlussfolgerung: Aufmerksamkeit bietet EINE Erklärung, nicht DIE Erklärung",
      "Sollte für Sanity-Checks und Debugging genutzt werden, aber nicht als alleinige Interpretationsmethode",
      "Existenznachweis entbehrt nicht Exklusivität: Mehrere verschiedene Attention-Muster können funktionieren"
    ]
  },
  {
    title: "Transformers und ihre Bedeutung für XAI",
    border: "#993C1D",
    color: "#FAECE7",
    points: [
      "Transformers revolutionierten Machine Learning über mehrere Domänen hinweg",
      "Lucas Beyer (Google Brain): 'One architecture per community' → Transformer für alle Bereiche",
      "Computer Vision (CVs): Convolutional Neural Networks (CNNs, ResNets)",
      "Natürliche Sprachverarbeitung (NLP): Recurrent Neural Networks (RNNs, BiLSTMs)",
      "Machine Translation: Seq2Seq-Architektur mit Alignment-Mechanismen",
      "Speech: Deep Belief Nets (DBNs) und andere spezielle Architekturen",
      "Reinforcement Learning: Behavioral Cloning, GAIL",
      "Nach Transformer-Einführung: Domänen-übergreifende Adoption derselben Basis-Architektur"
    ]
  },
  {
    title: "Visualisierung von CNNs - Das AlexNet Beispiel",
    border: "#3B6D11",
    color: "#EAF3DE",
    points: [
      "AlexNet (Krizhevsky et al. 2012): Durchbruch-Netzwerk für ImageNet-Klassifikation",
      "Architektur: 5 Convolutional Layer, max-pooling, 3 fully-connected Layer mit Softmax",
      "Early Layers (1-2): Lernen einfache Low-Level Features wie Kanten, Farben und Texturen",
      "Intermediate Layers (3): Erkennen geometrische Strukturen und Muster",
      "Later Layers (4-5): Aktivieren für Hochlevel-Konzepte (Objekte, Gesichter, spezifische Kategorien)",
      "Deconvnet-Methode: Inversion von Netzwerk-Komponenten zur Visualisierung (Zeiler & Fergus 2014)",
      "Transposed Convolutions invertieren Faltungen, Unpooling mit Max-Switches invertiert Pooling"
    ]
  },
  {
    title: "Deconvnet Inverting & praktische Visualisierungstechniken",
    border: "#993556",
    color: "#FBEAF0",
    points: [
      "Ziel: Mapping von Feature-Map-Aktivierungen zurück in Eingabepixel-Raum",
      "Convolutional Filters: Transponierte Versionen werden wie Deconvolution angewendet",
      "Unpooling: Max Pooling ist nicht invertierbar, aber Max-Switches werden aufbewahrt um approximativ zu invertieren",
      "ReLU Inversion: Rekonstruiertes Signal wird durch ReLU geleitet",
      "Herausforderung: Operationen sind approximativ nicht exakt invertierbar",
      "Vorteil: Fast und einfach implementierbar, keine Netzwerk-Änderungen erforderlich",
      "Nachteil: Invertierte Visualisierungen können schwer zu interpretieren sein, niedriger Qualität"
    ]
  },
  {
    title: "ImageNet Klassifikation & Deep Learning Durchbruch",
    border: "#854F0B",
    color: "#FAEEDA",
    points: [
      "ImageNet: 22K Kategorien mit 14M Bildern (Deng et al. 2009)",
      "ILSVRC (ImageNet Large Scale Visual Recognition Challenge) 2010: 1,000 Objektklassen",
      "2012: Dramatischer Sprung - Top-5 Error von 26.2% auf 15.3% durch AlexNet (Tiefe Convolutions)",
      "Erfolgsfaktoren: Große Datenmengen + GPU-Computing + tiefe Architekturen",
      "Nach 2012: Alle ILSVRC-Winner basierten auf CNNs",
      "Trend: Zunehmend tiefere Netzwerke - von 8 Schichten (AlexNet) zu 152 Schichten (ResNet)",
      "Dieser Erfolg motivierte die Nachfrage nach Interpretierbarkeit: Warum funktionieren tiefe Netze so gut?"
    ]
  },
  {
    title: "Encoder-Decoder & Attention in Maschinelle Übersetzung",
    border: "#5F5E5A",
    color: "#F1EFE8",
    points: [
      "Problem Encoder-Decoder: Alle Eingabeinformationen werden in einen festen Context Vector gequetscht",
      "BLEU-Scores werden schlecht bei längeren Sätzen - Information geht verloren",
      "Bahdanau et al. (2015): Attention-basierte Alignment für Neural Machine Translation",
      "Alignment Score: score(st-1, hi) = va^T * tanh(Wa * [st-1; hi]) mit gelernte Parameter va, Wa",
      "Context Vector: ct = Σ αt,i * hi mit softmax-normalisiertem Alignment αt,i",
      "Decoder erhält: previous state st-1, context vector ct, previous output yt-1",
      "Resultat: Signifikante Verbesserung, besonders bei längeren Sätzen"
    ]
  },
  {
    title: "Model-Agnostische vs. Modell-Spezifische Interpretationsmethoden",
    border: "#0F6E6E",
    color: "#E0F5F5",
    points: [
      "Model-agnostische Methoden: Arbeiten mit beliebigen Modellen (LIME, SHAP, Saliency Maps)",
      "Nachteil: Oft rechnerisch teuer, müssen viele Forward-Passes durchführen",
      "Modell-spezifische Methoden: Nutzen spezifische Netzwerk-Struktur aus",
      "Vorteil: Können Gradienten direkt nutzen - effizienter und schneller",
      "Gradientenbasierte Methoden: Nutzen Backpropagation zur Berechnung von Sensitivitäten",
      "Für neuronale Netze: Spezifische Methoden sind oft praktikabler als model-agnostische",
      "Grund: Neuronale Netze lernen Konzepte in Hidden Layers - benötigen speziale Tools um sie zu enthüllen"
    ]
  }
];

const MNEMONICS = [
  {
    title: "ATTENTION",
    keywords: ["Query", "Key", "Value", "Softmax"],
    mnemonic: "A - Alignment scores between decoder state and encoder outputs\nT - Transform via softmax to get attention weights\nT - Tracked weights show which inputs the model attends to\nE - Each weight between 0 and 1 after normalization\nN - Normalized sum equals 1 for all positions\nT - Temporal (sequential) dependency learning\nI - Information from encoder becomes context vector\nO - Outputs weighted sum of encoder hidden states\nN - Not necessarily explanation (key caveat!)"
  },
  {
    title: "DECONVNET",
    keywords: ["Transposed Conv", "Unpooling", "ReLU"],
    mnemonic: "D - Deconvolution uses transposed filter versions\nE - Each layer inverted in reverse order\nC - Convolution backward becomes transposed conv\nO - Operate layers in reverse (from activation to input)\nN - Note: operations are approximations, not exact\nV - Visualize what patches activate each filter\nN - Networks become interpretable through inversion\nE - Early layers show simple features (edges, colors)\nT - Top layers show complex semantic concepts"
  },
  {
    title: "ALEXNET",
    keywords: ["5 Conv", "GPU", "ReLU", "2012"],
    mnemonic: "A - Architecture: 5 convolutional layers, 224x224 input\nL - Large dataset (ImageNet) enabled training\nE - Early layers extract low-level features\nX - eXceed previous state-of-the-art by large margin\nN - Neural networks suddenly became practical\nE - Error dropped from 26.2% to 15.3% top-5\nT - Transformative moment: 'ImageNet moment' in AI history"
  },
  {
    title: "ENCODER-DECODER",
    keywords: ["Context Vector", "Bottleneck", "Alignment"],
    mnemonic: "E - Encoder processes input sequence to hidden states\nN - Network learns bidirectional representations\nC - Context vector: bottleneck containing all information\nO - Output: compressed representation of source\nD - Decoder generates target from context\nE - Each output depends on context + previous state\nC - Circular problem: long sequences lose information\nO - Overcome with attention mechanism\nD - Distribute attention rather than compress all at once\nE - Each target token can access relevant source tokens\nR - Revolutionary for sequence-to-sequence tasks"
  },
  {
    title: "CNN-FEATURES",
    keywords: ["Hierarchical", "Compositionality", "Invariance"],
    mnemonic: "C - Compositionality: simple features → complex concepts\nN - Networks show increasing semantic meaning\nN - Neurons in layer 1 detect edges and colors\n\nF - Features become increasingly invariant up layers\nE - Early filters: localized, simple patterns\nA - Advanced filters: object parts, semantic meaning\nT - Top layers: category-specific concepts\nU - Understand emergent behavior through visualization\nR - Representation learning across hierarchies\nE - Examine what each neuron learned\nS - Supervision drives semantic organization"
  }
];

const FLASHCARDS = [
  {
    q: "Was ist Neural Network Interpretation?",
    a: "Neuron Interpretation ist die detaillierte Analyse interner Strukturen von neuronalen Netzen, um zu verstehen, wie einzelne Neuronen, Filter und Schichten Merkmale verarbeiten. Im Gegensatz zu groben Erklärungen auf Vorhersage-Ebene fokussiert Neuron Interpretation auf die Fein-granulare Analyse der internen Repräsentationen.\n\nZiel: Verständnis für die 'Black Box' entwickeln und visualisieren, was Netzwerke gelernt haben."
  },
  {
    q: "Erkläre den Attention-Mechanismus in Machine Translation",
    a: "Attention löst das Problem des Encoder-Decoder-Bottlenecks:\n\n1. PROBLEM: Alle Eingabeinformationen müssen in einen festen Context Vector komprimiert werden → Information geht verloren\n\n2. LÖSUNG:\n- Alignment Score: score(st-1, hi) = va^T * tanh(Wa * [st-1; hi])\n- Attention Weights: αt,i = exp(score(st-1, hi)) / Σ exp(score(st-1, hi'))\n- Context Vector: ct = Σ αt,i * hi\n\n3. EFFEKT:\n- Decoder kann relevant Encoder-Outputs für jeden Output-Token auswählen\n- Verbesserte Performance besonders bei langen Sätzen"
  },
  {
    q: "Ist Attention = Erklärung? Begründe Deine Antwort.",
    a: "NEIN, Attention ist NICHT gleich Erklärung. Wichtige Erkenntnisse:\n\n1. SCHWACHE KORRELATION:\n- Attention Weights korrelieren nur modest mit Feature-Importance-Maßstäben\n- Gradient-basierte Sensitivitäten zeigen andere Wichtigkeits-Muster\n\n2. ALTERNATIVE ERKLÄRUNGEN MÖGLICH:\n- Alternative Attention-Verteilungen können ähnliche Vorhersagen ermöglichen\n- Adversarial Attention zeigte: Man kann verschiedene Attention-Maps erzeugen mit gleicher Performance\n\n3. WICHTIGKEIT:\n- 'Existenz entbehrt nicht Exklusivität'\n- Attention bietet EINE Erklärung, nicht DIE Erklärung\n- Nützlich für Sanity Checks und Debugging, aber nicht als alleinige Interpretationsmethode"
  },
  {
    q: "Wie funktioniert die Deconvnet-Visualisierung?",
    a: "Deconvnet invertiert Netzwerk-Operationen um Feature-Map-Aktivierungen in Eingabepixel-Raum zu projizieren:\n\n1. CONVOLUTIONAL FILTER:\n- Transponierte Versionen der gelernten Filter werden als 'Deconvolution' angewendet\n\n2. UNPOOLING:\n- Max Pooling ist nicht invertierbar\n- Max-Switches werden aufbewahrt während Forward-Pass\n- Unpooling platziert Aktivierungen an ursprünglichen Max-Positionen\n\n3. ReLU INVERSION:\n- Rekonstruiertes Signal wird durch ReLU geleitet\n- Nur positive Aktivierungen werden weitergeleitet\n\n4. NACHTEILE:\n- Invertierungen sind approximativ, nicht exakt\n- Visualisierungen können schwierig zu interpretieren sein\n- Qualität kann niedrig sein\n\n5. VORTEILE:\n- Schnell und einfach\n- Keine Netzwerk-Änderungen erforderlich"
  },
  {
    q: "Beschreibe die Hierarchie von Features in CNNs mit Beispielen.",
    a: "CNNs lernen hierarchische Repräsentationen, die von einfach zu komplex werden:\n\nLAYER 1 (EINFACHE FEATURES):\n- Kanten (horizontal, vertikal, diagonal)\n- Farbflecken und Texturen\n- Kleine räumliche Muster\n\nLAYER 2-3 (MITTLERE FEATURES):\n- Ecken und Junction Points\n- Texturen und Muster-Kombinationen\n- Geometrische Strukturen\n\nLAYER 4-5 (KOMPLEXE SEMANTIK):\n- Objekt-Teile (Augen, Nasen bei Gesichtern)\n- Ganze Objekte (Hunde, Autos, Blumen)\n- Kategorie-spezifische Konzepte\n\nDIESE HIERARCHIE ENTSTEHT DURCH:\n- Supervision: Verlust-Gradient treibt semantische Organisationen\n- Compositionality: Einfache Features kombinieren zu komplexeren\n- Invariance: Höhere Layer werden invariant gegen Transformationen"
  },
  {
    q: "Was war der ImageNet-Moment und seine Bedeutung?",
    a: "DER BREAKTHROUGH (2012):\n- AlexNet (Krizhevsky, Sutskever, Hinton) gewann ILSVRC 2012\n- Top-5 Error sank von 26.2% auf 15.3%\n- Deutlich besser als klassische Computer Vision Methoden\n\nWARUM WAR DAS REVOLUTIONÄR:\n1. ERST DANACH: Deep Learning wurde praktisch machbar\n   - GPU-Computing ermöglichte Training großer Netzwerke\n   - ImageNet-Größe Daten war verfügbar\n   - Architektur war tief (8 Layer) aber trainierbar\n\n2. DOMINO-EFFEKT:\n   - 2013 und später: Alle ILSVRC-Winner basierten auf CNNs\n   - Netzwerk-Tiefe stieg kontinuierlich (152 Layer bei ResNet)\n   - Deep Learning dominiert seither all Machine Learning Domänen\n\n3. MOTIVATOR FÜR XAI:\n   - Diese Black-Box-Erfolge motivierten die Frage: 'Warum funktioniert das?'\n   - Trieb Interpretierbarkeitsforschung voran"
  },
  {
    q: "Vergleiche Encoder-Decoder Architektur mit und ohne Attention.",
    a: "OHNE ATTENTION (Standard Encoder-Decoder):\n\nArchtitektur:\n- Encoder: BiLSTM / RNN verarbeitet Eingabe sequenziell\n- Bottleneck: Final hidden state ist Context Vector\n- Decoder: RNN mit Context Vector als initiale State\n\nProblem:\n- Alle Informationen müssen in ONE Vektor passen\n- Lange Eingaben verlieren Information durch Kompression\n- BLEU-Score fällt stark ab für lange Sätze\n\nMIT ATTENTION (Bahdanau et al. 2015):\n\nArchtitektur:\n- Decoder hat Zugang zu ALLEN Encoder-Outputs\n- Attention-Gewichte: αt,i wählen relevante Encoder-States\n- Context Vector wird für jeden Decoder-Timestep neu berechnet\n\nVorteil:\n- Keine Informationsverlust durch Bottleneck\n- Längere Sätze funktionieren besser\n- Model kann 'lernen, worauf zu achten ist'\n- Attention-Weights geben Interpretierbarkeit (mit Vorbehalten!)"
  },
  {
    q: "Was ist der Unterschied zwischen Model-Agnostisch und Modell-Spezifischen Methoden?",
    a: "MODEL-AGNOSTISCHE METHODEN:\n\nDefinition: Funktionieren mit beliebigen Modellen (Black-Box)\n\nBeispiele:\n- LIME: Local Linear Approximations\n- SHAP: Shapley Values\n- Saliency Maps basierend auf Input-Perturbation\n\nVorteile:\n- Allgemein anwendbar auf alle Modelle\n- Keine Model-spezifisches Wissen erforderlich\n\nNachteile:\n- Rechnerisch teuer (viele Forward-Passes nötig)\n- Langsam in der Praxis\n\nMODELL-SPEZIFISCHE METHODEN:\n\nDefinition: Nutzen spezifische Netzwerk-Struktur und Parameter\n\nBeispiele:\n- Gradient-basierte Sensitivitäten\n- Deconvnet (für CNNs)\n- Attention-Gewichte (für Transformer)\n\nVorteile:\n- Rechnerisch effizient (nutzen Gradienten direkt)\n- Schneller und praktikabler\n- Bessere Nutzung von Netzwerk-Struktur\n\nNachteile:\n- Nur für spezifische Architekturen\n- Nicht auf andere Modelle übertragbar\n\nFÜR NEURONALE NETZE: Modell-spezifische Methoden sind meist praktikabler, weil sie die interne Struktur nutzen."
  },
  {
    q: "Erkläre Concept-based Explanations und CAV (Concept Activation Vectors).",
    a: "CONCEPT-BASED EXPLANATIONS:\n\nDefinition: Erklärungen basierend auf High-Level-Konzepten statt Raw Inputs\n\nMotivation:\n- Menschen denken in Konzepten (Farbe, Textur, Objekt-Teile)\n- Nicht in Pixelwerten\n- Konzepte sind interpretierbar und praktisch\n\nKONCEPT BOTTLENECK MODELS:\n- Zwingen DL-Modell, spezifische Konzepte zu erkennen\n- Training mit concept-labeled Daten\n- Zwei-Stufen: Konzept-Erkennung → Klassifikation\n\nVorteile:\n- Kann für Analyse und Modell-Verbesserung genutzt werden\n- Erfordert concept-annotierte Trainingsdaten\n\nCONCEPT ACTIVATION VECTORS (CAV):\n- Nach Modell-Training: Nutze Konzept-Samples um CAVs zu finden\n- CAV: Richtung im Hidden-Space für ein Konzept\n- Testing Phase: Berechne Sensitivitäts-Scores basierend auf CAVs\n- Zeigt, wie stark jedes Konzept die Vorhersage beeinflusst"
  },
  {
    q: "Was sind die Hauptpunkte aus 'Attention is not Explanation'?",
    a: "PAPER OVERVIEW (Jain & Wallace, 2019):\n\nKEY CLAIM:\n- Attention Weights sollten NICHT automatisch als Erklärungen interpretiert werden\n\nEVIDENZ 1 - SCHWACHE KORRELATION:\n- Attention Weights zeigen schwache bis moderate Korrelation mit Feature-Importance-Maßstäben\n- Gradient-basierte Sensitivitäten stimmen nicht stark überein\n\nEVIDENZ 2 - ALTERNATIVE ATTENTION MÖGLICH:\n- Adversarial Attention: Model trainiert um alternative Attention-Gewichte zu erzeugen\n- Alternative Weights produzieren ähnliche Vorhersagen\n- Also: Nicht eindeutig welche Attention 'richtig' ist\n\nSCHLUSS:\n- Attention kann EINE Erklärung sein, aber nicht DIE Erklärung\n- 'Existence does not entail exclusivity'\n- Mehrere verschiedene Attention-Muster können funktionieren\n\nREKOMMENDATION:\n- Nutze Attention für Low-Risk-Tasks (Sanity Checks, Debugging)\n- Nicht für High-Stakes-Entscheidungen verlassen\n- Kombiniere mit anderen Interpretations-Methoden"
  },
  {
    q: "Beschreibe AlexNet Architektur und ihre Schichten.",
    a: "ALEXNET ARCHITEKTUR (Krizhevsky et al. 2012):\n\nINPUT:\n- 224 x 224 x 3 RGB Bilder\n- ImageNet Klassifikation (1,000 Klassen)\n\nCONVOLUTIONAL LAYERS:\n1. CONV1: 96 Filter 11×11, Stride 4 → 55×55×96\n   - Features: Low-level (Kanten, Farben, Texturen)\n\n2. MAX POOLING 1: 3×3 Stride 2 → 27×27×96\n\n3. CONV2: 256 Filter 5×5 → 27×27×256\n   - Features: Kombinationen von Kanten, einfache Formen\n\n4. MAX POOLING 2: 3×3 Stride 2 → 13×13×256\n\n5. CONV3: 384 Filter 3×3 → 13×13×384\n   - Features: Komplexere Strukturen, Muster\n\n6. CONV4: 384 Filter 3×3 → 13×13×384\n\n7. CONV5: 256 Filter 3×3 → 13×13×256\n   - Features: Objektteile und semantische Konzepte\n\n8. MAX POOLING 3: 3×3 Stride 2 → 6×6×256\n\nFULLY CONNECTED LAYERS:\n- FC6: 4096 Neuronen + ReLU + Dropout\n- FC7: 4096 Neuronen + ReLU + Dropout\n- FC8 (Output): 1,000 Neuronen + Softmax\n\nTRAINING DETAILS:\n- ReLU Aktivierungen (nicht Tanh)\n- Dropout in FC Layern zur Regularisierung\n- GPU (CUDA) Implementation\n- Top-5 Error: 15.3% (vorher: 26.2%)"
  },
  {
    q: "Wie visualisiert man Feature-Maps in tieferen Layern?",
    a: "VISUALISIERUNG VON DEEPER LAYERS (Zeiler & Fergus 2014):\n\nPROBLEM:\n- Layer 1 kann direkt visualisiert werden (7×7×3 Filter)\n- Tiefere Layer sind abstrakt und nicht direkt visualisierbar\n\nSOLÜTION - DECONVNET APPROACH:\n\n1. FORWARD PASS:\n   - Propagiere Bild durch Netzwerk zu beliebiger Schicht\n   - Wähle einzelne Feature Map (einen Neuron)\n\n2. AKTIVIERUNGS-MAXIMIERUNG:\n   - Setze alle anderen Feature Maps auf 0\n   - Invertiere Netzwerk von dieser Position zurück zu Input\n\n3. INVERSION PROZESS:\n   - Max Pooling: Keep Track von Max-Switch Positionen\n   - Unpooling: Platziere Aktivierungen an ursprünglichen Positionen\n   - ReLU: Pass durch ReLU um negative Werte zu zeigen\n   - Transposed Conv: Use transposed Filter für Deconvolution\n\n4. ERGEBNIS:\n   - Feature Patches im Eingabebild, die diese Aktivierung maximieren\n\nERKENNTNISSE:\n- Layer 1: Einfache Kanten, Farben\n- Layer 2: Texturen, Ecken\n- Layer 3: Geometrische Strukturen\n- Layer 4-5: Objekt-Teile und semantische Konzepte"
  },
  {
    q: "Was sind Saliency Maps und wie funktionieren sie?",
    a: "SALIENCY MAPS:\n\nDefinition: Visualisierungen die zeigen, welche Input-Pixel am meisten die Vorhersage beeinflussen\n\nMATHEMATISCH:\n- Saliency = Gradient der Output-Klasse bezüglich Input-Pixeln\n- S = ∂y / ∂x wobei y die Ausgabe-Logit ist\n- Hohe Gradienten = Input-Pixel stark in Vorhersage involv\n\nBERECHNUNG:\n1. Forward Pass: Bild durch Netzwerk\n2. Compute Output Logit für Target-Klasse\n3. Backpropagation: Berechne Gradienten bzgl. Input\n4. Visualisierung: Färbe Pixel nach Gradient-Magnitude\n\nINTERPRETATION:\n- Rote Regionen: Stark positiver Einfluss auf Target-Klasse\n- Blaue Regionen: Negativer Einfluss (gegen Target-Klasse)\n- Weiße Regionen: Höchste Salienz/Importance\n\nVORTEILE:\n- Schnell zu berechnen (ein Backprop-Pass)\n- Model-agnostisch einsetzbar\n- Intuitive Visualisierung\n\nNACHTEILE:\n- Keine lokale Struktur Garantie\n- Kann noisy/instabil sein\n- Local gradients können irreführend sein"
  },
  {
    q: "Was ist eine Concept Bottleneck Model?",
    a: "CONCEPT BOTTLENECK MODELS:\n\nARCHITEKTUR:\n- Zwei-Stufen Architektur statt Ende-zu-Ende\n\nSTUFE 1: CONCEPT PREDICTION\n- Netzwerk trainiert, um menschlich-interpretierbare Konzepte zu erkennen\n- Input → Intermediate Layer → Concept-Outputs\n- Beispiele: Farbe, Textur, Objektteile, Größe\n- Outputs sind Wahrscheinlichkeiten für jedes Konzept\n\nSTUFE 2: KLASSIFIKATION\n- Decision Layer: Kombiniert Konzept-Vorhersagen → Final Klasse\n- Einfaches lineares Modell oder kleine NN\n- Lernbar oder fixiert\n\nTRAINING:\n- Benötigt concept-annotierte Trainingsdaten\n- Konzepte müssen manuell labeliert werden\n- Wird mit Überwachung für Konzepte trainiert\n\nVORTEILE:\n1. INTERPRETIERBARKEIT:\n   - Finale Vorhersage kann direkt auf Konzepte zurückgeführt werden\n   - Transparente Decision-Logik\n\n2. KONTROLLIERBARKEIT:\n   - Benutzer kann Konzepte inspizieren und korrieren\n   - Kann Modell-Fehler durch Konzept-Anpassung beheben\n\n3. VERBESSERUNG:\n   - Kann verwendet werden für Model Debugging\n   - Zeigt wo Modell falsche Konzepte lernt\n\nNACHTEILE:\n- Benötigt umfangreiche concept-Labeling\n- Kann Performance-Drops durch Zwei-Stufen Ansatz\n- Konzept-Definition ist nicht trivial"
  },
  {
    q: "Erkläre die 'Bottleneck' Problematik in Encoder-Decoder.",
    a: "DAS BOTTLENECK PROBLEM:\n\nARCHITEKTUR BOTTLENECK:\n- Encoder: Sequenzielle Verarbeitung aller Input-Informationen\n- Bottleneck: Final Hidden State ht (z.B. 1024-dimensional)\n- Decoder: Muss ALL Information aus diesem einen Vektor extrahieren\n\nDAS PROBLEM IN ZAHLEN:\n- Eingabe: 30 Wörter → 30 Hidden States (~30,000 Werte)\n- Bottleneck: 1 Hidden State (~1,000 Werte)\n- Information wird 30× komprimiert!\n- Langzeits-Information geht verloren\n\nEMPIRISCHER BEWEIS:\n- BLEU-Scores fallen stark ab bei langen Sätzen (>20 Wörter)\n- Kurze Sätze: Gute Übersetzung\n- Lange Sätze: Quality degradiert\n\nWAHRUM INFORMATION VERLOREN GEHT:\n- RNN/LSTM Hidden States werden durch viele Schritte propagiert\n- Vanishing Gradients Problem\n- Information am Anfang 'vergessen' am Ende der Sequenz\n\nDIE SOLUTION - ATTENTION:\n- Decoder hat Zugang zu ALLEN Encoder-Outputs\n- Nicht nur zu final hidden state\n- αt,i weights selektieren relevante Encoder Information\n- Keine Kompression nötig\n\nERGEBNIS (Bahdanau 2015):\n- Drastische Verbesserung bei langen Sätzen\n- Aufmerksamkeit 'Lernt' wohin es schauen soll"
  },
  {
    q: "Was ist Transfer Learning und warum ist es wichtig?",
    a: "TRANSFER LEARNING:\n\nGRUNDIDEE:\n- Ein auf großem Dataset vortrainiertes Modell nehmen\n- Adaptieren für neue, kleinere Task\n- Nutze gelernte Features für neue Problem\n\nWARUM FUNKTIONIERT ES:\n1. FEATURES TRANSFERIEREN:\n   - Early Layers lernen universelle Features (Kanten, Texturen)\n   - Diese sind auf vielen Bildern relevant\n   - Late Layers sind task-spezifisch\n\n2. DATEN EFFIZIENZ:\n   - Brauchen weniger Daten für neue Task\n   - Vortrainiertes Modell schon Grundlagen gelernt\n   - Nur Fine-Tuning der späteren Layer nötig\n\n3. BERECHNUNG:\n   - Schneller Training (Start nicht von Zufalls-Gewichten)\n   - Weniger GPU/Compute Ressourcen nötig\n\nPRAKTISCHE IMPLEMENTIERUNG:\n\nOPTION 1 - FEATURE EXTRACTION:\n- Nehme vortrainiertes Modell bis Layer N\n- Friere diese Layer (kein Training)\n- Füge neue Klassifikations-Layer hinzu\n- Trainiere nur neue Layer auf eigenen Daten\n\nOPTION 2 - FINE TUNING:\n- Beginne mit vortrainierten Gewichten\n- Trainiere alle Layer mit niedriger Learning Rate\n- Langsameres Training aber bessere Anpassung\n\nBEISPIEL:\n- ImageNet Pretraining: 1.2M Images, 1000 Klassen\n- Transfer zu Medical Imaging: Nur 5,000 Bilder\n- Transfer lernen reduziert benötigte Trainingsdaten um 100×"
  },
  {
    q: "Erkläre ReLU Activation und warum es besser als Tanh ist.",
    a: "ReLU (RECTIFIED LINEAR UNIT):\n\nFORMEL:\n- ReLU(x) = max(0, x)\n- Einfach: Outputs x wenn x > 0, sonst 0\n\nEIGENSCHAFTEN:\n- Lineare Form für positive Werte\n- Output Range: [0, ∞) (unbeschränkt oben)\n- Gradient: 1 für x > 0, 0 für x < 0\n\nVORTEILE GEGENÜBER TANH:\n\n1. COMPUTATIONAL EFFICIENCY:\n   - ReLU: Nur einfache Vergleich x > 0\n   - Tanh: Exponential Berechnungen\n   - ReLU ist ~10× schneller\n\n2. VANISHING GRADIENT PROBLEM:\n   - Tanh: Gradienten für extreme Werte → 0\n   - Gradient verschwindet in deep Networks\n   - ReLU: Konstanter Gradient (1) für positive Werte\n   - Ermöglicht Training von sehr tiefen Netzwerken\n\n3. SPARSITÄT:\n   - Tanh: All Neuronen aktiv (verschiedene Werte)\n   - ReLU: ~50% Neuronen inaktiv (=0) für Random Input\n   - Sparsität: Bessere Generalisierung, weniger Overfitting\n\n4. BIOLOGISCHE PLAUSIBILITÄT:\n   - ReLU: Ähnlicher biologischen Neuronen\n   - Entweder aktiv oder inaktiv (spike oder nicht)\n\nNACHTEILE:\n- 'Dying ReLU': Neuronen können 'sterben' (stuck at 0)\n- Lösungen: LeakyReLU, ELU\n- Unbeschränkter Output kann zu Instabilität führen\n\nERGEBNIS:\n- AlexNet mit ReLU outperformed Tanh Baselines\n- ReLU ist seither Standard in Deep Learning"
  },
  {
    q: "Was ist Dropout und wie funktioniert es zur Regularisierung?",
    a: "DROPOUT REGULARISIERUNG:\n\nIDEE:\n- Während Training: Randomly 'drop' (setze auf 0) Neuronen mit Wahrscheinlichkeit p\n- Typisch: p=0.5 (50% der Neuronen deaktiviert)\n- Effekt: Ensemble-ähnliches Training\n\nMATHEMATISCH:\n- Neuron wird mit Wahrscheinlichkeit (1-p) behalten\n- Aktivierung wird skaliert mit 1/(1-p) um Erwartungswert zu erhalten\n\nWAHRUM REGULARISIERT DROPOUT:\n\n1. OVERFITTING REDUZIEREN:\n   - Co-adaptation Prevention: Neuronen können nicht auf andere verlassen\n   - Jedes Neuron muss nützliches Feature ganz allein lernen\n   - Robustere Features werden gelernt\n\n2. ENSEMBLE EFFEKT:\n   - Jeder Forward-Pass: Andere Random Subset von Neuronen\n   - Entspricht Training vieler verschiedener Netzwerk-Varianten\n   - Test-Zeit: Nutze alle Neuronen (mit Scaling)\n   - Averaging über ensemble-ähnliche Vorhersagen\n\nWO WIRD DROPOUT ANGEWENDET:\n- AlexNet: Dropout in beide Fully-Connected Layer\n- Verhindert Overfitting bei großen FC Layern\n- Typischerweise NICHT in Conv Layern\n\nPRAKTISCHE EFFEKTE:\n- Training Error kann höher sein\n- Test Error deutlich besser\n- Langsameres Konvergenz aber bessere Generalisierung\n- Top-5 Error: Etwa 1-2% Verbesserung\n\nANDERE REGULARISIERUNG:\n- L1/L2 Regularization: Penalisiere große Gewichte\n- Batch Normalization: Normalisiere activations\n- Data Augmentation: Mehr Trainings-Variationen"
  },
  {
    q: "Was sind die Hauptmerkmale der Attention is all you need Architektur (Transformer)?",
    a: "TRANSFORMER ARCHITEKTUR (Vaswani et al. 2017):\n\nKEY INNOVATION:\n- Komplett auf Attention basiert (kein RNN/LSTM nötig)\n- 'Attention is All You Need' Titel\n\nKERNKOMPONENTEN:\n\n1. MULTI-HEAD ATTENTION:\n   - Parallel mehrere Attention Heads\n   - Jeder Head lernt verschiedene Relationen\n   - Outputs werden konkateniert\n\n2. SELF-ATTENTION:\n   - Query, Key, Value kommen von DERSELBEN Sequenz\n   - Jedes Token kann auf alle anderen Tokens schauen\n   - Parallelisierbar (alle Positionen gleichzeitig)\n\n3. POSITIONAL ENCODING:\n   - Keine RNN = Keine Position Information\n   - Füge Position-spezifische Signale zu Embeddings hinzu\n   - Ermöglicht Sequenz-Information zu nutzen\n\n4. FEED-FORWARD NETWORKS:\n   - Nach Attention Layer: Dense → ReLU → Dense\n   - Nicht linear wie Attention\n\n5. RESIDUAL CONNECTIONS & LAYER NORM:\n   - Skip Connections um tiefe Modelle zu trainieren\n   - Layer Normalization für Stabilität\n\nVORTEILE:\n1. PARALLELISIERUNG:\n   - RNN: Sequenziell (langsam)\n   - Transformer: Parallele Verarbeitung aller Positionen\n   - Training 10-100× schneller\n\n2. LONG-RANGE DEPENDENCIES:\n   - RNN: Gradienten vanish für lange Distanzen\n   - Attention: Direct connection über Distanzen\n   - Besseres Verständnis langer Kontexte\n\n3. INTERPRETIERBARKEIT:\n   - Attention Weights visualisierbar\n   - (Mit Vorbehalten!)\n\nAUSTAUCH:\n- Transformers wurden universelle Architektur\n- NLP (BERT, GPT), Vision (ViT), Audio\n- Ablösung von Domain-spezifischen Architekturen"
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
