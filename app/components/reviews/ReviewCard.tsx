'use client';

import { defaultImage } from "@/app/const";
import { Rating } from "@mui/material";
import Image from "next/image";
import StyledRating from "../StyledRating";
import { start } from "repl";
import { formatDate } from "@/app/const/hours";


interface ReviewProps {
    data: any;
  }
  const ReviewCard: React.FC<ReviewProps> = ({
    data,
  }) => {
  const {id, title, body, user, rating, createdAt} = data;
  return (
<div className="
        border-[1px]
        border-neutral-100
        border-tr
        p-5
        mt-4
        shadow-sm
        
        ">
            <div className="flex flex-row items-center">
                <Image
                sizes='100'
                priority={false}
                width={50}
                height={50}
                alt='Listing'
                src={defaultImage}
                className='rounded-3xl bg-cover'
                />
                <div className="ml-3 flex flex-col">
                    <span className="text-sm font-bold">{user}</span>
                    <span className="text-xs font-light text-neutral-400"> {formatDate(createdAt)}</span>
                </div>
            </div>

            <div className="mt-6 flex flex-row items-center">
            <StyledRating value={rating}/>

                <span className="text-xs ml-2">{rating}</span>
            </div>

            <div className="mt-4 flex flex-col">
                <div className="font-bold mb-3">{title}</div>
                <span className="text-neutral-700">
                    {body}  
                </span>
            </div>

        </div>  )
}

export default ReviewCard