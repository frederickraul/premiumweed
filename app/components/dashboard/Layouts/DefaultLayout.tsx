"use client";
import React, { useState, ReactNode } from "react";
import Header from "../Header";
import { SafeUser } from "@/app/types";
import Sidebar from "../Sidebar";
import { adminAuthDashboards } from "@/app/const/permissions";
import { useRouter } from "next/navigation";
import NotAllowed from "../Dashboard/NotAllowed";

export default function DefaultLayout({
  children,
  currentUser,
  notifications,
  reloadPage,
}: {
  children: React.ReactNode;
  currentUser?: SafeUser | null;
  notifications?: any;
  reloadPage?:any;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="block min-h-screen h-full overflow-hiddenx">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={currentUser?.role || ""}/>
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header currentUser={currentUser} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} notifications={notifications} reloadPage={reloadPage}/>
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
