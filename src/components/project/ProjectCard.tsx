
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  name: string;
  billingPlan: string;
  characters: number;
}

const ProjectCard = ({ name, billingPlan, characters }: ProjectCardProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Project: {name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1">
          <p className="text-sm">Billing Plan: {billingPlan}</p>
          <p className="text-sm">Characters: {characters}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">Manage Project</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
