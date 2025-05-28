import React from 'react'

const Badge = (props:{text:any}) => {
    const {text} = props;
  return (
    <span className={`
            text-xs 
            font-medium 
            me-2 
            px-2.5 
            py-0.5 
            rounded-full 
            bg-gray-300
         dark:bg-gray-700
            ${text == 'Listing' && 'bg-green-100 text-green-800 border border-green-400'}
            ${text == 'Listing' && 'dark:bg-green-900 dark:text-green-300'}
            ${text == 'Product' && 'bg-yellow-100 text-yellow-800 border border-yellow-300'}
            ${text == 'Product' && 'dark:bg-yellow-900 dark:text-yellow-300'}
            ${text == 'Seller' && 'bg-blue-100 text-blue-800 border border-blue-400'}
            ${text == 'Seller' && ' dark:bg-blue-900 dark:text-blue-300'}         
            `
            }>
        {text}
    </span>
  )
}

export default Badge