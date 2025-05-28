import { read } from 'fs';
import React from 'react'

const FormInput = (props: { value: any, onChange: any,type?:string, readonly?:boolean }) => {
    const { value, onChange,type, readonly } = props;

    const handleInputChange = (e:any) =>{
        onChange(e.target.value);
    }

    let icon = (<></>);
    if(type ==='url'){
        icon = (
            <span className="absolute top-1/2 left-0 inline-flex h-11 -translate-y-1/2 items-center justify-center border-r border-gray-200 py-3 pr-3 pl-3.5 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                http://
            </span>
        )
    }

    if(type === 'email'){
        icon = (
            <span className="
                z-1
                absolute top-1/2 left-0 -translate-y-1/2 border-r  px-3.5 py-3   
                border-gray-200
                fill-gray-600
                dark:fill-white
                dark:border-gray-800">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.04175 7.06206V14.375C3.04175 14.6511 3.26561 14.875 3.54175 14.875H16.4584C16.7346 14.875 16.9584 14.6511 16.9584 14.375V7.06245L11.1443 11.1168C10.457 11.5961 9.54373 11.5961 8.85638 11.1168L3.04175 7.06206ZM16.9584 5.19262C16.9584 5.19341 16.9584 5.1942 16.9584 5.19498V5.20026C16.9572 5.22216 16.946 5.24239 16.9279 5.25501L10.2864 9.88638C10.1145 10.0062 9.8862 10.0062 9.71437 9.88638L3.07255 5.25485C3.05342 5.24151 3.04202 5.21967 3.04202 5.19636C3.042 5.15695 3.07394 5.125 3.11335 5.125H16.8871C16.9253 5.125 16.9564 5.15494 16.9584 5.19262ZM18.4584 5.21428V14.375C18.4584 15.4796 17.563 16.375 16.4584 16.375H3.54175C2.43718 16.375 1.54175 15.4796 1.54175 14.375V5.19498C1.54175 5.1852 1.54194 5.17546 1.54231 5.16577C1.55858 4.31209 2.25571 3.625 3.11335 3.625H16.8871C17.7549 3.625 18.4584 4.32843 18.4585 5.19622C18.4585 5.20225 18.4585 5.20826 18.4584 5.21428Z"></path>
                </svg>
        </span>
        );
    }

    //     return(
    //     <div className="relative">
            // <span className="absolute top-1/2 left-0 inline-flex h-11 -translate-y-1/2 items-center justify-center border-r border-gray-200 py-3 pr-3 pl-3.5 text-gray-500 dark:border-gray-800 dark:text-gray-400">
            //     http://
            // </span>
    //         <input 
    //             type="url" 
    //             value={value}
    //             placeholder="www.mywebsite.com" 
    //             onChange={handleInputChange}
    //             className="
    //                 dark:bg-dark-900 
    //                 shadow-theme-xs 
    //                 focus:border-brand-300 
    //                 focus:ring-brand-500/10 
    //                 dark:focus:border-brand-800 
    //                 h-11 
    //                 w-full 
    //                 rounded-lg 
    //                 border 
    //                 border-gray-300 
    //                 bg-transparent 
    //                 px-4 
    //                 py-2.5 
    //                 pl-[90px] 
    //                 text-sm 
    //                 text-gray-800 
    //                 placeholder:text-gray-400 
    //                 focus:ring-3 focus:outline-hidden 
    //                 dark:border-gray-700 
    //                 dark:bg-gray-900 
    //                 dark:text-white/90 
    //                 dark:placeholder:text-white/30"/>
    //     </div>
    //     )
    // }
    return (
        <div className="relative">
            {icon}
        <input 
        readOnly={readonly}
        type={`${type? type: 'text'}`} 
        value={value} 
        onChange={handleInputChange}
        className={`
            ${type == 'url' && 'pl-[90px]'}
            ${type == 'email' && 'pl-[62px]'}
            ${readonly ? 'bg-gray-200': 'dark:bg-transparent bg-none '}
            h-11 
            w-full 
            appearance-none 
            rounded-lg 
            border 
            border-gray-300 
            px-4 
            py-2.5 
            text-sm 
            text-gray-800 
            shadow-theme-xs 
            placeholder:text-gray-400 
            focus:border-brand-300 
            focus:outline-hidden 
            focus:ring-3 
            focus:ring-brand-500/10 
            dark:invert
            dark:border-gray-150 
            
            dark:text-black/90 
            dark:placeholder:text-white/30 
            dark:focus:border-brand-800
            `
            } />
            </div>


    )
}

export default FormInput