import React from 'react'

const Label = (props:{text:any}) => {
    const {text} = props;
  return (
    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
        {text}
    </p>
  )
}

export default Label