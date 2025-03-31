
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

interface AccessRequestProps {
  user: string;
  accessType: string;
}

const AccessRequest = ({ user, accessType }: AccessRequestProps) => {
  const handleApprove = () => {
    toast.success(`Approved ${accessType} access for ${user}`);
  };
  
  const handleDeny = () => {
    toast.error(`Denied ${accessType} access for ${user}`);
  };

  return (
    <Card className="mb-3">
      <CardContent className="pt-6">
        <p className="text-sm">
          {user} requested <strong>{accessType}</strong> access
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={handleApprove}>
          <Check className="h-4 w-4 mr-1" /> Approve
        </Button>
        <Button variant="outline" size="sm" onClick={handleDeny}>
          <X className="h-4 w-4 mr-1" /> Deny
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccessRequest;
