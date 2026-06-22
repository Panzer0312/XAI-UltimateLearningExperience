import { useState } from "react";

const TOPIC_TITLE = "Mechanistic Interpretability II: Language Mixing in Reasoning LMs";
const TOPIC_DESCRIPTION = "Sprachmischungsphänomen in Reasoning Language Models, Muster, Auswirkungen auf Performance und interne Ursachen durch Logit-Lens-Analyse";
const LECTURE_NUM = "11";
const PROFESSOR = "Prof. Dr. Jannik Strötgen";
const UNIVERSITY = "Hochschule Karlsruhe";

const SUMMARY_SECTIONS = [
  {
    title: "Das Language-Mixing-Phänomen",
    border: "#534AB7",
    color: "#EEEDFE",
    points: [
      "Language Mixing (Wang et al., EMNLP 2025): Reasoning Language Models (RLMs) wie DeepSeek-R1 oder o1 wechseln während ihrer Denkschritte (Chain-of-Thought) die Sprache, selbst wenn die Eingabe in einer einzigen Sprache formuliert ist",
      "Beobachtung: Wird ein RLM auf Arabisch, Hindi oder Swahili befragt, wechselt das Modell im Reasoning-Trace oft zu Englisch oder Chinesisch – die finale Antwort wird aber wieder in der Eingabesprache formuliert",
      "Kernfrage aus XAI-Sicht: Ist dieser Sprachenwechsel 'Halluzination' oder Rauschen, oder offenbart er den tatsächlichen internen Zustand des Modells?",
      "Forschungsfragen: (1) Muster – wann passiert Language Mixing? (2) Impact – hilft oder schadet es der Performance? (3) Interne Ursachen – warum passiert es?"
    ]
  },
  {
    title: "Reasoning Language Models vs. Regular LLMs",
    border: "#0F6E56",
    color: "#E1F5EE",
    points: [
      "Regular LLMs: Eingabe → LLM → Antwort (direkte Antwortgenerierung ohne expliziten Denkprozess)",
      "Reasoning LLMs (RLMs): Eingabe → RLM → Thinking (interne Denkschritte, sichtbar als Reasoning Trace) → Antwort",
      "RLMs ermöglichen dadurch erstmals einen Blick auf den 'externen Denkprozess' – der Reasoning Trace ist öffentlich sichtbar",
      "Dies eröffnet neue XAI-Möglichkeiten: Statt nur Input/Output zu analysieren, kann man die Zwischenschritte direkt beobachten",
      "Language Mixing betrifft ausschließlich den Reasoning Trace – die finalen Antworten erfolgen fast immer in der Eingabesprache"
    ]
  },
  {
    title: "Modell-Paradigmen: DeepSeek, Gemini, Qwen",
    border: "#185FA5",
    color: "#E6F1FB",
    points: [
      "DeepSeek (Teacher-Student): DeepSeek-R1 (671B MoE, Pure RL) als 'Lehrer' → entwickelte CoT emergent durch RL ohne explizite Anleitung. Student-Modelle (Qwen/Llama-Basis, Dense, Knowledge Distillation) imitieren Reasoning-Traces des Lehrers",
      "Gemini (Multimodale Agenten): Gemini 2.0 Flash Thinking – nativ multimodal (Text, Bild, Audio, Video), trainiert mit 'Thought Summaries', fokussiert auf Sicherheit/Alignment und agentische Workflows",
      "Qwen (Scaled RL): QwQ-32B und Qwen3 – dichte Architektur mit Grouped Query Attention; Two-Stage RL (zuerst Math/Code, dann General RL)",
      "Insgesamt 12 RLMs aus 3 Entwicklerfamilien in 15 Sprachen unterschiedlicher Ressourcenlage getestet (High: EN/DE/ES/FR/IT/ZH; Mid: AR/HI/JA/KO/PT; Low: BN/ID/SW/YO)"
    ]
  },
  {
    title: "Language Mixing – Muster (Patterns)",
    border: "#993C1D",
    color: "#FAECE7",
    points: [
      "Messung: Zeilenbasierte Spracherkennung (fastText) des Reasoning Traces → Sprachverteilung pro Trace und pro Antwort",
      "Language Mixing Entropy: Entropie der Sprachverwendungsverteilung (hohe Entropie = viele Sprachen gemischt, niedrige Entropie = eine dominante Sprache)",
      "Hauptbefund 1: Language Mixing am häufigsten bei Eingaben, die weder Englisch noch Chinesisch sind – Arabisch, Französisch, Hindi und Japanisch führen zu mehr gemischtem Reasoning (oft Englisch und/oder Chinesisch eingemischt)",
      "Hauptbefund 2: RLMs mischen Sprachen im Reasoning, generieren aber finale Antworten in der Eingabesprache",
      "Hauptbefund 3: STEM-Fächer zeigen deutlich mehr Language Mixing als Geistes- oder Sozialwissenschaften – schwerere Aufgaben führen zu mehr Mixing"
    ]
  },
  {
    title: "Language Mixing – Auswirkungen auf Performance (Impact)",
    border: "#3B6D11",
    color: "#EAF3DE",
    points: [
      "Constrained Decoding (Script Control): Modelle werden gezwungen, in bestimmten Schriftsystemen zu denken: Lateinisch (Englisch/Romanische Sprachen), Han (Chinesisch), oder nativem Skript der Eingabesprache",
      "Ergebnis für Arabisch, Hindi, Japanisch: Erzwungenes Denken in Latein- oder Han-Skript verbessert die Performance signifikant (+37% bis +115% bei bestimmten Modellen!)",
      "Natives Skript (z.B. Arabisch auf Arabisch, Hindi auf Devanagari) führt oft zur schlechtesten Performance",
      "Implikation: Es besteht eine starke Verbindung zwischen Skript-/Sprachwahl und Reasoning-Performance – Modelle bevorzugen intern Latein- und Han-Skripte",
      "Erklärung: Das ist der Grund, warum Englisch und Han-Schrift unkontrolliert im Reasoning auftauchen – die Modelle 'wissen' intuitiv, dass diese Skripte besseres Reasoning ermöglichen"
    ]
  },
  {
    title: "Language Mixing – Interne Ursachen (Internal Causes)",
    border: "#854F0B",
    color: "#FAEEDA",
    points: [
      "Logit Lens auf RLMs: Hidden States jeder Schicht werden in den Vokabular-Raum projiziert → welches Skript/Sprache dominiert intern pro Schicht?",
      "Befund 1: Mit steigender Aufgabenschwierigkeit verlassen sich Modelle intern zunehmend auf Latein-Skript – dies korreliert mit dem externen (sichtbaren) Reasoning Trace",
      "Befund 2: Starke Korrelation zwischen intern verwendeten Skripten und extern im Reasoning Trace sichtbaren Skripten (r ≈ 0.74–0.99 für Arabisch, r ≈ 0.88–0.93 für Hindi)",
      "Schlussfolgerung: Language Mixing im Reasoning Trace ist KEIN Zufall – er spiegelt die tatsächliche interne Repräsentation des Modells wider und ist somit ein authentisches XAI-Signal",
      "Verbindung zu Mechanistic Interpretability: Logit Lens zeigt, wie das externe Denken (Reasoning Trace) und das interne Denken (Hidden States) zusammenhängen"
    ]
  },
  {
    title: "Language Mixing – Diskussion und offene Fragen",
    border: "#993556",
    color: "#FBEAF0",
    points: [
      "Ist Language Mixing ein gelöstes Problem? NEIN – obwohl DeepSeek-R1 mit einem Language-Consistency-Reward trainiert wurde, persistiert Language Mixing in allen getesteten Modellen",
      "Sollte Language Mixing eliminiert werden? NEIN – es könnte eine funktionale Adaptation sein, die effektives mehrsprachiges Reasoning unterstützt",
      "Reasoning Language Control: (1) Fine-grained language control durch constrained decoding; (2) Steering latenter Repräsentationen, um latentes Processing mit gewünschter Reasoning-Sprache zu alignieren",
      "Offene Frage: Wie können unnötiges Language Mixing reduziert und gleichzeitig Performance erhalten oder verbessert werden? Einfluss von Pretraining, RL und Distillation noch unklar",
      "XAI-Perspektive: Language Mixing ist ein seltenes Beispiel, wo das interne Modellverhalten direkt im externen Output sichtbar wird – wertvolles Fenster in die 'Gedanken' von RLMs"
    ]
  },
  {
    title: "Verbindung: Mechanistic Interpretability und Language Mixing",
    border: "#0F6E6E",
    color: "#E0F5F5",
    points: [
      "Language Mixing als Mechanistic-Interpretability-Werkzeug: Der Reasoning Trace offenbart, in welcher Sprache das Modell 'denkt' – dies gibt Einblick in interne Repräsentationen ohne aufwendige Activation Patching",
      "Logit Lens als Brücke: Durch Projektion von Hidden States auf den Vokabular-Raum kann man zeigen, dass interner und externer Sprachgebrauch korrelieren → Validierung des Reasoning Traces als authentisches Signal",
      "Contrast mit Self-Explanations: Während CoT-Erklärungen oft unfaithful sind, scheint Language Mixing im Reasoning Trace ein echtes Signal des internen Zustands zu sein – ein Gegenbeispiel zur 'plausiblen Fiktion'",
      "Implikationen für XAI-Evaluation: Sprache des Reasoning Traces könnte als Proxy für die 'Qualität' des internen Reasoning genutzt werden – viel Language Mixing bei schwierigen Aufgaben könnte Faithfulness-Indikator sein"
    ]
  }
];

