'use client';

import { SafeUser } from "@/app/types";
import LoadingContainer from "../LoadingContainer";
import { useEffect, useState } from "react";
import Container from "../Container";
import ListingCard from "../listings/ListingCard";

interface HomeClientProps {
  listings: any;
  currentUser?: SafeUser | null;
  review?: any;
  questions?: any;
  ratings?: any;
}

const HomeClient: React.FC<HomeClientProps> = ({
  listings,
  currentUser,

}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [visiteTime, setvisiteTime] = useState(0);

  useEffect(() => {
    setData(listings);
    setIsLoading(false);
  }, [listings]);



  

  return (
    <LoadingContainer isLoading={isLoading}>
    <Container>
    <div className='text-center my-10'>
        <div className='text-2xl font-bold mt-10 sm:mt-20 md:mt-10'>Find Premium Weed Near You</div>
    </div>
      <div 
      className="
      pt-4
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-5
      gap-8
      mb-10
      pb-10
      
      "
      >
        
        {data.map((listing: any) => (
            <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            
            />
        ))}
      </div>
    </Container>
    </LoadingContainer>
  )
}

export default HomeClient