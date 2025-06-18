'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import CameraIcon from '@/app/components/icons/icon-camera.svg';
import UploadIcon from '@/app/components/icons/form/icon-upload.svg';



declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    onlyIcon?: boolean;
}
const ProfileImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
    onlyIcon,
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);


    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="bfnkawce"
            options={{
                maxFiles: 1,
                sources: ['local'],
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className={`
                relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5
                `
                        }
                    >
                        <div className="flex flex-col items-center justify-center space-y-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                <UploadIcon />
                            </span>
                            <p>
                                <span className="text-primary">Click to upload</span> 
                            </p>
                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                            <p>(max, 800 X 800px)</p>
                        </div>
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ProfileImageUpload