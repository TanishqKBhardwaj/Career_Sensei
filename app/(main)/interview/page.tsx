
import Navbar from '@/app/components/Navbar'
import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import QuizStats from './components/QuizStats'
import QuizGraph from './components/QuizGraph'
import QuizList from './components/QuizList'
import {getAssessments} from '../../../actions/interview'

async function page() {
    const {isOnBoarded}= await getUserOnboardingStatus();
        if(!isOnBoarded)
        { console.log(isOnBoarded)
            redirect('/onboarding')
          }
   
    const assessments=await getAssessments();
    
  return (
    <div>
        <Navbar/>

        <div className='max-w-6xl mx-auto mt-10 md:mt-20 space-y-5 '>
        <h1 className='text-center text-3xl md:text-5xl font-bold'>
          Interview <span className='text-purple-500'>Preparation</span>
        </h1>

 

       { assessments && assessments.length>0?(
        <div className='w-full flex flex-col gap-3 items-center justify-center'>
          
          <QuizStats assessments={assessments}/>
          <QuizGraph assessments={assessments}/>
          <QuizList assessments={assessments}/>
        </div>):(
          <div className='flex flex-col gap-2 place-content-center'>
          <p className='text-center'>Start giving quizes to see your performance here</p>
         
        </div>)}
        
      </div>
      
    </div>
  )
}

export default page
