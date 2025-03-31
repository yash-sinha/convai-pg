import { create } from "zustand";

interface Project {
  id: string;
  orgId: string;
  name: string;
  description?: string;
}

interface ProjectStore {
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [
    { id: "1", orgId: "1", name: "default-project", description: "Default project" },
    { id: "2", orgId: "1", name: "mock-ui", description: "Mock UI project" },
    { id: "3", orgId: "2", name: "demo-app", description: "Demo application" },
    { id: "4", orgId: "2", name: "test-app", description: "Testing application" },
    { id: "5", orgId: "3", name: "ai-chat", description: "AI Chat application" },
    { id: "6", orgId: "3", name: "data-viz", description: "Data Visualization tool" },
  ],
  selectedProjectId: "1",
  setSelectedProject: (id) => set({ selectedProjectId: id }),
}));
