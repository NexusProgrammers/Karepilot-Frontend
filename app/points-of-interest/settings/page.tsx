import { DashboardLayout } from "@/components/DashboardLayout";
import React from "react";

function page() {
  return (
    <DashboardLayout
      pageTitle="Settings"
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
      backLink="/points-of-interest"
      showBackButton={true}
    >
      <h1>Settings</h1>
    </DashboardLayout>
  );
}

export default page;
