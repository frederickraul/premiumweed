"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/app/css/satoshi.css";
import "@/app/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "../components/dashboard/common/Loader";

// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Weedgrowers',
//   description: 'Premium Weed',
// }

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
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen">
          {loading ? <Loader /> : children}
        </div>
      </body>
  );
}
