
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  CreditCard, 
  Settings 
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
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
      active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
    )}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Users, label: "Organizations", path: "/organizations" },
    { icon: FolderKanban, label: "Projects", path: "/projects" },
    { icon: CreditCard, label: "Billing", path: "/billing" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-background">
      <div className="flex flex-col gap-2 p-4">
        {sidebarItems.map((item) => (
          <SidebarItem 
            key={item.label}
            icon={item.icon} 
            label={item.label} 
            path={item.path} 
            active={location.pathname === item.path}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
