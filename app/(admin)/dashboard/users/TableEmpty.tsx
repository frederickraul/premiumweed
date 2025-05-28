import React from 'react'

const TableEmpty = (props:{headers:any}) => {

  const {headers} = props;

  return (
    <div className="overflow-hidden rounded-[10px]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1170px]">
          <div className="grid grid-cols-6 bg-[#F9FAFB]  px-4 py-4.5 dark:bg-meta-4 sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 md:col-span-3 flex items-center">
              <p className="font-medium">{headers[1]}</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">{headers[2]}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">{headers[3]}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">{headers[4]}</p>
            </div>
          </div>
      <div className="bg-white dark:bg-boxdark">
      <div
        className="border-t border-stroke px-4 py-4.5 dark:border-strokedark  md:px-6 2xl:px-7.5"
        
        >
          <div className="flex items-center justify-center">
            <div className="text-2xl">
                No Data Founded
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>

  )
}

export default TableEmpty