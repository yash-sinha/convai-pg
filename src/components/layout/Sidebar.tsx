
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  CreditCard, 
  Settings,
  PlusCircle,
  VideoIcon
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, active }: SidebarItemProps) => (
  <Link 
    to={path}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-green-700/50",
      active ? "bg-green-700/50 text-white font-medium" : "text-white/80"
    )}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex h-full w-64 flex-col bg-green-900">
      {/* Logo area */}
      <div className="p-4 border-b border-green-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-white text-2xl font-bold">convai</div>
        </Link>
      </div>

      {/* Main navigation */}
      <div className="flex flex-col gap-1 p-4">
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          path="/" 
          active={location.pathname === "/"}
        />
      </div>

      {/* Character's Mind Section */}
      <div className="px-4 pt-6 pb-2">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider">Character's Mind</h3>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <SidebarItem 
          icon={Users} 
          label="My Characters" 
          path="/characters" 
          active={location.pathname === "/characters"}
        />
        <SidebarItem 
          icon={PlusCircle} 
          label="Create Character" 
          path="/characters/create" 
          active={location.pathname === "/characters/create"}
        />
      </div>

      {/* Spatial Experiences Section */}
      <div className="px-4 pt-6 pb-2">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider">Spatial Experiences</h3>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <SidebarItem 
          icon={VideoIcon} 
          label="My Experiences" 
          path="/experiences" 
          active={location.pathname === "/experiences"}
        />
      </div>

      {/* Original sidebar items at bottom (can be removed later) */}
      <div className="mt-auto px-4 pt-6 pb-2">
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider">Management</h3>
      </div>
      <div className="flex flex-col gap-1 px-4 mb-4">
        <SidebarItem 
          icon={FolderKanban} 
          label="Projects" 
          path="/projects" 
          active={location.pathname.startsWith("/projects")}
        />
        <SidebarItem 
          icon={CreditCard} 
          label="Billing" 
          path="/billing" 
          active={location.pathname === "/billing"}
        />
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          path="/settings" 
          active={location.pathname === "/settings"}
        />
      </div>
    </div>
  );
};

export default Sidebar;
