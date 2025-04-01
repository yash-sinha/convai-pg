import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface CreateOrgDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string, teamMembers: string[]) => void;
}

// Mock data for team members - replace with actual data
const mockTeamMembers = [
  { id: '1', email: 'alice@example.com' },
  { id: '2', email: 'bob@example.com' },
  { id: '3', email: 'charlie@example.com' },
  { id: '4', email: 'david@example.com' },
];

export function CreateOrgDialog({ open, onOpenChange, onSubmit }: CreateOrgDialogProps) {
  const [orgName, setOrgName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orgName.trim()) {
      onSubmit(orgName, selectedMembers);
      setOrgName("");
      setSelectedMembers([]);
      onOpenChange(false);
    }
  };

  const handleRemoveMember = (memberToRemove: string) => {
    setSelectedMembers(members => members.filter(m => m !== memberToRemove));
  };

  const filteredMembers = mockTeamMembers.filter(member => 
    !selectedMembers.includes(member.email) &&
    member.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="sm:max-w-[900px]">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-semibold text-gray-200 mb-6">
            Create an organization
          </h1>

          <p className="text-lg text-gray-400 mb-8">
            Create an organization to manage your projects and team members.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-lg text-gray-400 block mb-2">Organization Name</label>
              <Input
                id="orgName"
                name="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-lg"
                autoComplete="off"
                placeholder="Enter organization name"
              />
            </div>

            <div className="flex justify-between pt-6 border-t border-neutral-800">
              <Button 
                type="button" 
                variant="ghost"
                className="text-lg font-normal hover:bg-neutral-800"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!orgName.trim()}
                className={cn(
                  "text-lg font-normal px-8 rounded-lg transition-colors",
                  !orgName.trim()
                    ? "bg-neutral-800/50 text-gray-400 cursor-not-allowed"
                    : "bg-transparent text-gray-200 border border-neutral-700 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30"
                )}
              >
                Create Organization
              </Button>
            </div>
          </form>
        </div>

        <div className="border-l border-neutral-800 pl-8">
          <label className="text-lg text-gray-400 block mb-4">Team Members</label>
          
          <div className="rounded-lg border border-neutral-700">
            <div className="relative">
              <Input
                placeholder="Search team members..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-12 bg-transparent text-gray-200 border-0 border-b border-neutral-700 focus:ring-0 rounded-none text-base"
              />
            </div>
            
            {selectedMembers.length > 0 && (
              <div className="p-2 border-b border-neutral-700">
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map(member => (
                    <div 
                      key={member}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-neutral-800/50 text-gray-200 text-sm"
                    >
                      {member}
                      <button
                        onClick={() => handleRemoveMember(member)}
                        className="ml-1 text-gray-400 hover:text-gray-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="p-2">
              {filteredMembers.length === 0 ? (
                <div className="py-6 text-sm text-gray-400 text-center">
                  No team members found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredMembers.map(member => (
                    <button
                      key={member.id}
                      onClick={() => {
                        setSelectedMembers(prev => [...prev, member.email]);
                        setSearchValue("");
                      }}
                      className="w-full flex items-center px-2 py-3 rounded-lg cursor-pointer text-gray-200 hover:bg-neutral-800/50 hover:text-gray-200 text-left"
                    >
                      {member.email}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            Team members will receive an email invitation to join the organization.
          </p>
        </div>
      </div>
    </Modal>
  );
}
