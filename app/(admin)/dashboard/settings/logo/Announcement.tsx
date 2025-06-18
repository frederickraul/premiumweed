import React from 'react'

const Announcement = (props:{onSubmit?:any}) => {
    const {onSubmit} = props;
    

    return (
        <div className="w-full max-w-[530px] rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1E2634]">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light-50 text-blue-500 dark:bg-blue-500/[0.15] dark:text-blue-500">
                    <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM10.9991 7.52507C10.9991 8.07736 11.4468 8.52507 11.9991 8.52507H12.0001C12.5524 8.52507 13.0001 8.07736 13.0001 7.52507C13.0001 6.97279 12.5524 6.52507 12.0001 6.52507H11.9991C11.4468 6.52507 10.9991 6.97279 10.9991 7.52507ZM12.0001 17.3714C11.5859 17.3714 11.2501 17.0356 11.2501 16.6214V10.9449C11.2501 10.5307 11.5859 10.1949 12.0001 10.1949C12.4143 10.1949 12.7501 10.5307 12.7501 10.9449V16.6214C12.7501 17.0356 12.4143 17.3714 12.0001 17.3714Z" fill=""></path>
                    </svg>
                </div>

                <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
                    <div>
                        <h5 className="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
                            New update! Available
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            There's new changes on website logo.
                        </p>
                    </div>
                    <button onClick={onSubmit}  className="flex w-full items-center gap-3 sm:max-w-fit ml-5">
                        <div className="flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                            Save new changes
                        </div>

                    </button>
                </div>
            </div>
        </div>
    )
}

export default Announcement