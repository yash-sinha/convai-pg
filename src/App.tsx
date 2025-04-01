import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Characters from "./pages/Characters";
import Organizations from "./pages/Organizations";
import Experiences from "./pages/Experiences";
import Billing from "@/pages/Billing";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import OrgSettings from "./pages/OrgSettings";
import ProjectSettings from "./pages/ProjectSettings";
import KnowledgeBank from "./pages/KnowledgeBank";
import Sidebar from "./components/layout/Sidebar";
import NavBar from "./components/layout/NavBar";
import Templates from "./pages/Templates";
import ApiKeys from "./pages/ApiKeys";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="flex min-h-screen bg-black">
            <Sidebar />
            <div className="flex-1 pl-[240px]">
              <NavBar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/characters" element={<Characters />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/knowledge-bank" element={<KnowledgeBank />} />
                  <Route path="/api-keys" element={<ApiKeys />} />
                  <Route path="/project-settings/:projectId" element={<ProjectSettings />} />
                  <Route path="/billing/:projectId" element={<Billing />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/org-settings/:orgId" element={<OrgSettings />} />
                  <Route path="/org-settings" element={<OrgSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
