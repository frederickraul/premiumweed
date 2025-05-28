import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputUnregistered from '../inputs/InputUnregistered';
import Button from '../Button';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';
import InputText from '../inputs/InputText';
import { defaultImage } from '@/app/const';

interface QuestionsModalProps {
    questions: any;
    isOpen: boolean;
    onSave:(data:any)=>void;
    onUpdate?:(data:any)=>void;
    onClose:() => void;
    isLoading?:boolean;
    isOwner?:any;
    owner?:any;
  }

  const QuestionsModal: React.FC<QuestionsModalProps> = ({
    questions,
    isOpen,
    onSave,
    onUpdate,
    onClose,
    isLoading,
    isOwner,
    owner,
  }) => {

    useEffect(() => {
            setfilteredQuestions(questions);
        
    }, [questions]);
    

    const [filteredQuestions, setfilteredQuestions] = useState([]);
    const [filterValue, setfilterValue] = useState('');
    const [error, setError] = useState(false);
    

    const filter = (value:string) =>{
        if(value.length <= 0){
            clear();
        }
        if(value.length >= 3){
            const currentQuestions = questions;
            if(currentQuestions === null){
                return
            }
            const filtered = currentQuestions.filter((item: any) => (item.question.toLowerCase()).includes(value.toLowerCase()));
            setfilteredQuestions(filtered);
        }
    }

    const clear = () => {
        setfilterValue('');
        if(questions != null)
        setfilteredQuestions(questions);
    }

    const handleSaveQuestion = () =>{
   
        if(filterValue.length <= 3){
            setError(true);
            return;
        }
        const data = {
            question:filterValue,
        }
        
        onSave(data);

        clear();
    }

    const bodyContent = (
        <div className='flex flex-col'>
            <div className={`
                    ${isOwner ? 'hidden' :'h-auto'}
                    bg-white 
                    left-0 
                    right-0 
                    
                    `}>
                <div className='relative p-2'>
                    <div className='flex flex-row items-center mb-5'>
                    <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                      <img src={owner?.image || defaultImage} alt="profile" className="h-full w-full object-cover object-center aspect-square rounded-full" />
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                    </div>
                        <span>
                        {owner?.name}
                        </span>
                    </div>
                    <div className='flex flex-row w-[100%]'>
                        <InputText
                            rowsNumber={3}
                            label=''
                            onChange={(e)=>{
                                if(error){setError(false)}
                                setfilterValue(e.target.value);
                                filter(e.target.value);
                            }}
                            value={filterValue}
                        />

  
                    </div>
                    {error &&
                    <div className='mt-5 ml-2 relative text-red-500'>
                        The message is too short!!!
                    </div>
                    }
                </div>
            </div>
  
    
        </div>
    );
    return (
        <Modal
            size='sm'
            isOpen={isOpen}
            title={"Looking for specific info?"}
            body={bodyContent}
            onClose={onClose}
            onSubmit={handleSaveQuestion}
            actionLabel={isOwner ? '' : 'Send'}
            disabled={isLoading}
        
    
        />
      )
}

export default QuestionsModal