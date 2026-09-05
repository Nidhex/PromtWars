import { ProjectBlueprint } from '../types/blueprint';
import { ServiceResponse } from '../types/common';
import { mockProjectBlueprint } from './mockData';

let blueprintStore: ProjectBlueprint = { ...mockProjectBlueprint };

export const blueprintService = {
  async getBlueprintByProjectId(projectId: string): Promise<ServiceResponse<ProjectBlueprint>> {
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Return current blueprint, adjusting project ID if needed
    const blueprint: ProjectBlueprint = {
      ...blueprintStore,
      projectId,
    };

    return {
      success: true,
      data: blueprint,
      timestamp: new Date().toISOString(),
    };
  },

  async generateBlueprint(projectId: string): Promise<ServiceResponse<ProjectBlueprint>> {
    // Simulate AI pipeline generation
    await new Promise((resolve) => setTimeout(resolve, 900));

    blueprintStore = {
      ...blueprintStore,
      projectId,
      version: '1.3.0-revised',
      lastUpdated: new Date().toISOString(),
    };

    return {
      success: true,
      data: blueprintStore,
      timestamp: new Date().toISOString(),
    };
  },

  exportBlueprintAsMarkdown(blueprint: ProjectBlueprint): string {
    return `# ${blueprint.projectTitle} - AI Engineering Blueprint
**Version:** ${blueprint.version} | **Generated:** ${blueprint.generatedAt}

## 1. Problem Statement
${blueprint.problemStatement}

## 2. Target Users
${blueprint.targetUsers.map((u) => `- ${u}`).join('\n')}

## 3. Core Objectives
${blueprint.objectives.map((o) => `- ${o}`).join('\n')}

## 4. System Architecture
**Overview:** ${blueprint.systemArchitecture.overview}

### Components:
${blueprint.systemArchitecture.nodes.map((n) => `- **${n.name}** (${n.category}): ${n.description} [${n.technologies.join(', ')}]`).join('\n')}

## 5. AI & Data Pipeline
${blueprint.aiPipeline.map((s) => `### Step ${s.stepNumber}: ${s.name}\n- **Input:** ${s.input}\n- **Model/Technique:** ${s.modelOrTechnique}\n- **Output:** ${s.output}\n- **Latency:** ${s.latencyExpectation}`).join('\n\n')}

## 6. Database Schema
${blueprint.databaseSchema.map((d) => `### ${d.name} (${d.type})\n${d.description}\nFields:\n${d.fields.map((f) => `  - \`${f.name}\` (${f.type}) ${f.isPrimaryKey ? '[PK]' : ''} ${f.isRequired ? '[Required]' : ''}: ${f.description}`).join('\n')}`).join('\n\n')}

## 7. API Endpoints
${blueprint.apiEndpoints.map((e) => `- **${e.method}** \`${e.path}\` - ${e.description} (Auth: ${e.authRequired ? 'Yes' : 'No'})`).join('\n')}

## 8. Security & Compliance
${blueprint.securityConsiderations.map((s) => `- ${s}`).join('\n')}

## 9. Deployment Strategy
- **Staging:** ${blueprint.deploymentPlan.staging}
- **Production:** ${blueprint.deploymentPlan.production}
- **CI/CD:** ${blueprint.deploymentPlan.cicdPipeline}
- **Cost:** ${blueprint.deploymentPlan.costEstimate}
`;
  },
};
