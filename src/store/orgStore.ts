import { create } from "zustand";

export type Visibility = "Public" | "Private";
export type Role = "Owner" | "Admin" | "Member";
export type Status = "Active" | "Pending Invite" | "Pending Approval";

interface Member {
  id: string;
  email: string;
  role: Role;
  status: Status;
  addedDate: string;
}

interface Project {
  id: string;
  name: string;
  visibility: Visibility;
  members: Member[];
  createdDate: string;
}

interface Organization {
  id: string;
  name: string;
  defaultProjectVisibility: Visibility;
  members: Member[];
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
}

interface OrgStore {
  organizations: Organization[];
  selectedOrgId: string | null;
  projects: Project[];
  selectedProjectId: string | null;
  documents: Document[];
  setSelectedOrg: (id: string) => void;
  setSelectedProject: (id: string) => void;
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

export const useOrgStore = create<OrgStore>((set) => ({
  organizations: [
    {
      id: "org1",
      name: "My Organization",
      defaultProjectVisibility: "Private",
      members: [
        {
          id: "member1",
          email: "john@example.com",
          role: "Owner",
          status: "Active",
          addedDate: "Mar 15, 2024"
        },
        {
          id: "member2",
          email: "jane@example.com",
          role: "Admin",
          status: "Active",
          addedDate: "Mar 16, 2024"
        },
        {
          id: "member3",
          email: "alice@example.com",
          role: "Member",
          status: "Pending Invite",
          addedDate: "Mar 30, 2024"
        },
        {
          id: "member4",
          email: "bob@example.com",
          role: "Member",
          status: "Pending Approval",
          addedDate: "Mar 31, 2024"
        }
      ]
    }
  ],
  selectedOrgId: "org1",
  projects: [
    {
      id: "project1",
      name: "My Project",
      visibility: "Private",
      createdDate: "Mar 15, 2024",
      members: [
        {
          id: "member1",
          email: "john@example.com",
          role: "Owner",
          status: "Active",
          addedDate: "Mar 15, 2024"
        },
        {
          id: "member2",
          email: "jane@example.com",
          role: "Admin",
          status: "Active",
          addedDate: "Mar 16, 2024"
        },
        {
          id: "member5",
          email: "charlie@example.com",
          role: "Member",
          status: "Pending Invite",
          addedDate: "Mar 30, 2024"
        },
        {
          id: "member6",
          email: "dave@example.com",
          role: "Member",
          status: "Pending Approval",
          addedDate: "Mar 31, 2024"
        }
      ]
    }
  ],
  selectedProjectId: "project1",
  documents: mockDocuments,
  setSelectedOrg: (id) => set({ selectedOrgId: id }),
  setSelectedProject: (id) => set({ selectedProjectId: id }),
}));
