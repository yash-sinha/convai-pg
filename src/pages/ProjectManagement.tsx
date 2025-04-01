import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectBreadcrumb from "@/components/project/ProjectBreadcrumb";
import CharacterCard from "@/components/character/CharacterCard";
import AccessRequest from "@/components/project/AccessRequest";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <ProjectBreadcrumb 
            organizationName={project.organizationName} 
            projectName={project.name}
          />
          <h1 className="text-3xl font-bold mt-2 text-green-800">{project.name}</h1>
        </div>
        <Button className="bg-green-700 hover:bg-green-800">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Character
        </Button>
      </div>
      
      <Card className="mb-6 border-green-100 bg-green-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-green-800">Project Overview</CardTitle>
          <CardDescription className="text-green-700">Billing Plan: {project.billingPlan}</CardDescription>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="overview" className="mt-2">
        <TabsList className="bg-green-100/50 p-0.5">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-green-800">Overview</TabsTrigger>
          <TabsTrigger value="characters" className="data-[state=active]:bg-white data-[state=active]:text-green-800">Characters</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-white data-[state=active]:text-green-800">Billing</TabsTrigger>
          <TabsTrigger value="access" className="data-[state=active]:bg-white data-[state=active]:text-green-800">Access Requests</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-green-800">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-green-800">Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Project Name:</span> {project.name}</p>
                <p><span className="font-medium">Organization:</span> {project.organizationName}</p>
                <p><span className="font-medium">Billing Plan:</span> {project.billingPlan}</p>
                <p><span className="font-medium">Total Characters:</span> {project.characters.length}</p>
                <p><span className="font-medium">Pending Access Requests:</span> {project.accessRequests.length}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="characters" className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Project Characters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <Card className="border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-green-800">Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="font-medium">Current Plan:</span> {project.billingPlan}</p>
                <p><span className="font-medium">Billing Cycle:</span> Monthly</p>
                <p><span className="font-medium">Next Invoice:</span> June 1, 2023</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="access" className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Pending Access Requests</h2>
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
              <p className="text-gray-600">No pending access requests.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <Card className="p-6 bg-black/20 border-neutral-800/30">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">Project Settings</h3>
                <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-200">Project Name</h3>
                      <Input
                        id="projectName"
                        value={project.name}
                        className="bg-black/40 border-neutral-800 text-gray-200 h-10"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-200">Project ID</h3>
                      <Input
                        id="projectId"
                        value={projectId}
                        className="bg-black/40 border-neutral-800 text-gray-200 h-10"
                        disabled
                      />
                      <p className="text-xs text-gray-400">Project ID cannot be changed after creation.</p>
                    </div>
                    <div className="pt-2">
                      <Button className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">Danger Zone</h3>
                <Card className="p-6 bg-red-950/20 border-red-500/20 rounded-xl hover:border-red-500/30 transition-colors">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-200">Delete Project</h4>
                      <p className="text-sm text-gray-400 mt-1">Once you delete a project, there is no going back. Please be certain.</p>
                    </div>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                      Delete Project
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;
