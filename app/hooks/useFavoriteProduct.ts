import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  productId: string;
  currentUser?: SafeUser | null
}

const useFavoriteProduct = ({ productId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavoritedProduct = useMemo(() => {
    const list = currentUser?.favoriteProductsIds || [];

    return list.includes(productId);
  }, [currentUser, productId]);

  const toggleFavoriteProduct = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavoritedProduct) {
        request = () => axios.delete(`/api/favorites/products/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/products/${productId}`);
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
    hasFavoritedProduct, 
    productId, 
    loginModal,
    router
  ]);

  return {
    hasFavoritedProduct,
    toggleFavoriteProduct,
  }
}

export default useFavoriteProduct;