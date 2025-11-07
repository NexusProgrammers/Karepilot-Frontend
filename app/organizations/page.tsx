"use client";

import { useMemo, useState } from "react";

import { DashboardLayout } from "@/components/DashboardLayout";
import StatsGrid from "@/components/common/StatsGrid";
import RecentActivity from "@/components/common/RecentActivity";
import { OrganizationNav } from "./components/OrganizationNav";
import VenueTypeDistribution from "./components/VenueTypeDistribution";
import { OrganizationHeader } from "@/components/common/OrganizationHeader";
import { CreateOrganizationModal } from "@/components/common/CreateOrganizationModal";
import {
  useGetOrganizationsQuery,
} from "@/lib/api/organizationsApi";
import { Organization } from "@/lib/types/organization";
import { OrganizationFormMode } from "@/lib/validations";
import { ActivityItem } from "@/lib/dashboard/types";
import {
  DashboardIcon,
  activeIcon,
  hospitalsIcon,
  shoppingMallIcon,
  airPortIcon,
  onePlaceIcon,
  otherIcon,
} from "@/icons/Assets";

interface ModalState {
  isOpen: boolean;
  mode: OrganizationFormMode;
  organizationId?: string | null;
}

export default function OrganizationsOverviewPage() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: "create",
    organizationId: null,
  });

  const openModal = (mode: OrganizationFormMode, organization?: Organization) => {
    setModalState({
      isOpen: true,
      mode,
      organizationId: organization?.id ?? null,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: "create",
      organizationId: null,
    });
  };

  const {
    data: organizationsData,
    isLoading: isLoadingOrganizations,
  } = useGetOrganizationsQuery({
    page: 1,
    limit: 200,
  });

  const {
    data: inactiveOrganizationsData,
    isLoading: isLoadingInactive,
  } = useGetOrganizationsQuery({
    page: 1,
    limit: 1,
    isActive: false,
  });

  const organizations = organizationsData?.data?.organizations ?? [];
  const totalCount = organizationsData?.data?.pagination?.total ?? 0;
  const inactiveCount = inactiveOrganizationsData?.data?.pagination?.total ?? 0;
  const activeOrganizations = organizations.filter((organization) => organization.isActive);
  const activeCount = Math.max(totalCount - inactiveCount, 0);

  const venueDistribution = useMemo(() => {
    const distributionMap = new Map<string, number>();
    activeOrganizations.forEach((organization) => {
      const type = organization.organizationType || "Other";
      distributionMap.set(type, (distributionMap.get(type) ?? 0) + 1);
    });

    const iconMap: Record<string, { icon: any; color: string }> = {
      Hospital: { icon: hospitalsIcon, color: "bg-green-100" },
      Airport: { icon: airPortIcon, color: "bg-blue-100" },
      "Shopping Mall": { icon: shoppingMallIcon, color: "bg-yellow-100" },
      Mall: { icon: shoppingMallIcon, color: "bg-yellow-100" },
      "Open Place": { icon: onePlaceIcon, color: "bg-pink-100" },
    };

    return Array.from(distributionMap.entries()).map(([type, count]) => {
      const iconConfig = iconMap[type] ?? { icon: otherIcon, color: "bg-muted" };
      return {
        id: type,
        title: type,
        count: count,
        description: `${count} active ${count === 1 ? "organization" : "organizations"}`,
        icon: iconConfig.icon,
        iconColor: iconConfig.color,
      };
    });
  }, [activeOrganizations]);

  const stats = useMemo(() => {
    return [
      {
        id: "total",
        title: "Total Organizations",
        value: totalCount,
        note: `${activeCount} active / ${inactiveCount} inactive`,
        icon: DashboardIcon,
      },
      {
        id: "active",
        title: "Active Organizations",
        value: activeCount,
        note: "Currently operational",
        icon: activeIcon,
      },
      {
        id: "inactive",
        title: "Inactive Organizations",
        value: inactiveCount,
        note: "Temporarily disabled",
        icon: otherIcon,
      },
      {
        id: "templates",
        title: "Venue Types",
        value: venueDistribution.length,
        note: "Active categories",
        icon: shoppingMallIcon,
      },
    ];
  }, [totalCount, activeCount, inactiveCount, venueDistribution.length]);

  const activities = useMemo(() => {
    if (!activeOrganizations.length) {
      return [] as ActivityItem[];
    }

    const recent = [...activeOrganizations]
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt ?? a.createdAt ?? "").getTime();
        const dateB = new Date(b.updatedAt ?? b.createdAt ?? "").getTime();
        return dateB - dateA;
      })
      .slice(0, 4);

    return recent.map((organization) => {
      const timestamp = organization.updatedAt ?? organization.createdAt ?? "";
      const formattedTime = timestamp
        ? new Date(timestamp).toLocaleString()
        : "Unknown time";

      return {
        id: organization.id,
        text: `${organization.name} ${
          organization.updatedAt ? "updated" : "created"
        }`,
        author: organization.updatedBy?.firstName
          ? `${organization.updatedBy.firstName} ${organization.updatedBy.lastName ?? ""}`.trim()
          : "System",
        time: formattedTime,
        color: organization.updatedAt ? "bg-green-500" : "bg-blue-500",
      } as ActivityItem;
    });
  }, [activeOrganizations]);

  return (
    <DashboardLayout pageTitle="Organizations">
      <OrganizationHeader onButtonClick={() => openModal("create")} />
      <OrganizationNav />
      <StatsGrid
        stats={stats.map((stat) => ({
          ...stat,
        value: isLoadingOrganizations || isLoadingInactive ? "-" : stat.value,
        }))}
      />
      <VenueTypeDistribution venues={venueDistribution} />
      <RecentActivity
        title="Recent Organization Activity"
        subtitle="Latest updates and changes"
        buttonText="View Analytics"
        activities={activities}
        maxItems={4}
      />
      <CreateOrganizationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        organizationId={modalState.organizationId ?? undefined}
        mode={modalState.mode}
      />
    </DashboardLayout>
  );
}