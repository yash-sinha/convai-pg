export type ProjectTier = "Free" | "Pro" | "Enterprise";
export type Visibility = "Public" | "Private";

export interface Project {
  id: string;
  orgId: string;
  name: string;
  tier: ProjectTier;
  visibility: Visibility;
  members: Member[];
  createdDate: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  addedDate: string;
}
