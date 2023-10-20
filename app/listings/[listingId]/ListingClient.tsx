'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeProduct, SafeReservation, SafeUser } from "@/app/types";

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
import FilterPanel from "./FilterPanel";
import { dataList } from "@/app/const";
import List from "./List";
import EmptyView from "@/app/components/common/EmptyView";
import FloatingButton from "@/app/components/FloatingButton";
import { MdFilterList, MdOutlineReviews } from "react-icons/md";
import ProductRating from "./menu/[productId]/ProductRating";
import Reviews from "./menu/[productId]/Reviews";
import { reviewList } from "@/app/const/reviews";
import ReviewModal from "@/app/components/modals/ReviewModal";
import EmptySpace from "@/app/components/EmptySpace";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  products:SafeProduct[];
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  products,
  currentUser
}) => {
  const { getStatesOfCountry } = useCountries();

  const states = getStatesOfCountry(listing.locationValue);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState(reviewList);


  const toggleReviewModal = () => {
    setIsReviewModalOpen(!isReviewModalOpen);
  }

  const handleReviewSave = (data: any) => {
    data['user'] = currentUser?.name;
    setReviews(reviews => [...reviews, data]);
    toggleReviewModal();

    console.log(data);
  }


  const loginModal = useLoginModal();
  const router = useRouter();



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
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  const toggleFilterPanel = () => {
    
    setIsFilterPanelVisible(!isFilterPanelVisible);
  }

  const closeFilterPane = () => {
    setIsFilterPanelVisible(false);
  }

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


  // FILTER
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);

  const cuisinesDefaultState = [
    { id: 1, checked: false, label: 'American' },
    { id: 2, checked: false, label: 'Chinese' },
    { id: 3, checked: false, label: 'Italian' },
  ];

  const [cuisines, setCuisines] = useState(cuisinesDefaultState);

  const [list, setList] = useState(dataList);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const toggleIsLoading = () => {
    setIsLoading(true);
  }
  const handleSelectCategory = (event:any,value:any) =>{
    if(value == 'all'){
      setSelectedCategory(null); return;
    }
    !value ? null : setSelectedCategory(value);
  }

  const handleSelectRating = (event:any, value:any) =>{
    if(value == 'all'){
      setSelectedRating(null);
      return;
    }
    !value ? null : setSelectedRating(value)};

  const handleChangeChecked = (id:any) => {
    console.log(id);
    if(id == 'all'){
      setCuisines(cuisinesDefaultState);
      return;
    }
    const cusinesStateList = cuisines;
    const changeCheckedCuisines = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setCuisines(changeCheckedCuisines);
  };

  const handleChangePrice = (event:any, value:any) => {
    if(value == 'all'){
      setSelectedPrice([1000, 5000]);
      return;
    }
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = dataList;

    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => item.rating === parseInt(selectedRating)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Cuisine Filter
    const cuisinesChecked = cuisines
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (cuisinesChecked.length) {
      updatedList = updatedList.filter((item) =>
        cuisinesChecked.includes(item.cuisine)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedRating, selectedCategory, cuisines, searchInput, selectedPrice]);


  // ./FILTER
  
  
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
              <div className="text-neutral-500">{listing.category}</div>
              <div className="flex flex-row"> 
                <div className="flex flex-row text-blue-500 font-bold items-center ml-0 sm:ml-3">
                  <BiCheckShield/>
                  <span > Claimed</span>
                </div>
                <div className="capitalize ml-3">
                  Joined {formatDate(listing.createdAt)}
                </div>
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
              mb-0
            "
          >
           
           
          </div>
        </div>
      </div>
    </Container>
    <Container full>
      <div className="
         border-b-[1px]
         shadow-sm
      ">

        <FilterPanel
            isVisible={isFilterPanelVisible}
            selectedCategory={selectedCategory}
            selectCategory={handleSelectCategory}
            selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            selectRating={handleSelectRating}
            cuisines={cuisines}
            changeChecked={handleChangeChecked}
            changePrice={handleChangePrice}
            closeFilterPane={closeFilterPane}
          />

      </div>
      <div 
      className='
          lg:w-[960px]
          w-full
          m-auto
          mt-5
          mb-10
          '>
            <div className='w-full my-5 flex flex-row items-center justify-between'>
                <div>
                    <div className='text-xs font-sans ml-5 mb-1 text-neutral-500'>{products.length} results found</div>
                    <div className='text-lg font-bold m-0 ml-5'> All Products</div>
                </div>
                <div>
                      <FloatingButton color='bg-black' icon={MdFilterList} small onClick={toggleFilterPanel} label=''/>
                </div>
            </div>
            {products.length >= 1 ? <List isLoading={()=>{toggleIsLoading()}} list={products} action={()=>{}} /> : 
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
          mt-16
          mb-10

          '>
          <div className='w-full flex flex-row items-center justify-between'>
            <div className='text-lg font-bold '> Reviews</div>
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
 
export default ListingClient;