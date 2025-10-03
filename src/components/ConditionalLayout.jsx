"use client";

import { usePathname } from "next/navigation";
import Header from "@/component/Header/header";
import Footer from "@/component/Footer/footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current route should show header and footer
  const shouldShowHeaderFooter = () => {
    // Always show on non-admin routes
    if (!pathname?.startsWith('/admin')) {
      return true;
    }
    
    // Show on admin login page
    if (pathname === '/admin/login') {
      return true;
    }
    
    // Show on admin error pages (not-found, error, etc.)
    if (pathname.includes('/error') || pathname.includes('/not-found') || pathname.includes('/404')) {
      return true;
    }
    
    // Hide on all other admin routes
    return false;
  };
  
  const showHeaderFooter = shouldShowHeaderFooter();

  return (
    <>
      {/* Only show Header if conditions are met */}
      {showHeaderFooter && <Header />}
      {children}
      {/* Only show Footer if conditions are met */}
      {showHeaderFooter && <Footer />}
      {/* Show WhatsApp button on all non-admin routes */}
      {showHeaderFooter && <WhatsAppFloat />}
    </>
  );
}