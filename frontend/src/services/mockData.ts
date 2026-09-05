import { StudentProfile } from '../types/student';
import { ProjectIdea } from '../types/project';
import { ProjectBlueprint } from '../types/blueprint';
import { Roadmap } from '../types/roadmap';
import { MentorMessage, SuggestedPrompt } from '../types/mentor';

export const mockStudentProfile: StudentProfile = {
  id: 'stu_98234',
  fullName: 'Aarav Sharma',
  email: 'aarav.sharma@stanford.edu',
  institution: 'School of Engineering, Stanford University',
  degree: 'B.S. in Computer Science',
  major: 'Artificial Intelligence & Systems',
  graduationYear: 2026,
  experienceLevel: 'intermediate',
  teamSize: 'duo',
  targetDurationWeeks: 12,
  weeklyHours: 20,
  skills: [
    { id: 'sk_1', name: 'TypeScript / React', category: 'frontend', proficiency: 4 },
    { id: 'sk_2', name: 'Python (FastAPI, PyTorch)', category: 'ai_ml', proficiency: 4 },
    { id: 'sk_3', name: 'PostgreSQL & pgvector', category: 'data', proficiency: 3 },
    { id: 'sk_4', name: 'Docker & Google Cloud Run', category: 'cloud_devops', proficiency: 3 },
    { id: 'sk_5', name: 'RAG & LLM Prompt Engineering', category: 'ai_ml', proficiency: 4 },
    { id: 'sk_6', name: 'GraphQL & WebSockets', category: 'backend', proficiency: 3 },
  ],
  interests: [
    'Healthcare & Clinical Decision Support',
    'Developer Tooling & Static Analysis',
    'Autonomous Multi-Agent Systems',
    'Multimodal RAG Pipelines',
  ],
  preferredTechStack: ['React', 'TypeScript', 'FastAPI', 'Python', 'PostgreSQL', 'Tailwind CSS', 'Google Cloud Platform'],
  avoidedTechStack: ['PHP', 'Ruby on Rails', 'jQuery'],
  hardwareConstraints: ['1x NVIDIA RTX 4070 Laptop GPU (8GB VRAM)', 'Cloud Free Tiers (GCP/Firebase)'],
  documents: [
    {
      id: 'doc_1',
      fileName: 'Aarav_Sharma_Resume_2026.pdf',
      fileSize: 428000,
      fileType: 'pdf',
      uploadedAt: '2026-09-01T14:22:00Z',
      status: 'indexed',
      extractedSummary: 'Final-year CS student with internships in NLP applications and full-stack React/FastAPI systems.',
      extractedSkills: ['PyTorch', 'FastAPI', 'LangChain', 'PostgreSQL', 'React', 'Docker'],
      extractedDomains: ['Healthcare AI', 'Developer Tooling'],
    },
    {
      id: 'doc_2',
      fileName: 'Project_Abstract_Healthcare_NLP.pdf',
      fileSize: 185000,
      fileType: 'pdf',
      uploadedAt: '2026-09-03T11:05:00Z',
      status: 'indexed',
      extractedSummary: 'Preliminary abstract on applying hybrid semantic retrieval on clinical notes with privacy preservation.',
      extractedSkills: ['Clinical NLP', 'FHIR Data Models', 'Vector Search'],
      extractedDomains: ['Healthcare & MedTech'],
    },
  ],
  activeProjectId: 'proj_medtech_01',
};

