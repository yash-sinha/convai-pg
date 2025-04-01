import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

interface CreateExperienceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateExperienceModal = ({ open, onOpenChange }: CreateExperienceModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // TODO: Implement experience creation
      console.log("Creating experience:", { name, description, imageUrl });
      setName("");
      setDescription("");
      setImageUrl("");
      onOpenChange(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="sm:max-w-[900px]">
      <h1 className="text-4xl font-semibold text-gray-200 mb-6">
        Create an experience
      </h1>

      <p className="text-lg text-gray-400 mb-8">
        Create a new experience template for your mock interactions.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <div>
              <label className="text-lg text-gray-400 block mb-2">Experience Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-lg"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="text-lg text-gray-400 block mb-2">
                Description <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., A cozy conversation with a friendly barista who shares stories about their coffee journey"
                className="min-h-[120px] bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-base resize-none"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <label className="text-lg text-gray-400 block mb-2">
                Image URL <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="h-12 bg-transparent text-gray-200 border border-neutral-700 rounded-xl focus:ring-0 focus:border-blue-500/50 text-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="h-12 px-6 bg-neutral-800/50 hover:bg-neutral-700 text-gray-200 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-12 px-6 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl"
          >
            Create Experience
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateExperienceModal;
