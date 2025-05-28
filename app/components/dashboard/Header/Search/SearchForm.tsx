'use client';
import SearchIcon from '@/app/components/icons/icon-search.svg';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import SearchList from './SearchList';


const SearchForm = () => {
    const [filterName, setFilterName] = useState("");
    const [foundedElements, setfoundedElements] = useState<any>();
    const [isSearching, setisSearching] = useState(false);

    const handleFilterByName = (event:any) => {
        setFilterName(event.target.value);
      };

    const clearFilterName =()=>{
      setFilterName('');
    }

      
    //Search a element
  const searchQuote =  useCallback(async() => {
    if(filterName == ''){
      return;
    }
    // setisConfirmVisible(false);
    // setisLoading(true);
    setisSearching(true);
    

    await axios.post(`/api/dashboard/search/`, { filterName: filterName })
      .then((response) => {
        const data = response?.data
        setfoundedElements(data);
        // setisSearchModalVisible(true);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        // setisLoading(false);
        setisSearching(false);

      })
  }, [ filterName]);

useEffect(() => {
    if(filterName.length < 4){
      setfoundedElements([]);
        return;
    }

    if(!isSearching){
        searchQuote();
    }


    // const dataFiltered = applyFilter({
    //   inputData: data,
    //   comparator: getComparator(null, null),
    //   filterName,
    // });
  
    // setBuyers(dataFiltered);
    // const notFound = !dataFiltered.length && !!filterName;
    // setNotFound(notFound);
  
    
  }, [filterName]);

  return (
    <div className="hidden sm:block w-full lg:w-3/4 px-10">
    <div>
      <div className="
        relative  
        border   
      border-gray-200 
      dark:border-gray-800 
      rounded-lg
      p-3
      ">
        <button className="ml-3 absolute left-0 top-1/2 -translate-y-1/2" onClick={searchQuote}>
          <SearchIcon className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary" />
        </button>

        <input
        value={filterName}
          type="text"
          placeholder="Search by: Listing Name, Product Name, Phone Number, Address, Email. Website URL..."
          className="
              w-full 
              bg-transparent 
              pl-9 
              pr-4 
              font-medium 
              focus:outline-none
              "
              onChange={handleFilterByName}
          />
<button className="transition-color absolute right-0 top-0 z-999 flex h-11 w-11 items-center justify-center rounded-full  text-gray-400  hover:text-gray-600  dark:text-gray-400  dark:hover:text-gray-300" onClick={clearFilterName}>
                        <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z" fill=""></path>
                        </svg>
                    </button>
      </div>
      
    </div>
  
    
   <SearchList foundedElements={foundedElements}/>
  </div>
  )
}

export default SearchForm