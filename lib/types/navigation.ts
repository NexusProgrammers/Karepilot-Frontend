export interface TabItem {
  id: string;
  label: string;
  href: string;
}

export interface NavigationTabsProps {
  tabs: TabItem[];
  className?: string;
  maxWidth?: string;
  responsive?: boolean;
}

