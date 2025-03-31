import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, FolderPlus, ArrowUpRight, PencilLine } from "lucide-react";
import { useOrgStore } from "@/store/orgStore";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const planColors = {
  Free: "bg-gray-500",
  Indie: "bg-emerald-500",
  Scale: "bg-purple-500",
  Enterprise: "bg-blue-500"
} as const;

type Plan = keyof typeof planColors;

const Organizations = () => {
  const { organizations, projects, setSelectedOrg } = useOrgStore();
  const navigate = useNavigate();

  const handleOrgSettings = (orgId: string) => {
    setSelectedOrg(orgId);
    navigate("/org-settings");
  };

  const handleProjectSettings = (projectId: string) => {
    // TODO: Add setSelectedProject to store
    navigate("/project-settings");
  };

  const getCharacterCount = (projectId: string) => {
    // This would normally come from a characters store
    return Math.floor(Math.random() * 10) + 1; // Mock data
  };

  const getProjectPlan = (projectId: string): Plan => {
    // This would normally come from a subscription store
    const plans: Plan[] = ["Free", "Indie", "Scale", "Enterprise"];
    return plans[Math.floor(Math.random() * plans.length)]; // Mock data
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-emerald-400">Organizations</h1>
            <p className="text-gray-500 mt-1">Manage your organizations and projects</p>
          </div>
          <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2 text-white">
            <span>+</span>
            New Organization
          </Button>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 gap-6">
          {organizations.map((org) => (
            <Card
              key={org.id}
              className="p-6 bg-black/20 border-neutral-800/30"
            >
              <div className="space-y-6">
                {/* Org Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-200">{org.name}</h3>
                        <p className="text-sm text-gray-500">{projects.filter(p => p.orgId === org.id).length} projects</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-emerald-400 hover:bg-emerald-500/10"
                    onClick={() => handleOrgSettings(org.id)}
                  >
                    Settings
                  </Button>
                </div>

                {/* Projects List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-200">Projects</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <FolderPlus className="h-4 w-4 mr-1" />
                      New Project
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {projects
                      .filter(project => project.orgId === org.id)
                      .map(project => (
                        <div 
                          key={project.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-neutral-800/30 hover:border-neutral-800/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-md bg-gray-800/50 flex items-center justify-center">
                              <FolderPlus className="h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-200">{project.name}</h4>
                              <p className="text-xs text-gray-500 mt-0.5">{getCharacterCount(project.id)} characters</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={cn("px-2 py-0.5 text-xs", planColors[getProjectPlan(project.id)])}>
                              {getProjectPlan(project.id)}
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 rounded-md hover:bg-emerald-500/10 text-emerald-400"
                              onClick={() => handleProjectSettings(project.id)}
                            >
                              <PencilLine className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organizations;
