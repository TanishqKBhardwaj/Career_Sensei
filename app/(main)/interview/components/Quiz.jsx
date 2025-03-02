'use client'

import React, { useEffect, useState } from 'react'

import { generateQuiz } from '../../../../actions/interview'
import useFetch from '../../../../hooks/use-fetch'
import { Loader2 } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"

import { Label } from "../../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"


function Quiz() {
    const [quiz, setQuiz] = useState([]);
    const { loading: updateLoading, fn: generateQuizFn, data } = useFetch(generateQuiz);
    const [currQuest, setCurrQuest] = useState(0);

    useEffect(() => {
        generateQuizFn();
    }, []);

    useEffect(() => {
        setQuiz(data);
        console.log(quiz);
    }, [data, updateLoading]);
    const [start, setStart] = useState(false);

    return (
        <div>
            {
                updateLoading ?
                    <Loader2 className='animate-spin mx-auto'></Loader2> : (

                        <div className='flex items-center justify-center'>
                            {start === false ?
                                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-auto" onClick={() => setStart(true)}>
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                        Start the quiz
                                    </span>
                                </button> :

                                <Card className='w-full bg-transparent text-white relative'>
                                    <CardHeader>
                                        <CardTitle>{currQuest+1}.   {quiz[currQuest].question}</CardTitle>

                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup defaultValue="option-one">
                                            {  quiz[currQuest].options.map((option,index)=>(
                                                   <div className="flex items-center space-x-2">
                                                   <RadioGroupItem  value={option} id={index} />
                                                   <Label htmlFor={index}>{option}</Label>
                                               </div>
                                            ))
                                                }
                                           
                                        </RadioGroup>

                                    </CardContent>
                                    <CardFooter className='absolute right-0 bottom-0'>
                                    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-auto mr-2" onClick={() => {
                                        if(currQuest-1>=0)setCurrQuest(currQuest-1)}} disabled={currQuest-1<0?true:false}>
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                       Back
                                    </span>
                                </button>
                                    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-auto" onClick={() => {
                                        if(currQuest+1<quiz.length)setCurrQuest(currQuest+1)}} disabled={currQuest+1>=quiz.length?true:false} >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                        Next
                                    </span>
                                </button>
                                    </CardFooter>

                                </Card>
                            }

                        </div>

                    )

            }
        </div>
    );
}

export default Quiz;