const MNEMONICS = [
  {
    title: "LANGUAGE MIXING",
    keywords: ["Sprachmischung", "Reasoning Trace", "Latein/Han"],
    mnemonic: "Language\nAlteriert sich\nNatürlich im\nGedankengang\nUm\nAufgaben\nGründlich zu\nErarbeiten\n\nModelle 'denken' auf Englisch/Chinesisch,\nweil das Training diese Skripte bevorzugt hat.\nDer Reasoning Trace zeigt es offen."
  },
  {
    title: "RLM vs. LLM",
    keywords: ["Reasoning", "Thinking", "Denkschritte"],
    mnemonic: "Regular LLM:\nFrage → Antwort\n\nReasoning LLM:\nFrage → [Thinking...] → Antwort\n\nDer [Thinking...]-Teil = Reasoning Trace\n= sichtbares externes Denken\n= Fenster in den internen Zustand\n\nXAI-Gold: Echtes Modellverhalten sichtbar!"
  },
  {
    title: "SCRIPT CONTROL",
    keywords: ["Constrained Decoding", "Performance", "+100%"],
    mnemonic: "Script Control = Zwangsdenken in bestimmtem Skript\n\nLatein (Englisch): +62% bis +115% für AR/HI/JA!\nHan (Chinesisch): Ebenfalls große Verbesserungen\nNatives Skript: Oft schlechteste Performance\n\nMerkregel: Modelle sind 'Latein-/Han-Denker'\nEgal, in welcher Sprache sie antworten müssen."
  },
  {
    title: "ENTROPY DES MIXINGS",
    keywords: ["Entropie", "Sprachverteilung", "STEM"],
    mnemonic: "Niedrige Entropie = eine Sprache dominiert\n  → einfache Aufgabe, Eingabesprache = Trainingssprache\n\nHohe Entropie = viele Sprachen gemischt\n  → schwierige Aufgabe (STEM!)\n  → Eingabesprache wenig im Training\n\nMerkregel: STEM = mehr Mixing\n'Je schwerer die Aufgabe, desto mehr\ndas Modell zu Englisch/Chinesisch flieht'"
  },
  {
    title: "LOGIT LENS KORRELATION",
    keywords: ["Intern", "Extern", "Korrelation"],
    mnemonic: "Intern (Hidden States) ↔ Extern (Reasoning Trace)\n\nArabisch: r = 0.74–0.99 (Arabisch-Skript)\n           r = 0.72–0.78 (Latein-Skript)\nHindi:    r = 0.88–0.94 (Devanagari)\n           r = 0.88–0.92 (Latein)\n\nFazit: Was das Modell INTERN denkt,\nzeigt sich EXTERN im Reasoning!\nLanguage Mixing = authentisches XAI-Signal!"
  },
  {
    title: "DEEPSEEK TEACHER-STUDENT",
    keywords: ["MoE", "Destillation", "RL"],
    mnemonic: "Teacher (DeepSeek-R1):\n- 671B Parameter (MoE, sparse 37B aktiv)\n- Reines RL-Training\n- Entwickelte CoT EMERGENT\n\nStudent (Distill-Qwen/Llama):\n- Dense Transformer\n- Supervised Fine-Tuning auf Teacher-Traces\n- Imitiert Reasoning-Muster\n\nStudent = Kopie der Denkmuster, nicht des Denkens"
  }
];

