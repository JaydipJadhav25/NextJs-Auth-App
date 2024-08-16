"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Page = () => {

  const router = useRouter();

    const [user , setUser] = useState({
        email: "" ,
        password: "" ,
        username: ""
    });

    console.log(user)

    const [buttondisable , setbuttondiseable] = useState(false);

    const [loading , setloading] = useState(false);

    //function

    const signup = async() =>{
      try {
        
        setloading(true);
        console.log("user : " , user)
        const res = await axios.post("/api/users/signup" , user);

        console.log("user success : " , res.data);
        router.push("/login")


      } catch (error :any) {
        console.log(error.massage)
        toast.error(error.massage);
        
      }
    }

    //codn on files and button 
    useEffect(() =>{
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
        setbuttondiseable(false);
      }else{
        setbuttondiseable(true);
      }

    } , [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "loading........... ": "signup"}</h1>
      <hr />

      <label htmlFor="username">username</label>
      <input 
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      type="text" 
      id='username'
      value={user.username}
      onChange={(e) => setUser({...user , username:e.target.value})}
      placeholder='enter your username'
      />

<label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />

            <button
            onClick={signup}
             className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
             {buttondisable ? "NoSignUp" : "SignUp"}
            </button>
          <Link href="/login">Visit to Login Page</Link>



    </div>
  )
}

export default Page;