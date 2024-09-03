import React,{useContext, useEffect, useRef} from 'react'
import DataContext from "../context/data/dataContext";

function ChatViewer({conversation, scrollToEnd}) {

    const {userInfo}=useContext(DataContext);
    






    useEffect(()=>{
    }, [conversation])


  return (
    <div className=" bg-tertiary-bg flex-1 rounded-[20px] py-2 px-4 flex flex-col gap-3 overflow-x-scroll" ref={scrollToEnd}>
    {/* adding styles */}
    
    {conversation.map((dialouge,index)=>{

                  if(dialouge.sender == userInfo._id){
                    return (
                     
                      <div className="self-end bg-primary-bg p-2 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] max-w-[80%]" key={index}>
                        <h3 className="font-fira text-text-primary">{dialouge.message}</h3>
                      </div>
                      
                    )}

                    else return(
                      <div className="self-start bg-secondary-bg p-2 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] max-w-[80%]" key={index}>
                        <h3 className="font-fira text-text-primary">{dialouge.message}</h3>
                      </div>
                    )
    })}
    </div>
  )
}

export default ChatViewer
