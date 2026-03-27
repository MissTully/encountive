import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import type { ScoringResult } from '@/hooks/useDashboardData';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface RubricRadarChartProps {
  scoring: ScoringResult | null;
  fullSize?: boolean;
}

const CRITERIA_LABELS: Record<string, string> = {
  professionalism: 'Professional',
  hipaa_compliance: 'HIPAA',
  tone_pacing: 'Tone',
  clarity: 'Clarity',
  empathy_rapport: 'Empathy',
  escalation_awareness: 'Escalation',
  red_flag_detection: 'Red Flags',
};

export function RubricRadarChart({ scoring, fullSize }: RubricRadarChartProps) {
  const rubricScores = scoring?.rubric_scores as Record<string, number> | null;

  const data = Object.entries(CRITERIA_LABELS).map(([key, label]) => ({
    subject: label,
    score: rubricScores?.[key] ?? 0,
    fullMark: 5,
  }));

  const hasData = data.some(d => d.score > 0);

  return (
    <Card variant="glass" className={fullSize ? 'min-h-[400px]' : ''}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Rubric Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
            No rubric scores available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={fullSize ? 350 : 250}>
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="hsl(225 15% 18%)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 5]}
                tick={{ fill: 'hsl(215 20% 55%)', fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(185 85% 50%)"
                fill="hsl(185 85% 50%)"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
