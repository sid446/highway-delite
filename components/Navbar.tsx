import React from 'react'

function Navbar() {
  return (
    <div className='h-[87px] shadow-md bg-[#F9F9F9] text-black pl-[124px]  pr-[124px] w-full flex justify-between items-center px-4'>
       <div>
        <img className='w-[100px]' src="/logo2.png" alt="" />
       </div>
       <div className='flex gap-2.5'>
        <input className='px-4 h-[42px] w-[340px] bg-[#EDEDED] rounded-sm' placeholder="Search experiences" type="text" />
        <button className='items-center w-[87px] h-[42px] text-[14px] bg-[#FFD643] text-[#161616] font-medium rounded-sm'>Search</button>
       </div>
    </div>
  )
}

export default Navbar