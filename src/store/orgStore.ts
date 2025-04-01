import { create } from "zustand";

export type Visibility = "Public" | "Private";
export type Role = "Owner" | "Admin" | "Member";
export type Status = "Active" | "Pending Invite" | "Pending Approval";
export type ProjectTier = "Free" | "Pro" | "Enterprise";

export interface Member {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: Status;
  addedDate: string;
}

export interface Project {
  id: string;
  name: string;
  visibility: Visibility;
  createdDate: string;
  members: Member[];
  orgId: string;
  tier: ProjectTier;
}

export interface Organization {
  id: string;
  name: string;
  defaultProjectVisibility: Visibility;
  members: Member[];
  projects: Project[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
}

export interface OrgStore {
  organizations: Organization[];
  projects: Project[];
  selectedOrgId: string | null;
  selectedProjectId: string | null;
  documents: Document[];
  setSelectedOrg: (orgId: string) => void;
  setSelectedProject: (projectId: string) => void;
  setSelectedProjectAndOrg: (projectId: string) => void;
  setProjects: (projects: Project[]) => void;
  moveProject: (projectId: string, newOrgId: string) => void;
  addOrg: (org: Pick<Organization, 'id' | 'name'>) => void;
  deleteOrg: (orgId: string) => void;
  deleteProject: (projectId: string) => void;
  joinProject: (projectId: string, member: Member) => void;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Product Requirements.pdf",
    type: "PDF",
    size: "2.5 MB",
    uploadedBy: "John Doe",
    uploadDate: "2024-03-15"
  },
  {
    id: "2",
    name: "User Research.docx",
    type: "DOCX",
    size: "1.8 MB",
    uploadedBy: "Jane Smith",
    uploadDate: "2024-03-14"
  },
  {
    id: "3",
    name: "Design Assets.zip",
    type: "ZIP",
    size: "15.2 MB",
    uploadedBy: "Bob Johnson",
    uploadDate: "2024-03-13"
  }
];

const mockOrgs: Organization[] = [
  {
    id: "org1",
    name: "Acme Corp",
    defaultProjectVisibility: "Private" as Visibility,
    members: [
      {
        id: "m1",
        name: "John Doe",
        email: "john@acme.com",
        role: "Owner",
        status: "Active",
        addedDate: "2024-01-15"
      },
      {
        id: "m2",
        name: "Sarah Lee",
        email: "sarah@acme.com",
        role: "Admin",
        status: "Active",
        addedDate: "2024-01-20"
      },
      {
        id: "m3",
        name: "Mike Davis",
        email: "mike@gmail.com",
        role: "Member",
        status: "Pending Invite",
        addedDate: "2024-03-25"
      },
      {
        id: "m4",
        name: "Lisa Nguyen",
        email: "lisa@outlook.com",
        role: "Member",
        status: "Pending Approval",
        addedDate: "2024-03-28"
      }
    ],
    projects: [
      {
        id: "p1",
        name: "E-commerce Platform",
        visibility: "Private" as Visibility,
        createdDate: "2024-01-15",
        orgId: "org1",
        tier: "Enterprise" as ProjectTier,
        members: [
          {
            id: "pm1",
            name: "John Doe",
            email: "john@acme.com",
            role: "Owner",
            status: "Active",
            addedDate: "2024-01-15"
          },
          {
            id: "pm2",
            name: "Sarah Lee",
            email: "sarah@acme.com",
            role: "Admin",
            status: "Active",
            addedDate: "2024-01-15"
          }
        ]
      },
      {
        id: "p2",
        name: "Mobile App",
        visibility: "Private" as Visibility,
        createdDate: "2024-02-01",
        orgId: "org1",
        tier: "Pro" as ProjectTier,
        members: [
          {
            id: "pm3",
            name: "John Doe",
            email: "john@acme.com",
            role: "Owner",
            status: "Active",
            addedDate: "2024-02-01"
          },
          {
            id: "pm4",
            name: "Sarah Lee",
            email: "sarah@acme.com",
            role: "Member",
            status: "Active",
            addedDate: "2024-02-01"
          }
        ]
      }
    ]
  },
  {
    id: "org2",
    name: "TechStart Solutions",
    defaultProjectVisibility: "Public" as Visibility,
    members: [
      {
        id: "m5",
        name: "Alex Brown",
        email: "alex@techstart.io",
        role: "Owner",
        status: "Active",
        addedDate: "2024-02-01"
      },
      {
        id: "m6",
        name: "Emma Taylor",
        email: "emma@techstart.io",
        role: "Admin",
        status: "Active",
        addedDate: "2024-02-05"
      },
      {
        id: "m7",
        name: "David White",
        email: "david@company.com",
        role: "Member",
        status: "Pending Invite",
        addedDate: "2024-03-20"
      }
    ],
    projects: [
      {
        id: "p3",
        name: "AI Analytics Dashboard",
        visibility: "Public" as Visibility,
        createdDate: "2024-02-10",
        orgId: "org2",
        tier: "Enterprise" as ProjectTier,
        members: [
          {
            id: "pm5",
            name: "Alex Brown",
            email: "alex@techstart.io",
            role: "Owner",
            status: "Active",
            addedDate: "2024-02-10"
          },
          {
            id: "pm6",
            name: "Emma Taylor",
            email: "emma@techstart.io",
            role: "Admin",
            status: "Active",
            addedDate: "2024-02-10"
          }
        ]
      }
    ]
  },
  {
    id: "org3",
    name: "Creative Studios",
    defaultProjectVisibility: "Private" as Visibility,
    members: [
      {
        id: "m8",
        name: "Sam Johnson",
        email: "sam@creative.co",
        role: "Owner",
        status: "Active",
        addedDate: "2024-01-10"
      },
      {
        id: "m9",
        name: "Maya Williams",
        email: "maya@creative.co",
        role: "Admin",
        status: "Active",
        addedDate: "2024-01-12"
      },
      {
        id: "m10",
        name: "Tom Harris",
        email: "tom@freelance.com",
        role: "Member",
        status: "Active",
        addedDate: "2024-02-15"
      },
      {
        id: "m11",
        name: "Nina Martin",
        email: "nina@design.com",
        role: "Member",
        status: "Pending Approval",
        addedDate: "2024-03-27"
      }
    ],
    projects: [
      {
        id: "p4",
        name: "Brand Redesign",
        visibility: "Private" as Visibility,
        createdDate: "2024-01-20",
        orgId: "org3",
        tier: "Pro" as ProjectTier,
        members: [
          {
            id: "pm7",
            name: "Sam Johnson",
            email: "sam@creative.co",
            role: "Owner",
            status: "Active",
            addedDate: "2024-01-20"
          },
          {
            id: "pm8",
            name: "Maya Williams",
            email: "maya@creative.co",
            role: "Admin",
            status: "Active",
            addedDate: "2024-01-20"
          },
          {
            id: "pm9",
            name: "Tom Harris",
            email: "tom@freelance.com",
            role: "Member",
            status: "Active",
            addedDate: "2024-02-15"
          }
        ]
      },
      {
        id: "p5",
        name: "Marketing Campaign",
        visibility: "Private" as Visibility,
        createdDate: "2024-02-15",
        orgId: "org3",
        tier: "Free" as ProjectTier,
        members: [
          {
            id: "pm10",
            name: "Sam Johnson",
            email: "sam@creative.co",
            role: "Owner",
            status: "Active",
            addedDate: "2024-02-15"
          },
          {
            id: "pm11",
            name: "Maya Williams",
            email: "maya@creative.co",
            role: "Member",
            status: "Active",
            addedDate: "2024-02-15"
          }
        ]
      },
      {
        id: "p6",
        name: "Client Portal",
        visibility: "Public" as Visibility,
        createdDate: "2024-03-01",
        orgId: "org3",
        tier: "Pro" as ProjectTier,
        members: [
          {
            id: "pm12",
            name: "Sam Johnson",
            email: "sam@creative.co",
            role: "Owner",
            status: "Active",
            addedDate: "2024-03-01"
          },
          {
            id: "pm13",
            name: "Tom Harris",
            email: "tom@freelance.com",
            role: "Admin",
            status: "Active",
            addedDate: "2024-03-01"
          }
        ]
      }
    ]
  }
];

