import React, { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'

const FormatTime = (props:{date:any}) => {

    const {date} = props;

   const [timestamp, settimestamp] = useState<any>(0);
    useEffect(() => {
        const newtimestamp = new Date(date || 0);
        console.log(newtimestamp)
        settimestamp(newtimestamp);
    }, [date]);
    


  return (
    <div>
    </div>
  )
}

export default FormatTime