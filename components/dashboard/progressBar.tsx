import React from 'react'

interface widthprop{
  width: string
}
const ProgressBar = ({width}: widthprop) => {
  return (
    <div className='flex items-center gap-3 flex-1'>
        <div className='h-2 bg-gray-100/40 rounded-full w-full'>
           <div className='bg-blue-500 rounded-full  h-full m-0' style={{
            width: `${width}%`
           }}/>
           
        </div>
    </div>
  )
}

export default ProgressBar