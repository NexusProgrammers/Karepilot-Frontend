export interface AlertLogProps {
  alerts: any[];
}

export interface AlertOverviewProps {
  alert: any;
}

export interface AlertStatsCardsProps {
  stats: any[];
}

export interface AlertsAndGeofencingHeaderProps {
  activeTab: string;
}

export interface AlertsPageContentProps {
  alerts: any[];
  status: string;
}

export interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export interface CreateGeofenceZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export interface GeofenceZoneCardProps {
  zone: any;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface RealTimeAssetMapProps {
  assets: any[];
  geofenceZones: any[];
}