export const mockProjectIdeas: ProjectIdea[] = [
  {
    id: 'proj_medtech_01',
    title: 'MedTrial AI: Patient Eligibility & Risk Screener',
    tagline: 'Context-aware multimodal clinical trial matching with hallucination-free verification',
    domain: 'Healthcare & MedTech',
    difficulty: 'Moderate',
    estimatedWeeks: 12,
    scores: {
      overall: 94,
      skillMatch: 96,
      interestMatch: 98,
      feasibility: 90,
      innovation: 92,
      technicalDepth: 94,
    },
    problemStatement:
      'Over 80% of clinical trials experience delays due to slow patient recruitment. Manual matching of complex medical histories against stringent inclusion/exclusion criteria takes clinicians 30-45 minutes per patient and results in frequent oversights.',
    proposedSolution:
      'A HIPAA-conscious multi-agent clinical screening workspace that ingests anonymized EHR/PDF records, executes verified hybrid RAG against ClinicalTrials.gov criteria, and provides step-by-step cited medical justifications.',
    targetUsers: ['Clinical Trial Coordinators', 'Oncologists & Specialists', 'Medical Research Teams'],
    keyFeatures: [
      'Automated extraction of patient timeline, biomarker criteria, and past therapies from unstructured medical PDFs',
      'Deterministic criteria verification engine cross-referencing contraindications',
      'Step-by-step reasoning trace with clickable citation anchors to source medical document passages',
      'Exportable Clinician Audit Report with automated confidence calibration',
    ],
    aiComponents: [
      'Gemini 1.5 Pro with structured JSON schema outputs for medical criteria decomposition',
      'Hybrid Dense-Sparse Vector Retrieval (BGE-M3 + BM25) over clinical trial protocol documents',
      'Entity recognition pipeline for ICD-10 and SNOMED-CT clinical codes',
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React'],
      backend: ['FastAPI (Python)', 'Pydantic v2', 'Celery / Redis'],
      aiMl: ['Google Gemini API', 'LangGraph', 'ChromaDB / pgvector'],
      database: ['PostgreSQL 16 (Relational + Vector)'],
      cloudDeploy: ['Google Cloud Run', 'Firebase Storage', 'Docker'],
    },
    whyThisFitsYou: [
      'Directly matches your Python FastAPI & React/TypeScript strengths (96% skill overlap)',
      'Aligns with your uploaded resume abstract on Clinical NLP and Stanford Med interest',
      'Realistic within 12 weeks using existing public ClinicalTrials.gov API datasets',
      'Fits within your 8GB VRAM constraint by offloading heavy LLM reasoning to Gemini API',
    ],
    risks: [
      {
        id: 'r_1',
        category: 'data',
        severity: 'medium',
        description: 'Handling synthetic EHR data privacy without violating healthcare compliance boundaries.',
        mitigation: 'Use open MIMIC-IV / Synthea de-identified datasets and client-side PII scrubbing.',
      },
      {
        id: 'r_2',
        category: 'technical',
        severity: 'low',
        description: 'Potential LLM hallucinations when reading ambiguous trial exclusion clauses.',
        mitigation: 'Implement deterministic rule-assertion layer requiring explicit quote citation for every exclusion check.',
      },
    ],
    recommendations: [
      {
        id: 'rec_1',
        title: 'Start with Oncology Protocols',
        description: 'Focus initial criteria validation on oncology trials where inclusion/exclusion rules are most structured.',
        impact: 'high',
      },
      {
        id: 'rec_2',
        title: 'Include FHIR JSON Parser',
        description: 'Add support for standard Fast Healthcare Interoperability Resources (FHIR) standard format.',
        impact: 'medium',
      },
    ],
    hardwareRequirements: ['Standard Developer Laptop', 'Free tier Google Cloud Run / Firebase'],
    prerequisites: ['Basic familiarity with medical terminology', 'Python async programming'],
    createdAt: '2026-09-02T10:00:00Z',
  },
  {
    id: 'proj_devtools_02',
    title: 'ArchLens: AI Architecture Drift Detector',
    tagline: 'Continuous codebase architectural boundary enforcement and visual drift tracking for microservices',
    domain: 'DevTools & AI Agents',
    difficulty: 'Moderate',
    estimatedWeeks: 10,
    scores: {
      overall: 89,
      skillMatch: 92,
      interestMatch: 86,
      feasibility: 93,
      innovation: 88,
      technicalDepth: 90,
    },
    problemStatement:
      'As fast-moving development teams scale codebases, implicit circular dependencies and boundary violations break architectural integrity without being caught in ordinary CI/CD code reviews.',
    proposedSolution:
      'An intelligent GitHub action and developer dashboard that builds AST dependency graphs, compares PRs against defined architectural blueprints, and generates interactive visual impact diffs.',
    targetUsers: ['Software Architects', 'Tech Leads', 'Engineering Teams building modular monoliths/microservices'],
    keyFeatures: [
      'Automated TypeScript/Python AST dependency graph extraction',
      'Blueprint DSL parser (`arch.yaml`) defining permitted package boundaries',
      'Interactive visual drift graph highlighting forbidden import cycles',
      'Automated PR review comments with suggested refactoring paths',
    ],
    aiComponents: [
      'Gemini Flash for semantic PR change explanation and refactoring suggestions',
      'Graph-based cycle detection algorithms (Tarjan’s SCC)',
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'React Flow'],
      backend: ['Node.js / Express', 'Python Tree-Sitter'],
      aiMl: ['Gemini API', 'Graph Neural Network / NetworkX'],
      database: ['Neo4j / SQLite graph database'],
      cloudDeploy: ['Vercel', 'GitHub App Actions'],
    },
    whyThisFitsYou: [
      'Strong fit with your TypeScript, AST interest, and systems background',
      'Clean project scope achievable in 10 weeks with high developer utility',
    ],
    risks: [
      {
        id: 'r_3',
        category: 'technical',
        severity: 'medium',
        description: 'Parsing very large monorepos (100k+ LOC) without exceeding GitHub Action timeout limits.',
        mitigation: 'Implement incremental delta AST parsing rather than full-repository rebuilds.',
      },
    ],
    recommendations: [
      {
        id: 'rec_3',
        title: 'Focus on TypeScript & Python first',
        description: 'Cover the two most popular languages before adding multi-language support.',
        impact: 'high',
      },
    ],
    hardwareRequirements: ['Standard Laptop'],
    prerequisites: ['Abstract Syntax Tree (AST) fundamentals'],
    createdAt: '2026-09-02T10:30:00Z',
  },
  {
    id: 'proj_sustain_03',
    title: 'VoltPulse: Smart Grid Micro-Forecaster',
    tagline: 'Edge-assisted solar energy production forecasting and localized battery load optimization',
    domain: 'Sustainability & IoT',
    difficulty: 'Advanced',
    estimatedWeeks: 14,
    scores: {
      overall: 82,
      skillMatch: 78,
      interestMatch: 85,
      feasibility: 81,
      innovation: 91,
      technicalDepth: 95,
    },
    problemStatement:
      'Decentralized solar installations suffer from unpredictable output fluctuations, causing inefficient battery charging schedules and unnecessary grid reliance.',
    proposedSolution:
      'A localized edge AI system combining hyperlocal weather satellite feeds with battery usage telemetry to predict solar output 24 hours in advance and calculate optimal charging schedules.',
    targetUsers: ['Community Solar Managers', 'Residential Energy Enthusiasts', 'Microgrid Operators'],
    keyFeatures: [
      'Time-series forecasting combining cloud irradiance data with historical sensor logs',
      'Linear programming optimization for battery charge/discharge cycles based on dynamic electricity tariffs',
      'Real-time IoT simulation dashboard with live WebSocket telemetry',
    ],
    aiComponents: [
      'Temporal Fusion Transformer (TFT) / LightGBM for solar irradiance forecasting',
      'Reinforcement Learning / Mixed-Integer Linear Programming for load balancing',
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      backend: ['FastAPI (Python)', 'TimescaleDB', 'MQTT Broker (Mosquitto)'],
      aiMl: ['PyTorch Lightning', 'Scikit-Learn', 'Google Earth Engine API'],
      database: ['TimescaleDB (PostgreSQL Extension)'],
      cloudDeploy: ['Docker', 'AWS IoT Core / GCP IoT'],
    },
    whyThisFitsYou: [
      'High technical depth project that will impress judges in sustainability and systems',
      'Utilizes your Python and PostgreSQL skills with specialized time-series focus',
    ],
    risks: [
      {
        id: 'r_4',
        category: 'data',
        severity: 'high',
        description: 'Physical sensor access might be limited for live testing.',
        mitigation: 'Build an open-source hardware simulator generating realistic NREL irradiance data streams.',
      },
    ],
    recommendations: [
      {
        id: 'rec_4',
        title: 'Use NREL Solar Radiation Database',
        description: 'Leverage free National Renewable Energy Lab API for historical solar datasets.',
        impact: 'high',
      },
    ],
    hardwareRequirements: ['NVIDIA GPU for model training', 'Optional Raspberry Pi 4 edge node'],
    prerequisites: ['Time-series analysis', 'Basic linear programming'],
    createdAt: '2026-09-02T11:00:00Z',
  },
  {
    id: 'proj_access_04',
    title: 'SignBridge: Real-time Multi-Modal ASL Translator',
    tagline: 'On-device vision-based sign language translation to natural synthetic speech with zero cloud latency',
    domain: 'Accessibility & Assistive Tech',
    difficulty: 'Advanced',
    estimatedWeeks: 12,
    scores: {
      overall: 87,
      skillMatch: 84,
      interestMatch: 90,
      feasibility: 85,
      innovation: 94,
      technicalDepth: 92,
    },
    problemStatement:
      'Over 70 million deaf individuals worldwide face communication barriers with non-signers due to the absence of accessible, low-latency, real-time two-way sign interpretation software.',
    proposedSolution:
      'A web-first WebAssembly/MediaPipe application that tracks 3D hand and facial landmarks via webcam, classifies continuous dynamic ASL gestures, and synthesizes expressive spoken audio in real time.',
    targetUsers: ['Deaf and Hard of Hearing Individuals', 'Educators & Healthcare Workers', 'Customer Service Teams'],
    keyFeatures: [
      'Real-time 60fps hand landmark tracking and continuous gesture segmentation',
      'Spatial-temporal graph convolutional network (ST-GCN) for sign recognition',
      'Two-way interface: ASL-to-Voice and Voice-to-3D Avatar Sign Animation',
      'Offline-capable WebAssembly pipeline for privacy protection',
    ],
    aiComponents: [
      'Google MediaPipe Hands & Holistic Pose Model',
      'Spatial-Temporal Graph Convolutional Network (ST-GCN)',
      'Web Speech Synthesis & Gemini for contextual grammar rectification',
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Web Workers', 'Three.js'],
      backend: ['FastAPI (optional fallback)', 'WebSockets'],
      aiMl: ['MediaPipe', 'ONNX Runtime Web', 'PyTorch'],
      database: ['IndexedDB (Client-side)'],
      cloudDeploy: ['Vercel Edge', 'Cloudflare Pages'],
    },
    whyThisFitsYou: [
      'High societal impact project aligned with modern computer vision interest',
      'Leverages your frontend TypeScript strengths combined with client-side AI/ONNX',
    ],
    risks: [
      {
        id: 'r_5',
        category: 'hardware',
        severity: 'medium',
        description: 'Low-end client webcams may struggle with 60fps tracking in dim lighting.',
        mitigation: 'Implement adaptive frame-skipping and keypoint interpolation.',
      },
    ],
    recommendations: [
      {
        id: 'rec_5',
        title: 'Scope to 50 common conversational signs first',
        description: 'Master a robust vocabulary before expanding to full fingerspelling and grammar.',
        impact: 'high',
      },
    ],
    hardwareRequirements: ['Standard Laptop with HD Webcam'],
    prerequisites: ['Computer Vision basics', 'WebAssembly / WebGL basics'],
    createdAt: '2026-09-02T11:30:00Z',
  },
];

