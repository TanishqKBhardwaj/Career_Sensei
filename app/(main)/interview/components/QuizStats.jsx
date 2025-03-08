'use client'
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { Brain, TrophyIcon } from 'lucide-react'


function QuizStats({assessments}) {

  const getAvgScore=()=>{
    let totalScore=0;
    for(let assessment of assessments){
      totalScore+=assessment.quizScore;
    }
    return totalScore;
  }

  const getQuestPrac=()=>{
    let totalQuest=0;
    for(let assessment of assessments){
      totalQuest+=assessment.questions.length;
    }
    return totalQuest;
  }

  const getLatestScore=()=>{
    let latestScore=assessments[0].quizScore/assessments[0].questions.length;
    
    return latestScore*100;
  }

  return (
    <div className='flex w-full items-center justify-between gap-3'>
      <Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Average <span className='text-purple-500'>Score</span></span><TrophyIcon/></div></CardTitle>
    
    <CardDescription className='text-white text-2xl font-bold'>{Math.ceil(getAvgScore()/getQuestPrac()*100)}%</CardDescription>
  </CardHeader>
  <CardContent>
  <p className='text-sm text-muted-foreground'>Across all assessments</p>
  </CardContent>
 
</Card>

<Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Questions  <span className='text-purple-500'>Practiced</span></span><Brain/></div></CardTitle>
    
    <CardDescription className='text-white text-2xl font-bold'>{getQuestPrac()}</CardDescription>
  </CardHeader>
  <CardContent>
  <p className='text-sm text-muted-foreground'>Total questions</p>
  </CardContent>
 
</Card>

<Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Latest <span className='text-purple-500'>Score</span></span><TrophyIcon/></div></CardTitle>
    
    <CardDescription className='text-white text-2xl font-bold'>{Math.ceil(getLatestScore())}%</CardDescription>
  </CardHeader>
  <CardContent>
  <p className='text-sm text-muted-foreground'>Most recent quiz</p>
  </CardContent>
 
</Card>


      
    </div>
  )
}

export default QuizStats
