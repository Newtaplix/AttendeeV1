'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios'
interface school{
    name:string,
    id:number
}
interface location{
    lat:number,
    long:number
}

const LecturerClassesPage = () => {

    const [schools, setSchools] = useState([])
    const [selectedSchool, setSelectedSchool] = useState<school>({name: "", id: 0})
    const [departments, setDepartments] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState<school>({name: "", id: 0})
    const [courses, setCourses] = useState([])
    const [duration, setDuration] = useState<number>(0)
    const [level, setLevel] = useState("")
    const [selectedCourse, setSelectedCourse] = useState<school>({name: "", id: 0})
    const [loaction, setLoaction] = useState<location>({lat: 0 , long: 0 })
    const [tokens, setTokens] = useState("")
    const [userId, setUserId] = useState("")
    // const [lecturerCourses, setLecturerCourses] = useState([])
    const BASEURL = "https://attendee-api.onrender.com/Attendee/"
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

    useEffect(() => {
       if (selectedDepartment &&  selectedSchool){
        const getCourse = async () => {
            try{
                const response = await axios.get(`${BASEURL}course/${selectedDepartment.id}/`)
                setCourses(response.data.Courses)
            }catch(e){
                console.log(e)
            }
        }
        getCourse()
       }
    }, [selectedDepartment, selectedSchool])
    
   useEffect(() => {
         const token = localStorage.getItem("accessToken")
         if (token) {
           const getUserInfo = async () => {
             try {
               const response = await axios.get(`${BASEURL}user/`, {
                 headers: {
                   Authorization: `Bearer ${token}`,
                 },
               })
               console.log(response.data)
               console.log(response.data.user[0].user_id)
               setUserId(response.data.user[0].user_id)
               setTokens(token)
             } catch (error) {
               console.error("Error fetching user info:", error)
             }
           }
           getUserInfo()
         }
       })

    useEffect(() => {
        if ('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLoaction({lat: position.coords.latitude, long: position.coords.longitude})
                }
            )
        }else{
            console.log("Browser does not support geolocation")
        }
    }, [])
    const CreateCourse = async () => {
        try{
            const response = await axios.post(`${BASEURL}lecturer/create-class-sessions/`,{
                course: selectedCourse.name,
                lecturer_id: Number(userId),
                level: level,
                duration_time: duration,
                latitude: loaction.lat,
                longitude: loaction.long,
            }, {
                headers: {
                    Authorization: `Bearer ${tokens}`,
                  }
               
            })
            console.log(response)
            console.log(response.data)
        }catch(e){
            console.log(e)
            console.log(userId)
        }
    }

    // useEffect(() => {
    //     const getLecturerCourses = async () => {
    //         try{
    //             const response = await axios.get(`${BASEURL}lecturer/class-sessions/${userId}/`)
    //             setLecturerCourses(response.data)
    //             console.log(response.data)
    //         }catch(e){
    //             console.log(e)
    //         }
    //     }
    //     getLecturerCourses()
    // }, [])
    
  return (
    <div className='w-full h-full p-2 rounded-md shadow-md bg-white'>
        <div>
         <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Class</Button>
            </DialogTrigger>
            <form>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Class Details</DialogTitle>
                    <DialogDescription>
                        Fill in the course info to get your course created
                    </DialogDescription>
                    </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {/***ddijjalkkfkajff============----------------- */}

                            <div className="flex flex-col">
                                <Label htmlFor='course' className="mt-2">Select School</Label>
                                <select id='courses' name="Course" onChange={(e) => {
                                    const schoolId = e.target.value
                                    const schoolName = schools.find((school: school) => school.id === Number(schoolId)) as school | undefined
                                    if (schoolName) {
                                    setSelectedSchool({id: schoolName.id, name: schoolName.name})
                                    }
                                    
                                }} className='w-full border-2 border-gray-300 rounded-md p-2'>
                                    <option className='text-gray-400' value="" disabled >Select your School</option>
                                    {
                                    schools.map((school: school) => (
                                        <option key={school.id} value={school.id}>{school.name}</option>
                                    ))
                                    }
                                </select>
                                
                                <Label className='mt-2'>Select Department</Label>
                                <select id="schools" name="Course"  onChange={(e) => {
                                    const departmentId = e.target.value
                                    const departmentName = departments.find((department: school) => department.id === Number(departmentId)) as school | undefined
                                    if(departmentName){
                                    setSelectedDepartment({id: departmentName.id, name: departmentName.name})
                                    }
                                }} className='w-full border-2 border-gray-300 rounded-md p-2'>
                                    <option className='text-gray-400' value="" disabled >Select your Department</option>
                                    {
                                    departments.map((department: school) => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                    ))
                                    }
                                </select>
                                

                                <Label className='mt-2'>Select Course</Label>
                                <select id="courses" name="Course"  onChange={(e) => {
                                    const courseId = e.target.value
                                    const courseName = courses.find((course: school) => course.id === Number(courseId)) as school | undefined
                                    if(courseName){
                                    setSelectedCourse({id: courseName.id, name: courseName.name})
                                    }
                                }} className='w-full border-2 border-gray-300 rounded-md p-2'>
                                    <option className='text-gray-400' value="" disabled >Select your Department</option>
                                    {
                                    courses.map((course: school) => (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    ))
                                    }
                                </select>
                            </div>

                            {/** sijfioaj------------------------------------ */}
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="level">Level</Label>
                                <Input id="level" type="text" onChange={(e) => setLevel(e.target.value)} placeholder="200" />
                            </div>
                            <div className='flex flex-col flex-1 gap-2'>
                                    <Label htmlFor="starttime">Start Duration</Label>
                                    <Input id="starttime" type="text" onChange={(e) => setDuration(Number(e.target.value))} placeholder="eg.24" />
                            </div>
                           
                        </div>
                    <DialogFooter>
                    <Button type="submit" onClick={(e) => {
                        e.preventDefault()
                        CreateCourse()
                    }}  >Create</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
        </div>
        <div className='p-2'>
            <p className='text-gray-400 text-xl'>No classes created yet...</p>
        </div>
    </div>
  )
}

export default LecturerClassesPage