import getCurrentUser from '@/app/actions/getCurrentUser';
import getNotificationsByRecipientId from '@/app/actions/getNotificationsByRecipientId';
import getSettingsByName from '@/app/actions/getSettingsByName';
import DefaultLayout from '@/app/components/dashboard/Layouts/DefaultLayout';
import React from 'react'



   export default async function layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const currentUser = await getCurrentUser();
    const userRole = await currentUser?.role || "";
    const notifications = await getNotificationsByRecipientId();
       const logos = await getSettingsByName('logo');
    
    
  return (
    <DefaultLayout currentUser={currentUser} notifications={notifications} logos={logos?.values}>
        {children}
    </DefaultLayout>
    
  )
}

