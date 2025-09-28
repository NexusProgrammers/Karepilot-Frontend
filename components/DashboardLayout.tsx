"use client";

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { ProfileMenu } from './ProfileMenu';


interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-100 px-6 py-4 shadow-[0_2px_5px_-2px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="lg:hidden w-10"></div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <ProfileMenu />
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}