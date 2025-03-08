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

import { redirect } from 'next/navigation'

function QuizList({ assessments }) {
    const getScore=(index)=>{
        return (assessments[index].quizScore/assessments[index].questions.length)*100
    }
    return (
        <div className='w-full space-y-3'>
            <div className='flex gap-1 items-center justify-between'>

            <h1 className='text-3xl md:text-5xl text-center w-full '>Recent<span className='text-purple-500'>Quizes</span></h1>
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-auto" onClick={() =>redirect('/interview/mock')}>
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Start new quiz
                        </span>
                    </button>
            </div>
            <div className='grid grid-cols- gap-3 w-full place-content-center'>
                {
                    assessments.map((assessment, index) => (
                        <Card key={index} className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-full h-fit p-2'>
                        <CardHeader>
                          <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Quiz <span className='text-purple-500'>{index+1}</span></span></div></CardTitle>
                          
                          <CardDescription className='text-white text-2xl font-bold'>{Math.ceil(getScore(index))}%</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <p className='text-sm text-muted-foreground'>{assessment.improvmentTip}</p>
                        </CardContent>
                       
                      </Card>

                    ))
                }
            </div>

        </div>
    )
}

export default QuizList
