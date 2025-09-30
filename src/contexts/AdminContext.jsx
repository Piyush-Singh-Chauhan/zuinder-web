"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    initializeAdmin();
  }, []);

  const initializeAdmin = async () => {
    try {
      // First, auto-initialize admin if needed
      const initResponse = await fetch("/api/admin/auth/auto-init", {
        method: "POST"
      });
      const initData = await initResponse.json();
      
      if (initData.success && !initData.adminExists) {
        console.log("✅ Admin auto-created:", initData.credentials);
        console.log("🔑 Use these credentials to login:");
        console.log("📧 Email:", initData.credentials.email);
        console.log("🔐 Password:", initData.credentials.password);
      }
      
      // Then check authentication
      await checkAuth();
    } catch (error) {
      console.error("Admin initialization failed:", error);
      // Still try to check auth even if init fails
      await checkAuth();
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/auth/verify");
      const data = await response.json();
      
      if (data.success) {
        setAdmin(data.admin);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setAdmin(data.admin);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });
      setAdmin(null);
    } catch (error) {
      console.error("Logout error:", error);
      setAdmin(null);
    }
  };

  const value = {
    admin,
    loading,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!admin,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}