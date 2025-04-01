import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: ({ name, tier, description }: { name: string; tier: string; description?: string }) => void;
}

export function CreateProjectModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCredit, setSelectedCredit] = useState<string>("");

  // This would come from your credits API
  const availableCredits = [
    { tier: "Free", available: 2 },
    { tier: "Pro", available: 1 },
    { tier: "Scale", available: 0 },
    { tier: "Enterprise", available: 0 },
  ];

  const selectedCreditInfo = availableCredits.find(c => c.tier === selectedCredit);
  const canCreate = selectedCreditInfo?.available ?? 0 > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedCredit && canCreate) {
      onSubmit({ 
        name: name.trim(), 
        tier: selectedCredit,
        description: description.trim() || undefined 
      });
      setName("");
      setDescription("");
      setSelectedCredit("");
      onOpenChange(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="sm:max-w-[900px]">
      <h1 className="text-4xl font-semibold text-gray-200 mb-6">
        Create a project
      </h1>

      <p className="text-lg text-gray-400 mb-8">
        Create a project using your available project credits or purchase a new one.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <div>
              <label className="text-lg text-gray-400 block mb-2">Project Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-lg"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="text-lg text-gray-400 block mb-2">
                Project Description <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., A customer support training project to help new agents learn best practices and handle common scenarios"
                className="min-h-[120px] bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-base resize-none"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-lg text-gray-400 block mb-2">Project Tier</label>
              <Select value={selectedCredit} onValueChange={setSelectedCredit}>
                <SelectTrigger className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 font-normal">
                  <SelectValue placeholder="Select a project tier" />
                </SelectTrigger>
                <SelectContent 
                  side="bottom"
                  align="end"
                  className="bg-black border-neutral-800 p-2 w-[var(--radix-select-trigger-width)] mt-2 [&_[role=option]]:text-gray-200 [&_[role=option]]:focus:text-gray-200"
                  avoidCollisions={false}
                >
                  {availableCredits.map((credit) => (
                    <SelectItem
                      key={credit.tier}
                      value={credit.tier}
                      className={cn(
                        "rounded-lg p-3 font-normal cursor-pointer pl-3 pr-3 [&>span:first-child]:hidden transition-colors data-[highlighted]:bg-neutral-800/30 data-[highlighted]:!text-gray-200",
                        selectedCredit === credit.tier ? "bg-neutral-800/50" : "",
                        credit.available > 0 ? "!text-gray-200" : "!text-gray-400"
                      )}
                    >
                      <div className="flex items-center justify-between w-full text-inherit gap-4">
                        <span className="text-inherit">{credit.tier}</span>
                        <div className={cn(
                          "px-2 py-0.5 rounded-full text-sm font-medium",
                          credit.available > 0 
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-neutral-700/30 text-neutral-400"
                        )}>
                          {credit.available} available
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!canCreate && selectedCredit && (
              <div className="flex items-center justify-between py-4 px-4 rounded-xl bg-neutral-800/30">
                <p className="text-sm text-gray-400">
                  No credits available for {selectedCredit} tier.
                </p>
                <Button variant="link" className="text-blue-500 hover:text-blue-400 whitespace-nowrap">
                  Purchase Project <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
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
            disabled={!name.trim() || !selectedCredit || !canCreate}
            className={cn(
              "text-lg font-normal px-8 rounded-lg transition-colors",
              !name.trim() || !selectedCredit || !canCreate
                ? "bg-neutral-800/50 text-gray-400 cursor-not-allowed"
                : "bg-transparent text-gray-200 border border-neutral-700 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30"
            )}
          >
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
