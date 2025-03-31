
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
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

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Name: {name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">Persona: {persona}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-1" /> Edit
        </Button>
        <Button variant="outline" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
