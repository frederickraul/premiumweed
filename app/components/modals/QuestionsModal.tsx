import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputUnregistered from '../inputs/InputUnregistered';
import Button from '../Button';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';

interface QuestionsModalProps {
    questions: any;
    isOpen: boolean;
    onSave:(data:any)=>void;
    onUpdate?:(data:any)=>void;
    onClose:() => void;
    isLoading?:boolean;
  }

  const QuestionsModal: React.FC<QuestionsModalProps> = ({
    questions,
    isOpen,
    onSave,
    onUpdate,
    onClose,
    isLoading,
  }) => {

    useEffect(() => {
        setfilteredQuestions(questions);
    }, [questions]);
    

    const [filteredQuestions, setfilteredQuestions] = useState(questions);
    const [filterValue, setfilterValue] = useState('');
    

    const filter = (value:string) =>{
        if(value.length <= 0){
            clear();
        }
        if(value.length >= 3){
            const currentQuestions = questions;
        
            const filtered = currentQuestions.filter((question: any) => (question.question.toLowerCase()).includes(value.toLowerCase()));
            setfilteredQuestions(filtered);
        }
    }

    const clear = () => {
        setfilterValue('');
        setfilteredQuestions(questions);
    }

    const handleSaveQuestion = () =>{
        const data = {
            question:filterValue,
            answer:'',
        }
        
        onSave(data);

        clear();
    }

    const bodyContent = (
        <div className='flex flex-col'>
            <div className='fixed bg-white left-0 right-0 top-[75px] h-[100px]'>
                <div className='relative p-5'>
                    <div className='flex flex-row fixed w-[100%]'>
                        <div className='w-[78%] relative'> 
                        <InputUnregistered
                            label=''
                            onChange={(e)=>{
                                setfilterValue(e.target.value);
                                filter(e.target.value);
                            }}
                            value={filterValue}
                        />
                        <span 
                            onClick={clear}
                            className='
                                absolute 
                                right-5 
                                top-3
                                mt-2 
                                cursor-pointer
                                text-blue-500'>
                                    <MdOutlineClear size={30}/>
                                </span>
                        </div>
                        <div className='w-[70px] aspect-square h-[70px] flex'>
                        <Button 
                            outline 
                            borderless 
                            styles='border-transparent' 
                            iconSize={35} 
                            icon={BiSearch} 
                            label='' 
                            onClick={()=>{}}/>
                        </div>
                    </div>
            </div>
            </div>
  
            <div className=' flex flex-col mt-[100px] min-h-[500px]'>
                {filteredQuestions.map((question: any) =>(
                    <div key={question.id} className='w-ful flex flex-col mb-3'>
                        <span className='font-bold'>
                            Q: {question.question}
                        </span>
                        {question.answer !== '' &&
                        <span>A: {question.answer}</span>
                        }
                    </div>
                    ))
                }

              
            </div>
        </div>
    );
    return (
        <Modal
            size='sm'
            isOpen={isOpen}
            title="Looking for specific info?"
            body={bodyContent}
            onClose={onClose}
            onSubmit={handleSaveQuestion}
            actionLabel="Post your question"
            disabled={isLoading}
    
        />
      )
}

export default QuestionsModal