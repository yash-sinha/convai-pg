
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Video } from "lucide-react";
import { toast } from "sonner";

interface CharacterCardProps {
  name: string;
  persona: string;
}

const CharacterCard = ({ name, persona }: CharacterCardProps) => {
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
    <Card className="overflow-hidden border-green-100 hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-green-700 to-green-600 h-3"></div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-green-800">{name}</CardTitle>
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full bg-green-100 text-green-700 hover:text-green-900 hover:bg-green-200">
            <Video className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600">Persona: {persona}</p>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {persona === "Bold" 
            ? "A confident character who never backs down from a challenge."
            : persona === "Wise" 
              ? "An experienced character with deep knowledge and patience."
              : "A unique character with special traits and abilities."}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t border-green-50">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={handleEdit} className="text-green-700 hover:text-green-900 hover:bg-green-50 px-2">
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
