'use client';

import { AiFillStar } from "react-icons/ai";
import StyledRating from "./StyledRating";
import { BiSolidUser } from "react-icons/bi";
import { colors } from "../const/theme";

interface CircleProps {
  size?: number;
  color?: any;
  starQty?: number;
  percent?: string;
}

const CircleRating: React.FC<CircleProps> = ({
  size,
  color,
  starQty,
  percent
}) => {
  return (
    <div className="
      relative 
      items-center 
      justify-center 
      m-0
      sm:m-5
      ">
      <svg aria-hidden="true" viewBox="0 0 120 120" className="relative aspect-square w-full">
        <circle cx="60" cy="60" r="56" fill="transparent" stroke="#fff" stroke-width="6"></circle>
        <circle cx="60" cy="60" r="56" fill="transparent" stroke={colors.primary} stroke-width="6" ></circle>
      </svg>
      <div className="absolute top-0 bottom-7 right-0 left-0 items-center">
        <div className="flex flex-col items-center justify-center h-full relative">
          <h3 className="flex text-neutral-500 text-3xl md:text-5xl font-thin">5.0</h3>
          <StyledRating color="#666" />
        </div>
      </div>
      <h4 className="text-neutral-500 mt-2 flex flex-row items-center w-full justify-center">
        <BiSolidUser className="mr-2" /> 342 <span className="ml-1">total</span>
      </h4>
    </div>
  )
}

export default CircleRating