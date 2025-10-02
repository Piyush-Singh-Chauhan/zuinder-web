"use client";

import { usePathname } from "next/navigation";

// Get page title based on pathname
function getPageTitle(pathname) {
  if (pathname === "/admin") return "Dashboard";
  if (pathname.startsWith("/admin/blogs")) return "Blog Management";
  if (pathname.startsWith("/admin/portfolio")) return "Portfolio Management";
  if (pathname.startsWith("/admin/contacts")) return "Contact Messages";
  if (pathname.startsWith("/admin/newsletter")) return "Newsletter Subscribers";
  if (pathname.startsWith("/admin/team-members")) return "Team Management";
  if (pathname.startsWith("/admin/services")) return "Service Management"
  return "Admin Panel";
}

export default function AdminHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <div className="bg-white shadow border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
          </div>
          
          <div className="flex items-center">
            <div className="text-sm text-gray-500 text-center sm:text-left">
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}