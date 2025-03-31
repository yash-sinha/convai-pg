
import OrganizationCard from "@/components/organization/OrganizationCard";

const organizations = [
  {
    name: "Studio Alpha",
    members: [
      { name: "Alice", role: "Admin" },
      { name: "Bob", role: "Member" }
    ]
  },
  {
    name: "Indie Games",
    members: [
      { name: "Charlie", role: "Admin" },
      { name: "Diana", role: "Member" },
      { name: "Evan", role: "Member" }
    ]
  }
];

const Organizations = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Organizations</h1>
      <div className="space-y-4">
        {organizations.map((org) => (
          <OrganizationCard 
            key={org.name}
            name={org.name}
            members={org.members}
          />
        ))}
      </div>
    </div>
  );
};

export default Organizations;
