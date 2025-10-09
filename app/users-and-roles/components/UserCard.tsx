import { User } from "@/lib/users-and-roles/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "admin":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-300";
      case "manager":
        return "bg-pink-100 text-pink-800 dark:bg-pink-950/20 dark:text-pink-300";
      case "technician":
        return "bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300";
      case "staff":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300";
      case "security":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-300";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300";
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-950/20 dark:text-orange-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950/20 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <div className="hidden lg:flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-card-foreground mb-1">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{user.email}</p>

            <div className="flex flex-wrap gap-2">
              {user.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getTagColor(
                    tag
                  )}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-6 md:gap-20">
          <div className="text-left min-w-[120px]">
            <p className="text-sm text-muted-foreground">Last Active</p>
            <p className="text-sm font-medium text-card-foreground">
              {user.lastActive}
            </p>
            <div className="flex items-center justify-start gap-1 mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {user.location}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Button
              variant="outline"
              size="sm"
              className="px-4 py-2 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-4 py-2 text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-lg"
            >
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs sm:text-sm">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-card-foreground mb-1 truncate">
              {user.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 truncate">
              {user.email}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-2">
              {user.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${getTagColor(
                    tag
                  )}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground">Last Active</p>
            <p className="text-xs sm:text-sm font-medium text-card-foreground">
              {user.lastActive}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                {user.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-card-foreground bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-1 sm:p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-lg"
            >
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}