import ProgressBar from '@/components/dashboard/progressBar'
import { Button } from '@/components/ui/button'
import React from 'react'

const RecordsPage = () => {
  return (
    <div className='bg-white w-full h-[100%] rounded-md shadow-md p-2'>
        <div><p className='text-gray-400'>Record</p></div>
        <div className="w-full">
           <div className='flex justify-between items-center mt-3 rounded-md bg-white border-gray-300/20 p-2 border-1'>
                <div className='flex flex-col w-fit'>
                    <h1>Course: Understanding Physics</h1>
                    <h1>Date: 20/14/2025</h1>
                    <h1 className='flex gap-2'>% Presence: <ProgressBar width='80'/> </h1>
                    <h1 className='flex gap-2'>% Absence: <ProgressBar width='60'/> </h1>
                </div>
                <div className='flex flex-col'>
                    <Button className='mb-2'>View</Button>
                    <Button>Download</Button>
                </div>
           </div>
           <div className='flex justify-between items-center mt-3 rounded-md bg-white border-gray-300/20 p-2 border-1'>
                <div className='flex flex-col w-fit'>
                    <h1>Course: Understanding Physics</h1>
                    <h1>Date: 20/14/2025</h1>
                    <h1 className='flex gap-2'>% Presence: <ProgressBar width='80'/> </h1>
                    <h1 className='flex gap-2'>% Absence: <ProgressBar width='60'/> </h1>
                </div>
                <div className='flex flex-col'>
                    <Button className='mb-2'>View</Button>
                    <Button>Download</Button>
                </div>
           </div>
           <div className='flex justify-between items-center mt-3 rounded-md bg-white border-gray-300/20 p-2 border-1'>
                <div className='flex flex-col w-fit'>
                    <h1>Course: Understanding Physics</h1>
                    <h1>Date: 20/14/2025</h1>
                    <h1 className='flex gap-2'>% Presence: <ProgressBar width='80'/> </h1>
                    <h1 className='flex gap-2'>% Absence: <ProgressBar width='60'/> </h1>
                </div>
                <div className='flex flex-col'>
                    <Button className='mb-2'>View</Button>
                    <Button>Download</Button>
                </div>
           </div>
        </div>
    </div>
  )
}

export default RecordsPage