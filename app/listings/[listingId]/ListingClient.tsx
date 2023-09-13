'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import Loading from "@/app/Loading";
import useCountries from "@/app/hooks/useCountries";
import ListingCardHorizontal from "@/app/components/listings/ListingCardHorizontal";
import Heading from "@/app/components/Heading";
import { AiFillClockCircle } from "react-icons/ai";
import { BiCheckShield } from "react-icons/bi";
import { Listing } from "@prisma/client";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const { getStatesOfCountry } = useCountries();

  const states = getStatesOfCountry(listing.locationValue);

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
     return categories.find((items) => 
      items.label === listing.category);
  }, [listing.category]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

  const formatDate = (value:any) =>{
    var dt = new Date(value);
    const joined = (monthNames[dt.getMonth()]) + " " + dt.getFullYear();

    return joined;

  }
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
      if (!currentUser) {
        return loginModal.onOpen();
      }
      setIsLoading(true);

      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success('Added to Cart');
        setDateRange(initialDateRange);
        router.push('/cart');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
  },
  [
    totalPrice, 
    dateRange, 
    listing?.id,
    router,
    currentUser,
    loginModal
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);


  
  
  
  return ( 
    <Container isLoading={isLoading}>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
          mt-0 sm:mt-5 md:mt-0
        "
      >
        <div className="flex flex-col gap-6">

          <div className="flex flex-row text-2xl">
              <div className="text-neutral-500">{listing.category}</div>
              <div className="flex flex-row text-blue-500 font-bold items-center ml-3">
                <BiCheckShield/>
                <span > Claimed</span>
              </div>
              <div className="capitalize ml-3">
                Joined {formatDate(listing.createdAt)}
              </div>
          </div>

      
          
          <ListingCardHorizontal
           key={listing.id}
           data={listing}
           actionId={listing.id}
           //onEditAction={editButtonHandler}
           //onAction={onDelete}
           //onActionSecond={openConfirmModal}
           disabled={isLoading}
           actionLabel="Edit"
           actionLabelSecond="Delete listing"
           currentUser={currentUser}
          />
  
      
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
              mb-10
            "
          >
           
           
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;