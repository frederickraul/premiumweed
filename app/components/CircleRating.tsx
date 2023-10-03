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
      ">

      <div className="w-full">
        <div className="flex flex-col items-center justify-center h-full relative">
          <h3 className="flex text-neutral-500 text-5xl md:text-7xl font-thin">5.0</h3>
          <StyledRating color="#666" size={14} className="visible md:hidden"/>
          <StyledRating color="#666" size={20}  className="hidden md:visible"/>
        </div>
      </div>
      <h4 className="text-neutral-600 mt-2 flex flex-row items-center w-full justify-center">
        261 <span className="ml-1 font-thin ">reviews</span>
      </h4>
    </div>
  )
}

export default CircleRating