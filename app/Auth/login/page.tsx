'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

   const BASEURL = "https://attendee-api.onrender.com/Attendee/"

  const handlelogin = async () => {
    try{
      const userdata = await axios.post(`${BASEURL}login/`,{
          username: username,
          password: password
      })
      console.log(userdata)
      const refreshToken = userdata.data.tokens.refresh
      const accessToken = userdata.data.tokens.access
      router.push("/dashboard")
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessToken', accessToken)
      }
    }catch (error){
      console.log('Login error', error)
    }
  }
  return (
    <div className='bg-white shadow-md w-[98%] md:w-110 p-3'>
        <div className='mt-4'>
          <form>
            <div className='px-2 py-2'>
                <div className='text-left mb-3'>
                  <h1 className='text-4xl mb-2 font-bold'>Login</h1>
                  <p className='text-gray-500'>Welcome back Companion</p>
                </div>
                <Button className='cursor-pointer hover:bg-gray-300 bg-transparent mb-2 border border-gray-300 w-full text-gray-500'>Continue with Google</Button>
                <hr/>
            </div>
            <div className='px-2 py-2'>
              <Input placeholder='Username' onChange={(e) => setUserName(e.target.value)} type='text' className='mb-2'/>
              <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} type='password'/>
              <Button onClick={(e) => {
                e.preventDefault()
                handlelogin()
              }} className='mt-3 w-full'>Login</Button>
              <p className="text-gray-500 mt-3 gap-2">Dont have an Account?
                <Link href={"/Auth/sign-up"}><span className='text-gray-600 cursor-pointer hover:underline mr-1'>Sign Up</span></Link></p>
            </div>
          </form>
        </div>

    </div>
  )
}

export default LoginPage