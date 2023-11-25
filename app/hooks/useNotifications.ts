import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseNotification {
    currentUser?: any | null
}

const useNotification = ({  currentUser }: IUseNotification) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasNotifications = useMemo(() => {
    const list = currentUser?.respondListings || [];

    return list.filter((element:any) => {
      return element.status === 0;
    })
  }, [currentUser]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasNotifications) {
       // request = () => axios.delete(`/api/favorites/listings/${listingId}`);
      } else {
        //request = () => axios.post(`/api/favorites/listings/${listingId}`);
      }

      //await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasNotifications, 
    loginModal,
    router
  ]);

  return {
    hasNotifications,
    toggleFavorite,
  }
}

export default useNotification;