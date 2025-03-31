import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Key, Plus } from "lucide-react";

const ApiKeys = () => {
  const apiKeys = [
    {
      id: "1",
      name: "Production Key",
      key: "ck_prod_***********************",
      created: "2024-03-15",
      lastUsed: "2024-03-31",
    },
    {
      id: "2",
      name: "Development Key",
      key: "ck_dev_************************",
      created: "2024-03-20",
      lastUsed: "2024-03-30",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-emerald-400">API Keys</h1>
            <p className="text-gray-400 mt-1">
              Manage API keys for accessing your project
            </p>
          </div>
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
          >
            <Plus className="mr-2 h-4 w-4" /> Create API Key
          </Button>
        </div>

        {/* API Keys Table */}
        <Card className="bg-gray-900/50 border-neutral-800/30 rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-800/30 hover:bg-transparent">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">API Key</TableHead>
                <TableHead className="text-gray-400">Created</TableHead>
                <TableHead className="text-gray-400">Last Used</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id} className="border-neutral-800/30">
                  <TableCell className="font-medium text-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-emerald-500/10 flex items-center justify-center">
                        <Key className="h-4 w-4 text-emerald-400" />
                      </div>
                      {apiKey.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-gray-400">{apiKey.key}</TableCell>
                  <TableCell className="text-gray-400">{apiKey.created}</TableCell>
                  <TableCell className="text-gray-400">{apiKey.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-emerald-400"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* API Documentation */}
        <Card className="p-6 bg-gray-900/50 border-neutral-800/30 rounded-xl">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Quick Start</h2>
          <div className="space-y-4">
            <p className="text-gray-200">To use the API, include your key in the Authorization header:</p>
            <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm text-gray-200 font-mono">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </pre>
            <Button 
              className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
            >
              View API Documentation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiKeys;
