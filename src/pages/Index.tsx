import { Button } from "@/components/ui/button";
import CharacterCard from "@/components/character/CharacterCard";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { ChevronRight, Plus, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CreateCharacterModal from "@/components/modals/CreateCharacterModal";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [createCharacterOpen, setCreateCharacterOpen] = useState(false);

  const recentCharacters = [
    {
      id: "monica",
      name: "Monica Geller",
      persona: "Perfectionist",
      description: "Monica Geller is a perfectionist with a passion for cooking. She's known for her competitive nature and obsession with cleanliness and organization.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Monica&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    },
    {
      id: "joey",
      name: "Joey Tribbiani",
      persona: "Charming",
      description: "You are the lovable and charming Joey Tribbiani, from New York. An aspiring actor with a big heart and an even bigger appetite.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Joey&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    },
    {
      id: "xyz",
      name: "xyz",
      persona: "Mysterious",
      description: "In the quaint town of Willow Creek, you are known as the enigmatic figure who appears at twilight, sharing cryptic wisdom.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=xyz&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    },
    {
      id: "flyona",
      name: "Flyona",
      persona: "Ambitious",
      description: "You are Flyona or Fly Gull, who was propelled to success by her determination and wit in the competitive world of journalism.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Flyona&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    },
    {
      id: "phoebe",
      name: "Phoebe Buffay",
      persona: "Eccentric",
      description: "A free-spirited masseuse with a unique worldview. Her quirky personality and original songs bring joy to those around her.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Phoebe&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    }
  ];

  const sampleCharacters = [
    {
      id: "sample1",
      name: "Customer Support Agent",
      persona: "Professional",
      description: "A friendly and professional customer service representative trained to handle inquiries and resolve issues.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=CustomerSupport&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    },
    {
      id: "sample2",
      name: "Sales Representative",
      persona: "Persuasive",
      description: "An experienced sales professional who can engage with potential customers and showcase products effectively.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=SalesRep&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    },
    {
      id: "sample3",
      name: "Technical Support",
      persona: "Expert",
      description: "A knowledgeable tech support specialist who can troubleshoot and resolve technical issues.",
      imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=TechSupport&backgroundColor=0B1120",
      lastModified: "2025-03-31T12:00:00Z"
    }
  ];

  const recentExperiences = [
    {
      id: "coffee-shop-chat",
      name: "Coffee Shop Chat",
      description: "A cozy conversation with a friendly barista who shares stories about their coffee journey and customer experiences.",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "tech-interview",
      name: "Tech Interview",
      description: "A technical interview simulation with a senior software engineer, focusing on problem-solving and coding challenges.",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "travel-guide",
      name: "Travel Guide",
      description: "An enthusiastic local guide sharing hidden gems and cultural insights about their city's most interesting spots.",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filteredCharacters = [...recentCharacters, ...sampleCharacters].filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    character.persona.toLowerCase().includes(searchQuery.toLowerCase()) ||
    character.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExperiences = recentExperiences.filter(experience =>
    experience.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    experience.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-8 space-y-16">
      {/* Hero Section */}
      <section className="relative mb-16 rounded-2xl overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-neutral-900/50 to-neutral-900" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-emerald-500/5 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-500/5 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative px-8 py-12 max-w-6xl mx-auto space-y-16">
          {/* Hero section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-100 mb-4">
              Welcome to your Dashboard
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Create and manage AI-powered characters and experiences for immersive, interactive storytelling.
            </p>

            {/* Search bar */}
            <div className="relative max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="Search across characters and experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 bg-black/50 backdrop-blur-xl text-white border-2 border-neutral-700/50 rounded-2xl pl-14 pr-14 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-all text-lg shadow-xl shadow-emerald-900/5 text-center placeholder:text-center placeholder:text-gray-300/70 hover:border-emerald-500/30 hover:shadow-emerald-500/20 hover:shadow-2xl group-hover:bg-emerald-950/20"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl group-hover:animate-pulse"/>
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-hover:text-emerald-400/70 transition-colors" />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-emerald-500/10 rounded-xl"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-emerald-400" />
                  </Button>
                )}
              </div>
              {/* Search results count with glow */}
              {searchQuery && (
                <div className="absolute -bottom-8 left-0 w-full text-center">
                  <p className="text-sm text-emerald-400/90 drop-shadow-[0_0_6px_rgba(16,185,129,0.2)]">
                    Found {filteredCharacters.length} characters matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>

            {/* Create buttons */}
            <div className="inline-flex gap-4 mx-auto">
              <Button
                onClick={() => setCreateCharacterOpen(true)}
                className="h-12 px-8 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300 font-medium backdrop-blur-sm"
              >
                <Plus className="h-5 w-5" />
                <span>New Character</span>
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 bg-black/30 backdrop-blur-sm border-neutral-700/50 text-gray-200 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                <span>New Experience</span>
              </Button>
            </div>
          </div>

          {/* Recent Characters Section */}
          {(!searchQuery || filteredCharacters.length > 0) && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-200">
                    {searchQuery ? 'Search Results' : 'Recent Characters'}
                  </h2>
                  <p className="text-gray-400">
                    {searchQuery 
                      ? `Found ${filteredCharacters.length} characters matching your search`
                      : 'Your recently created or modified characters'
                    }
                  </p>
                </div>
                {!searchQuery && (
                  <Link to="/characters">
                    <Button 
                      variant="outline"
                      className="bg-black/30 backdrop-blur-sm border-neutral-700/50 text-gray-200 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300"
                    >
                      See all characters <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {(searchQuery ? filteredCharacters : filteredCharacters.slice(0, 5))
                  .filter(char => !char.id.startsWith("sample"))
                  .map((character) => (
                    <CharacterCard
                      key={character.id}
                      name={character.name}
                      persona={character.persona}
                      description={character.description}
                      imageUrl={character.imageUrl}
                    />
                  ))}
              </div>
            </section>
          )}

          {/* Sample Characters Section */}
          {!searchQuery && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-200">Sample Characters</h2>
                  <p className="text-gray-400">Pre-built characters to help you get started</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filteredCharacters
                  .filter(char => char.id.startsWith("sample"))
                  .map((character) => (
                    <CharacterCard
                      key={character.id}
                      name={character.name}
                      persona={character.persona}
                      description={character.description}
                      imageUrl={character.imageUrl}
                    />
                  ))}
              </div>
            </section>
          )}
          
          {/* Recent Experiences Section */}
          {(!searchQuery || filteredExperiences.length > 0) && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-200">
                    {searchQuery ? 'Search Results' : 'Recent Experiences'}
                  </h2>
                  <p className="text-gray-400">
                    {searchQuery 
                      ? `Found ${filteredExperiences.length} experiences matching your search`
                      : 'Your recently created or modified experiences'
                    }
                  </p>
                </div>
                {!searchQuery && (
                  <Link to="/experiences">
                    <Button 
                      variant="outline"
                      className="bg-black/30 backdrop-blur-sm border-neutral-700/50 text-gray-200 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300"
                    >
                      See all experiences <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard key={experience.id} {...experience} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Create Character Modal */}
      <CreateCharacterModal 
        open={createCharacterOpen}
        onOpenChange={setCreateCharacterOpen}
      />
    </div>
  );
};

export default Index;
