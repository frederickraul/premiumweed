import getCurrentUser from '@/app/actions/getCurrentUser';
import getNotificationsByRecipientId from '@/app/actions/getNotificationsByRecipientId';
import DefaultLayout from '@/app/components/dashboard/Layouts/DefaultLayout';
import React from 'react'


const Logo = async() => {

  const notifications = await getNotificationsByRecipientId();
  const currentUser = await getCurrentUser();

  return (
    <DefaultLayout currentUser={currentUser} notifications={notifications}>

    <div>Logo Soon</div>
    </DefaultLayout>
  )
}

export default Logo