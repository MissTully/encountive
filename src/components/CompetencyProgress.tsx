import { Progress } from "@/components/ui/progress";

interface CompetencyProgressProps {
  competencies: {
    name: string;
    score: number;
    maxScore: number;
  }[];
}

const CompetencyProgress = ({ competencies }: CompetencyProgressProps) => {
  return (
    <div className="space-y-4">
      {competencies.map((comp) => {
        const percentage = (comp.score / comp.maxScore) * 100;
        const getColor = () => {
          if (percentage >= 80) return "bg-success";
          if (percentage >= 60) return "bg-warning";
          return "bg-destructive";
        };

        return (
          <div key={comp.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{comp.name}</span>
              <span className="text-muted-foreground">
                {comp.score}/{comp.maxScore}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full transition-all duration-500 ease-out ${getColor()}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompetencyProgress;
