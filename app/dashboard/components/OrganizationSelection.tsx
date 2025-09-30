"use client";

import { Button } from "@/components/ui/button";
import dashboardIcon from "@/assets/dashboard/dashboard.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/DashboardLayout";
import KarepilotLogin from "@/components/Login";

const organizations = [
  {
    name: "Central Medical Hospital",
    location: "Terminal 4, Queens, NY",
    type: "Hospital",
  },
  {
    name: "JFK International Airport",
    location: "087 Maple Dr, Houston, TX",
    type: "Airport",
  },
  {
    name: "Manhattan Shopping Center",
    location: "Unit 202, Chicago, IL",
    type: "Mall",
  },
  {
    name: "Velvet Lane Luxury Plaza",
    location: "789 Oak St, San Diego, CA",
    type: "Mall",
  },
  {
    name: "Northgate Plaza",
    location: "456 Pine Ave, Los Angeles, CA",
    type: "Open Plaza",
  },
  {
    name: "Crescent Pavilion",
    location: "123 Main St, New York, NY",
    type: "Shopping Mall",
  },
];

const menuOptions = [
  "Local Mall",
  "Shopping Center",
  "Community Hospital",
  "Fashion Outlet",
  "Grocery Store",
  "Urgent Care Facility",
  "Electronics Retailer",
];

export function OrganizationSelection() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<
    (typeof organizations)[0] | null
  >(null);

  const handleSelectClick = (org: (typeof organizations)[0]) => {
    setSelectedOrg(org);
    setShowMenu(!showMenu);
  };

  const handleClickOutside = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  if (!loggedIn) {
    return <KarepilotLogin onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto" onClick={handleClickOutside}>
        <div className="text-center mb-7">
          <div className="flex w-full items-center justify-center">
            <Image width={60} height={60} src={dashboardIcon} alt="img" />
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
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.58464 1.29175C4.55756 1.29175 1.29297 4.55634 1.29297 8.58342C1.29297 12.6105 4.55756 15.8751 8.58464 15.8751C12.6117 15.8751 15.8763 12.6105 15.8763 8.58342C15.8763 4.55634 12.6117 1.29175 8.58464 1.29175ZM0.0429688 8.58342C0.0429688 3.86598 3.8672 0.041748 8.58464 0.041748C13.3021 0.041748 17.1263 3.86598 17.1263 8.58342C17.1263 10.7172 16.3439 12.6682 15.0504 14.1653L17.7766 16.8915C18.0207 17.1356 18.0207 17.5313 17.7766 17.7754C17.5325 18.0194 17.1368 18.0194 16.8927 17.7754L14.1665 15.0491C12.6694 16.3427 10.7184 17.1251 8.58464 17.1251C3.8672 17.1251 0.0429688 13.3008 0.0429688 8.58342Z"
                    fill="#A1A1AA"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search organizations"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D8C6C] placeholder:text-gray-900 border-0"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-gray-200 p-10 hover:border-[#3D8C6C] transition-shadow relative"
            >
              <div className="text-center mb-4">
                <div className="flex w-full items-center justify-center">
                  <Image width={60} height={60} src={dashboardIcon} alt="img" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{org.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{org.location}</p>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {org.type}
                </span>
              </div>
              <div className="relative">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectClick(org);
                  }}
                  className="w-full bg-blue-100 hover:bg-[#3B73B5] text-[#3B73B5] hover:text-white cursor-pointer"
                >
                  Select
                </Button>

                {showMenu && selectedOrg?.name === org.name && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {menuOptions.map((option, idx) => (
                      <Link
                        key={idx}
                        href="/dashboard/1"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => setShowMenu(false)}
                      >
                        {option}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
