import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, UserSquare2 } from "lucide-react";

const Templates = () => {
  const templates = [
    {
      id: "1",
      name: "Customer Support Agent",
      description: "A friendly and helpful customer support agent template",
      category: "Support",
    },
    {
      id: "2",
      name: "Sales Representative",
      description: "Professional sales representative optimized for lead conversion",
      category: "Sales",
    },
    {
      id: "3",
      name: "Interview Coach",
      description: "AI coach that helps prepare for job interviews",
      category: "Career",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-emerald-400">Templates</h1>
            <p className="text-gray-400 mt-1">
              Pre-built templates to quickly create new experiences
            </p>
          </div>
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Template
          </Button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className="p-6 bg-gray-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="h-8 w-8 rounded-md bg-emerald-500/10 flex items-center justify-center">
                  <UserSquare2 className="h-4 w-4 text-emerald-400" />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-400 hover:text-emerald-400"
                >
                  Use Template
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-200">{template.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{template.description}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    {template.category}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
