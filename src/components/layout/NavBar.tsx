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
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useOrgStore } from "@/store/orgStore";
import { ChevronDown, Building2, User, LogOut, Folder } from "lucide-react";

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

  return (
    <div className="w-full border-b border-neutral-800/20 bg-black">
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
              className="flex items-center space-x-2 px-2 hover:bg-neutral-800/30"
            >
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-gray-200">
                {selectedOrg?.name || "Select Organization"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-900/90 backdrop-blur-sm border-neutral-800/30 rounded-lg">
            {organizations.map((org) => (
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
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Project Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="ml-2 flex items-center space-x-2 px-2 hover:bg-neutral-800/30"
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
                        "border-blue-500 text-blue-500": selectedProject.tier === "Pro",
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
          <DropdownMenuContent align="end" className="w-72 bg-gray-900/90 backdrop-blur-sm border-neutral-800/30 rounded-lg">
            {filteredProjects.map((project) => (
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
                      "border-blue-500 text-blue-500": project.tier === "Pro",
                      "border-purple-500 text-purple-500": project.tier === "Enterprise"
                    }
                  )}
                >
                  {project.tier}
                </Badge>
              </DropdownMenuItem>
            ))}
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
          <DropdownMenuContent align="end" className="w-56 bg-black border-neutral-800/30 rounded-lg">
            <DropdownMenuLabel className="text-gray-400">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-gray-200">John Doe</p>
                <p className="text-xs leading-none">john@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-800/30" />
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
