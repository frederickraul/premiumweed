'use client';

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
        {reviewList.map((review:any) =>(
            <ReviewCard data={review}/>
        ))}
    </div>
  )
}

export default Reviews