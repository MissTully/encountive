import { BookOpen, Target, Award, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Mode = "guided" | "practice" | "evaluation";

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
  practiceUnlocked?: boolean;
  evaluationUnlocked?: boolean;
}

const modes = [
  {
    id: "guided" as Mode,
    label: "Guided",
    description: "Step-by-step instruction with hints and coaching",
    icon: BookOpen,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    id: "practice" as Mode,
    label: "Practice",
    description: "Independent practice with feedback after each attempt",
    icon: Target,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
  },
  {
    id: "evaluation" as Mode,
    label: "Evaluation",
    description: "Scored assessment \u2014 demonstrate mastery (\u00b14 mmHg)",
    icon: Award,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
  },
];

const ModeSelector = ({
  currentMode,
  onModeChange,
  practiceUnlocked = true,
  evaluationUnlocked = false,
}: ModeSelectorProps) => {
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;
        const isLocked =
          (mode.id === "practice" && !practiceUnlocked) ||
          (mode.id === "evaluation" && !evaluationUnlocked);

        return (
          <Card
            key={mode.id}
            variant={isActive ? "neon" : "glass"}
            className={`cursor-pointer transition-all duration-200 ${
              isLocked ? "opacity-50 cursor-not-allowed" : "hover:border-primary/20"
            } ${isActive ? mode.borderColor : ""}`}
            onClick={() => !isLocked && onModeChange(mode.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className={`h-10 w-10 rounded-xl ${mode.bgColor} flex items-center justify-center`}>
                {isLocked ? (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <mode.icon className={`h-5 w-5 ${mode.color}`} />
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${isActive ? mode.color : "text-foreground"}`}>
                  {mode.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {mode.description}
                </p>
              </div>
              {isLocked && (
                <Badge variant="muted" className="text-xs">
                  Locked
                </Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ModeSelector;
