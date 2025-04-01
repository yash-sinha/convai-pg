import { Button } from "@/components/ui/button";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { PlusIcon } from "lucide-react";
import CreateExperienceModal from "@/components/modals/CreateExperienceModal";
import { useState } from "react";

const Experiences = () => {
  const experiences = [
    {
      name: "Coffee Shop Chat",
      description: "A cozy conversation with a friendly barista who shares stories about their coffee journey and customer experiences.",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Tech Interview",
      description: "A technical interview simulation with a senior software engineer, focusing on problem-solving and coding challenges.",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Travel Guide",
      description: "An enthusiastic local guide sharing hidden gems and cultural insights about their city's most interesting spots.",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-200">My Experiences</h1>
          <Button 
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
            onClick={() => setCreateModalOpen(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Create new experience
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.name} {...experience} />
          ))}
        </div>
      </div>
      <CreateExperienceModal 
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
};

export default Experiences;
