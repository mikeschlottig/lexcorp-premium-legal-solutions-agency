import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
export function App() {
  const { pathname } = useLocation();
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <ConsultationProvider>
      <div className="relative min-h-screen flex flex-col selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <Toaster richColors position="top-right" />
      </div>
    </ConsultationProvider>
  );
}