export const useOrgStore = create<OrgStore>((set, get) => ({
  organizations: mockOrgs,
  projects: mockOrgs[0].projects,
  selectedOrgId: mockOrgs[0].id,
  selectedProjectId: mockOrgs[0].projects[0].id,
  documents: mockDocuments,
  setSelectedOrg: (id) => set((state) => {
    const org = state.organizations.find(o => o.id === id);
    return {
      selectedOrgId: id,
      selectedProjectId: null,
      projects: org?.projects || []
    };
  }),
  setSelectedProject: (id) => set({ selectedProjectId: id }),
  setSelectedProjectAndOrg: (projectId) => set((state) => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return state;
    return {
      selectedOrgId: project.orgId,
      selectedProjectId: projectId,
    };
  }),
  setProjects: (projects) => set({ projects }),
  moveProject: (projectId, newOrgId) => set((state) => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return state;

    // Update project's orgId
    const updatedProject = { ...project, orgId: newOrgId };
    
    // Update projects list
    const updatedProjects = state.projects.map(p => 
      p.id === projectId ? updatedProject : p
    );

    return {
      projects: updatedProjects,
      selectedOrgId: newOrgId,
      selectedProjectId: projectId,
    };
  }),
  addOrg: (org) => {
    const newOrg: Organization = {
      ...org,
      defaultProjectVisibility: "Private",
      members: [],
      projects: [],
    };
    set((state) => ({
      organizations: [...state.organizations, newOrg],
    }));
  },
  deleteOrg: (orgId) => {
    set((state) => {
      // Remove the organization
      const newOrgs = state.organizations.filter(org => org.id !== orgId);
      
      // Remove all projects belonging to this org
      const newProjects = state.projects.filter(project => project.orgId !== orgId);
      
      // Clear selection if the deleted org was selected
      const newState: Partial<OrgStore> = {
        organizations: newOrgs,
        projects: newProjects,
      };
      
      if (state.selectedOrgId === orgId) {
        newState.selectedOrgId = null;
        newState.selectedProjectId = null;
      }
      
      return newState;
    });
  },
  deleteProject: (projectId) => {
    const { organizations } = get();
    set({
      organizations: organizations.map(org => ({
        ...org,
        projects: org.projects.filter(p => p.id !== projectId)
      }))
    });
  },
  joinProject: (projectId, member) => {
    const { organizations } = get();
    set({
      organizations: organizations.map(org => ({
        ...org,
        projects: org.projects.map(project => 
          project.id === projectId
            ? { ...project, members: [...project.members, member] }
            : project
        )
      }))
    });
  }
}));
