
import OrganizationCard from "@/components/organization/OrganizationCard";
import ProjectCard from "@/components/project/ProjectCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const organization = {
  name: "Studio Alpha",
  members: [
    { name: "Alice", role: "Admin" },
    { name: "Bob", role: "Member" }
  ]
};

const projects = [
  { name: "Sci-Fi NPCs", billingPlan: "Pro Tier", characters: 5 },
  { name: "Fantasy NPCs", billingPlan: "Free Tier", characters: 3 }
];

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-4">Organization Dashboard</h1>
        <OrganizationCard name={organization.name} members={organization.members} />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Projects Overview</h2>
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
    </div>
  );
};

export default Index;
