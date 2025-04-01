import { Button } from "@/components/ui/button";
import CharacterCard from "@/components/character/CharacterCard";
import { PlusIcon } from "lucide-react";

const Characters = () => {
  const characters = [
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
    },
    {
      name: "Ross Geller",
      persona: "Academic",
      description: "A paleontologist with a passion for dinosaurs and academia. Known for his intellectual approach to life and sometimes complex relationships.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Ross&backgroundColor=0B1120"
    },
    {
      name: "Chandler Bing",
      persona: "Humorous",
      description: "The king of sarcasm and wit, using humor as his shield. A data analyst by day, but always ready with a quick joke or clever comment.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Chandler&backgroundColor=0B1120"
    },
    {
      name: "Rachel Green",
      persona: "Fashionable",
      description: "A fashion enthusiast who transformed from a privileged background to a successful career woman. Known for her style and determination.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Rachel&backgroundColor=0B1120"
    },
    {
      name: "Phoebe Buffay",
      persona: "Eccentric",
      description: "A free-spirited masseuse with a unique worldview. Her quirky personality and original songs bring joy to those around her.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Phoebe&backgroundColor=0B1120"
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto p-8 bg-gray-950 min-h-screen">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-200">My Characters</h1>
          <Button 
            className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Create new character
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters.map((character) => (
            <CharacterCard key={character.name} {...character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
