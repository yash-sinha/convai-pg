
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectBreadcrumb from "@/components/project/ProjectBreadcrumb";
import CharacterCard from "@/components/character/CharacterCard";
import AccessRequest from "@/components/project/AccessRequest";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the project - would normally come from an API
const getProjectData = (projectId: string) => {
  const projectMap = {
    'sci-fi-npcs': {
      name: 'Sci-Fi NPCs',
      organizationName: 'Studio Alpha',
      billingPlan: 'Pro Tier',
      characters: [
        { name: 'Captain', persona: 'Bold' },
        { name: 'Navigator', persona: 'Wise' },
        { name: 'Engineer', persona: 'Resourceful' }
      ],
      accessRequests: [
        { user: 'Bob', accessType: 'Editor' },
        { user: 'Jane', accessType: 'Viewer' }
      ]
    },
    'fantasy-npcs': {
      name: 'Fantasy NPCs',
      organizationName: 'Studio Alpha',
      billingPlan: 'Free Tier',
      characters: [
        { name: 'Wizard', persona: 'Mysterious' },
        { name: 'Knight', persona: 'Honorable' }
      ],
      accessRequests: [
        { user: 'Charlie', accessType: 'Editor' }
      ]
    },
    'historical-figures': {
      name: 'Historical Figures',
      organizationName: 'Studio Alpha',
      billingPlan: 'Pro Tier',
      characters: [
        { name: 'Explorer', persona: 'Adventurous' },
        { name: 'Inventor', persona: 'Creative' }
      ],
      accessRequests: []
    },
    'customer-support-bots': {
      name: 'Customer Support Bots',
      organizationName: 'Indie Games',
      billingPlan: 'Enterprise Tier',
      characters: [
        { name: 'Support Bot', persona: 'Helpful' },
        { name: 'FAQ Bot', persona: 'Informative' }
      ],
      accessRequests: [
        { user: 'Diana', accessType: 'Admin' }
      ]
    }
  };
  
  // Convert hyphenated ID to project key format
  const normalizedId = projectId.toLowerCase();
  
  // Return the project or a default empty project
  return projectMap[normalizedId as keyof typeof projectMap] || {
    name: 'Unknown Project',
    organizationName: 'Unknown Org',
    billingPlan: 'Unknown',
    characters: [],
    accessRequests: []
  };
};

const ProjectManagement = () => {
  const { projectId = '' } = useParams<{ projectId: string }>();
  const project = getProjectData(projectId);

  return (
    <div>
      <ProjectBreadcrumb 
        organizationName={project.organizationName} 
        projectName={project.name}
      />
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project: {project.name}</CardTitle>
          <CardDescription>Billing: {project.billingPlan}</CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="access">Access Requests</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Project Name: {project.name}</p>
              <p>Organization: {project.organizationName}</p>
              <p>Billing Plan: {project.billingPlan}</p>
              <p>Total Characters: {project.characters.length}</p>
              <p>Pending Access Requests: {project.accessRequests.length}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="characters" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.characters.map((character) => (
              <CharacterCard 
                key={character.name} 
                name={character.name} 
                persona={character.persona} 
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Current Plan: {project.billingPlan}</p>
              <p>Billing Cycle: Monthly</p>
              <p>Next Invoice: June 1, 2023</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access" className="mt-6">
          <div className="space-y-4">
            {project.accessRequests.length > 0 ? (
              project.accessRequests.map((request, index) => (
                <AccessRequest 
                  key={`${request.user}-${index}`} 
                  user={request.user} 
                  accessType={request.accessType} 
                />
              ))
            ) : (
              <p>No pending access requests.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Project Name: {project.name}</p>
              <p>Project ID: {projectId}</p>
              <p>Created: January 15, 2023</p>
              <p>Last Modified: May 20, 2023</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;
