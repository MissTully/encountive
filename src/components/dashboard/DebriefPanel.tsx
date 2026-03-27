import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Target,
  TrendingUp,
} from 'lucide-react';
import type { DebriefFeedback } from '@/hooks/useDashboardData';

interface DebriefPanelProps {
  debrief: DebriefFeedback | null;
}

export function DebriefPanel({ debrief }: DebriefPanelProps) {
  if (!debrief) {
    return (
      <Card variant="glass">
        <CardContent className="py-16 text-center">
          <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">
            No debrief available yet. The debrief will appear here once the session ends and the AI generates feedback.
          </p>
        </CardContent>
      </Card>
    );
  }

  const strengths = (debrief.strengths as string[]) || [];
  const improvements = (debrief.improvements as string[]) || [];
  const redFlags = (debrief.red_flags as string[]) || [];
  const nextSteps = (debrief.next_steps as string[]) || [];

  return (
    <div className="space-y-4">
      {debrief.debrief_text && (
        <Card variant="gradient">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              AI Coaching Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
              {debrief.debrief_text}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="glass" className="border-success/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4" />
              Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length === 0 ? (
              <p className="text-xs text-muted-foreground">None recorded.</p>
            ) : (
              <ul className="space-y-2">
                {strengths.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-success shrink-0" />
                    <span>{String(s)}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card variant="glass" className="border-warning/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-warning">
              <TrendingUp className="h-4 w-4" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            {improvements.length === 0 ? (
              <p className="text-xs text-muted-foreground">None recorded.</p>
            ) : (
              <ul className="space-y-2">
                {improvements.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-warning shrink-0" />
                    <span>{String(s)}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {redFlags.length > 0 && (
          <Card variant="glass" className="border-destructive/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-4 w-4" />
                Red Flags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {redFlags.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-destructive shrink-0" />
                    <span>{String(s)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card variant="glass" className="border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-primary">
              <Target className="h-4 w-4" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextSteps.length === 0 ? (
              <p className="text-xs text-muted-foreground">None recorded.</p>
            ) : (
              <ul className="space-y-2">
                {nextSteps.map((s, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <ArrowRight className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                    <span>{String(s)}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
