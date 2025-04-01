import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useOrgStore, Project, ProjectTier, Role } from "@/store/orgStore";
import { Settings, Trash2, UserPlus, FolderPlus, XCircle, Check, X, Plus, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CreateProjectModal } from "@/components/modals/CreateProjectModal";
import { InviteMembersModal } from "@/components/modals/InviteMembersModal";

const statusColors = {
  Active: "bg-emerald-400/5 text-emerald-300/90",
  "Pending Invite": "bg-amber-400/5 text-amber-300/90",
  "Pending Approval": "bg-sky-400/5 text-sky-300/90",
} as const;

type Visibility = "Public" | "Private";

const OrgSettings = () => {
  const { orgId } = useParams();
  const { organizations, selectedOrgId, setSelectedOrg, projects, setProjects, setSelectedProjectAndOrg, deleteOrg, joinProject } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === (orgId || selectedOrgId));
  const [orgName, setOrgName] = useState(selectedOrg?.name || "");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [defaultProjectVisibility, setDefaultProjectVisibility] = useState<Visibility>(selectedOrg?.defaultProjectVisibility || "Private");
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [inviteMembersOpen, setInviteMembersOpen] = useState(false);
  const navigate = useNavigate();

  // Redirect to the org URL if coming from navbar
  useEffect(() => {
    if (!orgId && selectedOrgId) {
      navigate(`/org-settings/${selectedOrgId}`, { replace: true });
    }
  }, [orgId, selectedOrgId, navigate]);

  const handleDefaultVisibilityChange = (value: string) => {
    setDefaultProjectVisibility(value as Visibility);
  };

  const handleSelectAllMembers = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(selectedOrg?.members?.map(m => m.id) || []);
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, memberId]);
    } else {
      setSelectedMembers(prev => prev.filter(id => id !== memberId));
    }
  };

  const handleNavigateToProjectSettings = (projectId: string) => {
    navigate(`/project-settings/${projectId}`);
  };

  const handleDeleteOrg = () => {
    if (selectedOrgId) {
      deleteOrg(selectedOrgId);
      navigate("/"); // Navigate to home after deletion
    }
  };

  const handleCreateProject = (data: { name: string; tier: string }) => {
    // Add the project to the store
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name,
      tier: data.tier as ProjectTier,
      orgId: orgId || selectedOrgId || "",
      visibility: defaultProjectVisibility,
      createdDate: new Date().toISOString(),
      members: [],
    };
    setProjects([...projects, newProject]);
    setCreateProjectOpen(false);
  };

  if (!selectedOrg) return null;

  return (
    <div className="max-w-[1600px] mx-auto p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-200">Organization Settings</h1>
            <p className="text-gray-400 mt-1">
              {selectedOrg 
                ? `Settings for ${selectedOrg.name}`
                : "Select an organization to view settings"
              }
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-black/20 border-neutral-800/30">
            <TabsTrigger value="general" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400">
              General
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400">
              Projects
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400">
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-6 bg-black/20 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-4">General Settings</h3>
                  <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-200">Organization Name</h3>
                        <Input
                          id="orgName"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          className="bg-black/40 border-neutral-800 text-gray-200 h-10"
                          placeholder="Enter organization name"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-200">Default Project Visibility</h3>
                        <Select value={defaultProjectVisibility} onValueChange={handleDefaultVisibilityChange}>
                          <SelectTrigger className="w-32 bg-black/40 border-neutral-800 text-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-neutral-800/30">
                            <SelectItem value="Public" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Public</SelectItem>
                            <SelectItem value="Private" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Private</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-400">This will be the default visibility for new projects.</p>
                      </div>
                      <div className="pt-2">
                        <Button className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg">
                          <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Danger Zone</h3>
                  <Card className="p-6 bg-red-950/20 border-red-500/20 rounded-xl hover:border-red-500/30 transition-colors">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-200">Delete Organization</h4>
                        <p className="text-sm text-gray-400">
                          Once you delete an organization, there is no going back. Please be certain.
                        </p>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-2"
                        onClick={handleDeleteOrg}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Organization
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-800/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-200">Projects</CardTitle>
                    <CardDescription>Manage your organization's projects.</CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setCreateProjectOpen(true)} 
                    className="bg-neutral-800 hover:bg-neutral-700 text-gray-200"
                  >
                    <FolderPlus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-200 mb-4">Your Projects</h3>
                    <div className="rounded-lg border border-neutral-800/50">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-neutral-800/50 border-neutral-800/50">
                            <TableHead className="text-gray-400">Name</TableHead>
                            <TableHead className="text-gray-400">Visibility</TableHead>
                            <TableHead className="text-gray-400">Members</TableHead>
                            <TableHead className="text-gray-400">Created</TableHead>
                            <TableHead className="text-gray-400">Tier</TableHead>
                            <TableHead className="text-gray-400"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projects.filter(proj => proj.orgId === (orgId || selectedOrgId)).map((project) => (
                            <TableRow key={project.id} className="hover:bg-neutral-800/50 border-neutral-800/50">
                              <TableCell className="font-medium text-gray-200">{project.name}</TableCell>
                              <TableCell>
                                <Select
                                  value={project.visibility}
                                  onValueChange={(value: Visibility) => {
                                    const updatedProjects = projects.map(p => 
                                      p.id === project.id ? { ...p, visibility: value } : p
                                    );
                                    setProjects(updatedProjects);
                                  }}
                                >
                                  <SelectTrigger className="w-[100px] h-9 bg-black/20 border-neutral-800/30 text-gray-200">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black border-neutral-800/30">
                                    <SelectItem value="Public" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Public</SelectItem>
                                    <SelectItem value="Private" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Private</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-gray-200">{project.members.length}</TableCell>
                              <TableCell className="text-gray-200">{new Date(project.createdDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "capitalize cursor-pointer hover:opacity-80 transition-opacity",
                                    {
                                      "border-neutral-400/50 bg-neutral-400/10 text-neutral-300": project.tier === "Free",
                                      "border-emerald-400/50 bg-emerald-400/10 text-emerald-300": project.tier === "Pro",
                                      "border-violet-400/50 bg-violet-400/10 text-violet-300": project.tier === "Enterprise"
                                    }
                                  )}
                                  onClick={() => {
                                    setSelectedProjectAndOrg(project.id);
                                    navigate(`/billing/${project.id}`);
                                  }}
                                >
                                  {project.tier}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedProjectAndOrg(project.id);
                                    navigate(`/project-settings/${project.id}`);
                                  }}
                                >
                                  <Settings className="w-4 h-4 text-gray-400" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-200 mb-4">Available Public Projects</h3>
                    <div className="rounded-lg border border-neutral-800/50">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-neutral-800/50 border-neutral-800/50">
                            <TableHead className="text-gray-400">Name</TableHead>
                            <TableHead className="text-gray-400">Members</TableHead>
                            <TableHead className="text-gray-400">Created</TableHead>
                            <TableHead className="text-gray-400">Tier</TableHead>
                            <TableHead className="text-gray-400"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {projects
                            .filter(project => 
                              project.orgId === (orgId || selectedOrgId) &&
                              project.visibility === "Public" && 
                              !project.members.some(member => member.email === "john@acme.com")
                            )
                            .map((project) => (
                              <TableRow key={project.id} className="hover:bg-neutral-800/50 border-neutral-800/50">
                                <TableCell className="font-medium text-gray-200">{project.name}</TableCell>
                                <TableCell className="text-gray-200">{project.members.length}</TableCell>
                                <TableCell className="text-gray-200">{new Date(project.createdDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "capitalize cursor-pointer hover:opacity-80 transition-opacity",
                                      {
                                        "border-neutral-400/50 bg-neutral-400/10 text-neutral-300": project.tier === "Free",
                                        "border-emerald-400/50 bg-emerald-400/10 text-emerald-300": project.tier === "Pro",
                                        "border-violet-400/50 bg-violet-400/10 text-violet-300": project.tier === "Enterprise"
                                      }
                                    )}
                                    onClick={() => {
                                      setSelectedProjectAndOrg(project.id);
                                      navigate(`/billing/${project.id}`);
                                    }}
                                  >
                                    {project.tier}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    onClick={() => {
                                      joinProject(project.id, {
                                        id: crypto.randomUUID(),
                                        email: "john@acme.com", // Replace with actual user email
                                        name: "John Doe", // Replace with actual user name
                                        role: "Member",
                                        status: "Active",
                                        addedDate: new Date().toISOString()
                                      });
                                    }}
                                  >
                                    Join Project
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          {projects.filter(project => 
                            project.orgId === (orgId || selectedOrgId) &&
                            project.visibility === "Public" && 
                            !project.members.some(member => member.email === "john@acme.com")
                          ).length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center text-gray-400 py-6">
                                No public projects available to join
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="bg-neutral-900/50 border-neutral-800/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-200">Members</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage organization members and their roles.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedMembers.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        onClick={() => {
                          // TODO: Handle bulk delete
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Selected
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="bg-neutral-800 hover:bg-neutral-700 text-gray-200"
                      onClick={() => setInviteMembersOpen(true)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite Member
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Card className="border-neutral-800/30 bg-black/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-neutral-800/30">
                        <TableHead className="w-10">
                          <Checkbox 
                            checked={selectedMembers.length === selectedOrg?.members?.length}
                            onCheckedChange={handleSelectAllMembers}
                          />
                        </TableHead>
                        <TableHead className="text-gray-400 w-[250px]">Member</TableHead>
                        <TableHead className="text-gray-400 w-[100px]">Role</TableHead>
                        <TableHead className="text-gray-400 w-[160px]">Status</TableHead>
                        <TableHead className="text-gray-400 w-[120px]">Added</TableHead>
                        <TableHead className="text-gray-400 text-right w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrg.members?.map((member) => (
                        <TableRow key={member.id} className={cn(
                          "hover:bg-neutral-800/30 border-neutral-800/30",
                          selectedMembers.includes(member.id) && "bg-emerald-500/5"
                        )}>
                          <TableCell>
                            <Checkbox 
                              checked={selectedMembers.includes(member.id)}
                              onCheckedChange={(checked) => handleSelectMember(member.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell className="font-medium text-gray-200">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-neutral-800 text-neutral-400">
                                  {member.email.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              {member.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select defaultValue={member.role}>
                              <SelectTrigger className="bg-black/20 border-neutral-800/30 text-gray-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-neutral-800/30">
                                <SelectItem value="Owner" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Owner</SelectItem>
                                <SelectItem value="Admin" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Admin</SelectItem>
                                <SelectItem value="Member" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Member</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Badge className={cn("border-0", statusColors[member.status])}>
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-400">{member.addedDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {member.status === "Active" && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8 hover:bg-emerald-500/10 text-emerald-400"
                                  >
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8 hover:bg-red-500/10 text-red-400"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {member.status === "Pending Invite" && (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 hover:bg-red-500/10 text-red-400"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                              {member.status === "Pending Approval" && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8 hover:bg-emerald-500/10 text-emerald-400"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8 hover:bg-red-500/10 text-red-400"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <CreateProjectModal 
          open={createProjectOpen}
          onOpenChange={setCreateProjectOpen}
          onSubmit={handleCreateProject}
        />
        <InviteMembersModal
          open={inviteMembersOpen}
          onClose={() => setInviteMembersOpen(false)}
          onSubmit={(emails, role) => {
            // TODO: Handle member invites
            console.log("Inviting members:", emails, "with role:", role);
          }}
        />
      </div>
    </div>
  );
};

export default OrgSettings;
