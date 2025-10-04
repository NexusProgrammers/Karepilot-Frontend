"use client";

import React, { useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultActive?: string;
};

export default function Tabs({ tabs, defaultActive }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0].id);

  return (
    <div>
      <div className="flex gap-1 sm:gap-3 mb-6 bg-muted max-w-[400px] rounded-full p-1 sm:p-2 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap transition cursor-pointer rounded-full 
              px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm
              ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "bg-muted text-muted-foreground"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
}