'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface school {
  id: number,
  name: string
}
const SignUpPage = () => {
  const [isCreated, setIsCreated] = useState(false)
  const [schools, setSchools] = useState([])
  const [selectedSchool, setSelectedSchool] = useState<school>({name: "", id: 1})
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState<school>({name: "", id: 1})
  const [firstName, setFirstname] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [matricule, setMatricule] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState<number>()
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("student")

  const BASEURL = "https://attendee-api.onrender.com/Attendee/"

  const router = useRouter()

  useEffect(() => {
    const getSchools = async () => {
      try {
        const response = await axios.get(`${BASEURL}schools/`)
        setSchools(response.data)
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching schools:", error)
      }
    }
    getSchools()
  }, [])

  useEffect(() => {
    if (selectedSchool) {
      const getDepartments = async () => {
        try {
          const response = await axios.get(`${BASEURL}department/${selectedSchool.id}/`)
          setDepartments(response.data.Departments)
          console.log(response.data.Departments)
          console.log(selectedSchool)
        } catch (error) {
          console.error("Error fetching courses:", error)
        }
      }
      getDepartments()
    }
  }, [selectedSchool])
 

  const SignupSubmit = async () => {
    if (role === "student"){
      try {
        const userdata = await axios.post(`${BASEURL}register/${role}/`, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          password: password,
          username: username,
          school_name: selectedSchool.name,
          department_name: selectedDepartment.name,
          matricule_number: matricule,
        })
        setIsCreated(true)
        const refreshToken = userdata.data.refresh
        if (typeof window !== 'undefined') {
          localStorage.setItem('refreshToken', refreshToken);
        }
        router.push("/dashboard")
        console.log(userdata)
  
      } catch (error) {
        console.log(error)
        console.log(selectedDepartment)
      }
    }else if (role === "lecturer"){
      try {
        const userdata = await axios.post(`${BASEURL}register/${role}/`, {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          password: password,
          username: username,
          matricule_number: matricule,
        })
        setIsCreated(true)
        console.log(userdata)
        const refreshToken = userdata.data.tokens.refresh
        const accessToken = userdata.data.tokens.access
        if (typeof window !== 'undefined') {
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('accessToken', accessToken)
        }
        router.push("/dashboard")
  
      } catch (error) {
        console.log(error)
        console.log(selectedDepartment)
      }
    }
  }


  return (
    <div className='bg-white shadow-md w-[98%] md:w-110 p-3'>
      <div className='mt-4'>
        <form>
          <div className='px-2 py-2'>
            <div className='text-left mb-3'>
              <h1 className='text-4xl mb-2 font-bold'>Sign Up</h1>
              <p className='text-gray-500'>Welcome to Buddy. Lets get started</p>
            </div>
            <div className='flex flex-col md:flex-row gap-2'>
              <div onClick={() => setRole("student")} className={cn('cursor-pointer rounded-md bg-transparent mb-2 border border-gray-300 flex-1 text-gray-500 py-2',{"border-2 border-blue-500 bg-blue-400/50": role === "student"})}>Student</div>
              <div onClick={() => setRole("lecturer")} className={cn('cursor-pointer rounded-md bg-transparent mb-2 border border-gray-300 flex-1 text-gray-500 py-2',{"border-2 border-blue-500 bg-blue-400/50": role === "lecturer"})}>Lecturer</div>
            </div>
            <hr/>
          </div>
          <div className='px-2 py-2'>
            <Input onChange={(e) => setUsername(e.target.value)} placeholder='Username' type='email' className='mb-2 py-2' />
            <div className="mt-2 flex flex-col md:flex-row gap-2">
              <Input placeholder="First name" onChange={(e) => setFirstname(e.target.value)} type="text" className="flex-1 py-2" />
              <Input placeholder="Last name" onChange={(e) => setLastName(e.target.value)} type="text" className="flex-1 py-2" />
            </div>
            <Input onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email' className='mt-2 py-2' />
            <Input placeholder='Matricule' onChange={(e) => setMatricule(e.target.value)} type='text' className="mt-2 py-2" />
            <Input placeholder='Phone' onChange={(e) => setPhone(Number(e.target.value))} type='text' className="mt-2 py-2" />


            {/*** Courses Selection box */}
           {
              role === "student" ? (
                 <div className="flex flex-col">
                  <select name="Course" onChange={(e) => {
                    const schoolId = e.target.value
                    const schoolName = schools.find((school: school) => school.id === Number(schoolId)) as school | undefined
                    if (schoolName) {
                      setSelectedSchool({id: schoolName.id, name: schoolName.name})
                    }
                    
                  }} className='w-full border-2 border-gray-300 rounded-md p-2 mt-2'>
                    <option className='text-gray-400' value="" disabled >Select your School</option>
                    {
                      schools.map((school: school) => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                      ))
                    }
                  </select>

                  <select name="Course"  onChange={(e) => {
                    const departmentId = e.target.value
                    const departmentName = departments.find((department: school) => department.id === Number(departmentId)) as school | undefined
                    if(departmentName){
                      setSelectedDepartment({id: departmentName.id, name: departmentName.name})
                    }
                  }} className='w-full border-2 border-gray-300 rounded-md p-2 mt-2'>
                    <option className='text-gray-400' value="" disabled >Select your Department</option>
                    {
                      departments.map((department: school) => (
                        <option key={department.id} value={department.id}>{department.name}</option>
                      ))
                    }
                  </select>
                </div>
              ): null
           }
            <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} type='password' className="mt-2 py-2" />

            {
              isCreated && <div className='text-green-700 bg-green-300 mt-3 rounded-md p-2 w-full'>Account Created Successfully</div>
            }
            <Button className='mt-3 w-full' onClick={(e) => {
              e.preventDefault()
              SignupSubmit()
            }}>
              Create Account!</Button>
            <p className="text-gray-500 mt-3">Already have an account?<span className='text-gray-600 cursor-pointer hover:underline mr-1'>Log In</span></p>
          </div>
        </form>
      </div>

    </div>
  )
}

export default SignUpPage