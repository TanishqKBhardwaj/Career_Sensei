
import Navbar from '@/app/components/Navbar'
import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';


async function page() {
    const {isOnBoarded}= await getUserOnboardingStatus();
        if(!isOnBoarded)
        { console.log(isOnBoarded)
            redirect('/onboarding')
          }
  return (
    <div>
        <Navbar/>

        <div className='max-w-6xl mx-auto mt-10 md:mt-20 space-y-5 '>
        <h1 className='text-center text-3xl md:text-5xl font-bold'>
          Interview <span className='text-purple-500'>Preparation</span>
        </h1>
        
      </div>
      
    </div>
  )
}

export default page
