import { CheckCircle2, Circle, Lock, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Scenario {
  id: number;
  label: string;
  type: string;
  systolic: number;
  diastolic: number;
  status: "locked" | "available" | "completed";
}

interface ScenarioListProps {
  scenarios: Scenario[];
  activeScenario?: number;
  onSelect?: (id: number) => void;
}

const ScenarioList = ({ scenarios, activeScenario, onSelect }: ScenarioListProps) => {
  return (
    <Card variant="glass">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Auscultation Scenarios
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Complete all 7 scenarios to unlock evaluation mode
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenario;
          const isLocked = scenario.status === "locked";
          const isCompleted = scenario.status === "completed";

          return (
            <button
              key={scenario.id}
              onClick={() => !isLocked && onSelect?.(scenario.id)}
              disabled={isLocked}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200
                ${isActive
                  ? "bg-primary/10 border border-primary/30"
                  : isLocked
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-muted/50 border border-transparent"
                }
              `}
            >
              <div className="shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : isLocked ? (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Circle className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"}`}>
                  {scenario.label}
                </p>
                <p className="text-xs text-muted-foreground">{scenario.type}</p>
              </div>
              <Badge
                variant={isCompleted ? "success" : isActive ? "default" : "muted"}
                className="text-xs shrink-0"
              >
                {scenario.systolic}/{scenario.diastolic}
              </Badge>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ScenarioList;
