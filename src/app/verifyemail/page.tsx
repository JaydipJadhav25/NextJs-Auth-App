"use client";
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';



const Page = () => {
    // const router = useRouter();
    // console.log(router);

    const [ token , setToken] = useState("")
    const [ verify , setverify] = useState(false);
    const [ error , seterror] = useState(false);


    const verifyEmailUser = async()=>{
       try {
         const res = await axios.post("/api/user/verifyemail" , token);
         setverify(true);

       } catch (error : any) {

        console.log(error.massage);
        toast.error(error.massage);
        seterror(true);
        
       }

    }

    //ascess value in url from user pass

    useEffect(()=>{

        //value get in url of client side pages
      const usertoken =   window.location.search.split("=")[1]
  console.log("user token in url  = " , usertoken);
      setToken(usertoken ||  " ");
   

       }, [])


       useEffect(() =>{

        if(token.length > 0){
            verifyEmailUser(); // call function
        }

       } , [token])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

    {verify && (
        <div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href="/login">
                Login
            </Link>
        </div>
    )}
    {error && (
        <div>
            <h2 className="text-2xl bg-red-500 text-black">Error</h2>
            
        </div>
    )}
</div>




  )
}

export default Page