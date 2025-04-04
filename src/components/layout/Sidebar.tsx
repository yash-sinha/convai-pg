import { cn } from "@/lib/utils";
import {
  BarChart,
  Building2,
  Command,
  CreditCard,
  FileText,
  Settings,
  Sparkles,
  Users,
  Key,
  UserSquare2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useOrgStore } from "@/store/orgStore";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Building2,
  },
  {
    name: "Characters",
    href: "/characters",
    icon: UserSquare2,
  },
  {
    name: "Templates",
    href: "/templates",
    icon: FileText,
  },
  {
    name: "Experiences",
    href: "/experiences",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
  {
    name: "Knowledge Bank",
    href: "/knowledge-bank",
    icon: FileText,
  },
  {
    name: "API Keys",
    href: "/api-keys",
    icon: Key,
  },
  {
    name: "Billing",
    href: null, // We'll compute this dynamically for billing
    icon: CreditCard,
  },
  {
    name: "Manage Project",
    href: null, // We'll compute this dynamically for project settings
    icon: Settings,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { selectedProjectId } = useOrgStore();

  return (
    <aside className="fixed inset-y-0 z-50 flex w-60 flex-col bg-black">
      <nav className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-neutral-800/30 px-6 py-4">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="w-8 h-8 text-emerald-400">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h6v6H4V4z" className="fill-emerald-500"/>
              <path d="M14 4h6v6h-6V4z" className="fill-emerald-400"/>
              <path d="M4 14h6v6H4v-6z" className="fill-emerald-400"/>
              <path d="M14 14h6v6h-6v-6z" className="fill-emerald-300"/>
            </svg>
          </div>
          <div className="font-medium text-2xl text-white tracking-tight">
            convai
          </div>
        </div>

        <div className="space-y-1">
          {navigation.map((item) => {
            let href = item.href;
            if (item.name === "Manage Project") {
              href = `/project-settings/${selectedProjectId}`;
            } else if (item.name === "Billing") {
              href = `/billing/${selectedProjectId}`;
            }
            
            const isActive = location.pathname === href || 
              (item.name === "Manage Project" && location.pathname.startsWith("/project-settings")) ||
              (item.name === "Billing" && location.pathname.startsWith("/billing"));
            
            return (
              <Link
                key={item.name}
                to={href}
                className={cn(
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-400 hover:text-gray-200 hover:bg-neutral-800/30",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                )}
              >
                <item.icon
                  className={cn(
                    isActive
                      ? "text-emerald-400"
                      : "text-gray-400 group-hover:text-gray-200",
                    "h-6 w-6 shrink-0"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
