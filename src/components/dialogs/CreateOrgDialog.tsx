import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CreateOrgDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
}

export function CreateOrgDialog({ open, onOpenChange, onSubmit }: CreateOrgDialogProps) {
  const [orgName, setOrgName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orgName.trim()) {
      onSubmit(orgName);
      setOrgName("");
      onOpenChange(false);
      navigate("/org-settings"); // Navigate to org settings
    }
  };

  return (
    <Modal open={open} onClose={() => onOpenChange(false)} className="sm:max-w-[500px]">
      <h1 className="text-4xl font-semibold text-gray-200 mb-6">
        Create an organization
      </h1>

      <p className="text-lg text-gray-400 mb-8">
        Create an organization to manage your projects and team members.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="text-lg text-gray-400 block mb-2">Organization Name</label>
          <Input
            id="orgName"
            name="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-lg"
            autoComplete="off"
          />
        </div>

        <div className="flex justify-between pt-4">
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
            className="bg-emerald-500 text-white hover:bg-emerald-600 text-lg px-8 rounded-lg font-medium disabled:bg-emerald-500/50"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
