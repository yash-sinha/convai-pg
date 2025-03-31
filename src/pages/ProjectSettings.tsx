import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useOrgStore, Visibility } from "@/store/orgStore";
import { Pencil, Trash2, UserPlus, Settings, XCircle, Check, X } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProjectSettings = () => {
  const { projectId } = useParams();
  const { organizations, projects, selectedOrgId, selectedProjectId, setSelectedProject, moveProject } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const selectedProject = projects.find(p => p.id === (projectId || selectedProjectId));
  const [projectName, setProjectName] = useState(selectedProject?.name || "");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<Visibility>(selectedProject?.visibility || "Private");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [characterVersions, setCharacterVersions] = useState({
    "1": { current: "1.0", versions: ["1.0", "0.9", "0.8"], isLive: false, visibility: "Public" },
    "2": { current: "2.1", versions: ["2.1", "2.0", "1.9"], isLive: true, visibility: "Private" }
  });
  const [targetOrgId, setTargetOrgId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect to the project URL if coming from navbar
  useEffect(() => {
    if (!projectId && selectedProjectId) {
      navigate(`/project-settings/${selectedProjectId}`, { replace: true });
    }
  }, [projectId, selectedProjectId, navigate]);

  // Update selected project in store if projectId changes
  useEffect(() => {
    const targetProjectId = projectId || selectedProjectId;
    if (targetProjectId) {
      setSelectedProject(targetProjectId);
    }
  }, [projectId, selectedProjectId, setSelectedProject]);

  const handleSelectAllMembers = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(selectedProject?.members?.map(m => m.id) || []);
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

  const handleVisibilityChange = (value: string) => {
    setVisibility(value as Visibility);
  };

  const statusColors = {
    Active: "bg-emerald-500/10 text-emerald-400",
    "Pending Invite": "bg-orange-500/10 text-orange-400",
    "Pending Approval": "bg-yellow-500/10 text-yellow-400",
  };

  if (!selectedProject || !selectedOrg) return null;

  return (
    <div className="px-8 py-6">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-black/20 border-neutral-800/30">
          <TabsTrigger value="general" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400">
            General
          </TabsTrigger>
          <TabsTrigger value="characters" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400">
            Characters
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
                      <label className="text-sm font-medium text-gray-200">Project Name</label>
                      <Input
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="bg-black/40 border-neutral-800 text-gray-200 h-10"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-200">Project Visibility</label>
                      <Select defaultValue={visibility} onValueChange={handleVisibilityChange}>
                        <SelectTrigger className="w-32 bg-black/40 border-neutral-800 text-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-neutral-800">
                          <SelectItem value="Public" className="text-gray-200 focus:bg-emerald-500/10 focus:text-emerald-400">Public</SelectItem>
                          <SelectItem value="Private" className="text-gray-200 focus:bg-emerald-500/10 focus:text-emerald-400">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">Choose who can access this project.</p>
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
                <h3 className="text-lg font-medium text-gray-200 mb-4">Project Actions</h3>
                <Card className="p-6 border-neutral-800/30 bg-emerald-950/20">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-200">Move to Organization</label>
                      <div className="flex items-center gap-3">
                        <Select
                          value={targetOrgId || selectedOrg?.id}
                          onValueChange={(value) => {
                            setTargetOrgId(value);
                          }}
                        >
                          <SelectTrigger className="w-[200px] bg-black/40 border-neutral-800 text-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-neutral-800">
                            {organizations.map((org) => (
                              <SelectItem 
                                key={org.id}
                                value={org.id}
                                className="text-gray-200 focus:bg-emerald-500/10 focus:text-emerald-400"
                                disabled={org.id === selectedOrg?.id}
                              >
                                {org.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button 
                          className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2"
                          disabled={!targetOrgId || targetOrgId === selectedOrg?.id}
                          onClick={() => {
                            if (targetOrgId && projectId) {
                              moveProject(projectId, targetOrgId);
                              setTargetOrgId(null);
                              // Navigate to project settings in new org
                              navigate(`/project-settings/${projectId}`);
                            }
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                          Move Project
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400">Move this project to a different organization. This action cannot be undone.</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">Danger Zone</h3>
                <Card className="p-6 border-red-500/20 bg-red-950/20">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-200">Delete Project</h4>
                      <p className="text-sm text-gray-400">
                        Once you delete a project, there is no going back. Please be certain.
                      </p>
                    </div>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Project
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="characters">
          <Card className="bg-black/20 border-neutral-800/30">
            <Table>
              <TableHeader>
                <TableRow className="border-neutral-800/30 hover:bg-transparent">
                  <TableHead className="text-gray-400">Character</TableHead>
                  <TableHead className="text-gray-400">Visibility</TableHead>
                  <TableHead className="text-gray-400">Created</TableHead>
                  <TableHead className="text-gray-400">Live Version</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-neutral-800/30 hover:bg-black/40">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Felix" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className="font-medium text-gray-200">Main Character</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={characterVersions["1"].visibility}
                      onValueChange={(value: Visibility) => {
                        setCharacterVersions(prev => ({
                          ...prev,
                          "1": { ...prev["1"], visibility: value }
                        }));
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
                  <TableCell className="text-gray-400">
                    Mar 15, 2024
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={characterVersions["1"].isLive}
                        className="data-[state=checked]:bg-emerald-500" 
                        onCheckedChange={(checked) => {
                          setCharacterVersions(prev => ({
                            ...prev,
                            "1": { ...prev["1"], isLive: checked }
                          }));
                        }}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 px-2 text-sm text-gray-400 hover:text-emerald-400 flex items-center gap-1"
                          >
                            v{characterVersions["1"].current}
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 bg-black border-neutral-800">
                          {characterVersions["1"].versions.map((version) => (
                            <DropdownMenuItem 
                              key={version}
                              onClick={() => {
                                setCharacterVersions(prev => ({
                                  ...prev,
                                  "1": { ...prev["1"], current: version }
                                }));
                              }}
                              className="text-gray-200 focus:text-emerald-400 focus:bg-emerald-500/10"
                            >
                              v{version}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-emerald-500/10 text-emerald-400"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="border-neutral-800/30 hover:bg-black/40">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <div className="font-medium text-gray-200">Support Agent</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={characterVersions["2"].visibility}
                      onValueChange={(value: Visibility) => {
                        setCharacterVersions(prev => ({
                          ...prev,
                          "2": { ...prev["2"], visibility: value }
                        }));
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
                  <TableCell className="text-gray-400">
                    Mar 20, 2024
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={characterVersions["2"].isLive}
                        className="data-[state=checked]:bg-emerald-500" 
                        onCheckedChange={(checked) => {
                          setCharacterVersions(prev => ({
                            ...prev,
                            "2": { ...prev["2"], isLive: checked }
                          }));
                        }}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-6 px-2 text-sm text-gray-400 hover:text-emerald-400 flex items-center gap-1"
                          >
                            v{characterVersions["2"].current}
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 bg-black border-neutral-800">
                          {characterVersions["2"].versions.map((version) => (
                            <DropdownMenuItem 
                              key={version}
                              onClick={() => {
                                setCharacterVersions(prev => ({
                                  ...prev,
                                  "2": { ...prev["2"], current: version }
                                }));
                              }}
                              className="text-gray-200 focus:text-emerald-400 focus:bg-emerald-500/10"
                            >
                              v{version}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-emerald-500/10 text-emerald-400"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card className="p-6 bg-black/20 border-neutral-800/30">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-200 mb-4">Project Members</h3>
                <p className="text-sm text-gray-400 mb-6">Manage access and roles for members in this project.</p>
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
                        <SelectItem value="Owner" className="text-gray-200">Owner</SelectItem>
                        <SelectItem value="Admin" className="text-gray-200">Admin</SelectItem>
                        <SelectItem value="Member" className="text-gray-200">Member</SelectItem>
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

              <div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-neutral-800/30">
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedMembers.length === selectedProject?.members?.length}
                          onCheckedChange={handleSelectAllMembers}
                        />
                      </TableHead>
                      <TableHead className="text-gray-400">Member</TableHead>
                      <TableHead className="text-gray-400">Role</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Added</TableHead>
                      <TableHead className="text-gray-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProject?.members?.map((member) => (
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
                            <SelectTrigger className="w-32 bg-black/20 border-neutral-800/30 text-gray-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-neutral-800/30">
                              <SelectItem value="Owner" className="text-gray-200">Owner</SelectItem>
                              <SelectItem value="Admin" className="text-gray-200">Admin</SelectItem>
                              <SelectItem value="Member" className="text-gray-200">Member</SelectItem>
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
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectSettings;
