
import Navbar from '@/app/components/Navbar'
import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import QuizStats from './components/QuizStats'
import QuizGraph from './components/QuizGraph'
import QuizList from './components/QuizList'
import {getAssessments} from '../../../actions/interview'
import Link from 'next/link';

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
       <div className='flex place-content-center'>
        <button className=" mx-auto relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    <Link href='/interview/mock'>Start Quiz</Link>
  </span>
</button></div>

 

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
