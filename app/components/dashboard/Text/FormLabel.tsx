import React from 'react'

const FormLabel = (props:{text:any}) => {
    const {text} = props;
    return (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            {text}
        </label>
    )
}

export default FormLabel