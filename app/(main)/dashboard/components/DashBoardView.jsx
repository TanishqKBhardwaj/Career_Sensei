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
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
 function DashBoardView({insights}) {
    console.log(insights)
  return (
    <div className='grid grid-cols-1 gap-4'>
      <p>Last updated at {format(new Date(insights.lastUpdated),"dd/MM/yy")}</p>
      <div className='flex flex-col md:flex-row gap-2 items-center justify-center'>
      <Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Market <span className='text-purple-500'>Outlook</span></span><TrendingUp></TrendingUp></div></CardTitle>
    <CardDescription className='text-white text-2xl font-bold'>{insights.marketOutlook}</CardDescription>
  </CardHeader>
  <CardContent>
    <p className='text-muted-foreground'>Next update in 7 days from today</p>
  </CardContent>
 
</Card>




<Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Industry <span className='text-purple-500'>Growth</span></span><TrendingUp></TrendingUp></div></CardTitle>
    <CardDescription className='text-white text-2xl font-bold bg-pr'>{insights.growthRate}%</CardDescription>
  </CardHeader>
  <CardContent>
   <Progress  value={Math.floor(insights.growthRate)} color='bg-white'/>
  </CardContent>
 
</Card>

<Card className='bg-transparent text-white border-hidden hover:border-solid hover:border-rose-100 w-[20rem] h-[10rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Demand <span className='text-purple-500'>Level</span></span><Briefcase></Briefcase></div></CardTitle>
    
    <CardDescription className='text-white text-2xl font-bold'>{insights.demandLevel}</CardDescription>
  </CardHeader>
  <CardContent>
  <Progress  value={insights.demandLevel==="HIGH"?100:insights.demandLevel==='MEDIUM'?50:20} color={insights.demandLevel==="HIGH"?'bg-green-500':insights.demandLevel==='MEDIUM'?'bg-yellow-500':'bg-red-500'}/>
  </CardContent>
 
</Card>

<Card className='bg-transparent text-white border-hidden hover:border-solid  hover:border-rose-100  w-[20rem]  h-[12rem]'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Top <span className='text-purple-500'>Skills</span></span><TrendingUp></TrendingUp></div></CardTitle>
   
  </CardHeader>
  <CardContent className='space-x-2 space-y-2'>
    {
        insights.topSkills.map((skill,index)=>(
            <Badge key={index} className='text-white' variant={'outline'}>{skill}</Badge>
        ))
    }
  </CardContent>
 
</Card>





      </div>
     < div className='w-full grid grid-cols-1 gap-3 items-center justify-center'>
     <h1 className='text-3xl md:text-5xl text-center'>Salary <span className='text-purple-500'>Vs</span> Roles</h1>
     <BarChart
     width={window.innerWidth<600?500:1000}
     height={500}
     data={insights.salaryRanges}
     margin={{
       top: 5,
       right: 30,
       left: 20,
       bottom: 5,
     }}
     
     
   >
     
     <XAxis dataKey="role" fill='#FFFFFF' color='#FFFFFF' font />
     <YAxis />
     <Tooltip />
     <Legend fill='#4B0082' />
     <Bar  dataKey="min" fill="#D8BFD8" activeBar={<Rectangle fill="#D8BFD8" stroke="blue"   />} />
     <Bar  dataKey="median" fill="#9370DB" activeBar={<Rectangle fill="#9370DB" stroke="purple" />}  />
     <Bar  dataKey="max" fill="#4B0082" activeBar={<Rectangle fill="#4B0082" stroke="purple" />} />
   </BarChart>
  
</div>
<div className='flex justify-between gap-2 w-full '>
<Card className='bg-transparent text-white border-hidden hover:border-solid  hover:border-rose-100  w-[20rem]  h-fit p-2'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Key Industry <span className='text-purple-500'>Trends</span></span><TrendingUp></TrendingUp></div></CardTitle>
   <CardDescription className='text-muted-foreground text-sm'>Current trends shaping the industry</CardDescription>
  </CardHeader>
  <CardContent className='space-x-2 space-y-2'>
     <ul className='space-y-4'>{
        insights.keyTrends.map((trend,index)=>(
            <li  key={index} className='text-white text-sm' >* {trend}</li>
        ))
      }
        </ul>
    
  </CardContent>
 
</Card>


<Card className='bg-transparent text-white border-hidden hover:border-solid  hover:border-rose-100  w-[20rem]  h-fit p-2'>
  <CardHeader>
    <CardTitle><div className='flex justify-between items-center'><span className='text-xl'>Recommended <span className='text-purple-500'>Skills</span></span><TrendingUp></TrendingUp></div></CardTitle>
   <CardDescription className='text-muted-foreground'>Skills to consider while developing</CardDescription>
  </CardHeader>
  <CardContent className='space-x-2 space-y-2'>
    {
        insights.recommendedSkills.map((skill,index)=>(
            <Badge key={index} className='text-white' variant={'outline'}>{skill}</Badge>
        ))
    }
  </CardContent>
 
</Card>

</div>
    </div>
  )
}

export default DashBoardView
