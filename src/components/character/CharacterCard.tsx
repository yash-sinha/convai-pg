import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Video } from "lucide-react";
import { toast } from "sonner";

interface CharacterCardProps {
  name: string;
  persona: string;
  description?: string;
  imageUrl?: string;
}

const CharacterCard = ({ name, persona, description, imageUrl }: CharacterCardProps) => {
  const handleEdit = () => {
    toast.info(`Editing character: ${name}`);
  };
  
  const handleDelete = () => {
    toast.warning(`Deleting character: ${name}`);
  };
  
  const handleStart = () => {
    toast.success(`Starting conversation with ${name}`);
  };

  return (
    <Card className="overflow-hidden border-neutral-800 bg-neutral-900/50 hover:bg-emerald-900/10 hover:border-emerald-700/20 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
          {/* Scene background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${getSceneForPersona(persona)})`,
              filter: 'blur(2px)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/50 to-neutral-900 opacity-80" />
          
          {/* Character avatar */}
          <img 
            src={imageUrl || `https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(name)}&backgroundColor=0B1120`} 
            alt={name}
            className="w-full h-full object-cover relative z-10"
          />
        </div>
        <Button 
          size="icon" 
          variant="default" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-emerald-500/90 hover:bg-emerald-600 text-white z-20"
          onClick={handleStart}
        >
          <Video className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-200">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium text-gray-300 mb-2">
          {persona}
        </p>
        <p className="text-sm text-gray-400 line-clamp-3">
          {description || getDefaultDescription(persona)}
        </p>
        <div className="mt-4 flex justify-between border-t border-neutral-800 pt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEdit} 
            className="text-gray-300 hover:text-gray-200 hover:bg-neutral-800/50 px-2"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDelete} 
            className="text-red-400 hover:text-red-300 hover:bg-neutral-800/50 px-2"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const getDefaultDescription = (persona: string) => {
  switch (persona) {
    case "Perfectionist":
      return "A detail-oriented individual who strives for excellence in everything they do. Known for their organizational skills and high standards.";
    case "Charming":
      return "A charismatic personality who easily connects with others. Their warmth and humor make them instantly likeable.";
    case "Mysterious":
      return "An enigmatic character whose true nature remains intriguing. Their past and motivations are subjects of curiosity.";
    case "Ambitious":
      return "A driven individual with clear goals and the determination to achieve them. Always looking for opportunities to grow.";
    default:
      return "A unique character with their own special traits and perspective on the world.";
  }
};

const getSceneForPersona = (persona: string) => {
  switch (persona.toLowerCase()) {
    case 'perfectionist':
      return 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80'; // Clean kitchen
    case 'charming':
      return 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80'; // Cozy cafe
    case 'mysterious':
      return 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=800&q=80'; // Foggy street
    case 'ambitious':
      return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'; // Modern office
    case 'academic':
      return 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80'; // Library
    case 'humorous':
      return 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'; // Comedy club
    case 'fashionable':
      return 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80'; // Fashion boutique
    case 'eccentric':
      return 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80'; // Colorful art studio
    default:
      return 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80'; // Generic cozy room
  }
};

export default CharacterCard;
