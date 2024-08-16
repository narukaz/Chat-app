import React from 'react'

function Inputs({handleKeyDown,inputType, placeholder, value, setValue}) {

  


  return (
    <>
    <input onKeyDown={handleKeyDown}
    type={inputType} placeholder={placeholder}
    value={value}
    onChange={(e)=>setValue(e.target.value)}
    className='bg-secondary-bg rounded-xl px-3 py-4 text-[20px] font-normal border border-border-light  font-fira text-20px text-text-primary placeholder:font-extralight'/>
    </>
  )
}

export default Inputs
