import React, { useState } from 'react';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import InputUnregistered from '../inputs/InputUnregistered';
import InputText from '../inputs/InputText';
import { Rating } from '@mui/material';

interface ReviewProps {
    isOpen: boolean;
    onSave:(data:any)=>void;
    onClose:() => void;
  }
  const ReviewModal: React.FC<ReviewProps> = ({
    isOpen,
    onSave,
    onClose
  }) => {
    const fakeId = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    const defaultReview = {
        id: fakeId,
        title: "",
        body: '',
        user: '',
        stars: 0,
        createdAt: 'Just now'}

    const [data, setData] = useState(defaultReview);
    const defaultErrors= {
      stars: false,
      title: false,
      body:false,
    }
    const [errors, setErrors] = useState(defaultErrors);
    const onChange=(id:string, value:any)=>{
        setErrors(defaultErrors);
        setData({...data, [id]: value});
    }


    const handleSave = () => {
      if(data.title.length < 4){
        setErrors({...errors, title: true})
        return;
      }
      if(data.body.length < 10){
        setErrors({...errors, body: true})
        return;
      }
      if(data.stars < 1){
        setErrors({...errors, stars: true})
        return;
      }
      onSave(data);
      setData(defaultReview);
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
              title="" 
              subtitle="Write about your own personal experience."/>
              <div className='flex flex-col items-center my-5'>
                    <span className='text-lg font-bold mb-3'>My rating</span>
                    <Rating 
                        value={data.stars} 
                        onChange={(event, newValue) => {
                        onChange('stars',newValue);}} 
                            size='large' 
                            className='text-3xl text-black'/>
                      {errors.stars && <div className='text-red-500 font-bold'>You must rate the product</div>}
              </div>
              {errors.title && <div className='text-red-500 font-bold'>The title is too short</div>}
            <InputUnregistered
              label="Title"
              onChange={(value)=>{onChange('title',value.target.value);}}
              required
            />

            {errors.body && <div className='text-red-500 font-bold'>The body is too short</div>}
            <InputText
                label='Body'
                onChange={(value)=>{onChange('body',value.target.value);}}
                required
                />

            
        </div>
      );
    
  return (
    <Modal
        size='sm'
        isOpen={isOpen}
        title="Write a review"
        body={bodyContent}
        onClose={onClose}
        onSubmit={handleSave}
        actionLabel="Continue"
    />
  )
}

export default ReviewModal