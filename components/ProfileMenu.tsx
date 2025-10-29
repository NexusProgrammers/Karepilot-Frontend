"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { Settings, User, LogOut, Moon, Sun } from "@/icons/Icons";
import { useDispatch } from "react-redux";
import { clearToken } from "@/lib/store/slices/authSlice";
import { logoutAction } from "@/lib/actions/auth";
import toast from "react-hot-toast";

export function ProfileMenu() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      dispatch(clearToken());
      await logoutAction();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const getUserInitials = () => {
    return 'A';
  };

  const getUserName = () => {
    return 'Admin User';
  };

  const getUserRole = () => {
    return 'Admin';
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full cursor-pointer"
      >
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-[#3D8C6C]/10 text-[#3D8C6C] font-medium">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full cursor-pointer"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-[#3D8C6C]/10 text-[#3D8C6C] font-medium">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-foreground">{getUserName()}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {getUserRole()}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : (
            <Moon className="mr-2 h-4 w-4" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
