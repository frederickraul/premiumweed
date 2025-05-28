'use client';

import { PuffLoader,BarLoader,PacmanLoader,PropagateLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div className="z-20 w-[100%] h-[100%] bg-white absolute top-0 flex items-center justify-center">

      <PropagateLoader
        size={25}
        color="green"
        
        />
    </div>
   );
}
 
export default Loader;