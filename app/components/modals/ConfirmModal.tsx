'use client';

import { useCallback, useState } from "react";

import Modal from "./Modal";
import Heading from "../Heading";

import useConfirmModal from '@/app/hooks/useConfirmModal';
import { title } from "process";

interface ModalProps {
  onSubmit:  () => void;
  title?:string;
  body?:string;
}

const ConfirmModal: React.FC<ModalProps> = ({
  onSubmit,
  title,
  body
}) => {
  const confirmModal = useConfirmModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = () => {
    onSubmit();
    confirmModal.onClose();
  }


  const bodyContent = (
    <div className="flex flex-col gap-4">
        <Heading 
          title={title? title : "Are your sure?"} 
          subtitle={body? body : "You are about to delete your item!!"}/>    
    </div>
  );

  

  return (
    <Modal
      disabled={isLoading}
      isOpen={confirmModal.isOpen}
      title="Danger Zone"
      actionLabel="Continue"
      secondaryActionLabel="Cancel"
      secondaryAction={confirmModal.onClose}
      onClose={confirmModal.onClose }
      onSubmit={onSubmitHandler}
      body={bodyContent}
    />
  )
}

export default ConfirmModal