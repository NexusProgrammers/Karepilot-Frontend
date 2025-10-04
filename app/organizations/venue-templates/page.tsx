import { DashboardLayout } from "@/components/DashboardLayout";
import { OrganizationNav } from "../components/OrganizationNav";

export default function page() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-0">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-foreground">Venue Templates</h1>
          <p className="text-muted-foreground mb-6">
            Manage venue templates and configurations
          </p>
        </div>
        <button className="bg-[#3D8C6C] p-3 rounded-full text-white flex gap-2 items-center cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add Template
        </button>
      </div>
      <OrganizationNav />
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-2">
            Venue Templates
          </h2>
          <p className="text-muted-foreground">
            Pre-configured templates for different venue types
          </p>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No templates yet</h3>
          <p className="text-muted-foreground mb-4">Create your first venue template to get started</p>
          <button className="bg-[#3D8C6C] text-white px-4 py-2 rounded-lg hover:bg-[#2d6b52] transition-colors">
            Create Template
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}