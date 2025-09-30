"use client";

import { AdminProvider } from "@/contexts/AdminContext";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </AdminProvider>
  );
}