export const mockProjectBlueprint: ProjectBlueprint = {
  projectId: 'proj_medtech_01',
  projectTitle: 'MedTrial AI: Patient Eligibility & Risk Screener',
  version: '1.2.0-spec',
  generatedAt: '2026-09-04T08:00:00Z',
  lastUpdated: '2026-09-05T09:30:00Z',
  problemStatement:
    'Over 80% of clinical trials experience delays due to slow patient recruitment. Manual matching of complex medical histories against stringent inclusion/exclusion criteria takes clinicians 30-45 minutes per patient and results in frequent oversights.',
  objectives: [
    'Reduce clinical trial eligibility screening time from 40 minutes to under 2 minutes per patient record',
    'Achieve zero-hallucination criteria matching with 100% cited source evidence for all exclusions',
    'Provide full HIPAA/GDPR compliance via client-side PII de-identification before AI processing',
    'Generate standardized audit-ready PDF/JSON reports for trial coordinators',
  ],
  targetUsers: [
    'Clinical Research Coordinators managing oncology and cardiology trials',
    'Principal Investigators auditing study enrollment eligibility',
    'Hospital Informatics Staff integrating EHR data exports',
  ],
  coreFeatures: [
    'Multimodal EHR/PDF parser extracting clinical notes, labs, and pathology reports',
    'Automated query generation against ClinicalTrials.gov API for matching open studies',
    'Rule-asserted LLM verification engine with strict exclusion clause checking',
    'Interactive Clinician Review Workspace with side-by-side document citation viewer',
  ],
  advancedFeatures: [
    'Biomarker compatibility calculator (e.g., HER2+, KRAS G12C, EGFR status)',
    'FHIR standard JSON ingestion and patient timeline visualization',
    'Automated pre-screening questionnaire generation for prospective patients',
  ],
  innovationFeatures: [
    'Deterministic Citation Anchoring: Every eligibility score links directly to the exact paragraph in the source medical record',
    'Dynamic Counterfactual Explorer: "What if the patient waited 2 weeks post-chemo?" scenario simulator',
  ],
  techStackSummary: {
    frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React'],
    backend: ['FastAPI 0.110+', 'Python 3.11', 'Pydantic v2', 'Celery'],
    aiMl: ['Google Gemini API (1.5 Pro & Flash)', 'LangGraph', 'pgvector (BGE-M3 embeddings)'],
    database: ['PostgreSQL 16 with pgvector extension', 'Redis 7.2 for task queuing'],
    infrastructure: ['Google Cloud Run', 'Firebase Storage', 'Docker Containerization', 'GitHub Actions'],
  },
  systemArchitecture: {
    overview:
      'Clean modular microservices architecture separating client-side PII scrubbing, asynchronous document processing pipelines, vector search retrieval, and LLM verification engines.',
    nodes: [
      {
        id: 'node_fe',
        name: 'Client Web Workspace',
        category: 'client',
        description: 'React SPA offering document upload, citation inspection, and roadmap tracking.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        id: 'node_api',
        name: 'FastAPI Gateway',
        category: 'api_gateway',
        description: 'Handles auth, job scheduling, rate limiting, and REST/WebSocket streaming.',
        technologies: ['FastAPI', 'Uvicorn', 'Pydantic v2'],
      },
      {
        id: 'node_worker',
        name: 'Async OCR & Extraction Worker',
        category: 'service',
        description: 'Extracts clinical text, parses tables, and normalizes medical codes.',
        technologies: ['Celery', 'Redis', 'PyPDF', 'pdfplumber'],
      },
      {
        id: 'node_rag',
        name: 'Hybrid RAG & Vector Engine',
        category: 'ai_engine',
        description: 'Indexes ClinicalTrials.gov criteria and executes dense-sparse hybrid search.',
        technologies: ['PostgreSQL pgvector', 'BGE-M3', 'LangGraph'],
      },
      {
        id: 'node_llm',
        name: 'Gemini Verification Engine',
        category: 'ai_engine',
        description: 'Structured criteria assertion with citation alignment and confidence scoring.',
        technologies: ['Google Gemini 1.5 Pro', 'Structured Outputs API'],
      },
      {
        id: 'node_db',
        name: 'Primary Storage & Vectors',
        category: 'storage',
        description: 'Relational clinical records, trial metadata, audit logs, and embedding vectors.',
        technologies: ['PostgreSQL 16', 'pgvector'],
      },
    ],
    connections: [
      {
        from: 'node_fe',
        to: 'node_api',
        protocol: 'HTTPS / REST',
        description: 'Authenticated API requests and real-time WebSocket progress updates',
      },
      {
        from: 'node_api',
        to: 'node_worker',
        protocol: 'Async Queue',
        description: 'Enqueues background document parsing tasks via Redis',
      },
      {
        from: 'node_worker',
        to: 'node_rag',
        protocol: 'SQL / ORM',
        description: 'Stores extracted chunk embeddings into pgvector',
      },
      {
        from: 'node_rag',
        to: 'node_llm',
        protocol: 'HTTPS / REST',
        description: 'Supplies verified medical chunks to Gemini for deterministic reasoning',
      },
      {
        from: 'node_api',
        to: 'node_db',
        protocol: 'SQL / ORM',
        description: 'Persists structured patient records and evaluation results',
      },
    ],
  },
  databaseSchema: [
    {
      name: 'patients',
      type: 'relational_table',
      description: 'Stores de-identified patient demographic and clinical summaries.',
      fields: [
        { name: 'id', type: 'UUID', description: 'Primary key', isPrimaryKey: true, isRequired: true },
        { name: 'anonymous_code', type: 'VARCHAR(64)', description: 'De-identified hash code', isRequired: true },
        { name: 'age', type: 'INTEGER', description: 'Patient age in years' },
        { name: 'gender', type: 'VARCHAR(16)', description: 'Biological sex' },
        { name: 'primary_diagnosis', type: 'VARCHAR(255)', description: 'Primary condition / oncology staging' },
        { name: 'biomarkers', type: 'JSONB', description: 'Extracted mutation status (e.g. KRAS, EGFR)' },
        { name: 'created_at', type: 'TIMESTAMP', description: 'Record ingestion timestamp' },
      ],
    },
    {
      name: 'clinical_trials',
      type: 'relational_table',
      description: 'Indexed clinical trials synced from ClinicalTrials.gov API.',
      fields: [
        { name: 'nct_id', type: 'VARCHAR(32)', description: 'Official NCT identifier', isPrimaryKey: true, isRequired: true },
        { name: 'title', type: 'TEXT', description: 'Official protocol title', isRequired: true },
        { name: 'phase', type: 'VARCHAR(32)', description: 'Study phase (Phase 1/2/3/4)' },
        { name: 'status', type: 'VARCHAR(32)', description: 'Recruiting, Active, Completed' },
        { name: 'inclusion_criteria', type: 'TEXT[]', description: 'Parsed inclusion rules' },
        { name: 'exclusion_criteria', type: 'TEXT[]', description: 'Parsed exclusion rules' },
      ],
    },
    {
      name: 'screening_evaluations',
      type: 'relational_table',
      description: 'Match scores, verified reasoning traces, and citation coordinates.',
      fields: [
        { name: 'id', type: 'UUID', description: 'Evaluation ID', isPrimaryKey: true, isRequired: true },
        { name: 'patient_id', type: 'UUID', description: 'Foreign key to patients', isForeignKey: true, isRequired: true },
        { name: 'nct_id', type: 'VARCHAR(32)', description: 'Foreign key to clinical_trials', isForeignKey: true, isRequired: true },
        { name: 'eligibility_verdict', type: 'VARCHAR(32)', description: 'Eligible, Ineligible, Ambiguous', isRequired: true },
        { name: 'fit_score', type: 'FLOAT', description: 'Calibrated score 0.0 - 1.0' },
        { name: 'justification_trace', type: 'JSONB', description: 'Itemized criteria reasoning and citations' },
        { name: 'clinician_reviewed', type: 'BOOLEAN', description: 'Human-in-the-loop review flag' },
      ],
    },
    {
      name: 'medical_chunk_embeddings',
      type: 'vector_index',
      description: 'Vector storage for semantic retrieval over medical records and protocols.',
      fields: [
        { name: 'id', type: 'UUID', description: 'Chunk ID', isPrimaryKey: true, isRequired: true },
        { name: 'source_doc_id', type: 'VARCHAR(128)', description: 'Source file reference' },
        { name: 'content', type: 'TEXT', description: 'Raw chunk text' },
        { name: 'embedding', type: 'VECTOR(1024)', description: 'BGE-M3 Dense vector embedding' },
        { name: 'page_number', type: 'INTEGER', description: 'Exact source page number for PDF viewer' },
      ],
    },
  ],
  apiEndpoints: [
    {
      id: 'ep_1',
      method: 'POST',
      path: '/api/v1/patients/ingest',
      description: 'Uploads and extracts anonymized clinical PDF document with background OCR.',
      requestBodySample: '{\n  "anonymous_code": "PT-7712",\n  "file_url": "https://storage.googleapis.com/..."\n}',
      responseBodySample: '{\n  "patient_id": "8f7e2a-...",\n  "status": "processing",\n  "job_id": "job_9912"\n}',
      authRequired: true,
    },
    {
      id: 'ep_2',
      method: 'GET',
      path: '/api/v1/trials/search',
      description: 'Performs hybrid semantic search for open clinical trials matching patient profile.',
      responseBodySample: '{\n  "trials": [\n    {\n      "nct_id": "NCT04829100",\n      "title": "Pembrolizumab in Advanced NSCLC",\n      "relevance_score": 0.94\n    }\n  ]\n}',
      authRequired: true,
    },
    {
      id: 'ep_3',
      method: 'POST',
      path: '/api/v1/screen/evaluate',
      description: 'Executes verified Gemini 1.5 Pro criteria evaluation with source citations.',
      requestBodySample: '{\n  "patient_id": "8f7e2a-...",\n  "nct_id": "NCT04829100"\n}',
      responseBodySample: '{\n  "verdict": "Eligible",\n  "fit_score": 0.94,\n  "citations": [\n    {"criterion": "ECOG 0-1", "source_page": 2, "quote": "Patient ECOG performance status 1"}\n  ]\n}',
      authRequired: true,
    },
    {
      id: 'ep_4',
      method: 'GET',
      path: '/api/v1/reports/:id/export',
      description: 'Exports audit-ready PDF/JSON clinician report.',
      authRequired: true,
    },
  ],
  aiPipeline: [
    {
      stepNumber: 1,
      name: 'PII De-Identification & PDF Normalization',
      input: 'Raw medical PDF / scanned clinical records',
      modelOrTechnique: 'Presidio PII Anonymizer + pdfplumber OCR',
      output: 'Sanitized clinical text with scrubbed patient names/MRNs',
      latencyExpectation: '~800ms per 5-page PDF',
    },
    {
      stepNumber: 2,
      name: 'Entity Extraction & Code Standardization',
      input: 'Sanitized clinical note narrative',
      modelOrTechnique: 'Gemini 1.5 Flash (JSON Schema mode)',
      output: 'Structured clinical JSON (ICD-10 codes, lab values, medication history, biomarkers)',
      latencyExpectation: '~1.2s',
    },
    {
      stepNumber: 3,
      name: 'Hybrid Trial Retrieval',
      input: 'Patient clinical condition & biomarker parameters',
      modelOrTechnique: 'BGE-M3 Dense Vector + BM25 Sparse Ranking (pgvector)',
      output: 'Top 10 candidate clinical trials from ClinicalTrials.gov index',
      latencyExpectation: '~150ms',
    },
    {
      stepNumber: 4,
      name: 'Deterministic Inclusion/Exclusion Verification',
      input: 'Patient profile + candidate trial protocol criteria',
      modelOrTechnique: 'Gemini 1.5 Pro with Citation Grounding',
      output: 'Itemized verification matrix with exact document coordinates and confidence',
      latencyExpectation: '~2.5s',
    },
  ],
  testingStrategy: {
    unitTesting: [
      'FastAPI endpoint status codes and Pydantic schema validation tests via pytest',
      'Presidio PII scrubbing unit tests verifying no names/phones/addresses leak',
      'PDF text extraction edge cases (scanned tables, rotated pages)',
      'Frontend component testing with Vitest and React Testing Library',
    ],
    integrationTesting: [
      'End-to-end patient document upload -> Celery extraction -> pgvector indexing pipeline',
      'Mocked Gemini API response verification against structured schema contract',
      'WebSocket streaming progress updates under simulated network latency',
    ],
    aiEvaluationMetrics: [
      'Precision & Recall on 100 golden benchmark clinical trial eligibility scenarios',
      'Zero-tolerance policy for false positive inclusions on hard contraindications',
      'Citation faithfulness score: 100% of generated claims must match cited snippet',
    ],
  },
  securityConsiderations: [
    'HIPAA/GDPR Compliance: No raw protected health information (PHI) is stored unencrypted or transmitted to 3rd-party APIs without client-side anonymization.',
    'Row-Level Security (RLS) configured in PostgreSQL preventing unauthorized cross-institution record access.',
    'Signed short-lived URLs for Firebase Storage document access (expire after 15 minutes).',
    'No sensitive secrets or API keys stored in client code; all LLM calls mediated by backend gateway.',
  ],
  deploymentPlan: {
    staging: 'Google Cloud Run (backend container) + Firebase Hosting (frontend build) on staging branch push',
    production: 'Multi-region Cloud Run service with Cloud SQL PostgreSQL instance and Redis caching',
    cicdPipeline: 'GitHub Actions running pytest, vitest, typescript checking, and automated Docker build push',
    costEstimate: 'Estimated $0.00 during development using GCP Free Tier & Gemini API promotional credits',
  },
};

