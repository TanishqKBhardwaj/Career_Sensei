'use client'

import React, { useEffect, useState } from 'react'


import { CircleCheck, CircleXIcon, Loader2 } from 'lucide-react';
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
import useFetch from '../../../../hooks/use-fetch'
import { savedQuizResult } from '../../../../actions/interview';

import QuizResult from './QuizResult'

function Quiz({ quiz }) {
    const {
        loading: savingResult,
        fn: saveQuizResultFn,
        data: resultData,
        setData:setResultData
      } = useFetch(savedQuizResult);


    const [currQuest, setCurrQuest] = useState(0);
    const [showExp, setShowExp] = useState(false);
    const [answers, setAnswers] = useState([])


    const [start, setStart] = useState(false);


    const handleSubmit =async()=>{
        console.log(answers)
        let score=0;
        let i=0;
        for(const q of quiz){
            if(q.correctAnswer==answers[i])
                score+=1;
            i+=1;
        }
        await saveQuizResultFn(quiz,answers,score);
       
        
        
    }
    
    const startNewQuiz = () => {
        setCurrQuest(0);
        setAnswers([]);
        setShowExp(false);
        setResultData(null);
      };

    if (resultData) {
        return (
          <div className="mx-2">
            <QuizResult result={resultData} onStartNew={startNewQuiz} />
          </div>
        );
      }
    
    return (
        <div>
            <div className='flex items-center justify-center'>
                {start === false ?
                    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-auto" onClick={() => setStart(true)}>
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Start the quiz
                        </span>
                    </button> :

                    <div className='w-full'>
                        <Card className='w-full bg-transparent text-white relative'>
                            <CardHeader>
                                <CardTitle>{currQuest + 1}.   {quiz[currQuest].question}</CardTitle>

                            </CardHeader>
                            <CardContent>
                                <RadioGroup defaultValue={answers[currQuest] || null}
                                    onValueChange={(value) => {
                                        const newAnswers = [...answers];
                                        newAnswers[currQuest] = value;
                                        setAnswers(newAnswers);
                                    }}>
                                    {quiz[currQuest].options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={index.toString()} />
                                            <Label htmlFor={index.toString()}>{option}</Label>
                                        </div>
                                    ))
                                    }

                                </RadioGroup>

                            </CardContent>
                            <CardFooter className='absolute right-0 bottom-0'>
                                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-auto mr-2" onClick={() => {
                                    if (currQuest - 1 >= 0) setCurrQuest(currQuest - 1)
                                }} disabled={currQuest - 1 < 0 ? true : false}>
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                        Back
                                    </span>
                                </button>
                                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mx-auto" onClick={() => {
                                    if (currQuest + 1 < quiz.length) setCurrQuest(currQuest + 1)
                                    setShowExp(false)
                                if(currQuest==quiz.length-1){
                                    handleSubmit();
                                }
                                }}  >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                        {`${currQuest==quiz.length-1?'Finish':'Next'}`}
                                    </span>
                                </button>
                            </CardFooter>

                        </Card>
                        <button className=' p-2 mt-2' onClick={() => {
                            setShowExp(true)
                        }} disabled={answers[currQuest] ? false : true}>Show Explanation </button>
                        {showExp &&
                            <p className='w-full mt-2'>{quiz[currQuest].explanation}</p>}
                    </div>
                }

            </div>




        </div>
    );
}

export default Quiz;
