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
import { cn } from "@/lib/utils";
import { useOrgStore } from "@/store/orgStore";
import { Settings, Trash2, UserPlus, FolderPlus, XCircle, Check, X, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Active: "bg-emerald-500/10 text-emerald-400",
  "Pending Invite": "bg-orange-500/10 text-orange-400",
  "Pending Approval": "bg-blue-500/10 text-blue-400",
} as const;

type Visibility = "Public" | "Private";

const OrgSettings = () => {
  const { organizations, selectedOrgId, projects, setProjects, setSelectedProjectAndOrg } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const [orgName, setOrgName] = useState(selectedOrg?.name || "");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [defaultProjectVisibility, setDefaultProjectVisibility] = useState<Visibility>(selectedOrg?.defaultProjectVisibility || "Private");
  const navigate = useNavigate();

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

  if (!selectedOrg) return null;

  return (
    <div className="px-8 py-6">
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
          <Card className="p-6 bg-black/20 border-neutral-800/30">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">General Settings</h3>
                <Card className="p-6 border-neutral-800/30 bg-emerald-950/20">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-200">Organization Name</label>
                      <Input
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="bg-black/40 border-neutral-800 text-gray-200 h-10"
                        placeholder="Enter organization name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-200">Default Project Visibility</label>
                      <Select defaultValue={defaultProjectVisibility} onValueChange={handleDefaultVisibilityChange}>
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
                      <Button className="bg-emerald-500 hover:bg-emerald-600">
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">Danger Zone</h3>
                <Card className="p-6 border-red-500/20 bg-red-950/20">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-200">Delete Organization</h4>
                      <p className="text-sm text-gray-400">
                        Once you delete an organization, there is no going back. Please be certain.
                      </p>
                    </div>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Organization
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card className="p-6 bg-black/20 border-neutral-800/30">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-200">Projects</h2>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>

              <Card className="border-neutral-800/30 bg-black">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-neutral-800/30">
                      <TableHead className="text-sm text-gray-400 font-normal">Project</TableHead>
                      <TableHead className="text-sm text-gray-400 font-normal">Visibility</TableHead>
                      <TableHead className="text-sm text-gray-400 font-normal">Tier</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.filter(proj => proj.orgId === selectedOrgId).map((project) => (
                      <TableRow key={project.id} className="hover:bg-neutral-800/30 border-neutral-800/30">
                        <TableCell className="font-medium text-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-md bg-gray-800/50 flex items-center justify-center">
                              <FolderPlus className="h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-200">{project.name}</div>
                              <div className="text-xs text-gray-400">ID: {project.id}</div>
                            </div>
                          </div>
                        </TableCell>
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
                            <SelectTrigger className="w-[100px] h-9 bg-black border-neutral-800 text-sm text-gray-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-neutral-800">
                              <SelectItem value="Public" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Public</SelectItem>
                              <SelectItem value="Private" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-sm cursor-pointer",
                              {
                                "border-neutral-500 text-neutral-500": project.tier === "Free",
                                "border-blue-500 text-blue-500": project.tier === "Pro",
                                "border-purple-500 text-purple-500": project.tier === "Enterprise"
                              }
                            )}
                            onClick={() => {
                              setSelectedProjectAndOrg(project.id);
                              navigate(`/billing`);
                            }}
                          >
                            {project.tier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => navigate(`/project-settings/${project.id}`)}
                              className="h-8 w-8 text-gray-400 hover:text-emerald-400"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-red-500"
                              onClick={() => {
                                const updatedProjects = projects.filter(p => p.id !== project.id);
                                setProjects(updatedProjects);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card className="p-6 bg-black/20 border-neutral-800/30">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">Team Members</h3>
                <p className="text-sm text-gray-400 mb-6">Manage your organization's team members and their roles.</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-[300px]">
                    <Input
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="bg-black/20 border-neutral-800/30 text-gray-200"
                    />
                  </div>
                  <div className="w-[120px]">
                    <Select defaultValue={inviteRole}>
                      <SelectTrigger className="bg-black/20 border-neutral-800/30 text-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-neutral-800/30">
                        <SelectItem value="Owner" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Owner</SelectItem>
                        <SelectItem value="Admin" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Admin</SelectItem>
                        <SelectItem value="Member" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Member</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
                {selectedMembers.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-400 hover:bg-red-500/10"
                  >
                    Remove Selected ({selectedMembers.length})
                  </Button>
                )}
              </div>

              <Card className="border-neutral-800/30 bg-black/20">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-neutral-800/30">
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedMembers.length === selectedOrg?.members?.length}
                          onCheckedChange={handleSelectAllMembers}
                        />
                      </TableHead>
                      <TableHead className="text-gray-400 w-[300px]">Member</TableHead>
                      <TableHead className="text-gray-400 w-[120px]">Role</TableHead>
                      <TableHead className="text-gray-400 w-[120px]">Status</TableHead>
                      <TableHead className="text-gray-400">Added</TableHead>
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
                        <TableCell className="font-medium text-gray-200">{member.email}</TableCell>
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
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrgSettings;
