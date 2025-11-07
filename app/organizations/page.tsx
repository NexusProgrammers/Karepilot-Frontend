"use client";

import { useState } from "react";

import { DashboardLayout } from "@/components/DashboardLayout";
import StatsGrid from "@/components/common/StatsGrid";
import RecentActivity from "@/components/common/RecentActivity";
import { OrganizationNav } from "./components/OrganizationNav";
import VenueTypeDistribution from "./components/VenueTypeDistribution";
import { OrganizationHeader } from "@/components/common/OrganizationHeader";
import { CreateOrganizationModal } from "@/components/common/CreateOrganizationModal";
import {
  organizationActivities,
  overviewStats,
  venueTypes,
} from "@/lib/organization/data";

export default function OrganizationsOverviewPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout pageTitle="Organizations">
      <OrganizationHeader onButtonClick={() => setIsModalOpen(true)} />
      <OrganizationNav />
      <StatsGrid stats={overviewStats} />
      <VenueTypeDistribution venues={venueTypes} />
      <RecentActivity
        title="Recent Organization Activity"
        subtitle="Latest updates and changes"
        buttonText="View Analytics"
        activities={organizationActivities}
        maxItems={4}
      />
      <CreateOrganizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  );
}