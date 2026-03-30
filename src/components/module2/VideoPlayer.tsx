import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Maximize2, Volume2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface VideoPlayerProps {
  title: string;
  description?: string;
  duration: string;
  onComplete?: () => void;
}

const VideoPlayer = ({ title, description, duration, onComplete }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Fire onComplete when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && !completed) {
      setCompleted(true);
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onCompleteRef.current?.();
    }
  }, [progress, completed]);

  const handlePlayPause = () => {
    if (completed) return;
    if (!isPlaying) {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 0.5, 100);
          const totalSeconds = 480;
          const elapsed = Math.floor((newProgress / 100) * totalSeconds);
          const mins = Math.floor(elapsed / 60);
          const secs = elapsed % 60;
          setCurrentTime(`${mins}:${secs.toString().padStart(2, "0")}`);
          return newProgress;
        });
      }, 200);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const handleRestart = () => {
    setProgress(0);
    setCurrentTime("0:00");
    setIsPlaying(false);
  };

  return (
    <Card variant="simulation" className="overflow-hidden">
      {/* Video Area */}
      <div className="relative aspect-video bg-muted/30 flex items-center justify-center overflow-hidden group">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

        {/* Placeholder content */}
        <div className="relative z-10 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/30 shadow-glow-primary">
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-primary rounded-full animate-pulse" />
                <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <Play className="h-8 w-8 text-primary ml-1" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {isPlaying ? "Playing instructional video..." : "Click play to begin"}
            </p>
          </div>
        </div>

        {/* Progress overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 bg-muted/50">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={handleRestart}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground">{currentTime}</span>
          <Progress value={progress} className="flex-1 h-1.5" />
          <span className="text-xs font-mono text-muted-foreground">{duration}</span>
        </div>

        <Button variant="ghost" size="icon" className="rounded-xl">
          <Volume2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-xl">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Description */}
      {description && (
        <div className="px-4 pb-4">
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>
      )}
    </Card>
  );
};

export default VideoPlayer;
