'use client';

import StyledRating from "@/app/components/StyledRating";
import styled from "@emotion/styled";
import { Rating } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ProductRating = () => {


  return (
    <div className="flex flex-row mt-10 w-full mb-10">
      <div className="flex w-1/3 items-center">
            <div className="relative items-center justify-center text-center">
              <svg aria-hidden="true" viewBox="0 0 120 120" className="relative w-[80px] h-[80px] sm:w-[120px] sm:h-[120px]">
                <circle cx="60" cy="60" r="56" fill="transparent" stroke="#E6E6E6" stroke-width="6"></circle>1
                <circle cx="60" cy="60" r="56" fill="transparent" stroke="#f5ab24" stroke-width="6" className="border-1"></circle>
              </svg>
              <div className="absolute top-0 bottom-7 right-0 left-0 items-center">
                <div className="flex flex-col items-center justify-center h-full relative">
                <h3 className="flex text-neutral-500 text-xl sm:text-3xl">5.0</h3>
                <StyledRating/>
                </div>
              </div>
              <h4 className="text-neutral-400 mt-2">34 review</h4>
            </div>
          </div>
      <div className="flex flex-col w-2/4 sm:w-full ">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global Ratings</p>
            <div className="flex items-center mt-2">
              <a href="#" className="whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 star</a>
              <div className="w-full h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div className="h-2 bg-blue-500 rounded w-[70%]"></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
            </div>
            <div className="flex items-center mt-2">
              <a href="#" className="whitespace-nowrap  text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 star</a>
              <div className="w-full h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div className="h-2 bg-blue-500 rounded w-[17%]"></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
            </div>
            <div className="flex items-center mt-2">
              <a href="#" className="whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 star</a>
              <div className="w-full h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div className="h-2 bg-blue-500 rounded w-[8%]"></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
            </div>
            <div className="flex items-center mt-2">
              <a href="#" className="whitespace-nowrap text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 star</a>
              <div className="w-full h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div className="h-2 bg-blue-500 rounded w-[4%]"></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
            </div>
            <div className="flex items-center mt-2">
              <a href="#" className="whitespace-nowrap  text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 star</a>
              <div className="w-full h-2 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div className="h-2 bg-blue-500 rounded w-[1%]"></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
            </div>

      </div>

          </div>
  )
}

export default ProductRating