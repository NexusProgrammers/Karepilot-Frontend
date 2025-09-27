import { DashboardLayout } from "@/components/DashboardLayout";
import { Building2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const organizations = [
  {
    name: "Central Medical Hospital",
    location: "Terminal 4, Queens, NY",
    type: "Hospital",
    icon: "🏥",
  },
  {
    name: "JFK International Airport",
    location: "087 Maple Dr, Houston, TX",
    type: "Airport",
    icon: "✈️",
  },
  {
    name: "Manhattan Shopping Center",
    location: "Unit 202, Chicago, IL",
    type: "Mall",
    icon: "🏬",
  },
  {
    name: "Velvet Lane Luxury Plaza",
    location: "789 Oak St, San Diego, CA",
    type: "Mall",
    icon: "🏬",
  },
  {
    name: "Northgate Plaza",
    location: "456 Pine Ave, Los Angeles, CA",
    type: "Open Plaza",
    icon: "🏢",
  },
  {
    name: "Crescent Pavilion",
    location: "123 Main St, New York, NY",
    type: "Shopping Mall",
    icon: "🏬",
  },
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-7">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Select an Organization
          </h1>
          <p className="text-gray-600">
            Choose an organization to access the admin dashboard
          </p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search organizations"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-gray-200 p-10 hover:border-green-700 transition-shadow"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{org.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{org.location}</p>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {org.type}
                </span>
              </div>
              <Button className="w-full bg-blue-100 hover:bg-blue-900 text-blue-900 hover:text-white cursor-pointer">
                Select
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
