export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  backLink?: string;
  pageTitle?: string;
  organizationName?: string;
  showOrganizationHeader?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

export interface VenueTemplateSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export interface SystemHealthItem {
  id: string;
  name: string;
  status: "healthy" | "warning" | "error";
  value: string;
}

export interface SystemHealthComponentProps {
  items: SystemHealthItem[];
}

export interface RecentReportsProps {
  reports: any[];
}

export interface OrganizationHeaderProps {
  organizationName: string;
  onOrganizationChange?: () => void;
}

export interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isDeleting?: boolean;
}

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

export interface CustomTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  error?: string;
  touched?: boolean;
}

export interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

export interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId?: string | null;
  mode?: "create" | "edit";
}

export interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface LineData {
  name: string;
  [key: string]: any;
}

export interface LineConfig {
  dataKey: string;
  color: string;
  name: string;
  strokeWidth?: number;
  dot?: boolean;
}

export interface LineChartComponentProps {
  data: LineData[];
  lines: LineConfig[];
  xAxisKey: string;
  longitude: number;
  poiName?: string;
  className?: string;
}

export interface GoogleMapProps {
  pois: any[];
  onPoiClick?: (poi: any) => void;
  className?: string;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  className?: string;
}
