import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { useBlueprint } from '../../hooks/useBlueprint';
import { BlueprintViewer } from '../../components/blueprint/BlueprintViewer';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';

export const BlueprintPage: React.FC = () => {
  const { blueprint, loading, regenerating, error, regenerateBlueprint } = useBlueprint('proj_medtech_01');

  if (loading) {
    return (
      <AppShell>
        <LoadingState label="Synthesizing Engineering Blueprint Document..." />
      </AppShell>
    );
  }

  if (error || !blueprint) {
    return (
      <AppShell>
        <ErrorState message={error || 'Blueprint unavailable'} onRetry={regenerateBlueprint} />
      </AppShell>
    );
  }

  return (
    <AppShell activeProjectTitle={blueprint.projectTitle}>
      <BlueprintViewer
        blueprint={blueprint}
        onRegenerate={regenerateBlueprint}
        regenerating={regenerating}
      />
    </AppShell>
  );
};
