'use client';

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { useEffect, useState } from "react";
import { log } from "console";

interface FavoritesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {

  const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);

      if(listings.length > 0){
        setIsLoading(false);
       }
  
       
    }, [listings]);

  

  return (
    <Container isLoading={isLoading}>
      <Heading
        title="Favorites"
        subtitle="List of places you favorited!"
      />
              

      <div 
        className="
        mt-10
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-5
        gap-8 mb-10
        "
        >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default FavoritesClient;