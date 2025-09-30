"use client";

import { useAdmin } from "@/contexts/AdminContext";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import LoadingSpinner from "./LoadingSpinner";

export default function AdminLayoutWrapper({ children }) {
  const { admin, loading, isAuthenticated } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [loading, isAuthenticated, pathname, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Show login page (with header and footer from ConditionalLayout)
  if (!isAuthenticated && pathname === "/admin/login") {
    return (
      <div className="pt-20"> {/* Add padding for header */}
        {children}
      </div>
    );
  }

  // Show 404 for non-authenticated users trying to access admin pages
  if (!isAuthenticated) {
    return (
      <div className="pt-20"> {/* Add padding for header */}
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You need to be logged in to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show admin layout for authenticated users
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <AdminSidebar />
        <div className="flex-1 w-full">
          <AdminHeader />
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}