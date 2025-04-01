import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrgStore } from "@/store/orgStore";
import { FileText, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadDate: string;
}

const KnowledgeBank = () => {
  const { selectedOrgId, selectedProjectId, organizations, projects, documents } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const selectedProject = projects.find(proj => proj.id === selectedProjectId);

  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-gray-400" />;
  };

  const handleFileUpload = () => {
    // TODO: Implement file upload
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-200">Knowledge Bank</h1>
            <p className="text-gray-400 mt-1">
              {selectedProject 
                ? `Knowledge Bank for ${selectedOrg?.name} / ${selectedProject.name}`
                : selectedOrg 
                  ? `Knowledge Bank for ${selectedOrg.name}`
                  : "Select an organization and project to view knowledge bank"
              }
            </p>
          </div>
          <Button 
            className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg"
            onClick={handleFileUpload}
          >
            <Plus className="mr-2 h-4 w-4" /> Upload Document
          </Button>
        </div>

        <Card className="bg-neutral-900/50 border-neutral-800/30 rounded-xl overflow-hidden hover:border-neutral-800/50 transition-colors">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-neutral-800/30">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Size</TableHead>
                <TableHead className="text-gray-400">Uploaded By</TableHead>
                <TableHead className="text-gray-400">Upload Date</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow
                  key={doc.id}
                  className="hover:bg-neutral-800/30 border-neutral-800/30"
                >
                  <TableCell className="font-medium text-gray-200">
                    <div className="flex items-center gap-2">
                      {getFileIcon(doc.type)}
                      {doc.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{doc.type}</TableCell>
                  <TableCell className="text-gray-400">{doc.size}</TableCell>
                  <TableCell className="text-gray-400">{doc.uploadedBy}</TableCell>
                  <TableCell className="text-gray-400">{doc.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBank;
