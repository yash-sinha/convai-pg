
import OrganizationCard from "@/components/organization/OrganizationCard";
import ProjectCard from "@/components/project/ProjectCard";
import CharacterCard from "@/components/character/CharacterCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

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

const characters = [
  { name: "Captain", persona: "Bold" },
  { name: "Navigator", persona: "Wise" },
  { name: "Scientist", persona: "Curious" },
  { name: "Android", persona: "Logical" }
];

const Index = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Button className="bg-green-700 hover:bg-green-800 text-white">
          <PlusIcon className="mr-2 h-4 w-4" /> Create a new character
        </Button>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Characters</h2>
          <Link to="/characters" className="text-green-700 hover:text-green-800">
            See all characters →
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard 
              key={character.name}
              name={character.name}
              persona={character.persona}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Organization Dashboard</h2>
        <OrganizationCard name={organization.name} members={organization.members} />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Projects Overview</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

      <div>
        <h2 className="text-xl font-semibold mb-4">Sample Characters</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {characters.slice(0, 2).map((character, index) => (
            <CharacterCard 
              key={`sample-${index}`}
              name={`Sample ${character.name}`}
              persona={character.persona}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
