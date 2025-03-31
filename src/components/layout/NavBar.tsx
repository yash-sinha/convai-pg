
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Organizations", path: "/organizations" },
    { name: "Projects", path: "/projects" }
  ];
  
  return (
    <div className="w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold text-lg">
            convai.com
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className={cn(
                  "transition-colors hover:text-primary",
                  location.pathname === item.path ? "font-medium" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
