'use client';

import BarRating from "@/app/components/BarRating";
import CircleRating from "@/app/components/CircleRating";
import StyledRating from "@/app/components/StyledRating";
import { ratingData } from "@/app/const/rating";
import { colors } from "@/app/const/theme";
import { BiSolidUser } from "react-icons/bi";

const ProductRating = () => {
  return (
    <div className="flex flex-row mt-4 w-full mb-10">
      <div className="flex w-1/3 items-center justify-center lg:justify-start p-0 sm:p-5">
           <CircleRating/>
      </div>
      <div className="flex flex-col w-3/4 sm:full justify-center items-center ml-4 sm:ml-0">
            <BarRating data={ratingData} factor={4}/>
      </div>

          </div>
  )
}

export default ProductRating