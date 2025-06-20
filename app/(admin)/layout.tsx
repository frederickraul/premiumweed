"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/css/satoshi.css";
import "@/app/css/style.css";
import "@/app/globalDashboard.css";


import React, { useEffect, useState } from "react";
import Loader from "../components/dashboard/common/Loader";
import ToasterProvider from "../providers/ToasterProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-gray-900 dark:text-bodydark">
        <ToasterProvider/>
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
