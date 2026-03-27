import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, MessageSquare } from 'lucide-react';
import type { TranscriptTurn } from '@/hooks/useDashboardData';

interface LiveTranscriptPanelProps {
  turns: TranscriptTurn[];
  isLive: boolean;
}

export function LiveTranscriptPanel({ turns, isLive }: LiveTranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [turns]);

  return (
    <Card variant="glass" className="h-[500px] flex flex-col">
      <CardHeader className="pb-3 shrink-0">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Live Transcript
          </span>
          {isLive && (
            <Badge className="bg-success/20 text-success border-success/30 text-xs">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Streaming
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pb-4">
        <div ref={scrollRef} className="h-full overflow-y-auto space-y-2 pr-2">
          {turns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">
                {isLive ? 'Waiting for conversation data…' : 'No transcript data for this session.'}
              </p>
            </div>
          ) : (
            turns.map((turn) => {
              const isPatient = turn.speaker.toLowerCase().includes('patient') || turn.speaker.toLowerCase().includes('margaret');
              const isCritical = turn.contains_critical_event;
              const riskFlags = (turn.risk_flags as string[]) || [];

              return (
                <div
                  key={turn.id}
                  className={`rounded-lg p-3 animate-fade-in text-sm ${
                    isCritical
                      ? 'bg-destructive/10 border border-destructive/30'
                      : isPatient
                      ? 'bg-secondary/50'
                      : 'bg-primary/5 border-l-2 border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {turn.speaker}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isCritical && (
                        <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                      )}
                      {turn.confidence != null && (
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {(turn.confidence * 100).toFixed(0)}%
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-foreground">{turn.text}</p>
                  {riskFlags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {riskFlags.map((flag, i) => (
                        <Badge key={i} variant="destructive" className="text-[10px] px-1.5 py-0">
                          {String(flag)}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
