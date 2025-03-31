import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useOrgStore } from "@/store/orgStore";
import { Settings, Trash2, UserPlus, FolderPlus, XCircle, Check, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const statusColors = {
  Active: "bg-emerald-500/10 text-emerald-400",
  "Pending Invite": "bg-orange-500/10 text-orange-400",
  "Pending Approval": "bg-blue-500/10 text-blue-400",
} as const;

type Visibility = "Public" | "Private";

const OrgSettings = () => {
  const { organizations, selectedOrgId, projects } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const [orgName, setOrgName] = useState(selectedOrg?.name || "");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("member");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [defaultProjectVisibility, setDefaultProjectVisibility] = useState<Visibility>(selectedOrg?.defaultProjectVisibility || "Private");

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
                        <SelectContent className="bg-black border-neutral-800">
                          <SelectItem value="Public" className="text-gray-200 focus:bg-emerald-500/10 focus:text-emerald-400">Public</SelectItem>
                          <SelectItem value="Private" className="text-gray-200 focus:bg-emerald-500/10 focus:text-emerald-400">Private</SelectItem>
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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-200">Projects</h3>
                <Button 
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/50"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>

              <Card className="border-neutral-800/30 bg-black/20">
                <Table>
                  <TableHeader>
                    <TableRow className="border-neutral-800/30 hover:bg-transparent">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Members</TableHead>
                      <TableHead className="text-gray-400">Visibility</TableHead>
                      <TableHead className="text-gray-400">Created</TableHead>
                      <TableHead className="text-right text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id} className="border-neutral-800/30 hover:bg-black/40">
                        <TableCell>
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
                          <Badge variant="outline" className="bg-gray-800/30 text-gray-200 border-neutral-800/30">
                            {project.members.length} Members
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select defaultValue={project.visibility}>
                            <SelectTrigger className="w-32 bg-black/20 border-neutral-800/30 text-gray-200">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-neutral-800/30">
                              <SelectItem value="Public" className="text-gray-200 focus:bg-emerald-500/10 focus:text-emerald-400">Public</SelectItem>
                              <SelectItem value="Private" className="text-gray-200 focus:bg-emerald-500/10 focus:text-emerald-400">Private</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-gray-400">{project.createdDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
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
                              className="h-8 w-8 hover:bg-red-500/10 hover:text-red-400"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="bg-black/20 border-neutral-800/30 text-gray-200"
                  />
                  <Select defaultValue={inviteRole}>
                    <SelectTrigger className="w-32 bg-black/20 border-neutral-800/30 text-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-neutral-800/30">
                      <SelectItem value="Owner" className="text-gray-200">Owner</SelectItem>
                      <SelectItem value="Admin" className="text-gray-200">Admin</SelectItem>
                      <SelectItem value="Member" className="text-gray-200">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Invite Member
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-400 hover:text-red-400 hover:bg-red-500/10"
                  disabled={selectedMembers.length === 0}
                >
                  Remove Selected
                </Button>
              </div>

              <div>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-neutral-800/30">
                      <TableHead className="w-12">
                        <Checkbox 
                          checked={selectedMembers.length === selectedOrg?.members?.length}
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

export default OrgSettings;
