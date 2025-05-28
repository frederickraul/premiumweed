'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import CameraIcon from '@/app/components/icons/icon-camera.svg';


declare global {
  var cloudinary: any;
}

interface ImageUploadProps{
  onChange: (value: string) => void;
  value: string;
  onlyIcon?: boolean;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  onlyIcon,
}) => {
  const handleUpload = useCallback((result:any)=>{
    onChange(result.info.secure_url);
  },[onChange]);

  const Photo = ()=>{
    return(
      <>
             <TbPhotoPlus size={50}/>
              <div className="font-semibold text-lg">
                Click to upload
              </div>
              
              {value && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="upload"
                    fill
                    style={{objectFit: 'cover'}}
                    src={value}
  
                  />
                </div>
              )}
      </>
    )
  }

  return (
   <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset="bfnkawce"
    options={{
      maxFiles: 1,
      sources:['local']
    }}
   >
      {({open}) => {
        return(
          <div
            onClick={()=> open?.()}
            className={`

              relative 
              cursor-pointer 
              hover:opacity-70 
              transition 
              ${!onlyIcon ? 'border-dashed  border-2  p-20 border-neutral-300': ' p-5'} 
              flex 
              flex-col 
              justify-center 
              items-center 
              gap-4 
              text-neutral-600`
            }
          >
            { onlyIcon ?
              <CameraIcon className="fill-white"/>
              :
              <Photo/>
            }
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload