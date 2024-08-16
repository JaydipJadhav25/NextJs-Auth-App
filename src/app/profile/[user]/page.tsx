"use client";
import React from 'react'


const Page = ({params} : any) => {


  return (
    <div className='min-h-screen'>
        <h1>Profile Personal ID Page</h1>
        <h1
        className='bg-green-500 text-black'
        >
     {params.user}
        </h1>

    </div>
  )
}

export default Page;