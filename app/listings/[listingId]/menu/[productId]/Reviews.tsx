'use client';

import Button from "@/app/components/Button";
import Dropdown from "@/app/components/inputs/Dropdown";
import ReviewCard from "@/app/components/reviews/ReviewCard";
import { reviewList } from "@/app/const/reviews";

interface ReviewsProps {
    reviewList: any;
  }
  
  const Reviews: React.FC<ReviewsProps> = ({
    reviewList,
  }) => {
  return (
    <div className="mt-16">
        <div className="flex flex-row">
           <div className="w-[120px]">
              <Dropdown
                labelName="Sort" 
                type="arrow-down"
                name="sort"
                options={[
                  { label: 'Newest First', labelValue:4},
                  { label: 'Oldest First', labelValue:3},
                  { label: 'Highest Rated', labelValue:2},
                  { label: 'Lowest Rated', labelValue:1}
                ]
                }/>
           </div>
           <div className="w-[160px] sm:w-[200px] ml-2 ">
              <Dropdown
                labelName="Filter by rating" 
                type="arrow-down"
                name="sort"
                options={[
                  { label: '5 stars', labelValue:'5'},
                  { label: '4 stars', labelValue:'4'},
                  { label: '3 stars', labelValue:'3'},
                  { label: '2 stars', labelValue:'2'},
                  { label: '1 star', labelValue:'1'},
                  { label: 'All ratings', labelValue:'0'}
                ]
                }/>
           </div>

        </div>
        {reviewList.map((review:any) =>(
            <ReviewCard key={review.id} data={review}/>
        ))}
    </div>
  )
}

export default Reviews