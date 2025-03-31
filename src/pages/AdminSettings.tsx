import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrgStore } from "@/store/orgStore";
import { PlusIcon, Search, Shield, Users2, Building2 } from "lucide-react";
import { useState } from "react";

const AdminSettings = () => {
  const { organizations, selectedOrgId } = useOrgStore();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);

  const filteredMembers = selectedOrg?.members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-emerald-400">Admin Settings</h1>
          <p className="text-gray-400 mt-1">
            {selectedOrg ? `Manage ${selectedOrg.name} organization settings` : "Select an organization to manage settings"}
          </p>
        </div>

        {selectedOrg ? (
          <Tabs defaultValue="members" className="space-y-6">
            <TabsList className="bg-gray-900/50 border-b border-neutral-800">
              <TabsTrigger value="members" className="gap-2">
                <Users2 className="h-4 w-4" />
                Members
              </TabsTrigger>
              <TabsTrigger value="roles" className="gap-2">
                <Shield className="h-4 w-4" />
                Roles & Permissions
              </TabsTrigger>
              <TabsTrigger value="organization" className="gap-2">
                <Building2 className="h-4 w-4" />
                Organization
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              {/* Actions Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              {/* Members Table */}
              <Card className="border-neutral-800/30">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full overflow-hidden">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-gray-200">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            member.role === "Owner" ? "bg-purple-500" :
                            member.role === "Admin" ? "bg-blue-500" :
                            "bg-gray-500"
                          }>
                            {member.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-400">
                          Mar 15, 2024
                        </TableCell>
                        <TableCell className="text-gray-400">
                          2 hours ago
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" className="hover:bg-gray-800/50">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="space-y-6">
              <Card className="p-6 border-neutral-800/30">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Role Permissions</h3>
                <div className="space-y-6">
                  {["Owner", "Admin", "Member"].map((role) => (
                    <div key={role} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          role === "Owner" ? "bg-purple-500" :
                          role === "Admin" ? "bg-blue-500" :
                          "bg-gray-500"
                        }>
                          {role}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          "Manage members",
                          "Invite members",
                          "Remove members",
                          "Edit organization",
                          "Manage billing",
                          "View analytics",
                          "Create projects",
                          "Delete projects",
                          "Manage API keys"
                        ].map((permission) => (
                          <div
                            key={permission}
                            className={`p-2 rounded-lg border ${
                              role === "Owner" ? "border-purple-500/20 bg-purple-500/5" :
                              role === "Admin" ? "border-blue-500/20 bg-blue-500/5" :
                              "border-gray-500/20 bg-gray-500/5"
                            }`}
                          >
                            <div className="text-sm text-gray-300">{permission}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="organization" className="space-y-6">
              <Card className="p-6 border-neutral-800/30">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Organization Settings</h3>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Organization Name</label>
                    <Input defaultValue={selectedOrg.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Organization ID</label>
                    <Input defaultValue={selectedOrg.id} disabled />
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600 mt-4">
                    Save Changes
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="p-6 text-center text-gray-400 border-neutral-800/30">
            Please select an organization to view and manage settings
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
