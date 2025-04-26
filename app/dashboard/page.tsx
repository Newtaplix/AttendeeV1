'use client'
import React, { useEffect, useState } from 'react'
import LecturerDashboard from '@/components/dashboard/LecturerDashboard'
import StudentDashboard from '@/components/dashboard/studentDashboard'
import axios from 'axios'

const Dashboard = () => {

    const [role, setRole] = useState("")
    const BASEURL = "https://attendee-api.onrender.com/Attendee/"
    
  
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
            setRole(response.data.user[0].role)
          } catch (error) {
            console.error("Error fetching user info:", error)
          }
        }
        getUserInfo()
      }
    })
    

    

  return (
    <>
      {role === "student" ? (
           <StudentDashboard/>
      ) : (
        <LecturerDashboard />
      )}
    </>
  )
}

export default Dashboard