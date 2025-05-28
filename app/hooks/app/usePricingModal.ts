import { create } from "zustand";

interface PricingModalStore{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePricingModal = create<PricingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false})
}))

export default usePricingModal;