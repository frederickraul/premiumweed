import { Nunito } from "next/font/google";
import '../globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google'
import Navbar from "../components/app/navbar";

import LoginModal from '../components/app/modals/LoginModal';
import RegisterModal from "../components/app/modals/RegisterModal";

import ToasterProvider from "../providers/ToasterProvider";
import getCurrentUser from "../actions/getCurrentUser";
import SearchModal from "../components/app/modals/SearchModal";
import Footer from "../components/app/footer";
import { Suspense } from "react";
import Loading from "../Loading";
import ListingModal from "../components/app/modals/ListingModal";
import getNotificationsByRecipientId from "../actions/getNotificationsByRecipientId";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import PricingModal from "../components/app/modals/PricingModals";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weedgrowers',
  description: 'Premium Weed',
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  const notifications = await getNotificationsByRecipientId();
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body className={font.className}>
        <div className="relative min-h-[100vh]">
            <div className="pb-[30px] sm:pb-0">
              <ToasterProvider/>
              <ListingModal/>
              <LoginModal/>
              <SearchModal/>
              <RegisterModal/>
              <PricingModal/>
           
              <Navbar currentUser={currentUser} notifications={notifications} session={session}/>
            </div>
            
            <Suspense fallback={<Loading/>}>
            <div className="pb-20 pt-28">
              {children}
              {/* <DashboardButton  currentUser={currentUser} session={session}/> */}
            </div>
            </Suspense>
            <Footer/>
        </div>
      </body>
    </html>
  )
}
