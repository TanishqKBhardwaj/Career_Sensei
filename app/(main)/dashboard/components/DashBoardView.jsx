"use client"

import React from 'react'
import {format} from 'date-fns'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"
import { BaggageClaim, Briefcase, TrendingUp } from 'lucide-react'
import { Progress } from '@/app/components/ui/progress'
import { Badge } from '@/app/components/ui/badge'

 function DashBoardView({insights}) {
    console.log(insights)
  return (
    <div className='grid grid-cols-1 gap-4'>
      <p>Last updated at {format(new Date(insights.lastUpdated),"dd/MM/yy")}</p>
      <div className='flex flex-col md:flex-row gap-2 items-center justify-center'>
      <Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span>Market <span className='text-purple-500'>Outlook</span></span><TrendingUp></TrendingUp></div></CardTitle>
    <CardDescription className='text-white text-2xl font-bold'>{insights.marketOutlook}</CardDescription>
  </CardHeader>
  <CardContent>
    <p className='text-muted-foreground'>Next update in 7 days from today</p>
  </CardContent>
 
</Card>




<Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span>Industry <span className='text-purple-500'>Growth</span></span><TrendingUp></TrendingUp></div></CardTitle>
    <CardDescription className='text-white text-2xl font-bold bg-pr'>{insights.growthRate}%</CardDescription>
  </CardHeader>
  <CardContent>
   <Progress  value={Math.floor(insights.growthRate)} color='bg-white'/>
  </CardContent>
 
</Card>

<Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span>Demand <span className='text-purple-500'>Level</span></span><Briefcase></Briefcase></div></CardTitle>
    
    <CardDescription className='text-white text-2xl font-bold'>{insights.demandLevel}</CardDescription>
  </CardHeader>
  <CardContent>
  <Progress  value={insights.demandLevel==="HIGH"?100:insights.demandLevel==='MEDIUM'?50:20} color={insights.demandLevel==="HIGH"?'bg-green-500':insights.demandLevel==='MEDIUM'?'bg-yellow-500':'bg-red-500'}/>
  </CardContent>
 
</Card>

<Card className='bg-transparent text-white border-hidden hover:border-solid  hover:border-rose-100  w-[20rem]  h-[12rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span>Top <span className='text-purple-500'>Skills</span></span><TrendingUp></TrendingUp></div></CardTitle>
   
  </CardHeader>
  <CardContent className='space-x-2 space-y-2'>
    {
        insights.recommendedSkills.map((skill,index)=>(
            <Badge className='text-white' variant={'outline'}>{skill}</Badge>
        ))
    }
  </CardContent>
 
</Card>



      </div>
    </div>
  )
}

export default DashBoardView
