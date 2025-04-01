import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useOrgStore } from "@/store/orgStore";
import { ChevronDown, Building2, User, LogOut, Folder, Plus } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const {
    organizations,
    projects,
    selectedOrgId,
    selectedProjectId,
    setSelectedOrg,
    setSelectedProject,
  } = useOrgStore();
  const navigate = useNavigate();

  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const filteredProjects = projects.filter(proj => proj.orgId === selectedOrgId);
  const selectedProject = projects.find(proj => proj.id === selectedProjectId);
  const [orgSearch, setOrgSearch] = useState("");
  const [projectSearch, setProjectSearch] = useState("");

  const filteredOrgs = organizations.filter(org => 
    org.name.toLowerCase().includes(orgSearch.toLowerCase())
  );
  const searchedProjects = filteredProjects.filter(proj => 
    proj.name.toLowerCase().includes(projectSearch.toLowerCase())
  );

  return (
    <div className="w-full border-b border-neutral-900/20 bg-black">
      <div className="flex h-16 items-center px-4">
        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/documentation" className="text-gray-400 hover:text-emerald-400">
            Documentation
          </Link>
          <Link to="/videos" className="text-gray-400 hover:text-emerald-400">
            Videos
          </Link>
          <Link to="/plugins" className="text-gray-400 hover:text-emerald-400">
            Plugins
          </Link>
          <Link to="/pricing" className="text-gray-400 hover:text-emerald-400">
            Pricing
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-emerald-400">
            Contact
          </Link>
        </div>

        <div className="flex-1" />

        {/* Organization Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 px-2 hover:bg-neutral-900/30"
            >
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-gray-200">
                {selectedOrg?.name || "Select Organization"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-black border-neutral-800 rounded-lg shadow-lg">
            <div className="p-2 border-b border-neutral-800">
              <Input
                placeholder="Search organizations..."
                value={orgSearch}
                onChange={(e) => setOrgSearch(e.target.value)}
                className="h-8 bg-transparent text-gray-200 border-neutral-900 focus:ring-emerald-500/30"
              />
            </div>
            <div className="py-2">
              {filteredOrgs.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => setSelectedOrg(org.id)}
                  className={cn(
                    "flex items-center space-x-2 text-gray-200 rounded-md mx-1 my-0.5",
                    selectedOrgId === org.id && "bg-emerald-500/10 text-emerald-400"
                  )}
                >
                  <Building2 className="h-4 w-4" />
                  <span>{org.name}</span>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="p-2 border-t border-neutral-800">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => navigate("/org-settings")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Organization
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Project Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="ml-2 flex items-center space-x-2 px-2 hover:bg-neutral-900/30"
              disabled={!selectedOrgId}
            >
              {selectedProject ? (
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20">
                    <Folder className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-gray-200">
                    {selectedProject.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      {
                        "border-neutral-500 text-neutral-500": selectedProject.tier === "Free",
                        "border-emerald-500 text-emerald-400": selectedProject.tier === "Pro",
                        "border-purple-500 text-purple-500": selectedProject.tier === "Enterprise"
                      }
                    )}
                  >
                    {selectedProject.tier}
                  </Badge>
                  <ChevronDown className="h-4 w-4 text-gray-200" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20">
                    <Folder className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-gray-400">Select Project</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-black border-neutral-800 rounded-lg shadow-lg">
            <div className="p-2 border-b border-neutral-800">
              <Input
                placeholder="Search projects..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="h-8 bg-transparent text-gray-200 border-neutral-900 focus:ring-emerald-500/30"
              />
            </div>
            <div className="py-2">
              {searchedProjects.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={cn(
                    "flex items-center justify-between text-gray-200 rounded-md mx-1 my-0.5",
                    selectedProjectId === project.id && "bg-emerald-500/10 text-emerald-400"
                  )}
                >
                  <span>{project.name}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      {
                        "border-neutral-500 text-neutral-500": project.tier === "Free",
                        "border-emerald-500 text-emerald-400": project.tier === "Pro",
                        "border-purple-500 text-purple-500": project.tier === "Enterprise"
                      }
                    )}
                  >
                    {project.tier}
                  </Badge>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="p-2 border-t border-neutral-800">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-emerald-400 hover:bg-emerald-500/10"
                disabled={!selectedOrgId}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-8 w-8 rounded-full ring-offset-black transition-all hover:ring-2 hover:ring-emerald-500/30 hover:ring-offset-2 overflow-hidden p-0"
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
              className="text-gray-200 rounded-md mx-1 my-0.5 focus:bg-emerald-500/10 focus:text-emerald-400"
              onClick={() => navigate("/org-settings")}
            >
              <Building2 className="mr-2 h-4 w-4" />
              <span>Manage Organizations</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400 rounded-md mx-1 my-0.5 focus:bg-red-500/10 focus:text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavBar;
