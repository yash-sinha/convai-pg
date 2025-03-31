import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, active }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "relative flex items-center px-3 h-10 rounded-lg transition-all",
        "hover:bg-emerald-500/10 hover:text-emerald-400",
        active 
          ? "text-emerald-400 bg-emerald-500/10" 
          : "text-gray-500 hover:text-emerald-400"
      )}
      title={label}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="ml-3 text-sm">{label}</span>
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald-400 rounded-full" />
      )}
    </Link>
  );
};

export default SidebarItem;
