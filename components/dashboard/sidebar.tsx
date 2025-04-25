
"use client"
import React, { useEffect, useState } from 'react'
import { BookOpen, SheetIcon, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const SideBar = () => {
    const present = usePathname()
    const role = "lecturer"
    const router = useRouter()
    const StudentPages = [
       {
        title: "My Classes",
        icon: <BookOpen/>,
        link: "dashboard/Classes"
       },
       {
        title: "Attendance Records",
        icon: <SheetIcon/>,
        link: "dashboard/Classes"
       }
    ]
    const LecturerPages = [
        {
            title: "My Classes",
            icon: <BookOpen/>,
            link: "/dashboard/Classes"
        },
        {
            title: "Attendance Records",
            icon: <SheetIcon/>,
            link: "/dashboard/records"
        }
    ]
    const pages = role === "lecturer" ? LecturerPages : StudentPages
    const [token, setToken] = useState("")
    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
            setToken(refreshToken)}}, [])
        

    const Logout = async () => {
        try{
            const response = await axios.post("https://attendee-api.onrender.com/Attendee/logout/", {
                refresh: token},
               {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
               })
            console.log(response.data)
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            router.push("/Auth/login")
        }catch (error) {   
            console.log(error)
        }
    }
    console.log(present)
  return (
    <div className='w-[60%] lg:w-[20%] h-full border bg-white absolute md:relative'>
        <div className='border-b-2 py-3'>
            <h1 className='text-4xl font-bold'>Attendee</h1>
        </div>
        <div className='flex gap-2 border-b-2'>
            <div className='w-8 h-8 rounded-full'></div>
            <div className='text-left'>
                <h1>Newton</h1>
                <p>Lecturer</p>
            </div>
        </div>
        <div className='flex flex-col p-1'>

            {
                pages.map((item, index) => 
                    <div className="w-full mt-1 flex gap-2 px-2 rounded-md" key={index}>
                      <Link href={item.link} className='w-full'>
                            <div className={cn('flex hover:bg-gray-300 w-full gap-2  p-1 rounded-md')}>
                                    {item.icon}
                                        <div>
                                            {item.title}
                                        </div>
                            </div>
                      </Link>
                    </div>
                )
            }
        </div>
        <div className='border-gray-500 absolute w-full bottom-0'>
            <hr/>
            <div className='py-2 px-2'>
                <p className='flex justify-between items-center text-red-500 cursor-pointer' onClick={Logout}>LogOut <LogOut/></p>
            </div>

        </div>

    </div>
  )
}

export default SideBar