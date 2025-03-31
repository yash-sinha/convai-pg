import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <NavBar />
          <main className="flex-1 overflow-y-auto bg-[#0B1120]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
