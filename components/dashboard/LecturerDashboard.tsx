import React from 'react'
import { Button } from '../ui/button'
import ProgressBar from './progressBar'
import Link from 'next/link'

const LecturerDashboard = () => {
  return (
    <div className='bg-white w-full h-[100%] rounded-md shadow-md p-2'>
       <div className=" flex px-2 justify-end">
          <Link href="/dashboard/Classes"><Button>Create Course</Button></Link>
       </div>
       <div>
          <div className='flex flex-col w-full md:flex-row items-center gap-4'>
            <div className='mt-4 md:flex-1 w-full border-1 rounded-md bg-white p-2 border-gray-300/20'>
                <h1 className='mb-2 text-gray-500'>Percentage Presence</h1>
                <h1 className='text-2xl md:text-3xl lg:text-6xl font-bold'>
                  80%
                </h1>
                <ProgressBar width="80"/>
            </div>
            <div className='mt-4 md:flex-1 w-full border-1 rounded-md bg-white p-2 border-gray-300/20'>
              <h1 className='mb-2 text-gray-500'>Percentage Absence</h1>
              <h1 className='text-2xl md:text-3xl lg:text-6xl font-bold'>
                  45%
                </h1>
              <ProgressBar width="45"/>
            </div>
            <div className='mt-4 md:flex-1 w-full border-1 rounded-md bg-white p-2 border-gray-300/20'>
                <h1 className='mb-2 text-gray-500'>Total number of created classes</h1>
                <h1 className='text-2xl md:text-3xl lg:text-6xl font-bold'>
                  45
                </h1>
            </div>
          </div>
          <div className='mt-6 flex flex-col md:flex-row gap-2'>
            <div className='flex-1 rounded-md border  bg-white p-2 border-gray-300'>  
                <h1>Class Records</h1>
                <div className='text-gray-500'>
                  <div className='flex items-center justify-between border-1 rounded-md px-2 py-1 mt-2 border-gray-300'>
                    <div>
                      <h1>Course: Understanding Physics</h1>
                      <h1>Date:  12/25/2025</h1>
                    </div>
                  </div>
                  <div className='flex items-center justify-between border-1 rounded-md px-2 py-1 mt-2 border-gray-300'>
                    <div>
                      <h1>Course: Understanding Physics</h1>
                      <h1>Date:  12/25/2025</h1>
                    </div>
                  
                  </div>
                  <div className='flex items-center justify-between border-1 rounded-md px-2 py-1 mt-2 border-gray-300'>
                    <div>
                      <h1>Course: Understanding Physics</h1>
                      <h1>Date:  12/25/2025</h1>
                    </div>
          
                  </div>
                </div>
            </div>
            <div className='flex-1 mt-4 md:mt-0 rounded-md border bg-white p-2 border-gray-300'>  
                <h1>Attendance Records</h1>
                <div className='text-gray-500'>
                  <div className='border-1 rounded-md px-2 py-1 mt-2 border-gray-300'>
                    <div className='flex w-full justify-between'>
                      <div>
                        <h1>Course: Understanding Physics</h1>
                        <h1>Date:  12/25/2025</h1>
                      </div>
                      <div>
                        <h1>Present: 20</h1>
                        <h1>Absent: 5</h1>
                      </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between gap-3 flex-1'>
                          <h1 className='text-gray-500'>Percentage Presence</h1>
                          <div className='w-20'>
                            <ProgressBar width="50"/>
                          </div>
                        </div>
                    </div>
                  </div>
                  {/* Repeat the above block for more records */}
                  <div className='border-1 rounded-md px-2 py-1 mt-2 border-gray-300'>
                    <div className='flex w-full justify-between'>
                      <div>
                        <h1>Course: Understanding Physics</h1>
                        <h1>Date:  12/25/2025</h1>
                      </div>
                      <div>
                        <h1>Present: 20</h1>
                        <h1>Absent: 5</h1>
                      </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between gap-3 flex-1'>
                          <h1 className='text-gray-500'>Percentage Presence</h1>
                          <div className='w-20'>
                            <ProgressBar width="50"/>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className='border-1 rounded-md px-2 py-1 mt-2 border-gray-300'>
                    <div className='flex w-full justify-between'>
                      <div>
                        <h1>Course: Understanding Physics</h1>
                        <h1>Date:  12/25/2025</h1>
                      </div>
                      <div>
                        <h1>Present: 20</h1>
                        <h1>Absent: 5</h1>
                      </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-between gap-3 flex-1'>
                          <h1 className='text-gray-500'>Percentage Presence</h1>
                          <div className='w-20'>
                            <ProgressBar width="50"/>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            
          </div>

          <div className='mt-6 bg-white'>
                <div>
                  <p className='text-gray-600'>Quick Action</p>
                </div>
                <div className='flex flex-col md:flex-row gap-2 mt-2'>
                  <div className='flex-1 p-2  text-center flex items-center h-20 text-gray-600 border border-gray-300/20 rounded-md'>
                      <p>Check out your classes</p>
                  </div>
                  <div className='flex-1 p-2  text-center flex items-center h-20 text-gray-600 border border-gray-300/20 rounded-md'>
                      <p>Check out your classes</p>
                  </div>
                  <div className='flex-1 p-2 text-center flex items-center h-20 text-gray-600 border border-gray-300/20 rounded-md'>
                      <p>Check out your classes</p>
                  </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default LecturerDashboard