import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import CustomersQAClient from "./CustomersQAClient";
import getFavoriteProducts from "@/app/actions/getFavoriteProducts";
import getQuestionsByOwnerId from "@/app/actions/getQuestionsByOwnerId";
import EmptySpace from "@/app/components/app/EmptySpace";

const ListingPage = async () => {

  const listings = await getFavoriteListings();
  const products = await getFavoriteProducts();
  const currentUser = await getCurrentUser();
  const questionList = await getQuestionsByOwnerId();

  if (questionList?.length === 0) {
    return (
        <EmptySpace
          title="No questions found"
          subtitle="Looks like you have no questions to answer right now."
        />
    );
  }

  return (
     <>
      <CustomersQAClient
        listings={listings}
        products={products}
        currentUser={currentUser}
        questions={questionList}
        />
        </>
  );
}
 
export default ListingPage;