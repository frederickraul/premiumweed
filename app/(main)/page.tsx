
import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "../components/app/ClientOnly";
import EmptySpace from "../components/app/EmptySpace";

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import HomeClient from "../components/app/home/HomeClient";
TimeAgo.addLocale(en);

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
        <EmptySpace showReset />
    );
  }

  return (
      <HomeClient currentUser={currentUser} listings={listings}/>
  )
}

export default Home;

export const dynamic = 'force-dynamic'
