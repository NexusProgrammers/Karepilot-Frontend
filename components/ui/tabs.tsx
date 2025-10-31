"use client";

import * as React from "react";

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  ),
);
Tabs.displayName = "Tabs";

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`inline-flex items-center justify-center rounded-full bg-muted p-2 ${className}`}
      {...props}
    />
  ),
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className = "", active = false, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`rounded-full transition whitespace-nowrap cursor-pointer ${
        active
          ? "bg-background text-foreground shadow-sm"
          : "bg-muted text-muted-foreground hover:bg-accent"
      } ${className}`}
      {...props}
    />
  ),
);
TabsTrigger.displayName = "TabsTrigger";


