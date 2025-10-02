"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Blogs", href: "/admin/blogs", icon: "📝" },
  { name: "Portfolio", href: "/admin/portfolio", icon: "💼" },
  { name: "Services", href: "/admin/services", icon: "⚙️" },
  { name: "Team Members", href: "/admin/team-members", icon: "👥" },
  { name: "Contacts", href: "/admin/contacts", icon: "📧" },
  { name: "Newsletter", href: "/admin/newsletter", icon: "📬" },
];

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { admin, logout } = useAdmin();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Desktop sidebar - sticky positioned */}
      <div className="hidden lg:block lg:sticky lg:top-0 lg:left-0 lg:z-40 lg:w-64 lg:h-screen">
        <div className="flex h-full flex-col bg-[#004A70]">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center px-6 bg-[#F15A29]">
            <h1 className="text-xl font-bold text-white">Zuinder Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-[#F15A29] text-white' 
                      : 'text-gray-300 hover:bg-[#4A90A4] hover:text-white'
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 bg-[#F15A29] rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {admin?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-white truncate">{admin?.name}</p>
                <p className="text-xs text-gray-300 truncate">{admin?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-red-600 hover:text-white transition-colors"
            >
              <span className="mr-3">🚪</span>
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#004A70] transform transition-transform duration-300 ease-in-out lg:hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Logo and Close Button */}
          <div className="flex h-16 shrink-0 items-center justify-between px-6 bg-[#F15A29]">
            <h1 className="text-xl font-bold text-white">Zuinder Admin</h1>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-1 text-white hover:bg-[#004A70] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-[#F15A29] text-white' 
                      : 'text-gray-300 hover:bg-[#4A90A4] hover:text-white'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center mb-3">
              <div className="h-8 w-8 bg-[#F15A29] rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {admin?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-white truncate">{admin?.name}</p>
                <p className="text-xs text-gray-300 truncate">{admin?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-red-600 hover:text-white transition-colors"
            >
              <span className="mr-3">🚪</span>
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu button - positioned on the right side */}
      <div className="lg:hidden">
        <button
          type="button"
          className="absolute top-4 right-4 z-40 inline-flex mr-4 items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-2 mt-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </>
  );
}