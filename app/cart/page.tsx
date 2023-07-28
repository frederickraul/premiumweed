

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import EmptySpace from "../components/EmptySpace";
import TripsClient from "./tripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <EmptySpace
          title="Unauthorized"
          subtitle="Please login"
        />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
        <EmptySpace
          title="Your cart is empty"
          subtitle="Looks like you havent add any item."
        />
    );
  }

  return (
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
  );
}
 
export default TripsPage;