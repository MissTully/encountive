import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Activity, CheckCircle2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { DashboardSession } from '@/hooks/useDashboardData';

interface SessionSelectorProps {
  sessions: DashboardSession[];
  selectedSessionId: string | null;
  onSelect: (id: string) => void;
}

export function SessionSelector({ sessions, selectedSessionId, onSelect }: SessionSelectorProps) {
  if (sessions.length === 0) return null;

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-2">
        {sessions.slice(0, 20).map((session) => {
          const isActive = session.id === selectedSessionId;
          const isLive = session.status === 'active';

          return (
            <button
              key={session.id}
              onClick={() => onSelect(session.id)}
              className={`shrink-0 text-left rounded-xl border p-3 transition-all min-w-[180px] ${
                isActive
                  ? 'border-primary/50 bg-primary/10 shadow-glow-primary'
                  : 'border-border/50 bg-card hover:border-primary/30 hover:bg-card/80'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {isLive ? (
                  <Badge className="bg-success/20 text-success border-success/30 text-[10px] px-1.5 py-0">
                    <Activity className="h-2.5 w-2.5 mr-0.5 animate-pulse" />
                    Live
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                    {session.status}
                  </Badge>
                )}
              </div>
              <p className="text-xs font-mono text-muted-foreground truncate">
                {session.id.slice(0, 8)}…
              </p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-2.5 w-2.5" />
                {formatDistanceToNow(new Date(session.start_time), { addSuffix: true })}
              </p>
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
