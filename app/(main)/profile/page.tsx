// import getCurrentUser from '@/app/actions/getCurrentUser copy'
// import ProfileView from '@/app/components/dashboard/sections/profile/ProfileView'

// const page = async() => {
//   const currentUser = await getCurrentUser();
//   return (
//     <div>
//         <ProfileView header='My Profile' currentUser={currentUser}/>
//     </div>
//   )
// }

// export default page


import React from 'react'
import ProfileView from '../../components/app/profile/ProfileView'
import getCurrentUser from '../../actions/getCurrentUser';

const Profile = async() => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <ProfileView header='My Profile' currentUser={currentUser}/>
    </div>
  )
}

export default Profile