
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrganizationCardProps {
  name: string;
  members: Array<{ name: string; role: string }>;
}

const OrganizationCard = ({ name, members }: OrganizationCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Org: {name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            - Members: {members.map((member, index) => (
              <span key={member.name}>
                {member.name} ({member.role})
                {index < members.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Manage Org</Button>
          <Button size="sm">Create New</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
