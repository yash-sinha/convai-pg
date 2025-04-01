import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useOrgStore } from "@/store/orgStore";
import { ArrowUpRight, CreditCard } from "lucide-react";

const BillingMetric = ({ 
  label, 
  used, 
  total, 
  unit 
}: { 
  label: string; 
  used: number; 
  total: number; 
  unit: string;
}) => {
  const percentage = (used / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-200">{label}</span>
        <span className="text-gray-200">
          {used}/{total} {unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

const Billing = () => {
  const { selectedOrgId, selectedProjectId, organizations, projects } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const selectedProject = projects.find(proj => proj.id === selectedProjectId);

  const metrics = [
    {
      label: "Characters",
      used: 75,
      total: 100,
      unit: ""
    },
    {
      label: "API Calls",
      used: 8500,
      total: 10000,
      unit: ""
    },
    {
      label: "Pixel Streaming Minutes",
      used: 450,
      total: 1000,
      unit: "min"
    },
    {
      label: "ElevenLabs Voice Generation",
      used: 75,
      total: 100,
      unit: "min"
    },
    {
      label: "Interaction Quota",
      used: 15000,
      total: 20000,
      unit: "msgs"
    }
  ];

  const billingHistory = [
    {
      id: 1,
      description: "Monthly subscription",
      date: "2023-02-15",
      amount: 49
    },
    {
      id: 2,
      description: "Monthly subscription",
      date: "2023-01-15",
      amount: 49
    }
  ];

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-200">Billing</h1>
            <p className="text-gray-400 mt-1">
              {selectedProject 
                ? `Billing for ${selectedOrg?.name} / ${selectedProject.name}`
                : selectedOrg 
                  ? `Billing for ${selectedOrg.name}`
                  : "Select an organization and project to view billing"
              }
            </p>
          </div>
          <Button 
            className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg"
          >
            <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
          </Button>
        </div>

        {/* Current Plan */}
        <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Current Plan</h2>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-200">Scale</h3>
              <p className="text-gray-300">$49/month</p>
            </div>
            <Button 
              className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg"
            >
              Change Plan
            </Button>
          </div>
        </Card>

        {/* Usage */}
        <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Usage</h2>
          <div className="space-y-4">
            {metrics.map((metric) => (
              <BillingMetric
                key={metric.label}
                label={metric.label}
                used={metric.used}
                total={metric.total}
                unit={metric.unit}
              />
            ))}
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Payment Method</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-gray-300" />
              <div>
                <p className="text-gray-200">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-300">Expires 12/25</p>
              </div>
            </div>
            <Button 
              className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg"
            >
              Update
            </Button>
          </div>
        </Card>

        {/* Billing History */}
        <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Billing History</h2>
          <div className="space-y-4">
            {billingHistory.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b border-neutral-800/30 last:border-0">
                <div>
                  <p className="text-gray-200">{item.description}</p>
                  <p className="text-sm text-gray-300">{item.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-200">${item.amount}</span>
                  <Button 
                    size="sm"
                    className="bg-neutral-800 hover:bg-neutral-700 text-gray-200 rounded-lg h-8 w-8 p-0"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cancel Subscription */}
        <div className="flex justify-end">
          <Button 
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg"
          >
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
