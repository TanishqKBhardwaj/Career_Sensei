import Navbar from '@/app/components/Navbar'
import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import Quiz from '../components/Quiz';




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
            <Link href={'/interview'}><div className='flex gap-1'><MoveLeft></MoveLeft><span>Back to <span className='text-purple-500'>interview</span> </span></div></Link>
        <h1 className='text-center text-3xl md:text-5xl font-bold'>
          Mock<span className='text-purple-500'> Interview</span>
        </h1>

        <Quiz/>
        
      </div>
      
    </div>
  )
}

export default page
