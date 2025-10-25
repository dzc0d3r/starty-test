import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useLogoutMutation } from "api";
import {
  BarChart3,
  Building2,
  FileText,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Analytics", icon: BarChart3 },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/scpis", label: "SCPIs", icon: FileText },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <div className="relative flex h-screen w-70 flex-col border-r border-gray-800 bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-800 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-gray-400">Management Console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-2 p-4">
        {navLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                "hover:scale-[1.02] hover:bg-gray-800/60 hover:shadow-lg",
                isActive
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-white shadow-lg"
                  : "text-gray-300 hover:text-white",
              )
            }
          >
            {/* Active indicator glow */}
            {({ isActive }) =>
              isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-600/10" />
              )
            }

            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{label}</span>

            {/* Active border */}
            {({ isActive }) =>
              isActive && (
                <div className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-indigo-500 to-purple-600" />
              )
            }
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-800 p-4">
        <div className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl bg-gray-800/30 p-3 transition-all duration-200 hover:bg-gray-800/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Admin User
            </p>
            <p className="truncate text-xs text-gray-400">admin@example.com</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4 text-gray-400" />
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 border border-transparent py-3 text-gray-300 transition-all duration-200 hover:border-red-500/20 hover:bg-red-500/10 hover:text-white"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="h-5 w-5" />
          {logoutMutation.isPending ? "Logging Out..." : "Logout"}
        </Button>
      </div>

      {/* Background Accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-gray-900 to-black" />
    </div>
  );
};
