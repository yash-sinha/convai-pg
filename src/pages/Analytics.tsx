import { Card } from "@/components/ui/card";
import { useOrgStore } from "@/store/orgStore";
import { BarChart3, Users, MessageSquare, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { selectedOrgId, selectedProjectId, organizations, projects } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const selectedProject = projects.find(proj => proj.id === selectedProjectId);

  // Mock data for the charts
  const interactionData = [
    { date: '2024-03-01', interactions: 1200 },
    { date: '2024-03-02', interactions: 1800 },
    { date: '2024-03-03', interactions: 1600 },
    { date: '2024-03-04', interactions: 2200 },
    { date: '2024-03-05', interactions: 2800 },
    { date: '2024-03-06', interactions: 2400 },
    { date: '2024-03-07', interactions: 3000 },
  ];

  const characterData = [
    { name: 'John', interactions: 4500, avgResponseTime: 0.8 },
    { name: 'Sarah', interactions: 3200, avgResponseTime: 1.2 },
    { name: 'Michael', interactions: 2800, avgResponseTime: 0.9 },
    { name: 'Emma', interactions: 2200, avgResponseTime: 1.1 },
    { name: 'David', interactions: 1900, avgResponseTime: 1.0 },
  ];

  const pieData = [
    { name: 'John', value: 35 },
    { name: 'Sarah', value: 25 },
    { name: 'Michael', value: 20 },
    { name: 'Emma', value: 12 },
    { name: 'David', value: 8 },
  ];

  const COLORS = ['#10B981', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E'];

  const stats = [
    {
      title: "Total Interactions",
      value: "15.7k",
      change: "+12%",
      icon: MessageSquare,
    },
    {
      title: "Active Characters",
      value: "5",
      change: "+1",
      icon: Users,
    },
    {
      title: "Avg. Response Time",
      value: "0.9s",
      change: "-0.1s",
      icon: Clock,
    },
    {
      title: "Engagement Rate",
      value: "92%",
      change: "+5%",
      icon: BarChart3,
    },
  ];

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-200">Analytics</h1>
          <p className="text-gray-400 mt-1">
            {selectedProject 
              ? `Analytics for ${selectedOrg?.name} / ${selectedProject.name}`
              : selectedOrg 
                ? `Analytics for ${selectedOrg.name}`
                : "Select an organization and project to view analytics"
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-emerald-400" />
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-semibold text-gray-200 mt-1">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Interactions Over Time */}
          <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Interactions Over Time</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={interactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="interactions" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Character Usage Distribution */}
          <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Character Usage Distribution</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Character Performance */}
          <Card className="xl:col-span-2 p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl hover:border-neutral-800/50 transition-colors">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Character Performance</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={characterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="interactions" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
