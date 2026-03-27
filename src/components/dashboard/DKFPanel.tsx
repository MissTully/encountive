import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lightbulb, Target } from 'lucide-react';
import type { ScoringResult } from '@/hooks/useDashboardData';

interface DKFPanelProps {
  scoring: ScoringResult | null;
}

const DKF_CRITERIA = [
  { key: 'decision_quality', label: 'Decision-Making Quality', icon: Target, description: 'Appropriateness and timeliness of clinical decisions' },
  { key: 'knowledge_application', label: 'Knowledge Application', icon: Lightbulb, description: 'Correct application of medical protocols and guidelines' },
  { key: 'clinical_reasoning', label: 'Clinical Reasoning', icon: Brain, description: 'Logical reasoning chain in patient assessment' },
];

export function DKFPanel({ scoring }: DKFPanelProps) {
  const dkf = scoring?.dkf as Record<string, unknown> | null;

  return (
    <div className="space-y-4">
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Decision-Knowledge Framework (DKF)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!dkf || Object.keys(dkf).length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No DKF evaluation data available for this session yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DKF_CRITERIA.map(({ key, label, icon: Icon, description }) => {
                const value = dkf[key];
                const score = typeof value === 'number' ? value : null;
                const detail = typeof value === 'object' && value !== null ? value : null;
                const scoreNum = score ?? (detail as Record<string, unknown>)?.score as number ?? null;
                const notes = (detail as Record<string, unknown>)?.notes as string ?? null;

                return (
                  <Card key={key} variant="outlined" className="border-border/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{label}</p>
                          <p className="text-[10px] text-muted-foreground">{description}</p>
                        </div>
                      </div>
                      {scoreNum != null && (
                        <div className="text-center">
                          <span className="text-3xl font-bold font-display text-primary">{scoreNum}</span>
                          <span className="text-sm text-muted-foreground">/5</span>
                        </div>
                      )}
                      {notes && (
                        <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-2">
                          {notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
