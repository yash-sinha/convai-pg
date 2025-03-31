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
    <Card className="overflow-hidden border-gray-800 bg-[#111827] hover:bg-[#1a2234] transition-all">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden bg-[#1a2234]">
          <img 
            src={imageUrl || `https://api.dicebear.com/7.x/avatars/svg?seed=${encodeURIComponent(name)}&backgroundColor=0B1120`} 
            alt={name}
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <Button 
          size="icon" 
          variant="default" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-emerald-500/90 hover:bg-emerald-600 text-white"
          onClick={handleStart}
        >
          <Video className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-emerald-400">{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium text-emerald-500 mb-2">
          {persona}
        </p>
        <p className="text-sm text-gray-400 line-clamp-3">
          {description || getDefaultDescription(persona)}
        </p>
        <div className="mt-4 flex justify-between border-t border-gray-800 pt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEdit} 
            className="text-emerald-400 hover:text-emerald-300 hover:bg-[#1a2234] px-2"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDelete} 
            className="text-red-400 hover:text-red-300 hover:bg-[#1a2234] px-2"
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

export default CharacterCard;
