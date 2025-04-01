import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: ({ name, tier }: { name: string; tier: string }) => void;
}

export function CreateProjectModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateProjectModalProps) {
  const [name, setName] = useState("");
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
      onSubmit({ name: name.trim(), tier: selectedCredit });
      setName("");
      setSelectedCredit("");
      onOpenChange(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="sm:max-w-[600px]">
      <h1 className="text-4xl font-semibold text-gray-200 mb-6">
        Create a project
      </h1>

      <p className="text-lg text-gray-400 mb-8">
        Create a project using your available project credits or purchase a new one.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
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
          <label className="text-lg text-gray-400 block mb-2">Project Tier</label>
          <Select value={selectedCredit} onValueChange={setSelectedCredit}>
            <SelectTrigger className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 font-normal">
              <SelectValue placeholder="Select a project tier" />
            </SelectTrigger>
            <SelectContent 
              side="bottom"
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

        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="ghost"
            className="text-lg font-normal hover:bg-neutral-800"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          {selectedCredit && (canCreate ? (
            <Button 
              type="submit"
              disabled={!name.trim()}
              className="bg-emerald-500 text-white hover:bg-emerald-600 text-lg px-8 rounded-lg font-medium disabled:bg-emerald-500/50"
            >
              Create
            </Button>
          ) : (
            <Button 
              type="button"
              onClick={() => window.open('https://www.convai.com/pricing', '_blank')}
              className="bg-emerald-500 text-white hover:bg-emerald-600 text-lg px-8 rounded-lg font-medium inline-flex items-center"
            >
              Buy {selectedCredit} Project <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          ))}
        </div>
      </form>
    </Modal>
  );
}
