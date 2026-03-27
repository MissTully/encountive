import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CallTimerProps {
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
}

const CallTimer = ({ isRunning, onTimeUpdate }: CallTimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const newSeconds = prev + 1;
          onTimeUpdate?.(newSeconds);
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span className="font-mono text-sm font-medium text-foreground">
        {formatTime(seconds)}
      </span>
    </div>
  );
};

export default CallTimer;