const FLASHCARDS = [
  {
    q: "Was ist Language Mixing in Reasoning Language Models und warum ist es aus XAI-Sicht interessant?",
    a: "Language Mixing: RLMs wechseln während ihres sichtbaren Reasoning Trace die Sprache (z.B. von Arabisch zu Englisch), auch wenn Eingabe und Ausgabe in derselben Sprache sind.\n\nXAI-Relevanz: Es stellt sich die Frage, ob dieser Wechsel ein authentisches Signal des internen Modellzustands ist oder nur Rauschen. Wang et al. (EMNLP 2025) zeigen, dass es ein echtes Signal ist, das den internen Repräsentationen entspricht – ein seltenes Fenster in das 'Denken' von Modellen."
  },
  {
    q: "Wie unterscheiden sich Regular LLMs von Reasoning Language Models (RLMs)?",
    a: "Regular LLMs: Eingabe → LLM → direkte Antwort (kein sichtbarer Denkprozess)\n\nReasoning LLMs (RLMs): Eingabe → RLM → Thinking/Reasoning Trace (sichtbare Denkschritte) → finale Antwort\n\nDer Reasoning Trace ist für XAI wertvoll: Er ermöglicht direkte Beobachtung von Zwischenschritten, nicht nur von Input/Output. Language Mixing betrifft nur den Trace, nicht die finale Antwort."
  },
  {
    q: "Erkläre das Teacher-Student-Paradigma von DeepSeek-R1.",
    a: "Teacher (DeepSeek-R1):\n- Massive Mixture-of-Experts Architektur (671B Parameter, aber nur 37B aktiv pro Token)\n- Trainiert durch reines Reinforcement Learning (RL), ohne explizite CoT-Supervision\n- Entwickelte emergent Chain-of-Thought-Fähigkeit durch Exploration von Lösungspfaden\n\nStudents (DeepSeek-R1-Distill-Qwen/Llama):\n- Dense Transformer-Architekturen (nicht MoE)\n- Trainiert durch Supervised Fine-Tuning auf Reasoning Traces des Teachers (Knowledge Distillation)\n- Memorieren Reasoning-Muster des Teachers"
  },
  {
    q: "Was ist der Unterschied zwischen DeepSeek-R1s Training und dem Training der Student-Modelle?",
    a: "DeepSeek-R1 (Teacher): Lernte zu 'denken' durch reines Reinforcement Learning – kein Mensch hat ihm erklärt, wie man denkt. Es explorierte Lösungspfade und bekam Belohnungen für korrekte finale Antworten. CoT entstand emergent.\n\nStudent-Modelle: Lernten NICHT durch RL. Sie wurden auf den Reasoning Traces des Teachers supervised fine-tuned. Sie imitieren die Denkmuster, ohne sie eigenständig entdeckt zu haben – 'Kopie der Denkmuster, nicht des Denkens'."
  },
  {
    q: "Wann tritt Language Mixing am häufigsten auf?",
    a: "Language Mixing tritt am häufigsten auf:\n\n1. Sprache der Eingabe: Wenn die Eingabesprache weder Englisch noch Chinesisch ist – Arabisch, Französisch, Hindi, Japanisch zeigen mehr Mixing als Englisch oder Chinesisch\n\n2. Aufgabentyp: STEM-Fächer (Mathematik, Informatik, Physik) zeigen deutlich mehr Language Mixing als Geistes- oder Sozialwissenschaften\n\n3. Schwierigkeit: Mit steigender Aufgabenschwierigkeit nimmt Language Mixing zu"
  },
  {
    q: "Was bedeutet Language Mixing Entropy und was sagt sie aus?",
    a: "Language Mixing Entropy = Entropie der Sprachverwendungsverteilung im Reasoning Trace.\n\nBeispiel:\n- English 80%, Chinese 20% → Entropy = H([0.8, 0.2]) (niedrig, eine dominante Sprache)\n- Arabic 10%, English 50%, Chinese 40% → Entropy = H([0.1, 0.5, 0.4]) (höher, mehr Mischung)\n\nHohe Entropie = viele Sprachen gemischt = komplexere/schwerere Aufgabe oder Eingabesprache mit wenig Training\nNiedrige Entropie = eine Sprache dominiert = einfachere Aufgabe oder bekannte Sprache"
  },
  {
    q: "Wie beeinflusst erzwungenes Reasoning in Latein-Schrift die Performance für niedrig-ressourcige Sprachen?",
    a: "Constrained Decoding zu Latein-Schrift verbessert Performance massiv für Arabisch, Hindi, Japanisch:\n\n- DeepSeek-R1-Distill-Llama-70B: +62% (Arabisch), +115% (Hindi), +106% (Japanisch)\n- DeepSeek-R1-Distill-Qwen-32B: +49% (Arabisch), +54% (Hindi), +37% (Japanisch)\n\nNatives Skript führt dagegen meist zur schlechtesten Performance.\nFazit: Modelle sind intern 'Latein-/Han-Denker', unabhängig von der Ausgabesprache."
  },
  {
    q: "Erkläre Constrained Decoding als Script Control Methode.",
    a: "Script Control verwendet Constrained Decoding, um Modelle in spezifischen Schriftsystemen zu reasoning:\n\n- Latein-Skript: Erzwingt Reasoning in lateinbasierter Schrift (Englisch, Französisch etc.)\n- Han-Skript: Erzwingt chinesische Schrift\n- Natives Skript: Erzwingt das Schriftsystem der Eingabesprache\n\nOhne Kontrolle: Modell mischt natürlich (z.B. Arabisch + Englisch + Chinesisch im selben Trace)\nMit Latin-Kontrolle: Reines Englisch, klar strukturiert\nMit Han-Kontrolle: Reines Chinesisch, logisch strukturiert"
  },
  {
    q: "Was zeigt der Logit-Lens-Ansatz über die internen Ursachen von Language Mixing?",
    a: "Logit Lens projiziert Hidden States jeder Schicht auf den Vokabular-Raum → zeigt, welches Skript/Sprache das Modell intern an jedem Layer 'denkt'.\n\nErgebnis:\n- Mit steigender Aufgabenschwierigkeit steigt interner Latein-Skript-Anteil\n- Starke Korrelation zwischen intern genutzten Skripten und extern sichtbarem Reasoning Trace\n  (Arabisch: r ≈ 0.74–0.99; Hindi: r ≈ 0.88–0.94)\n\nSchluss: Language Mixing = kein Zufall, sondern Abbild des internen Modellzustands"
  },
  {
    q: "Inwiefern unterscheidet sich Language Mixing von normalen unfaithful CoT-Erklärungen?",
    a: "Unfaithful CoT (klassisch): Das Modell rationalisiert post-hoc eine bereits getroffene Entscheidung. Die Erklärung entspricht nicht dem tatsächlichen internen Reasoning – es ist 'plausible Fiktion'.\n\nLanguage Mixing: Der Sprachenwechsel im Reasoning Trace korreliert stark mit den internen Hidden-State-Repräsentationen (r ≈ 0.74–0.99). Das externe Verhalten spiegelt das interne.\n\nFazit: Language Mixing ist ein Gegenbeispiel zu unfaithful CoT – es ist ein authentisches Signal, kein Artefakt."
  },
  {
    q: "Warum zeigen STEM-Fächer mehr Language Mixing als andere Fächer?",
    a: "STEM-Fächer (Mathematik, Physik, Chemie etc.) sind:\n1. Schwieriger – komplexere Reasoning-Ketten erforderlich\n2. In Trainingsdaten: Mathematische Konzepte sind im Internet primär auf Englisch dokumentiert (Textbooks, Papers, StackExchange)\n\nModell-Reaktion: Bei schwierigen STEM-Aufgaben greift das Modell auf internalisierte Skripte zurück, die es aus dem Training als 'effektiv' kennt – primär Englisch/Chinesisch.\n\nBelegt durch Entropie-Analyse: STEM-Subjekte zeigen konsistent höhere Language Mixing Entropy."
  },
  {
    q: "Ist Language Mixing ein gelöstes Problem und sollte es eliminiert werden?",
    a: "Ist es gelöst? NEIN – DeepSeek-R1 wurde explizit mit einem Language-Consistency-Reward trainiert, der Language Mixing reduzieren sollte. Trotzdem persistiert es in allen getesteten Modellen.\n\nSollte es eliminiert werden? NEIN – Language Mixing könnte eine funktionale Adaptation sein. Da Latein-/Han-Skripte die Performance für niedrig-ressourcige Sprachen massiv verbessern, könnte das Eliminieren von Language Mixing die multilingualen Reasoning-Fähigkeiten verschlechtern."
  },
  {
    q: "Wie unterscheidet sich Geminis Trainingsparadigma von DeepSeek?",
    a: "DeepSeek-R1:\n- Training: Reines Reinforcement Learning\n- Architektur: MoE (671B, sparse 37B aktiv)\n- Fokus: Reines text-basiertes Reasoning\n- CoT: Emergent durch RL entstanden\n\nGemini 2.0 Flash Thinking:\n- Training: Integrated 'Thinking' Process, erzeugt 'Thought Summaries'\n- Architektur: Nativ multimodal (Text, Bild, Audio, Video)\n- Fokus: Sicherheit/Alignment, agentische Workflows\n- RL: Stärker constrained für Safety"
  },
  {
    q: "Was ist der Knights-and-Knaves (K&K) Datensatz und warum eignet er sich für Language-Mixing-Forschung?",
    a: "Knights-and-Knaves: Logische Rätsel-Puzzles, bei denen Ritter immer die Wahrheit sagen und Schurken immer lügen. Schwierigkeit variiert durch Anzahl der Charaktere (2-8).\n\nVorteile für Language-Mixing-Forschung:\n1. Skalierbare Schwierigkeit → erlaubt Analyse, wie Mixing mit Schwierigkeit zunimmt\n2. Originaldatensatz auf Englisch → kann in beliebige Sprachen übersetzt werden\n3. Klares Richtig/Falsch → einfache Performance-Evaluation\n\nÜbersetzt in 5 Sprachen: Arabisch, Französisch, Hindi, Japanisch, Chinesisch"
  },
  {
    q: "Was bedeutet 'Low-Resource Language' in diesem Kontext und warum ist es wichtig?",
    a: "Low-Resource Language = Sprache mit wenig Trainings-/Testdaten für NLP-Systeme.\n\nWichtig: Low-Resource bedeutet NICHT wenig Sprecher! Swahili (200M+ Sprecher) ist low-resource, weil kaum digitale Texte/NLP-Ressourcen existieren.\n\nFür Language Mixing: Low-resource Sprachen (Bengali, Indonesisch, Swahili, Yoruba) haben noch mehr Language Mixing als mid-resource Sprachen, weil Modelle kaum auf diesen Sprachen trainiert wurden und noch stärker auf Englisch/Chinesisch zurückgreifen."
  },
  {
    q: "Was zeigt die Script-Kompositionsanalyse über die internen Reasoning-Schichten?",
    a: "Script-Komposition im Reasoning Trace bei Hindi-Input (verschiedene Schwierigkeitsstufen):\n\n- Einfach (2ppl): Fast ausschließlich Devanagari (Hindi-Skript)\n- Mittel (4-5ppl): Latin-Anteil beginnt zu steigen\n- Schwer (8ppl): Deutlich mehr Latin, weniger Devanagari\n\nBedeutung: Modelle 'switchen intern zu Latein-Skript', wenn Aufgaben schwieriger werden – sowohl im sichtbaren Reasoning Trace als auch in den Hidden States (Logit Lens zeigt gleiches Muster)"
  },
  {
    q: "Welche zwei Strategien zur Kontrolle von Language Mixing werden diskutiert?",
    a: "1. Constrained Decoding (Script Control):\n   - Zwinge das Modell, in einem bestimmten Schriftsystem zu denken\n   - Latin/Han deutlich besser als natives Skript für viele Sprachen\n   - Sofort anwendbar, keine Neutraining\n\n2. Steering latenter Repräsentationen:\n   - Richte das interne latente Processing mit der gewünschten Reasoning-Sprache aus\n   - Aufwendiger, aber potenziell präziser\n   - Verbindet sich direkt mit Mechanistic Interpretability"
  },
  {
    q: "Wie nutzt Wang et al. den Logit-Lens-Ansatz für Language Mixing?",
    a: "Klassischer Logit Lens: Zeigt, welches Token ein Modell bei jeder Schicht vorhersagen würde → Entwicklung der Vorhersage durch Schichten.\n\nWang et al. Erweiterung: Statt einzelner Token-Vorhersagen analysieren sie, welchem SKRIPT/SPRACHE die Hidden States zuzuordnen sind → Sprachverteilung pro Schicht.\n\nErgebnis: Mit steigender Aufgabenschwierigkeit dominiert Latin-Skript zunehmend in tieferen Schichten → internes Denken korreliert stark mit externem Reasoning Trace (r ≈ 0.74–0.99)"
  },
  {
    q: "Was sind die drei zentralen Forschungsfragen zu Language Mixing und was sind die Hauptantworten?",
    a: "1. PATTERNS (Wann?):\n   - Bei nicht-englischer/chinesischer Eingabe\n   - Bei schwierigen Aufgaben (STEM)\n   - Mehr Mixing = höhere Entropie\n\n2. IMPACT (Wie beeinflusst es Performance?):\n   - Erzwungenes Latein/Han-Reasoning verbessert Performance massiv (+37–115%)\n   - Natives Skript führt oft zur schlechtesten Performance\n   - Language Mixing hilft Modellen, besser zu reasonen!\n\n3. INTERNAL CAUSES (Warum?):\n   - Logit Lens zeigt: Externe Sprachmischung korreliert mit internen Hidden States\n   - Kein Zufall – authentisches Modellsignal"
  },
  {
    q: "Was ist die XAI-Bedeutung des Language-Mixing-Phänomens?",
    a: "Language Mixing ist aus XAI-Sicht besonders wertvoll, weil:\n\n1. Authentisches Signal: Im Gegensatz zu unfaithful CoT-Erklärungen ist Language Mixing ein echter Indikator des internen Modellzustands (hohe Korrelation mit Logit Lens)\n\n2. Neues Analysewerkzeug: Sprachzusammensetzung des Reasoning Trace als Proxy für Schwierigkeitsgrade und Modellverhalten\n\n3. Mechanistic Connection: Brücke zwischen externem Reasoning (sichtbar) und internen Repräsentationen (Hidden States) → verbindet Self-Explanations mit Mechanistic Interpretability\n\n4. Praktisch anwendbar: Ohne Modellzugriff (Black-Box) analysierbar"
  },
  {
    q: "Welche m-MMLU Kategorien zeigen besonders viel Language Mixing und warum?",
    a: "m-MMLU (Multilingual MMLU) mit 18 Fächern:\n\nHohe Mixing-Entropie (STEM):\n- Mathematik (Elementary, HS, College)\n- Physik, Chemie, Informatik\n→ Grund: Quantitative Domänen, starke Englisch-Dominanz in Trainingsdaten, komplexes Reasoning\n\nNiedrige Mixing-Entropie (non-STEM):\n- Geisteswissenschaften (Geschichte, Philosophie, Religion)\n- Sozialwissenschaften (Soziologie)\n→ Grund: Kulturell und sprachlich diverse Inhalte, weniger streng logisch strukturiert"
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
