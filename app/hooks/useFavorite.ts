import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { error } from 'console';

interface IUseFavorite{
  listingId: string;
  currentUser: User | null;
}

const useFavorite = ({
  listingId,
  currentUser
} : IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async(e:React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if(!currentUser){
        return loginModal.onOpen();
      }

      try{
        let request;

        if(hasFavorited){
          request = () => axios.delete(`/api/favorites/${listingId}`);
        }else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          console.log("POSTING")
        }
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error){
        toast.error(`${error}`);
      }
    },
    [currentUser,hasFavorited,listingId,loginModal,router],
  );

  return { hasFavorited, toggleFavorite}
}

export default useFavorite;