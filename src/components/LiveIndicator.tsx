interface LiveIndicatorProps {
  isLive: boolean;
  label?: string;
}

const LiveIndicator = ({ isLive, label = "LIVE" }: LiveIndicatorProps) => {
  if (!isLive) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-destructive opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-destructive">
        {label}
      </span>
    </div>
  );
};

export default LiveIndicator;
