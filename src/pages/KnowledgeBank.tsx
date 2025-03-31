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

const KnowledgeBank = () => {
  const { documents } = useOrgStore();
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const handleFileUpload = () => {
    // TODO: Implement file upload
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-200">Knowledge Bank</h1>
        <Button onClick={handleFileUpload} className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Card className="bg-black/20 border-neutral-800/30">
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
                <TableCell className="text-gray-400">{doc.uploadedAt}</TableCell>
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
  );
};

export default KnowledgeBank;
