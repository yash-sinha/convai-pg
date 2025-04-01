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
import { useOrgStore, Visibility, Role } from "@/store/orgStore";
import { Pencil, Trash2, UserPlus, Settings, XCircle, Check, X, Save, ChevronDown, Plus } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CreditCard, ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useParams, useNavigate } from "react-router-dom";
import { InviteMembersModal } from "@/components/modals/InviteMembersModal";
import CreateCharacterModal from "@/components/modals/CreateCharacterModal";

const BillingMetric = ({ 
  label, 
  used, 
  total, 
  unit 
}: { 
  label: string; 
  used: number; 
  total: number; 
  unit: string;
}) => {
  const percentage = (used / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-200">{label}</span>
        <span className="text-gray-200">
          {used}/{total} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2 bg-neutral-800/40" indicatorClassName="bg-emerald-500" />
    </div>
  );
};

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
  const [inviteMembersOpen, setInviteMembersOpen] = useState(false);
  const [createCharacterOpen, setCreateCharacterOpen] = useState(false);
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
      setSelectedMembers(mockMembers.map(m => m.id));
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
    Active: "bg-emerald-400/5 text-emerald-300/90",
    "Pending Invite": "bg-amber-400/5 text-amber-300/90",
    "Pending Approval": "bg-sky-400/5 text-sky-300/90",
  };

  const mockMembers = [
    { id: 'jo', name: 'JO', email: 'john@acme.com', role: 'Owner', status: 'Active', added: '2024-01-15' },
    { id: 'sa', name: 'SA', email: 'sarah@acme.com', role: 'Admin', status: 'Active', added: '2024-01-20' },
    { id: 'mi', name: 'MI', email: 'mike@gmail.com', role: 'Member', status: 'Pending Invite', added: '2024-03-25' },
    { id: 'li', name: 'LI', email: 'lisa@outlook.com', role: 'Member', status: 'Pending Approval', added: '2024-03-28' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-emerald-400';
      case 'Pending Invite':
        return 'text-yellow-400';
      case 'Pending Approval':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getActionButtons = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        );
      case 'Pending Invite':
        return (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
            <XCircle className="h-4 w-4" />
          </Button>
        );
      case 'Pending Approval':
        return (
          <>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-emerald-400 hover:text-emerald-300">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
              <X className="h-4 w-4" />
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  if (!selectedProject || !selectedOrg) return null;

  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-200 mb-1">
          {selectedProject?.name || "Project Settings"}
        </h1>
        <p className="text-sm text-gray-400">
          Manage your project's settings, access, and configuration
        </p>
      </div>
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
                <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
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
                          <SelectItem value="Public" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Public</SelectItem>
                          <SelectItem value="Private" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">Choose who can access this project.</p>
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
                <h3 className="text-lg font-medium text-gray-200 mb-4">Project Actions</h3>
                <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-200">Move Project to Another Organization</label>
                      <Select value={targetOrgId || ""} onValueChange={(value) => setTargetOrgId(value)}>
                        <SelectTrigger className="w-full bg-black/40 border-neutral-800 text-gray-200">
                          <SelectValue placeholder="Select organization" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-neutral-800">
                          {organizations
                            .filter(org => org.id !== selectedOrgId)
                            .map(org => (
                              <SelectItem 
                                key={org.id} 
                                value={org.id}
                                className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30"
                              >
                                {org.name}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-400">Move this project to another organization you own.</p>
                    </div>
                    <div className="pt-4">
                      <Button 
                        variant="destructive" 
                        className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400"
                        onClick={() => targetOrgId && moveProject(selectedProject.id, targetOrgId)}
                        disabled={!targetOrgId}
                      >
                        Move Project
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
                      <h4 className="text-sm font-medium text-gray-200">Delete Project</h4>
                      <p className="text-sm text-gray-400 mt-1">Once you delete a project, there is no going back. Please be certain.</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      className="flex items-center gap-2"
                    >
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
          <Card className="bg-neutral-900/50 border-neutral-800/30">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-200">Characters</h2>
                  <p className="text-sm text-gray-400">
                    Manage your project's character configurations.
                  </p>
                </div>
                <Button 
                  className="bg-neutral-800 hover:bg-neutral-700 text-gray-200"
                  onClick={() => setCreateCharacterOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Character
                </Button>
              </div>
              <div className="mt-6">
                <Card className="border-neutral-800/30 bg-black/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-neutral-800/30">
                        <TableHead className="text-gray-400">Character</TableHead>
                        <TableHead className="text-gray-400">Visibility</TableHead>
                        <TableHead className="text-gray-400">Created</TableHead>
                        <TableHead className="text-gray-400">Live Version</TableHead>
                        <TableHead className="text-right text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(characterVersions).map(([id, data]) => (
                        <TableRow key={id} className="hover:bg-neutral-800/30 border-neutral-800/30">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-neutral-800 text-neutral-400">
                                  {`C${id}`}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-gray-200">Main Character</p>
                                <p className="text-xs text-gray-400">Character {id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select defaultValue={data.visibility}>
                              <SelectTrigger className="w-28 bg-black/20 border-neutral-800/30 text-gray-200">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-neutral-800/30">
                                <SelectItem value="Public" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Public</SelectItem>
                                <SelectItem value="Private" className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30">Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-gray-400">Mar 15, 2024</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={data.isLive}
                                className="data-[state=checked]:bg-emerald-500"
                              />
                              <Select defaultValue={data.current}>
                                <SelectTrigger className="h-8 w-24 bg-black/20 border-neutral-800/30 text-gray-200">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black border-neutral-800/30">
                                  {data.versions.map(version => (
                                    <SelectItem 
                                      key={version} 
                                      value={version}
                                      className="text-gray-200 hover:bg-neutral-800/30 focus:bg-neutral-800/30"
                                    >
                                      v{version}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-neutral-800/30">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/10">
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
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="members">
          <Card className="bg-neutral-900/50 border-neutral-800/30">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-200">Members</h2>
                  <p className="text-sm text-gray-400">
                    Manage project members and their roles.
                  </p>
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
              <div className="mt-6">
                <Card className="border-neutral-800/30 bg-black/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-neutral-800/30">
                        <TableHead className="w-10">
                          <Checkbox 
                            checked={selectedMembers.length === mockMembers.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedMembers(mockMembers.map(m => m.id));
                              } else {
                                setSelectedMembers([]);
                              }
                            }}
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
                      {mockMembers.map((member) => (
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
                                  {member.name}
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
                          <TableCell className="text-gray-400">{member.added}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {getActionButtons(member.status)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <InviteMembersModal
        open={inviteMembersOpen}
        onClose={() => setInviteMembersOpen(false)}
        onSubmit={(emails, role) => {
          // TODO: Handle member invites
          console.log("Inviting members:", emails, "with role:", role);
        }}
      />
      <CreateCharacterModal
        open={createCharacterOpen}
        onOpenChange={setCreateCharacterOpen}
      />
    </div>
  );
};

export default ProjectSettings;
