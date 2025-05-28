"use client";

import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../ClickOutside";
import useLocalStorage from "@/app/hooks/dashboard/useLocalStorage";
import SidebarItem from "./SidebarItem";
import { FaBoxes, FaUsers} from "react-icons/fa";


import WeedIcon from '@/app/components/icons/icon-weed.svg';
import ProfileIcon from '@/app/components/icons/icon-profile.svg';
import SettingsIcon from '@/app/components/icons/icon-settings.svg';
import DashboardIcon from '@/app/components/icons/icon-dashboard.svg';
import ListIcon from  '@/app/components/icons/icon-listings.svg';
import MessagesIcon from '@/app/components/icons/icon-messages.svg';
import InvoiceIcon from '@/app/components/icons/icon-invoice.svg';


import { adminAuthDashboards, devAdminAuthDashboards, onlySellerAuthDashboards, regularAuthDashboards } from "@/app/const/permissions";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  userRole: string;
}

const menuGroups = [
  {
    name: "MENU",
    allowed: devAdminAuthDashboards,
    menuItems: [
      {
        icon: (
          <DashboardIcon className="fill-gray-500"/>
        ),
        label: "Dashboard",
        route: "/dashboard"
      },
      {
        icon: <ListIcon  height={20} width={20}/>,
        label: "Listings",
        route: "/dashboard/listings"
      },
      {
        icon: <FaBoxes/>,
        label: "Products",
        route: "/dashboard/products"
      },
      {
        icon: <FaUsers/>,
        label: "Users",
        route: "/dashboard/users"
      },
      
      
     
    ],
  },
  {
    name: "MENU",
    allowed: onlySellerAuthDashboards,
    menuItems: [
      {
        icon: (
          <DashboardIcon className="fill-gray-500"/>
        ),
        label: "Dashboard",
        route: "/dashboard"
      },
      {
        icon: <ListIcon  height={20} width={20}/>,
        label: "My Listings",
        route: "/dashboard/listings"
      },
      {
        icon: <FaBoxes/>,
        label: "My Products",
        route: "/dashboard/products"
      },
    ],
  },
  {
    name: "SUPPORT",
    allowed: adminAuthDashboards,
    menuItems: [
      
      {
        icon: <InvoiceIcon className="fill-gray-500"/>,
        label: "Invoice",
        route: "/dashboard/invoice"
      }
    ],
  },
  {
    name: "OTHERS",
    allowed: regularAuthDashboards,
    menuItems: [
      {
        icon: (
          <ProfileIcon height={20} width={20} className="fill-gray-500"/>
        ),
        label: "Profile",
        route: "/dashboard/profile",
      },
      {
        icon: <MessagesIcon className="fill-gray-500"/>,
        label: "Messages",
        route: "/dashboard/messages"
      },
    ],
  },
  {
    name: "SETTINGS",
    allowed: adminAuthDashboards,
    menuItems: [
      {
        icon: (
          <SettingsIcon height={20} width={20} className="fill-gray-500"/>
        ),
        label: "Settings",
        route: "/dashboard/settings",
      },
      {
        icon: (
          <WeedIcon height={20} width={20} className="fill-gray-500"/>
        ),
        label: "Logo",
        route: "/dashboard/logo",
      },
     
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, userRole }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`
          fixed 
          left-0 
          top-0 
          z-9999 
          flex 
          h-screen 
          w-72.5 
          flex-col 
          overflow-y-hidden 
          duration-300 
          ease-linear 
          dark:bg-gray-900 
          bg-white px-5 
          border-r
        border-gray-200 
        dark:border-gray-800 
          lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-1 py-5.5 lg:py-6.5">
          <Link href="/" className="flex  items-center">
            <Image
              width={50}
              height={50}
              src={"/images/logo.png"}
              alt="Logo"
              priority
            />
            <span className="ml-2 text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">WeedGrowers</span>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-1 py-4 lg:mt-9 lg:px-1">
            {menuGroups.map((group, groupIndex) => (
              
              <div key={groupIndex}>
                {group.allowed.includes(userRole) &&
                  <div>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                    key={menuIndex}
                    item={menuItem}
                    pageName={pageName}
                    setPageName={setPageName}
                    />
                  ))}
                </ul>
                  </div>
                   }
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
