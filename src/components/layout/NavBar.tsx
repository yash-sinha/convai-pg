import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useOrgStore } from "@/store/orgStore";
import { Project, ProjectTier } from "@/types/project";
import { ChevronDown, Building2, User, LogOut, Folder, Plus, Trash2, Settings } from "lucide-react";
import { useState } from "react";
import { CreateOrgDialog } from "@/components/dialogs/CreateOrgDialog";
import { CreateProjectModal } from "@/components/modals/CreateProjectModal";

const NavBar = () => {
  const {
    organizations,
    projects,
    selectedOrgId,
    selectedProjectId,
    setSelectedOrg,
    setSelectedProject,
    setProjects,
  } = useOrgStore();
  const navigate = useNavigate();

  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const filteredProjects = projects.filter(proj => proj.orgId === selectedOrgId);
  const selectedProject = projects.find(proj => proj.id === selectedProjectId);
  const [orgSearch, setOrgSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");
  const [createOrgOpen, setCreateOrgOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const filteredOrgs = organizations.filter(org => 
    org.name.toLowerCase().includes(orgSearch.toLowerCase())
  );
  const searchedProjects = filteredProjects.filter(proj => 
    proj.name.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const handleCreateOrg = (name: string) => {
    console.log("Creating org:", name);
    // Add org to store
    const newOrg = {
      id: Math.random().toString(),
      name,
    };
    useOrgStore.getState().addOrg(newOrg);
    useOrgStore.getState().setSelectedOrg(newOrg.id);
  };

  const handleCreateOrgClick = () => {
    setOrgDropdownOpen(false); 
    setCreateOrgOpen(true); 
  };

  return (
    <>
      <nav className="fixed top-0 left-[240px] right-0 z-50 h-16 border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-neutral-800/50">
        <div className="flex h-14 items-center justify-between px-4 gap-4">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-4">
            <Link to="/documentation" className="text-sm text-gray-400 hover:text-emerald-400">
              Documentation
            </Link>
            <Link to="/videos" className="text-sm text-gray-400 hover:text-emerald-400">
              Videos
            </Link>
            <Link to="/plugins" className="text-sm text-gray-400 hover:text-emerald-400">
              Plugins
            </Link>
            <Link to="/pricing" className="text-sm text-gray-400 hover:text-emerald-400">
              Pricing
            </Link>
            <Link to="/contact" className="text-sm text-gray-400 hover:text-emerald-400">
              Contact
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Organization Dropdown */}
            <DropdownMenu open={orgDropdownOpen} onOpenChange={setOrgDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-sm font-normal hover:bg-neutral-800/50 px-3 h-10 flex items-center"
                >
                  <Building2 className="w-4 h-4 mr-2 text-emerald-400" />
                  <span className="text-sm text-white">
                    {selectedOrg?.name || "Select Organization"}
                  </span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[300px] bg-black border-neutral-800">
                <DropdownMenuLabel className="text-sm font-medium text-gray-400">Organizations</DropdownMenuLabel>
                <Input
                  placeholder="Search organizations..."
                  value={orgSearch}
                  onChange={(e) => setOrgSearch(e.target.value)}
                  className="h-9 bg-transparent text-gray-200 border-neutral-800 focus:ring-0 focus:border-emerald-500/30 my-2 text-sm"
                />
                {filteredOrgs.map((org) => (
                  <DropdownMenuItem
                    key={org.id}
                    className="text-sm font-normal group flex items-center text-gray-200 bg-transparent hover:bg-neutral-800/50 focus:bg-neutral-800/50 data-[highlighted]:bg-neutral-800/50"
                    onClick={() => {
                      setSelectedOrg(org.id);
                      setSelectedProject(null);
                      setOrgDropdownOpen(false);
                      // If we're on the settings page, navigate to the new org's settings
                      if (window.location.pathname.includes('/org-settings/')) {
                        navigate(`/org-settings/${org.id}`);
                      }
                    }}
                  >
                    <div className="flex-1 text-left text-gray-200 flex items-center">
                      <Building2 className="w-4 h-4 mr-2 text-emerald-400" />
                      {org.name}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-emerald-500/10 text-emerald-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/org-settings/${org.id}`);
                        setOrgDropdownOpen(false);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-neutral-800" />
                <button
                  onClick={handleCreateOrgClick}
                  className="w-full text-left text-sm font-normal text-gray-200 bg-transparent hover:bg-neutral-800/50 px-2 py-1.5 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Organization
                </button>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Project Dropdown */}
            {selectedOrgId && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="ml-2 text-sm font-normal hover:bg-neutral-800/50 px-3 h-10 flex items-center"
                  >
                    <Folder className="w-4 h-4 mr-2 text-emerald-400" />
                    <div className="flex items-center text-white">
                      {selectedProject?.name || "Select Project"}
                      {selectedProject?.tier && (
                        <Badge
                          variant="outline"
                          className={cn(
                            "ml-2 text-xs",
                            {
                              "border-neutral-400/50 bg-neutral-400/10 text-neutral-300": selectedProject.tier === "Free",
                              "border-emerald-400/50 bg-emerald-400/10 text-emerald-300": selectedProject.tier === "Pro",
                              "border-violet-400/50 bg-violet-400/10 text-violet-300": selectedProject.tier === "Enterprise"
                            }
                          )}
                        >
                          {selectedProject.tier}
                        </Badge>
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[300px] bg-black border-neutral-800">
                  <DropdownMenuLabel className="text-sm font-medium text-gray-400">Projects</DropdownMenuLabel>
                  <Input
                    placeholder="Search projects..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="h-9 bg-transparent text-gray-200 border-neutral-800 focus:ring-0 focus:border-emerald-500/30 my-2 text-sm"
                  />
                  {searchedProjects.map((project) => (
                    <DropdownMenuItem
                      key={project.id}
                      className="text-sm font-normal group flex items-center text-gray-200 bg-transparent hover:bg-neutral-800/50 focus:bg-neutral-800/50 data-[highlighted]:bg-neutral-800/50"
                    >
                      <button
                        onClick={() => setSelectedProject(project.id)}
                        className="flex-1 text-left text-gray-200 flex items-center"
                      >
                        <Folder className="w-4 h-4 mr-2 text-emerald-400" />
                        {project.name}
                        {project.tier && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "ml-2 text-xs",
                              {
                                "border-neutral-400/50 bg-neutral-400/10 text-neutral-300": project.tier === "Free",
                                "border-emerald-400/50 bg-emerald-400/10 text-emerald-300": project.tier === "Pro",
                                "border-violet-400/50 bg-violet-400/10 text-violet-300": project.tier === "Enterprise"
                              }
                            )}
                          >
                            {project.tier}
                          </Badge>
                        )}
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-emerald-500/10 text-emerald-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project-settings/${project.id}`);
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="bg-neutral-800" />
                  <DropdownMenuItem
                    className="w-full text-left text-sm font-normal text-gray-200 bg-transparent hover:bg-neutral-800/50 px-2 py-1.5 flex items-center"
                    onClick={() => setCreateProjectOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 rounded-full ring-offset-black transition-all hover:ring-2 hover:ring-emerald-500/30 hover:ring-offset-2 overflow-hidden p-0 ml-2"
                >
                  <img
                    src="/images/avatar.jpg"
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black border-neutral-800 rounded-lg shadow-lg">
                <DropdownMenuLabel className="text-gray-400">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-gray-200">John Doe</p>
                    <p className="text-xs leading-none">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-800" />
                <DropdownMenuItem 
                  className="text-gray-200 rounded-md mx-1 my-0.5 focus:bg-emerald-500/10 focus:text-emerald-400 bg-transparent hover:bg-neutral-800/50 focus:bg-neutral-800/50 data-[highlighted]:bg-neutral-800/50"
                  onClick={() => navigate("/org-settings")}
                >
                  <Building2 className="mr-2 h-4 w-4 text-emerald-400" />
                  <span>Manage Organizations</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 rounded-md mx-1 my-0.5 focus:bg-red-500/10 focus:text-red-400 bg-transparent hover:bg-neutral-800/50 focus:bg-neutral-800/50 data-[highlighted]:bg-neutral-800/50">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <CreateOrgDialog
        open={createOrgOpen}
        onOpenChange={setCreateOrgOpen}
        onSubmit={handleCreateOrg}
      />
      <CreateProjectModal
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
        onSubmit={({ name, tier }) => {
          const newProject: Project = {
            id: String(projects.length + 1),
            name,
            tier,
            orgId: selectedOrgId!,
            visibility: "Private" as const,
            members: [],
            createdDate: new Date().toISOString(),
          };
          setProjects([...projects, newProject]);
          setSelectedProject(newProject.id);
          setProjectDropdownOpen(false);
        }}
      />
    </>
  );
};

export default NavBar;
