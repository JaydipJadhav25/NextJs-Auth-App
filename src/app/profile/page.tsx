"use client";
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'




const Page = () => {

  const[user , setUser] = useState(null);
  const router = useRouter();


  const getUserInfo = async() =>{
   const data =  await axios.get("/api/users/me");
   console.log("user fetched : " ,data.data.user._id );
   setUser(data.data.user._id);
  }

  const logout = async()=>{
    try {
      await axios.get("/api/users/logout");
      toast.success("user logout successfully.....");
      router.replace("/login")
    } catch (error : any) {
   console.log(error.massage);
   toast.error(error.massage)

      
    }
  }


  return (
    <div className='bg-orange-600 min-h-screen flex flex-col justify-center items-center py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{user === null?  "Nothing user"  :  <Link href={`/profile/${user}`}>{user}</Link>}</h2>
      <button
      onClick={logout}
      className='bg-blue-500'
      >LogOUt</button>
       <button
      onClick={getUserInfo}
      className='bg-green-500'
      >getUser</button>
    </div>
  )
}

export default Page