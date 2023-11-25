import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseOwner {
  listingId: string;
  currentUser?: any | null
}

const useOwner = ({ listingId, currentUser }: IUseOwner) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasOwner = useMemo(() => {
    const list = currentUser?.listings || [];

    return list.find((element:any) => {
      return element.id === listingId;
    })
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasOwner) {
        request = () => axios.delete(`/api/favorites/listings/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/listings/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasOwner, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasOwner,
    toggleFavorite,
  }
}

export default useOwner;