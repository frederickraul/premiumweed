'use client';

import Dropdown from "@/app/components/Dropdown";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import EmptyReviews from "../EmptyReviews";
import EmptySpace from "@/app/components/EmptySpace";
import { useEffect, useState } from "react";

interface ReviewsProps {
    reviewList: any;
  }
  
  const Reviews: React.FC<ReviewsProps> = ({
    reviewList,
  }) => {


  
  const [currentReviewList, setcurrentReviewList] = useState(reviewList);
  const [starsFilter, setStarsFilter] = useState(0);
  const [sortFilter, setSortFilter] = useState();


  useEffect(() => {
    handleOrderFilter(starsFilter,sortFilter);
  }, [starsFilter,sortFilter]);
  
  const handleStarsFilter = (value:any) =>{
    setStarsFilter(value);
  }

  const handleSortFilter = (value:any) =>{
    setSortFilter(value);
  }
   
  const handleOrderFilter = (starsFilter:any,sortFilter:any) =>{
    let starFilteredlist = reviewList;

    if(starsFilter!== 0){
      starFilteredlist = reviewList.filter((item:any) => {
          return item.rating === starsFilter;
        });
      }
      

    
    if(sortFilter == 1){
      //Lowest Rated
      const list = [...starFilteredlist].sort((a, b) => a.rating - b.rating);
      setcurrentReviewList(list);
    }
    
    if(sortFilter == 2){
       //Highest Rated
      const list = [...starFilteredlist].sort((a, b) => b.rating - a.rating);
      setcurrentReviewList(list);
    }
    if(sortFilter == 3){
       //Oldest
       const list = [...starFilteredlist].sort((a, b) =>
       a.createdAt > b.createdAt ? 1 : -1,);
       setcurrentReviewList(list);

    }
    if(sortFilter == 4){
       //Newest
       const list = [...starFilteredlist].sort((a, b) =>
       a.createdAt > b.createdAt ? -1 : 1,);
       setcurrentReviewList(list);    
      }


  }



  return (
    <div className="mt-16">
        <div className="flex flex-row items-center">
           <div className="w-[120px]">
              <Dropdown
                labelName="Sort" 
                type="arrow-down"
                name="sort"
                onChange={handleSortFilter}
                options={[
                  { label: 'Newest First', labelValue:4},
                  { label: 'Oldest First', labelValue:3},
                  { label: 'Highest Rated', labelValue:2},
                  { label: 'Lowest Rated', labelValue:1}
                ]
                }/>
           </div>
           <div className="w-[170px] sm:w-[200px] ml-2 ">
              <Dropdown
                labelName="Filter by rating" 
                type="arrow-down"
                name="sort"
                onChange={handleStarsFilter}
                options={[
                  { label: '5 stars', labelValue:5},
                  { label: '4 stars', labelValue:4},
                  { label: '3 stars', labelValue:3},
                  { label: '2 stars', labelValue:2},
                  { label: '1 star', labelValue:1},
                  { label: 'All ratings', labelValue:0}
                ]
                }/>
           </div>

        </div>
        <div className="min-h-[400px]">

          {
            currentReviewList.map((review:any) =>(
              <ReviewCard key={review.id} data={review}/>
              ))
            }
          </div>

         
    </div>
  )
}

export default Reviews