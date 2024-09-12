import React,{useState} from 'react'
import EditIcon from "@mui/icons-material/Edit";

function ReceiverMessage({message, index,handleOnMessageEdit,messageID}) {
    const [isHoverd, setIsHovered] = useState(false);
  return (
    <div
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    className="self-end bg-primary-bg p-2 flex gap-5 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] max-w-[80%]"
    key={index}
  >
    <h3 className="font-fira text-text-primary">
      {message}
    </h3>
    <EditIcon
        onClick={()=>{
        handleOnMessageEdit(message,messageID)
        }}


      className="cursor-pointer text-text-secondary"
      style={{
        visibility: isHoverd ? "visible" : "hidden",
        display: isHoverd ? "block" : "none",
        transition: "all 0.5s ease, transform 0.5s ease",
      }}/>
  </div>
  )
}

export default ReceiverMessage
