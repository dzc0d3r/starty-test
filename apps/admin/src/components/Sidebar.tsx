import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useAdminGetMeQuery, useLogoutMutation } from "api";
import {
  BarChart3,
  Building2,
  FileText,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Analytics", icon: BarChart3 },
  { to: "/companies", label: "Companies", icon: Building2 },
  { to: "/scpis", label: "SCPIs", icon: FileText },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const { data: user, isLoading } = useAdminGetMeQuery();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };

  const displayName = user?.name ?? (isLoading ? "Loading..." : "Admin User");
  const displayEmail =
    user?.email ?? (isLoading ? "Loading..." : "admin@example.com");

  const initials =
    (displayName &&
      displayName
        .split(" ")
        .map((s) => s[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()) ||
    "AU";

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
          <NavLink key={to} to={to} end>
            {({ isActive }: { isActive: boolean }) => (
              <div
                className={cn(
                  "group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  "hover:scale-[1.02] hover:bg-gray-800/60 hover:shadow-lg",
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-white shadow-lg"
                    : "text-gray-300 hover:text-white",
                )}
              >
                {/* Active indicator glow */}
                {isActive && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-600/10" />
                )}

                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{label}</span>

                {/* Active border */}
                {isActive && (
                  <div className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-indigo-500 to-purple-600" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-800 p-4">
        <div className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl bg-gray-800/30 p-3 transition-all duration-200 hover:bg-gray-800/50">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            {user?.name ? (
              <span className="font-medium">{initials}</span>
            ) : (
              <UserIcon className="h-5 w-5 text-white" />
            )}

            {/* small loading spinner overlay while fetching */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white/70" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {displayName}
            </p>
            <p className="truncate text-xs text-gray-400">{displayEmail}</p>
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
