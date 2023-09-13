'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return ( 
    <div className="z-10 w-[100%] h-[100%] bg-white opacity-70  absolute">
    <div
      className="fixed left-[50%] top-[35%] z-10"
      >
      <PuffLoader
        size={100}
        color="red"
        
        />
    </div>
        </div>
   );
}
 
export default Loader;