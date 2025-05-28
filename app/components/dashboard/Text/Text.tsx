import React from 'react'

const Text = (props:{text:any,className?:string}) => {
    const {text,className}= props;
  return (
    <p className={`text-sm font-medium text-gray-800 dark:text-white/90 ${className}`}>
        {text}
</p>
  )
}

export default Text