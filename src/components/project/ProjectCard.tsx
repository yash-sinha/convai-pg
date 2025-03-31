
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  name: string;
  billingPlan: string;
  characters: number;
}

const ProjectCard = ({ name, billingPlan, characters }: ProjectCardProps) => {
  const navigate = useNavigate();
  
  const handleManageProject = () => {
    // For demo purposes, we'll use the project name as ID (in a real app, use actual IDs)
    const projectId = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/projects/${projectId}`);
  };

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
        <Button variant="outline" size="sm" onClick={handleManageProject}>Manage Project</Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
