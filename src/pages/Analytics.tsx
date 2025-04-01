import { Card } from "@/components/ui/card";
import { useOrgStore } from "@/store/orgStore";
import { BarChart3, Users, MessageSquare, Clock, Tag, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  const { selectedOrgId, selectedProjectId, organizations, projects } = useOrgStore();
  const selectedOrg = organizations.find(org => org.id === selectedOrgId);
  const selectedProject = projects.find(proj => proj.id === selectedProjectId);

  // State for selected character and version
  const [selectedCharacter, setSelectedCharacter] = useState<string>("all");
  const [selectedVersion, setSelectedVersion] = useState<string>("all");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 2, 1), // March 1, 2024
    to: new Date(2024, 3, 1),   // April 1, 2024
  });

  // Mock data for characters with their available versions
  const characters = [
    { 
      id: "john", 
      name: "John",
      versions: [
        { id: "v1.0.0", name: "v1.0.0", releaseDate: "2024-03-15" },
        { id: "v1.1.0", name: "v1.1.0", releaseDate: "2024-03-25" },
      ],
      totalInteractions: 8500,
      usagePercentage: 35,
    },
    { 
      id: "sarah", 
      name: "Sarah",
      versions: [
        { id: "v1.0.0", name: "v1.0.0", releaseDate: "2024-03-15" },
        { id: "v1.2.0", name: "v1.2.0", releaseDate: "2024-04-01" },
      ],
      totalInteractions: 6200,
      usagePercentage: 25,
    },
    { 
      id: "michael", 
      name: "Michael",
      versions: [
        { id: "v1.1.0", name: "v1.1.0", releaseDate: "2024-03-25" },
        { id: "v1.2.0", name: "v1.2.0", releaseDate: "2024-04-01" },
      ],
      totalInteractions: 4800,
      usagePercentage: 20,
    },
    { 
      id: "emma", 
      name: "Emma",
      versions: [
        { id: "v1.0.0", name: "v1.0.0", releaseDate: "2024-03-15" },
      ],
      totalInteractions: 3000,
      usagePercentage: 12,
    },
    { 
      id: "david", 
      name: "David",
      versions: [
        { id: "v1.2.0", name: "v1.2.0", releaseDate: "2024-04-01" },
      ],
      totalInteractions: 2000,
      usagePercentage: 8,
    },
  ];

  // Get available versions based on selected character
  const getAvailableVersions = () => {
    if (selectedCharacter === "all") {
      // Get unique versions across all characters
      const allVersions = new Set<string>();
      characters.forEach(char => {
        char.versions.forEach(v => allVersions.add(v.id));
      });
      return Array.from(allVersions).map(id => ({
        id,
        name: id,
        releaseDate: characters.find(c => c.versions.find(v => v.id === id))?.versions.find(v => v.id === id)?.releaseDate || "",
      }));
    } else {
      const char = characters.find(c => c.id === selectedCharacter);
      return char ? char.versions : [];
    }
  };

  // Reset version selection when character changes
  useEffect(() => {
    const availableVersions = getAvailableVersions();
    if (!availableVersions.find(v => v.id === selectedVersion)) {
      setSelectedVersion("all");
    }
  }, [selectedCharacter]);

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

  // Mock data for version analytics
  const versionAnalyticsData = {
    "john": {
      "v1.0.0": [
        { date: '2024-03-15', interactions: 400, responseTime: 0.83, successRate: 94 },
        { date: '2024-03-16', interactions: 450, responseTime: 0.82, successRate: 94.2 },
        { date: '2024-03-17', interactions: 480, responseTime: 0.82, successRate: 94.4 },
        { date: '2024-03-18', interactions: 520, responseTime: 0.81, successRate: 94.6 },
        { date: '2024-03-19', interactions: 550, responseTime: 0.81, successRate: 94.8 },
      ],
      "v1.1.0": [
        { date: '2024-03-25', interactions: 2000, responseTime: 0.78, successRate: 97 },
        { date: '2024-03-26', interactions: 2100, responseTime: 0.77, successRate: 97.1 },
        { date: '2024-03-27', interactions: 2200, responseTime: 0.77, successRate: 97.2 },
        { date: '2024-03-28', interactions: 2300, responseTime: 0.76, successRate: 97.3 },
        { date: '2024-03-29', interactions: 2400, responseTime: 0.76, successRate: 97.4 },
      ],
    },
    "sarah": {
      "v1.0.0": [
        { date: '2024-03-15', interactions: 400, responseTime: 0.83, successRate: 94 },
        { date: '2024-03-16', interactions: 450, responseTime: 0.82, successRate: 94.2 },
        { date: '2024-03-17', interactions: 480, responseTime: 0.82, successRate: 94.4 },
        { date: '2024-03-18', interactions: 520, responseTime: 0.81, successRate: 94.6 },
        { date: '2024-03-19', interactions: 550, responseTime: 0.81, successRate: 94.8 },
      ],
      "v1.2.0": [
        { date: '2024-04-01', interactions: 2500, responseTime: 0.72, successRate: 98 },
        { date: '2024-04-02', interactions: 2600, responseTime: 0.71, successRate: 98.1 },
        { date: '2024-04-03', interactions: 2700, responseTime: 0.71, successRate: 98.2 },
      ],
    },
    "michael": {
      "v1.1.0": [
        { date: '2024-03-25', interactions: 2000, responseTime: 0.78, successRate: 97 },
        { date: '2024-03-26', interactions: 2100, responseTime: 0.77, successRate: 97.1 },
        { date: '2024-03-27', interactions: 2200, responseTime: 0.77, successRate: 97.2 },
        { date: '2024-03-28', interactions: 2300, responseTime: 0.76, successRate: 97.3 },
        { date: '2024-03-29', interactions: 2400, responseTime: 0.76, successRate: 97.4 },
      ],
      "v1.2.0": [
        { date: '2024-04-01', interactions: 2500, responseTime: 0.72, successRate: 98 },
        { date: '2024-04-02', interactions: 2600, responseTime: 0.71, successRate: 98.1 },
        { date: '2024-04-03', interactions: 2700, responseTime: 0.71, successRate: 98.2 },
      ],
    },
    "emma": {
      "v1.0.0": [
        { date: '2024-03-15', interactions: 400, responseTime: 0.83, successRate: 94 },
        { date: '2024-03-16', interactions: 450, responseTime: 0.82, successRate: 94.2 },
        { date: '2024-03-17', interactions: 480, responseTime: 0.82, successRate: 94.4 },
        { date: '2024-03-18', interactions: 520, responseTime: 0.81, successRate: 94.6 },
        { date: '2024-03-19', interactions: 550, responseTime: 0.81, successRate: 94.8 },
      ],
    },
    "david": {
      "v1.2.0": [
        { date: '2024-04-01', interactions: 2500, responseTime: 0.72, successRate: 98 },
        { date: '2024-04-02', interactions: 2600, responseTime: 0.71, successRate: 98.1 },
        { date: '2024-04-03', interactions: 2700, responseTime: 0.71, successRate: 98.2 },
      ],
    },
  };

  // Mock data for topics
  const topicsData = {
    "john": {
      "v1.0.0": [
        { topic: "Topic 1", count: 100 },
        { topic: "Topic 2", count: 80 },
        { topic: "Topic 3", count: 60 },
        { topic: "Topic 4", count: 40 },
        { topic: "Topic 5", count: 20 },
      ],
      "v1.1.0": [
        { topic: "Topic 1", count: 120 },
        { topic: "Topic 2", count: 100 },
        { topic: "Topic 3", count: 80 },
        { topic: "Topic 4", count: 60 },
        { topic: "Topic 5", count: 40 },
      ],
    },
    "sarah": {
      "v1.0.0": [
        { topic: "Topic 1", count: 100 },
        { topic: "Topic 2", count: 80 },
        { topic: "Topic 3", count: 60 },
        { topic: "Topic 4", count: 40 },
        { topic: "Topic 5", count: 20 },
      ],
      "v1.2.0": [
        { topic: "Topic 1", count: 150 },
        { topic: "Topic 2", count: 120 },
        { topic: "Topic 3", count: 100 },
        { topic: "Topic 4", count: 80 },
        { topic: "Topic 5", count: 60 },
      ],
    },
    "michael": {
      "v1.1.0": [
        { topic: "Topic 1", count: 120 },
        { topic: "Topic 2", count: 100 },
        { topic: "Topic 3", count: 80 },
        { topic: "Topic 4", count: 60 },
        { topic: "Topic 5", count: 40 },
      ],
      "v1.2.0": [
        { topic: "Topic 1", count: 180 },
        { topic: "Topic 2", count: 150 },
        { topic: "Topic 3", count: 120 },
        { topic: "Topic 4", count: 100 },
        { topic: "Topic 5", count: 80 },
      ],
    },
    "emma": {
      "v1.0.0": [
        { topic: "Topic 1", count: 100 },
        { topic: "Topic 2", count: 80 },
        { topic: "Topic 3", count: 60 },
        { topic: "Topic 4", count: 40 },
        { topic: "Topic 5", count: 20 },
      ],
    },
    "david": {
      "v1.2.0": [
        { topic: "Topic 1", count: 180 },
        { topic: "Topic 2", count: 150 },
        { topic: "Topic 3", count: 120 },
        { topic: "Topic 4", count: 100 },
        { topic: "Topic 5", count: 80 },
      ],
    },
  };

  // Mock data for languages
  const languageData = {
    "john": {
      "v1.0.0": [
        { language: "English", percentage: 60 },
        { language: "Spanish", percentage: 20 },
        { language: "French", percentage: 10 },
        { language: "German", percentage: 5 },
        { language: "Italian", percentage: 5 },
      ],
      "v1.1.0": [
        { language: "English", percentage: 70 },
        { language: "Spanish", percentage: 15 },
        { language: "French", percentage: 5 },
        { language: "German", percentage: 5 },
        { language: "Italian", percentage: 5 },
      ],
    },
    "sarah": {
      "v1.0.0": [
        { language: "English", percentage: 60 },
        { language: "Spanish", percentage: 20 },
        { language: "French", percentage: 10 },
        { language: "German", percentage: 5 },
        { language: "Italian", percentage: 5 },
      ],
      "v1.2.0": [
        { language: "English", percentage: 80 },
        { language: "Spanish", percentage: 10 },
        { language: "French", percentage: 5 },
        { language: "German", percentage: 3 },
        { language: "Italian", percentage: 2 },
      ],
    },
    "michael": {
      "v1.1.0": [
        { language: "English", percentage: 70 },
        { language: "Spanish", percentage: 15 },
        { language: "French", percentage: 5 },
        { language: "German", percentage: 5 },
        { language: "Italian", percentage: 5 },
      ],
      "v1.2.0": [
        { language: "English", percentage: 85 },
        { language: "Spanish", percentage: 5 },
        { language: "French", percentage: 3 },
        { language: "German", percentage: 3 },
        { language: "Italian", percentage: 4 },
      ],
    },
    "emma": {
      "v1.0.0": [
        { language: "English", percentage: 60 },
        { language: "Spanish", percentage: 20 },
        { language: "French", percentage: 10 },
        { language: "German", percentage: 5 },
        { language: "Italian", percentage: 5 },
      ],
    },
    "david": {
      "v1.2.0": [
        { language: "English", percentage: 85 },
        { language: "Spanish", percentage: 5 },
        { language: "French", percentage: 3 },
        { language: "German", percentage: 3 },
        { language: "Italian", percentage: 4 },
      ],
    },
  };

  // Get the appropriate data based on selections
  const getFilteredData = () => {
    if (selectedCharacter === "all") {
      const allData = [];
      Object.keys(versionAnalyticsData).forEach(char => {
        Object.keys(versionAnalyticsData[char]).forEach(version => {
          allData.push(...versionAnalyticsData[char][version]);
        });
      });
      return allData;
    } else {
      const charData = versionAnalyticsData[selectedCharacter];
      if (selectedVersion === "all") {
        const allData = [];
        Object.keys(charData).forEach(version => {
          allData.push(...charData[version]);
        });
        return allData;
      } else {
        return charData[selectedVersion] || [];
      }
    }
  };

  const filteredData = getFilteredData();

  // Get topics data based on selections
  const getTopicsData = () => {
    if (selectedCharacter === "all") {
      // Aggregate topics across all characters and versions
      const allTopics = new Map<string, number>();
      Object.values(topicsData).forEach(charData => {
        if (charData) {
          Object.values(charData).forEach(versionData => {
            if (versionData && Array.isArray(versionData)) {
              versionData.forEach(topic => {
                allTopics.set(topic.topic, (allTopics.get(topic.topic) || 0) + topic.count);
              });
            }
          });
        }
      });
      return Array.from(allTopics.entries())
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5); // Top 5 topics
    } else {
      const charData = topicsData[selectedCharacter];
      if (!charData) return [];
      
      if (selectedVersion === "all") {
        // Aggregate topics across all versions for this character
        const allTopics = new Map<string, number>();
        Object.values(charData).forEach(versionData => {
          if (versionData && Array.isArray(versionData)) {
            versionData.forEach(topic => {
              allTopics.set(topic.topic, (allTopics.get(topic.topic) || 0) + topic.count);
            });
          }
        });
        return Array.from(allTopics.entries())
          .map(([topic, count]) => ({ topic, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // Top 5 topics
      } else {
        return charData[selectedVersion] || [];
      }
    }
  };

  // Get language data based on selections
  const getLanguageData = () => {
    if (selectedCharacter === "all") {
      // Aggregate languages across all characters and versions
      const allLanguages = new Map<string, number>();
      let totalPercentage = 0;
      let count = 0;
      
      Object.values(languageData).forEach(charData => {
        if (charData) {
          Object.values(charData).forEach(versionData => {
            if (versionData && Array.isArray(versionData)) {
              versionData.forEach(lang => {
                allLanguages.set(lang.language, (allLanguages.get(lang.language) || 0) + lang.percentage);
                totalPercentage += lang.percentage;
                count++;
              });
            }
          });
        }
      });

      return Array.from(allLanguages.entries())
        .map(([language, total]) => ({
          language,
          percentage: Math.round((total / count) * 10) / 10 // Round to 1 decimal place
        }))
        .sort((a, b) => b.percentage - a.percentage);
    } else {
      const charData = languageData[selectedCharacter];
      if (!charData) return [];
      
      if (selectedVersion === "all") {
        // Aggregate languages across all versions for this character
        const allLanguages = new Map<string, number>();
        let totalPercentage = 0;
        let count = 0;
        
        Object.values(charData).forEach(versionData => {
          if (versionData && Array.isArray(versionData)) {
            versionData.forEach(lang => {
              allLanguages.set(lang.language, (allLanguages.get(lang.language) || 0) + lang.percentage);
              totalPercentage += lang.percentage;
              count++;
            });
          }
        });

        return Array.from(allLanguages.entries())
          .map(([language, total]) => ({
            language,
            percentage: Math.round((total / count) * 10) / 10 // Round to 1 decimal place
          }))
          .sort((a, b) => b.percentage - a.percentage);
      } else {
        return charData[selectedVersion] || [];
      }
    }
  };

  // Calculate summary stats based on filtered data
  const calculateStats = () => {
    if (filteredData.length === 0) return [];
    
    const totalInteractions = filteredData.reduce((sum, item) => sum + item.interactions, 0);
    const avgResponseTime = filteredData.reduce((sum, item) => sum + item.responseTime, 0) / filteredData.length;
    const avgSuccessRate = filteredData.reduce((sum, item) => sum + item.successRate, 0) / filteredData.length;
    
    return [
      {
        title: "Total Interactions",
        value: totalInteractions.toLocaleString(),
        change: "+12%",
        icon: MessageSquare,
      },
      {
        title: "Active Characters",
        value: selectedCharacter === "all" ? characters.length.toString() : "1",
        change: "+1",
        icon: Users,
      },
      {
        title: "Avg. Response Time",
        value: `${avgResponseTime.toFixed(2)}s`,
        change: "-0.1s",
        icon: Clock,
      },
      {
        title: "Success Rate",
        value: `${avgSuccessRate.toFixed(1)}%`,
        change: "+5%",
        icon: BarChart3,
      },
    ];
  };

  const stats = calculateStats();

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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <label className="text-sm text-gray-400 mb-2 block">Character</label>
            <Select value={selectedCharacter} onValueChange={setSelectedCharacter}>
              <SelectTrigger className="bg-neutral-900 border-neutral-800 text-gray-200">
                <SelectValue placeholder="Select Character" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800 text-gray-200">
                <SelectItem value="all">All Characters</SelectItem>
                {characters.map(character => (
                  <SelectItem key={character.id} value={character.id}>{character.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/3">
            <label className="text-sm text-gray-400 mb-2 block">Version</label>
            <Select value={selectedVersion} onValueChange={setSelectedVersion}>
              <SelectTrigger className="bg-neutral-900 border-neutral-800 text-gray-200">
                <SelectValue placeholder="Select Version" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800 text-gray-200">
                <SelectItem value="all">All Versions</SelectItem>
                {getAvailableVersions().map(version => (
                  <SelectItem key={version.id} value={version.id}>{version.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/3">
            <label className="text-sm text-gray-400 mb-2 block">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal bg-neutral-900 border-neutral-800 text-gray-200 hover:bg-neutral-800`}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-neutral-900 border-neutral-800" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="bg-neutral-900"
                />
              </PopoverContent>
            </Popover>
          </div>
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Character Usage Distribution (only shown when all characters selected) */}
          {selectedCharacter === "all" && (
            <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Character Usage Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={characters}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="usagePercentage"
                      nameKey="name"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {characters.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={[
                          '#10B981', // emerald
                          '#6366F1', // indigo
                          '#8B5CF6', // violet
                          '#EC4899', // pink
                          '#F43F5E'  // rose
                        ][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem'
                      }}
                      labelStyle={{ color: '#9CA3AF' }}
                      formatter={(value: number) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* Interactions Chart */}
          <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Interactions</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Line type="monotone" dataKey="interactions" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Response Time Chart */}
          <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Response Time</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Line type="monotone" dataKey="responseTime" stroke="#6366F1" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Success Rate Chart */}
          <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Success Rate</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[90, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Line type="monotone" dataKey="successRate" stroke="#EC4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Popular Topics Chart */}
          <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Popular Topics</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart 
                  data={getTopicsData()}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis 
                    dataKey="topic" 
                    type="category" 
                    stroke="#9CA3AF" 
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Bar dataKey="count" fill="#10B981" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Language Distribution Chart */}
          <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Language Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getLanguageData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="language"
                    label={({ language, percentage }) => `${language}: ${percentage}%`}
                  >
                    {getLanguageData().map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={[
                          '#10B981', // emerald
                          '#6366F1', // indigo
                          '#8B5CF6', // violet
                          '#EC4899', // pink
                          '#F43F5E'  // rose
                        ][index % 5]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                    formatter={(value: number) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Version Comparison Chart (only shown when viewing a specific character) */}
          {selectedCharacter !== "all" && selectedVersion === "all" && (
            <Card className="p-6 bg-neutral-900/50 border-neutral-800/30 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Version Comparison</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={getAvailableVersions().map(v => {
                    const versionData = versionAnalyticsData[selectedCharacter][v.id] || [];
                    const totalInteractions = versionData ? versionData.reduce((sum, item) => sum + item.interactions, 0) : 0;
                    const avgResponseTime = versionData ? versionData.reduce((sum, item) => sum + item.responseTime, 0) / versionData.length : 0;
                    const avgSuccessRate = versionData ? versionData.reduce((sum, item) => sum + item.successRate, 0) / versionData.length : 0;
                    
                    return {
                      name: v.name,
                      interactions: totalInteractions,
                      responseTime: avgResponseTime,
                      successRate: avgSuccessRate
                    };
                  })}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem'
                      }}
                      labelStyle={{ color: '#9CA3AF' }}
                    />
                    <Bar dataKey="interactions" fill="#8B5CF6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
