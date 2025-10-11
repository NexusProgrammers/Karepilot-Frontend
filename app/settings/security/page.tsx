"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import NavigationTabs from "@/components/common/NavigationTabs";
import { SecuritySettings } from "./components/SecuritySettings";
import { PasswordSettings } from "./components/PasswordSettings";
import { settingsTabs, securitySettings } from "@/lib/settings/data";

export default function SecurityPage() {
  return (
    <DashboardLayout
      pageTitle="Settings"
      showOrganizationHeader={true}
      showBackButton={true}
      backLink="/"
      organizationName="Central Medical Hospital"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences and manage your account for your organization
          </p>
        </div>

        <NavigationTabs
          tabs={settingsTabs}
          maxWidth="max-w-[350px]"
          responsive={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SecuritySettings
            title="Security Settings"
            subtitle="Configure security and access control settings"
            settings={securitySettings}
          />

          <PasswordSettings
            title="Password Settings"
            subtitle="Update your password for enhanced security"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
