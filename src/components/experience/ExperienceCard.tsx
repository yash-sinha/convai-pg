import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Play, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ExperienceCardProps {
  name: string;
  description: string;
  imageUrl?: string;
}

const ExperienceCard = ({ name, description, imageUrl }: ExperienceCardProps) => {
  const handleEdit = () => {
    toast.info(`Editing experience: ${name}`);
  };
  
  const handleDelete = () => {
    toast.warning(`Deleting experience: ${name}`);
  };
  
  const handleStart = () => {
    toast.success(`Starting experience: ${name}`);
  };

  return (
    <Card className="overflow-hidden border-gray-800 bg-[#111827] hover:bg-[#1a2234] transition-all">
      <div className="relative h-40">
        <img 
          src={imageUrl || "https://placehold.co/400x200/0B1120/ffffff?text=Experience"} 
          alt={name}
          className="w-full h-full object-cover opacity-90"
        />
        <Button 
          size="icon" 
          variant="default" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-emerald-500/90 hover:bg-emerald-600 text-white"
          onClick={handleStart}
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-emerald-400">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t border-gray-800">
        <div className="flex gap-1">
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
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;
