import { Phone, Mail, Clock } from "lucide-react";
import { POI } from "@/lib/points-of-interest/types";

interface ContactInformationCardProps {
  poi: POI;
}

export function ContactInformationCard({ poi }: ContactInformationCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Contact Information
      </h3>
      <div className="space-y-4">
        {poi.contact?.phone && (
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              <p className="text-base text-card-foreground">
                {poi.contact.phone}
              </p>
            </div>
          </div>
        )}
        {poi.contact?.email && (
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-base text-card-foreground">
                {poi.contact.email}
              </p>
            </div>
          </div>
        )}
        {poi.contact?.operatingHours && (
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Operating Hours</p>
              <p className="text-base text-card-foreground">
                {poi.contact.operatingHours}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
