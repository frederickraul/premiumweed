'use client';

import Breadcrumb from "@/app/components/dashboard/Breadcrumbs/Breadcrumb";
import { SafeUser } from "@/app/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { defaultImage } from "@/app/const";
import { useCallback, useState } from "react";

import UserIcon from '@/app/components/icons/form/icon-user-name.svg';
import MailIcon from '@/app/components/icons/form/icon-mail.svg';
import ClipIcon from '@/app/components/icons/form/icon-clip.svg';
import UploadIcon from '@/app/components/icons/form/icon-upload.svg';

import ProfileLabel from "@/app/components/dashboard/Input/ProfileLabel";
import ProfileInput from "@/app/components/dashboard/Input/ProfileInput";
import Avatar from "@/app/components/app/Avatar";
import ProfileTextarea from "@/app/components/dashboard/Input/ProfileTextarea";
import ProfileInputPhone from "@/app/components/dashboard/Input/ProfileInputPhone";
import ProfileImageUpload from "@/app/components/dashboard/Input/ProfileImageUpload";
import ChangePasswordModal from "./modal/ChangePasswordModal";

const ProfileClient = (props:{
  currentUser?: SafeUser | null;
}) => {
const defaultData = { 
    name: props.currentUser?.name, 
    lastname: props.currentUser?.lastname, 
    image: props.currentUser?.image || defaultImage, 
    email: props.currentUser?.email, 
    phone: props.currentUser?.phone, 
    formattedPhone: props.currentUser?.formattedPhone, 
    bio: props.currentUser?.bio, 
    oldPassword: '', 
    newPassword: '', 
    newPasswordConfirm: '',
    isChange: false,
  };

  const defaultErrors= {
    name: false,
    lastname: false,
    email:false,
  }

const route = useRouter();
const [data, setData] = useState(defaultData);
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState<any>();
const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

const toggleChangePasswordModal = () =>{
  setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
}


const handleInputChange = (field: string, value: any) => {
  setErrors(defaultErrors);
  setData({ ...data, [field]: value })
}

const handleInputPhoneChange = (phone: string, formattedPhone: string) => {
  setData({ ...data, ['phone']: phone, ['formattedPhone']: formattedPhone })
}

const onSubmit = useCallback(async () => {
  if (data.name == '') {
    setErrors({ ...errors, ['name']: true });
    return;
  }
  if (data.lastname == '') {
    setErrors({ ...errors, ['lastname']: true });
    return;
  }

  if (data.email == '') {
    setErrors({ ...errors, ['email']: true });
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });


    // Show success message and possibly redirect
    toast.success('The profile is updated.', {
      duration: 5000,
      position: 'top-center',

    });

    route.refresh();
    setData({ ...data, ['isChange']:false });
    
  } catch (error: any) {
    toast.error(error.message || 'Failed to update the profile.');
  } finally {
    setLoading(false);
  }
}, [data, route]);



  return (
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Profile" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                     <ProfileLabel text="Name"/>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <UserIcon className="fill-current"/>
                        </span>
                        <ProfileInput 
                          icon 
                          value={data.name || ""}
                          error={errors?.name}
                          onChange={(value: any) => {
                            handleInputChange('name', value);
                        }} 
                        
                          />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                     <ProfileLabel text="Last Name"/>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <UserIcon className="fill-current"/>
                        </span>
                        <ProfileInput 
                          icon 
                          value={data.lastname || ""}
                          error={errors?.lastname}
                          onChange={(value: any) => {
                            handleInputChange('lastname', value);
                        }} 
                          />
                          
                      </div>
                    </div>

                   
                  </div>

                  <div className="mb-5.5">
                    <ProfileLabel text="Phone Number"/>
                    <div className="relative">
                      <ProfileInputPhone
                       country="US"
                       value={data?.phone}
                        onChange={(phone: any, formattedPhone: any) => {
                        handleInputPhoneChange(phone, formattedPhone);
                        }}
                       />
                    </div>
                  </div>
                  
                  <div className="mb-5.5">
                    <ProfileLabel text="Email Address"/>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <MailIcon className="fill-current"/>
                      </span>
                      <ProfileInput 
                        icon 
                        type="email" 
                        error={errors?.email}

                        value={data.email || ""}
                        onChange={(value: any) => {
                          handleInputChange('email', value);
                      }} 
                        />
                    </div>
                  </div>


                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      BIO
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <ClipIcon className="fill-current"/>
                      </span>

                      <ProfileTextarea 
                      value={data.bio || ""} 
                      onChange={(value: any) => {
                        handleInputChange('bio', value);
                    }} 
                   />
                      
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    
                    <button
                      onClick={onSubmit}
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <Avatar src={data.image || defaultImage}/>
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button onClick={() => handleInputChange('image', '')} className="text-sm hover:text-primary">
                          Delete
                        </button>
                       
                      </span>
                    </div>
                  </div>

                  <ProfileImageUpload value={data?.image}  onChange={(value: any) => handleInputChange('image', value)}/>

                  <div className="flex justify-end gap-4.5">
                  <button
                      onClick={()=>{setData(defaultData)}}

                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onSubmit}
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/* Password section */}
            <div className="mt-8 lg:mt-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-danger">
                  Danger Zone
                </h3>
              </div>
              <div className="p-7">
                <div className="w-full">
                    
                    <button
                      onClick={toggleChangePasswordModal}
                      className=" w-full rounded bg-danger px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    >
                      Change Password
                    </button>
                </div>
              </div>
            </div>
          </div>
          {/* ./Password section */}
        </div>

        {/* Modal Section */}
        <ChangePasswordModal
          data={data}
          open={isChangePasswordModalOpen}
          onClose={toggleChangePasswordModal}
        />
        {/* Modal Section */}
      </div>
  );
};

export default ProfileClient;
