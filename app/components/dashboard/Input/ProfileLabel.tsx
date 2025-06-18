import React from 'react'

const ProfileLabel = (props:{text:any}) => {
    const {text} = props;
  return (
    <label
    className="mb-3 block text-sm font-medium text-black dark:text-white"
    htmlFor="fullName"
  >
    {text}
  </label>
  )
}

export default ProfileLabel