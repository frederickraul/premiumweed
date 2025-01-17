'use client';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';

const PlayNotification = ({isMuted}) => {

     const audioRef = useRef();
    const [playAudio, setplayAudio] = useState(false);
    
    useEffect(() => {
     if(playAudio == true){
        console.log('Play Notification');
        play();
        setplayAudio(false);
      
     }
    }, [playAudio])
    

     useEffect(() => {
      setplayAudio(!isMuted);
     }, [isMuted])
     
      const play = () => {
        if (audioRef.current) {
          audioRef.current.play();
        } else {
          // Throw error
        }
      }
    
      return (
        <div className='hidden'>
          <button onClick={play}>Play</button>
          <audio muted={playAudio} ref={audioRef} src='/sounds/correct-2-46134.mp3' />
        </div>
      )
    
}

export default PlayNotification