'use client';


import { SafeUser } from "@/app/types";

import Container from "@/app/components/Container";

import ListingCardHorizontal from "@/app/components/listings/ListingCardHorizontal";

import { BiArrowBack, BiCheckShield } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdArrowBackIos, MdArrowLeft, MdOutlineReviews } from "react-icons/md";
import { TbArrowLeft } from "react-icons/tb";
import ProductCardHorizontal from "@/app/components/products/ProductCardHorizontal";
import List from "../../List";
import { dataList } from "@/app/const";
import EmptyView from "@/app/components/common/EmptyView";
import Button from "@/app/components/Button";
import Rating from "./ProductRating";
import ProductRating from "./ProductRating";
import Reviews from "./Reviews";
import Modal from "@/app/components/modals/Modal";
import ReviewModal from "@/app/components/modals/ReviewModal";
import { reviewList } from "@/app/const/reviews";
import FloatingButton from "@/app/components/FloatingButton";
import Heading from "@/app/components/Heading";



interface ProductClientProps {
  listing?: any;
  product: any;
  relatedProducts:any;
  currentUser?: SafeUser | null;
}

const ProductClient: React.FC<ProductClientProps> = ({
  product,
  relatedProducts,
  listing,
  currentUser
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resultsFound, setResultsFound] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [reviews, setReviews] = useState(reviewList);
  const router = useRouter();
  
  const toggleIsLoading = () => {
    setIsLoading(true);
  }

  useEffect(() => {
    if (product) {
      setIsLoading(false);
    }

  }, [product]);

  const toggleReviewModal = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  }

  function shuffleArray(array: any) {
    let len = array.length,
      currentIndex;


    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
      let randIndex = Math.floor(Math.random() * (currentIndex + 1));
      var temp = array[currentIndex];
      array[currentIndex] = array[randIndex];
      array[randIndex] = temp;
    }

    if (len > 5) {
      const slicedArray = array.slice(0, 5);
      return slicedArray;
    }

    return array;

  }

  const list = shuffleArray(dataList);

  const handleReviewSave = (data: any) => {
    data['user'] = currentUser?.name;
    setReviews(reviews => [...reviews, data]);
    toggleReviewModal();

    console.log(data);
  }


  return (
    <>
      <Container isLoading={isLoading}>
        <div
          className="
          max-w-screen-lg 
          mx-auto
          mt-0 sm:mt-5 md:mt-0
         
        "
        >

          <div className="flex flex-col gap-6">

            <div className="flex flex-col md:flex-row text-base sm:text-2xl">
              <div className="text-neutral-500">{product.name}</div>
              <div className="flex flex-row cursor-pointer items-center text-sm" onClick={() => {
                setIsLoading(true);
                router.push(`/listings/${listing.id}`)
              }}>
                <MdArrowBackIos /><span className="ml-1">{listing.title}</span>

              </div>
            </div>

            <ProductCardHorizontal
              data={product}
              currentUser={currentUser}
            />

          </div>
        </div>
      </Container>
      <Container>
        <div
          className='
          pl-5 sm:pl-0
          lg:w-[960px]
          w-full
          m-auto
          mt-16
          mb-10

          '>
          <div className='w-full my-5 flex flex-row items-center justify-between'>
            <div>
              <div className='text-lg font-bold m-0'> Related Products</div>
            </div>

          </div>
          {/* List of products */}
          {relatedProducts.length >= 1 ? 
            <List small items={5} isLoading={()=>{toggleIsLoading()}} list={relatedProducts} action={()=>{}}/> : 
            <div className="h-[20vh] flex flex-col gap-2 justify-center  items-center">
            <Heading
              center
              title={'There are not items for this listing yet'}
              subtitle={'Wait for it!!!'}
            />
            </div>
            }        
            </div>
      </Container>

      <Container>
        <div
          className='
          pl-5 sm:pl-0
          lg:w-[768px]
          w-full
          m-auto
          mt-5
          md:mt-16
          mb-10

          '>
          <div className='w-full flex flex-row items-center justify-between'>
            <div className='text-lg font-bold uppercase text-neutral-500'> Reviews</div>
            <div className="w-[70px] md:w-[60px] lg:w-[50px]">
              <FloatingButton
                label='Write a review'
                onClick={toggleReviewModal}
                color='bg-cyan-500'
                hoverColor='hover:bg-cyan-400'
                icon={MdOutlineReviews}
                borderless
                styles='border-cyan-500'

              />

            </div>
          </div>
          <ProductRating />
          <div id="reviews" className="mb-20">
            <Reviews reviewList={reviews.reverse()} />
            <ReviewModal
              isOpen={isReviewModalOpen}
              onClose={toggleReviewModal}
              onSave={handleReviewSave}
              />
          </div>
        </div>
      </Container>

    </>
  );
}

export default ProductClient;