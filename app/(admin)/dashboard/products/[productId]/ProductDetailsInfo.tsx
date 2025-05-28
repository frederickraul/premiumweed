'use client'
import React, {  useState } from 'react'
import {  defaultProductImage } from '@/app/const';
import Avatar from '@/app/components/app/Avatar';

import LargeButton from '@/app/components/dashboard/button/LargeButton';
import Label from '@/app/components/dashboard/Text/Label';
import Text from '@/app/components/dashboard/Text/Text';
import Badge from '@/app/components/dashboard/Text/Badge';

import { useRouter } from 'next/navigation';
import ProductInfoModal from './modal/ProductInfoModal';
import ProductDetailsModal from './modal/ProductDetailsModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetailsInfo = (props: {product: any}) => {
    const {product} = props;

    
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenInfoModal, setisOpenInfoModal] = useState(false);
    const [isOpenDescriptionModal, setisOpenDescriptionModal] = useState(false);

    const route = useRouter();

    const onOpenInfoModal = () => {
        setisOpenInfoModal(!isOpenInfoModal);
    }

    const onOpenDescriptionModal = () =>{
        setisOpenDescriptionModal(!isOpenDescriptionModal);

    }

    const onSubmit = (data:any) => {
        setIsLoading(true);
    
        axios.post(`/api/dashboard/product/${product.id}`, data)
          .then(() => {
            toast.success('Product Updated');
            router.refresh();
          })
          .catch(() => {
            toast.error('Something went wrong.')
          })
          .finally(() => {
            setIsLoading(false);
          });
    }

    return (
        <>
        
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                Product Details
            </h3>

            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                            <Avatar src={product?.coverSrc || defaultProductImage}/>
                        </div>
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {product?.title}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                            <Badge text={product?.category}/>

                                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                {product?.description}
                                </p>
                            </div>
                        </div>

                        
                    </div>

                    <LargeButton label='Edit' onClick={onOpenInfoModal}/>
                </div>
            </div>

            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Product Information
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <Label text='Title'/>
                                <Text text={product?.title}/>
                            </div>

                            <div>
                                <Label text='Category'/>
                                <Text text={product?.category}/>
                            </div>                      
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <Label text='Description'/>
                                <Text text={product?.description}/>
                            </div>                          
                        </div>
                    </div>

                   <LargeButton label='Edit' onClick={onOpenInfoModal}/>
                </div>
            </div>
            
    
                 {/* ADDRESS INFO     */}
            <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Product Price
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <Label text='Total Price'/>
                                <Text text={product?.totalPrice}/>
                            </div>

                            <div>
                        
                                <Label text='Stock'/>
                                <Text text={product?.stock}/>
                            </div>

                            <div>
                                <Label text='Portion'/>
                                <Text text={product?.portion}/>
                                
                            </div>
                        </div>
                    </div>

                    <LargeButton label='Edit' onClick={onOpenDescriptionModal}/>
                </div>
            </div>

{/* HOURS OF OPERATION */}
<div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Product Details
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <Label text='THC'/>
                                <Text text={`${product?.THC || 0}%`}/>
                            </div>

                            <div>
                        
                                <Label text='CBD'/>
                                <Text text={`${product?.CBD || 0}%`}/>
                            </div>

                        </div>

                    </div>
                    <LargeButton label='Edit' onClick={onOpenDescriptionModal}/>
                </div>
            </div>


        </div>
        {/* Modal Section */}
        <div>
            

            <ProductInfoModal 
                data={product} 
                onClose={onOpenInfoModal} 
                onSubmit={onSubmit}
                open={isOpenInfoModal}/>

            <ProductDetailsModal 
                data={product} 
                onClose={onOpenDescriptionModal} 
                onSubmit={onSubmit}
                open={isOpenDescriptionModal}/>

           
        </div>
        {/* End Modal Section */}
        </>
    )
}

export default ProductDetailsInfo