import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import EmptySpace from "./components/EmptySpace";

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en);

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptySpace showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
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
          
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;

export const dynamic = 'force-dynamic'