export const mockRoadmap: Roadmap = {
  projectId: 'proj_medtech_01',
  projectTitle: 'MedTrial AI: Patient Eligibility & Risk Screener',
  totalWeeks: 12,
  currentMilestoneId: 'ms_3',
  overallProgressPercentage: 45,
  phases: [
    {
      id: 'phase_1',
      phaseNumber: 1,
      name: 'Foundation & Clinical Data Pipeline',
      description: 'Setup project infrastructure, HIPAA-compliant PII scrubber, and ClinicalTrials.gov API sync.',
      milestones: [
        {
          id: 'ms_1',
          phaseId: 'phase_1',
          order: 1,
          title: 'Project Setup & Domain Modeling',
          tagline: 'Establish repository, strict TypeScript frontend, and FastAPI backend skeleton',
          description:
            'Configure monorepo/folder architecture, PostgreSQL schemas with pgvector extension, and Docker dev environment.',
          durationWeeks: 2,
          status: 'completed',
          technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Docker'],
          tasks: [
            { id: 't_1', title: 'Initialize Vite React TS frontend with Tailwind CSS', completed: true, estimatedHours: 6 },
            { id: 't_2', title: 'Setup FastAPI backend with Pydantic v2 schemas', completed: true, estimatedHours: 8 },
            { id: 't_3', title: 'Configure PostgreSQL database with pgvector extension', completed: true, estimatedHours: 6 },
            { id: 't_4', title: 'Establish CI workflow with Vitest and Pytest', completed: true, estimatedHours: 4 },
          ],
          deliverables: ['Working frontend shell', 'Backend API health check', 'Database migration scripts'],
          dependencies: [],
          testingChecklist: ['Backend /health endpoint returns 200', 'Frontend builds cleanly without warnings'],
        },
        {
          id: 'ms_2',
          phaseId: 'phase_1',
          order: 2,
          title: 'Document Ingestion & PII Scrubber',
          tagline: 'Client-side PDF text extraction and automated medical entity normalization',
          description:
            'Implement PDF text parser, Presidio de-identification pipeline, and ICD-10/SNOMED entity extraction with Gemini Flash.',
          durationWeeks: 2,
          status: 'completed',
          technologies: ['Python', 'pdfplumber', 'Presidio', 'Gemini Flash', 'Firebase Storage'],
          tasks: [
            { id: 't_5', title: 'Build drag-and-drop clinical document uploader with progress state', completed: true, estimatedHours: 8 },
            { id: 't_6', title: 'Implement PDF parsing worker with table extraction', completed: true, estimatedHours: 10 },
            { id: 't_7', title: 'Create Presidio PII scrubbing rule pipeline', completed: true, estimatedHours: 6 },
            { id: 't_8', title: 'Test entity extraction on 20 Synthea sample patient records', completed: true, estimatedHours: 6 },
          ],
          deliverables: ['Automated PDF ingestion pipeline', 'De-identification validation suite'],
          dependencies: ['ms_1'],
          testingChecklist: ['Verify 0% PII leakage in synthetic test suite', 'PDF parser handles 20-page clinical reports'],
        },
      ],
    },
    {
      id: 'phase_2',
      phaseNumber: 2,
      name: 'RAG & Vector Search Engine',
      description: 'Index clinical trial protocols and build dense-sparse hybrid retrieval.',
      milestones: [
        {
          id: 'ms_3',
          phaseId: 'phase_2',
          order: 3,
          title: 'ClinicalTrials.gov Syncer & Vector Index',
          tagline: 'Automated trial ingestion, criteria chunking, and BGE-M3 embedding storage',
          description:
            'Build automated sync job pulling open trials, chunking inclusion/exclusion criteria, and storing dense vectors into pgvector.',
          durationWeeks: 2,
          status: 'in_progress',
          technologies: ['Python', 'pgvector', 'BGE-M3', 'ClinicalTrials.gov API'],
          tasks: [
            { id: 't_9', title: 'Connect to ClinicalTrials.gov REST API v2', completed: true, estimatedHours: 8 },
            { id: 't_10', title: 'Implement structured inclusion/exclusion chunking algorithm', completed: true, estimatedHours: 10 },
            { id: 't_11', title: 'Generate embeddings using BGE-M3 model', completed: false, estimatedHours: 8 },
            { id: 't_12', title: 'Benchmark hybrid vector + BM25 search latency', completed: false, estimatedHours: 6 },
          ],
          deliverables: ['Indexed trial criteria database', 'Fast hybrid search service (<100ms)'],
          dependencies: ['ms_2'],
          testingChecklist: ['Top-5 trial retrieval accuracy >90% on benchmark queries'],
        },
      ],
    },
    {
      id: 'phase_3',
      phaseNumber: 3,
      name: 'AI Verification & Citation Engine',
      description: 'Deterministic Gemini 1.5 Pro reasoning with citation coordinates.',
      milestones: [
        {
          id: 'ms_4',
          phaseId: 'phase_3',
          order: 4,
          title: 'Criteria Reasoner & Citation Mapper',
          tagline: 'Multi-criteria assertion engine with paragraph-level source citations',
          description:
            'Engineer LangGraph workflow verifying each inclusion/exclusion criterion with verifiable source quotes and confidence scores.',
          durationWeeks: 3,
          status: 'not_started',
          technologies: ['Gemini 1.5 Pro', 'LangGraph', 'Pydantic v2'],
          tasks: [
            { id: 't_13', title: 'Design structured JSON schema for criteria verification', completed: false, estimatedHours: 6 },
            { id: 't_14', title: 'Implement contraindication hard-stop verification', completed: false, estimatedHours: 10 },
            { id: 't_15', title: 'Map citations to source PDF bounding boxes / page numbers', completed: false, estimatedHours: 12 },
            { id: 't_16', title: 'Build confidence calibration scoring formula', completed: false, estimatedHours: 6 },
          ],
          deliverables: ['Zero-hallucination verification engine', 'Citation coordinate payload format'],
          dependencies: ['ms_3'],
          testingChecklist: ['Zero false inclusions on contraindication test dataset'],
        },
      ],
    },
    {
      id: 'phase_4',
      phaseNumber: 4,
      name: 'Clinician Workspace & Interactive UI',
      description: 'Polished split-screen review interface, citation highlighter, and report generation.',
      milestones: [
        {
          id: 'ms_5',
          phaseId: 'phase_4',
          order: 5,
          title: 'Split-Screen Review & Citation Viewer',
          tagline: 'Interactive clinician UI with linked citation highlights and override actions',
          description:
            'Develop responsive review dashboard where clinicians can inspect patient matches, click citations to jump directly into source document passages, and override AI recommendations.',
          durationWeeks: 2,
          status: 'not_started',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'PDF.js'],
          tasks: [
            { id: 't_17', title: 'Build split-screen patient vs trial comparison UI', completed: false, estimatedHours: 10 },
            { id: 't_18', title: 'Implement interactive PDF citation anchor jump', completed: false, estimatedHours: 8 },
            { id: 't_19', title: 'Add clinician override and note taking controls', completed: false, estimatedHours: 6 },
            { id: 't_20', title: 'Design PDF audit export preview', completed: false, estimatedHours: 6 },
          ],
          deliverables: ['Production clinician review workspace', 'Exportable PDF summary'],
          dependencies: ['ms_4'],
          testingChecklist: ['Citation click seamlessly navigates to matching page and highlights text'],
        },
      ],
    },
    {
      id: 'phase_5',
      phaseNumber: 5,
      name: 'Testing, Benchmarking & Deployment',
      description: 'Comprehensive evaluation, security auditing, and Cloud Run deployment.',
      milestones: [
        {
          id: 'ms_6',
          phaseId: 'phase_5',
          order: 6,
          title: 'Evaluation Benchmark & Cloud Deployment',
          tagline: 'Publish benchmark results and deploy live production workspace on Google Cloud Run',
          description:
            'Evaluate system against 100 gold-standard clinical scenarios, configure Docker containers, and deploy to Google Cloud Run with automated CI/CD.',
          durationWeeks: 1,
          status: 'not_started',
          technologies: ['Google Cloud Run', 'Firebase', 'GitHub Actions', 'Docker'],
          tasks: [
            { id: 't_21', title: 'Run 100-case evaluation benchmark and compile accuracy report', completed: false, estimatedHours: 8 },
            { id: 't_22', title: 'Setup Google Cloud Run deployment pipeline', completed: false, estimatedHours: 6 },
            { id: 't_23', title: 'Conduct final security audit and verify RLS policies', completed: false, estimatedHours: 6 },
            { id: 't_24', title: 'Record hackathon demonstration video and finalize documentation', completed: false, estimatedHours: 6 },
          ],
          deliverables: ['Live deployed application URL', 'Benchmark report', 'Final documentation'],
          dependencies: ['ms_5'],
          testingChecklist: ['Cloud Run deployment achieves <200ms API response time on cold start'],
        },
      ],
    },
  ],
};

