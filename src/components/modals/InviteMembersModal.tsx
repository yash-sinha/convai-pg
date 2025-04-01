import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/store/orgStore";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface InviteMembersModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (emails: string[], role: Role) => void;
}

export function InviteMembersModal({ open, onClose, onSubmit }: InviteMembersModalProps) {
  const [emails, setEmails] = useState<string>("");
  const [role, setRole] = useState<Role>("Member");

  const handleSubmit = () => {
    // Split emails by newline or comma and trim whitespace
    const emailList = emails
      .split(/[\n,]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);

    onSubmit(emailList, role);
    setEmails("");
    setRole("Member");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className="sm:max-w-[600px]">
      <h1 className="text-4xl font-semibold text-gray-200 mb-6">
        Invite Members
      </h1>

      <p className="text-lg text-gray-400 mb-8">
        Add email addresses (one per line or comma-separated) and select their role.
      </p>

      <div className="space-y-8">
        <div>
          <label className="text-lg text-gray-400 block mb-2">Email Addresses</label>
          <Textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="john@example.com&#10;sarah@example.com&#10;mike@example.com"
            className="h-32 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-lg"
          />
        </div>

        <div>
          <label className="text-lg text-gray-400 block mb-2">Role</label>
          <Select value={role} onValueChange={(value) => setRole(value as Role)}>
            <SelectTrigger className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 font-normal">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent 
              side="bottom"
              className="bg-black border-neutral-800 p-2 w-[var(--radix-select-trigger-width)] mt-2 [&_[role=option]]:text-gray-200 [&_[role=option]]:focus:text-gray-200"
              avoidCollisions={false}
            >
              {[
                { role: "Owner", label: "Owner" },
                { role: "Admin", label: "Admin" },
                { role: "Member", label: "Member" },
              ].map((item) => (
                <SelectItem
                  key={item.role}
                  value={item.role}
                  className={cn(
                    "rounded-lg p-3 font-normal cursor-pointer pl-3 pr-3 [&>span:first-child]:hidden transition-colors data-[highlighted]:bg-neutral-800/30 data-[highlighted]:!text-gray-200",
                    role === item.role ? "bg-neutral-800/50" : ""
                  )}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <Button
          type="button"
          variant="ghost"
          className="text-lg font-normal hover:bg-neutral-800"
          onClick={onClose}
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="button"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-normal"
          onClick={handleSubmit}
        >
          Send Invites
        </Button>
      </div>
    </Modal>
  );
}
