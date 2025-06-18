import { defaultImage } from '@/app/const'
import React, { useEffect, useState } from 'react'
import ProfileImageUpload from '../Input/ProfileImageUpload'

const Card = (props:{title:string, invert?:boolean, image?:any, smallImage?:boolean,handleInputChange?:any}) => {
    const {title, invert, image, smallImage,handleInputChange} = props;

    const [loadedImage, setLoadedImage] = useState(image);
    useEffect(() => {
        setLoadedImage(image);
    }, [image])
    

    return (
        <div>
       
            <div className={`
                    flex 
                    flex-col
                    col-span-3
                    gap-5
                    rounded-xl border 
                    p-4 
                    ${invert ? 'border-gray-300' : 'border-gray-200  dark:border-gray-600'}
                    ${invert ? 'dark:bg-white' : '   bg-gray-800 dark:bg-white/[0.03] '}
                    sm:flex-row 
                    sm:items-center 
                    sm:gap-6
                    `}>
           
                <div className="overflow-hidden rounded-lg w-2/4 pt-10 flex items-center justify-center">
                    <img src={loadedImage} alt="card" 
                        className={`
                        ${smallImage && 'w-10'}    
                        overflow-hidden 
                        rounded-lg `} 
                        />
                </div>

                <div className='w-full md:w-2/4 items-center pt-5'>
                <h4 className={`
                            w-full
                            text-center
                            mb-5
                            text-theme-xl 
                            font-medium 
                            ${invert ? 'text-gray-800' : 'text-white/90'}
                            `}>
                        {title}
                    </h4>
                   <div className='scale-90'>
                   <ProfileImageUpload value={image}  onChange={handleInputChange}/>

                   </div>
                   <div className='text-danger w-full text-center font-bold cursor-pointer' onClick={()=>{
                    handleInputChange('');
                   }}>
                        Reset default logo

                   </div>

                </div>
            </div>
        </div>
    )
}

export default Card