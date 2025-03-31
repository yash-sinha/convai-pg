
import ProjectCard from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "Sci-Fi NPCs", billingPlan: "Pro Tier", characters: 5 },
  { name: "Fantasy NPCs", billingPlan: "Free Tier", characters: 3 },
  { name: "Historical Figures", billingPlan: "Pro Tier", characters: 8 },
  { name: "Customer Support Bots", billingPlan: "Enterprise Tier", characters: 12 }
];

const Projects = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <Button>Create Project</Button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard 
            key={project.name}
            name={project.name}
            billingPlan={project.billingPlan}
            characters={project.characters}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
