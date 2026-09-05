export interface ArchitectureNode {
  id: string;
  name: string;
  category: 'client' | 'api_gateway' | 'service' | 'ai_engine' | 'storage' | 'external';
  description: string;
  technologies: string[];
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  protocol: 'HTTPS / REST' | 'WebSocket' | 'gRPC' | 'SQL / ORM' | 'Async Queue';
  description: string;
}

export interface SystemArchitecture {
  overview: string;
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
}

export interface DatabaseField {
  name: string;
  type: string;
  description: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isRequired?: boolean;
}

export interface DatabaseCollection {
  name: string;
  type: 'relational_table' | 'nosql_collection' | 'vector_index';
  description: string;
  fields: DatabaseField[];
}

export interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBodySample?: string;
  responseBodySample?: string;
  authRequired: boolean;
}

export interface AiPipelineStep {
  stepNumber: number;
  name: string;
  input: string;
  modelOrTechnique: string;
  output: string;
  latencyExpectation: string;
}

export interface ProjectBlueprint {
  projectId: string;
  projectTitle: string;
  version: string;
  generatedAt: string;
  lastUpdated: string;
  problemStatement: string;
  objectives: string[];
  targetUsers: string[];
  coreFeatures: string[];
  advancedFeatures: string[];
  innovationFeatures: string[];
  techStackSummary: {
    frontend: string[];
    backend: string[];
    aiMl: string[];
    database: string[];
    infrastructure: string[];
  };
  systemArchitecture: SystemArchitecture;
  databaseSchema: DatabaseCollection[];
  apiEndpoints: ApiEndpoint[];
  aiPipeline: AiPipelineStep[];
  testingStrategy: {
    unitTesting: string[];
    integrationTesting: string[];
    aiEvaluationMetrics: string[];
  };
  securityConsiderations: string[];
  deploymentPlan: {
    staging: string;
    production: string;
    cicdPipeline: string;
    costEstimate: string;
  };
}
