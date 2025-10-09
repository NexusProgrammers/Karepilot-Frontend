import { DashboardLayout } from "@/components/DashboardLayout";
import React from "react";

function page() {
  return (
    <DashboardLayout
      pageTitle="Buildings"
      organizationName="Central Medical Hospital"
      showOrganizationHeader={true}
      backLink="/points-of-interest"
      showBackButton={true}
    >
     <h1>
        Buildings
     </h1>
    </DashboardLayout>
  );
}

export default page;
