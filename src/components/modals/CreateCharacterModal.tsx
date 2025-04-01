import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Pencil, LayoutTemplate, Sparkles, ExternalLink, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreateCharacterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCharacterModal = ({ open, onOpenChange }: CreateCharacterModalProps) => {
  const navigate = useNavigate();

  const handleTemplates = () => {
    onOpenChange(false);
    navigate("/templates");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1000px] bg-black/95 border-neutral-800">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-neutral-800/50 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <DialogHeader>
          <h1 className="text-4xl font-semibold text-gray-200 mb-6">
            Create a character
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Choose how you'd like to create your character. You can start from scratch, use a template, or let our wizard guide you.
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Create from Scratch */}
          <div className="group relative rounded-xl bg-transparent p-6 border border-neutral-700 hover:border-emerald-500/30 transition-all flex flex-col">
            <div className="flex flex-col items-center text-center flex-grow">
              <div className="mb-4 p-4 rounded-full bg-neutral-800/30 text-gray-200 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                <Pencil className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Create from Scratch</h3>
              <p className="text-gray-400 mb-6">
                Start with a blank canvas and build your character exactly how you want it
              </p>
            </div>
            <Button 
              variant="outline"
              className="w-full h-12 bg-transparent text-gray-200 border-neutral-700 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 rounded-xl text-lg mt-auto transition-all"
            >
              Start Fresh
            </Button>
          </div>

          {/* Create from Template */}
          <div className="group relative rounded-xl bg-transparent p-6 border border-neutral-700 hover:border-emerald-500/30 transition-all flex flex-col">
            <div className="flex flex-col items-center text-center flex-grow">
              <div className="mb-4 p-4 rounded-full bg-neutral-800/30 text-gray-200 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                <LayoutTemplate className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Use Template</h3>
              <p className="text-gray-400 mb-6">
                Choose from our pre-built templates and customize them to your needs
              </p>
            </div>
            <Button 
              variant="outline"
              className="w-full h-12 bg-transparent text-gray-200 border-neutral-700 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 rounded-xl text-lg mt-auto transition-all"
              onClick={handleTemplates}
            >
              Browse Templates
            </Button>
          </div>

          {/* Use Wizard */}
          <div className="group relative rounded-xl bg-transparent p-6 border border-neutral-700 hover:border-emerald-500/30 transition-all flex flex-col">
            <div className="flex flex-col items-center text-center flex-grow">
              <div className="mb-4 p-4 rounded-full bg-neutral-800/30 text-gray-200 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Use Wizard</h3>
              <p className="text-gray-400 mb-6">
                Let our wizard guide you through the character creation process
              </p>
            </div>
            <Button 
              variant="outline"
              className="w-full h-12 bg-transparent text-gray-200 border-neutral-700 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 rounded-xl text-lg mt-auto transition-all"
            >
              Start Wizard
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
          <p className="text-sm text-gray-400">
            Need more characters? Upgrade your plan to create unlimited characters.
          </p>
          <Button variant="link" className="text-blue-500 hover:text-blue-400">
            Purchase Credits <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCharacterModal;
