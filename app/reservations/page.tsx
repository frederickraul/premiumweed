

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservationsClient";
import EmptySpace from "../components/EmptySpace";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
        <EmptySpace
          title="Unauthorized"
          subtitle="Please login"
        />
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
        <EmptySpace
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
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
 
export default ReservationsPage;