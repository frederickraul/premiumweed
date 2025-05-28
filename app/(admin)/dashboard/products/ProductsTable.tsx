'use client'
import { formatDate } from "@/app/const/hours";
import { Product } from "@/app/types/dashboard/types/product";
import Image from "next/image";
import { useRouter } from "next/navigation";


const ProductsTable = (props:{
    headers:String[];
    data?:any;
}) => {

  const route = useRouter();
  
    if(!props.data){
        return (
        <div>
          No data  
        </div>
        );
    }
  return (
    <div className="overflow-hidden rounded-[10px]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1170px]">
          <div className="grid grid-cols-6 bg-[#F9FAFB]  px-4 py-4.5 dark:bg-meta-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 md:col-span-3 flex items-center">
              <p className="font-medium">{props.headers[1]}</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">{props.headers[2]}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">{props.headers[3]}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">{props.headers[4]}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">{props.headers[5]}</p>
            </div>
          </div>
      <div className="bg-white dark:bg-boxdark">
   
      {
    
      props.data.map((item:any, key:any) => (
        <div
        className="cursor-pointer grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        key={key}
        onClick={()=>{route.push('/dashboard/products/'+item?.id)}}
        >
          <div className="col-span-2 md:col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md bg-cover aspect-square">
                <Image
                  src={item.coverSrc || '/images/Poster_not_available.jpg'}
                  width={60}
                  height={50}
                  alt="Product"
                  className="aspect-square"
                  />
              </div>
              <p className="text-sm text-black dark:text-white">
                {item.title}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {item.category}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {item.userName}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">${item.totalPrice}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">{formatDate(item.createdAt)}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProductsTable;