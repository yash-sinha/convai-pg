import { Button } from "@/components/ui/button";
import CharacterCard from "@/components/character/CharacterCard";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const recentCharacters = [
    {
      name: "Monica Geller",
      persona: "Perfectionist",
      description: "Monica Geller is a perfectionist with a passion for cooking. She's known for her competitive nature and obsession with cleanliness and organization.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Monica&backgroundColor=0B1120"
    },
    {
      name: "Joey Tribbiani",
      persona: "Charming",
      description: "You are the lovable and charming Joey Tribbiani, from New York. An aspiring actor with a big heart and an even bigger appetite.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Joey&backgroundColor=0B1120"
    },
    {
      name: "xyz",
      persona: "Mysterious",
      description: "In the quaint town of Willow Creek, you are known as the enigmatic figure who appears at twilight, sharing cryptic wisdom.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=xyz&backgroundColor=0B1120"
    },
    {
      name: "Flyona",
      persona: "Ambitious",
      description: "You are Flyona or Fly Gull, who was propelled to success by her determination and wit in the competitive world of journalism.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Flyona&backgroundColor=0B1120"
    }
  ];

  const recentExperiences = [
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

  return (
    <div className="space-y-8 p-8 bg-gray-950 min-h-screen">
      {/* Recent Characters Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-400">Recent Characters</h2>
          <Link to="/characters">
            <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-[#1a2234]">
              See all characters <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentCharacters.map((character) => (
            <CharacterCard key={character.name} {...character} />
          ))}
        </div>
      </section>

      {/* Recent Experiences Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-400">Recent Experiences</h2>
          <Link to="/experiences">
            <Button variant="ghost" className="text-emerald-400 hover:text-emerald-300 hover:bg-[#1a2234]">
              See all experiences <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentExperiences.map((experience) => (
            <ExperienceCard key={experience.name} {...experience} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
