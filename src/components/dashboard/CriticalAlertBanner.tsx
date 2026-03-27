import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import type { ScoringResult } from '@/hooks/useDashboardData';

interface CriticalAlertBannerProps {
  alerts: ScoringResult[];
}

export function CriticalAlertBanner({ alerts }: CriticalAlertBannerProps) {
  const latestAlert = alerts[alerts.length - 1];
  const flags = (latestAlert.safety_flags as string[]) || [];

  return (
    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 animate-pulse-glow">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="font-display text-base">
        ⚠️ Critical Violation Detected ({alerts.length} alert{alerts.length > 1 ? 's' : ''})
      </AlertTitle>
      <AlertDescription className="mt-2">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {flags.map((flag, i) => (
            <Badge key={i} variant="destructive" className="text-xs">
              {String(flag)}
            </Badge>
          ))}
        </div>
        {latestAlert.overall_summary && (
          <p className="text-sm">{latestAlert.overall_summary}</p>
        )}
      </AlertDescription>
    </Alert>
  );
}
