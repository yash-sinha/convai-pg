export type Visibility = "Public" | "Private";

export interface Project {
  id: string;
  name: string;
  tier: string;
  orgId: string;
  visibility: Visibility;
  members: string[];
  createdDate: string;
}