export const mockSuggestedPrompts: SuggestedPrompt[] = [
  {
    id: 'sp_1',
    label: 'Scope Feasibility',
    prompt: 'Is my 12-week timeline realistic for adding real-time FHIR ingestion, or should I stick to PDF extraction for the MVP?',
    category: 'scope',
  },
  {
    id: 'sp_2',
    label: 'AI Verification Architecture',
    prompt: 'How can I ensure Gemini 1.5 Pro never hallucinates an eligibility check when reading ambiguous inclusion clauses?',
    category: 'ai_pipeline',
  },
  {
    id: 'sp_3',
    label: 'Vector DB Comparison',
    prompt: 'Should I use pgvector inside our PostgreSQL database or deploy a dedicated Pinecone index?',
    category: 'architecture',
  },
  {
    id: 'sp_4',
    label: 'Next Milestone Action',
    prompt: 'I am currently in Phase 2 on the ClinicalTrials.gov indexer. What is the most critical task I should tackle next?',
    category: 'evaluation',
  },
];

export const mockMentorHistory: MentorMessage[] = [
  {
    id: 'msg_1',
    sender: 'system',
    content: 'Context loaded: **MedTrial AI** · Phase 2 (RAG & Vector Search Engine) · Stack: React, FastAPI, pgvector, Gemini API.',
    timestamp: '2026-09-05T09:00:00Z',
  },
  {
    id: 'msg_2',
    sender: 'student',
    content: 'Hi Mentor! I am currently working on Milestone 3 (ClinicalTrials.gov Syncer). Should I store full trial PDFs or only the structured inclusion/exclusion sections in pgvector?',
    timestamp: '2026-09-05T09:02:00Z',
  },
  {
    id: 'msg_3',
    sender: 'mentor',
    content:
      "Great question, Aarav. For **Milestone 3**, I strongly recommend storing **only the structured criteria clauses** rather than raw PDF dumps. Here is why:\n\n1. **Signal-to-Noise Ratio**: Full protocol documents contain 60+ pages of administrative sponsor details, statistical formulas, and IRB approvals that pollute semantic search.\n2. **Chunking Granularity**: By chunking criteria on a *per-bullet rule* basis (e.g., each inclusion rule = 1 vector chunk), your hybrid retrieval will pinpoint the exact contraindication snippet with high cosine similarity.\n3. **Latency**: Chunking criteria saves over 85% embedding compute and allows pgvector to index 10,000 trials in under 200MB of RAM.",
    codeSnippets: [
      {
        language: 'python',
        fileName: 'services/trial_chunker.py',
        code: `def extract_criteria_chunks(trial_dict: dict) -> list[CriterionChunk]:
    chunks = []
    # Extract inclusion criteria as individual discrete semantic items
    for item in trial_dict.get("inclusion_criteria", []):
        chunks.append(CriterionChunk(
            nct_id=trial_dict["nct_id"],
            criterion_type="inclusion",
            text=item.strip(),
            biomarkers=extract_biomarkers(item)
        ))
    return chunks`,
      },
    ],
    suggestedNextActions: [
      'Write the discrete criteria chunking function',
      'Test BGE-M3 embedding latency on 100 sample oncology trials',
      'Verify pgvector HNSW index creation script',
    ],
    referencedMilestoneId: 'ms_3',
    timestamp: '2026-09-05T09:03:15Z',
  },
];
