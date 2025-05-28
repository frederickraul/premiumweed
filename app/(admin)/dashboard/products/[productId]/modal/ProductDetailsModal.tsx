import Avatar from '@/app/components/app/Avatar';
import ImageUpload from '@/app/components/app/inputs/ImageUpload';
import FormInput from '@/app/components/dashboard/Input/FormInput';
import FormSelect from '@/app/components/dashboard/Input/FormSelect';
import FormLabel from '@/app/components/dashboard/Text/FormLabel';
import { categoryList, defaultProductImage } from '@/app/const';
import React, { useState } from 'react'

const ProductDetailsModal = (props:{open:boolean, onClose:any, data:any,onSubmit:any}) => {
    const {data, open, onClose, onSubmit} = props;
    
    if(!open){
        return
    }

    const [product, setProduct] = useState(data);

    const handleSubmit = () => {
        onClose();
        onSubmit(product); 
     }

    const handleInputChange = (field:string, value:any) =>{
        setProduct({...product, [field]: value})
    }

    const handleSelectChange = (field:string,value:any)=>{
        setProduct({...product, [field]: value})
    }

    const handleCloseModal = () =>{
        setProduct(data);
        onClose();
    }
    



    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center p-5 overflow-y-auto z-99999">
                <div className="modal-close-btn fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"></div>
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    {/* <!-- close btn --> */}
                    <button onClick={handleCloseModal} className="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
                        <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z" fill=""></path>
                        </svg>
                    </button>
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Edit Product Information
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Update your details to keep your product up-to-date.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2">
                            {/* Product Price */}
                            <div>
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Product Price
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <FormLabel text='Total Price'/>
                                        <FormInput type='text' value={product?.totalPrice} onChange={(value:any)=>{
                                            handleInputChange('totalPrice',value);
                                        }}/>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <FormLabel text='Stock'/>
                                        <FormInput type='number' value={product?.stock} onChange={(value:any)=>{
                                            handleInputChange('stock',value);
                                        }}/>
                                    </div>
                                  
                                    <div className="col-span-2 lg:col-span-1">
                                    <FormLabel text='Portion'/>
                                    <FormInput type='text' value={product?.portion} onChange={(value:any)=>{
                                            handleInputChange('portion',value);
                                    }}/>

                                    </div>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="mt-7 mb-6">
                                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                    Product Details
                                </h5>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2 lg:col-span-1">
                                        <FormLabel text='THC'/>
                                        <FormInput type='text' value={product?.THC} onChange={(value:any)=>{
                                            handleInputChange('THC',value);
                                        }}/>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1">
                                        <FormLabel text='CBD'/>
                                        <FormInput type='number' value={product?.CBD} onChange={(value:any)=>{
                                            handleInputChange('CBD',value);
                                        }}/>
                                    </div>
                            
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <button onClick={handleCloseModal} type="button" className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto">
                                Close
                            </button>
                            <button onClick={handleSubmit} 
                            type="button" 
                            className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium dark:text-white text-gray-700  hover:bg-brand-600 sm:w-auto">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsModal
