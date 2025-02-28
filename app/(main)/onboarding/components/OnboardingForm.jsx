'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {onboardingSchema} from '../../../lib/schema'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Label } from "../../../components/ui/label";
import {industries} from '../../../../data/industries'
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";


import useFetch from '../../../../hooks/use-fetch'
import { toast } from "sonner";
import { updateUser } from "@/actions/user";
import { Loader2 } from "lucide-react";


 function OnboardingForm() {
   const [selectedIndustry,setSelectedIndustry]=useState(null);
   const router =useRouter()

   const {
    register,handleSubmit,
    formState:{errors},
    setValue,
    watch
   }=useForm({
    resolver:zodResolver(onboardingSchema)
   });

   const watchIndustry=watch("industry")
   const {loading:updateLoading,
     fn:updateUserFn,
     data
   }=useFetch(updateUser)

   const onSubmit=async(values)=>{
    try {
      const formattedIndustry=`${values.industry}-${values.subIndustry}`.toLowerCase().replace(/ /g,"-")
      await updateUserFn({...values,industry:formattedIndustry})
      
      
    } catch (error) {
      console.error("Onboarding error",error)
    }
   }
   
   useEffect(()=>{
      toast.message("Test")
      console.log(data)
      if(data?.success && !updateLoading){
        toast.success("profile updated successfuly")
        
          router.push("/dashboard");
          router.refresh()

        
       }
    },[data,updateLoading])
   
  return (
    <div className="pt-20 flex justify-center items-center w-full h-fit">
      <Card className="w-[30rem] h-fit p-2 text-white border-chart-3 " style={{ background: "radial-gradient(circle, rgba(107,21,191,0.9865196078431373) 4%, rgba(19,12,30,1) 76%, rgba(31,11,50,1) 100%)" }}>
  <CardHeader>
    <CardTitle className=" text-3xl border-b-2">Complete your <span className="text-purple-500">profile</span></CardTitle>
    <CardDescription>Select your industry to get personalized recommendations</CardDescription>
  </CardHeader>
  <CardContent >
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
    <div>
      <Label htmlFor="industry" className="text-2xl">Industry</Label>
  <Select 
  onValueChange={(value)=>{
    setValue("industry",value);
    setSelectedIndustry(industries.find((item)=>item.id===value))
    setValue("subIndustry","")
  }}>
  <SelectTrigger id="industry" className="w-full bg-black">
    <SelectValue placeholder="Choose your industry" />
  </SelectTrigger>
  <SelectContent className="bg-black">
    {
      industries.map((item,index)=>(

        <SelectItem className="text-white" key={index} value={item.id}>{item.name}</SelectItem>
      ))
    } 
  </SelectContent>
</Select>
{errors.industry &&(
  <p className="text-sm text-red-600">{
  errors.industry.message}</p>
)}
</div>
{ watchIndustry &&
<div >
      <Label htmlFor="subIndustry" className="text-2xl">Specialization</Label>
  <Select 
  onValueChange={(value)=>{
    setValue("subIndustry",value);
  }}>
  <SelectTrigger id="subIndustry" className="w-full bg-black">
    <SelectValue placeholder="Choose your subindustry" />
  </SelectTrigger>
  <SelectContent className="bg-black">
    {
      selectedIndustry?.subIndustries.map((item,index)=>(

        <SelectItem className="text-white" key={index} value={item}>{item}</SelectItem>
      ))
    } 
  </SelectContent>
</Select>
{errors.subIndustry &&(
  <p className="text-sm text-red-600">{
  errors.subIndustry.message}</p>
)}
</div>
 }

 <div>
  <Label htmlFor="experience" className="text-2xl">Years of experience</Label>
  <Input 
  id="experience"
  type="number"
  min="0"
  max="50"
  placeholder="Enter years of exp"
  className="bg-black"
  {...register("experience")}/>
  {errors.experience &&(
  <p className="text-sm text-red-600">{
  errors.experience.message}</p>
)}
 </div>

 <div>
  <Label htmlFor="skills" className="text-2xl">Skills</Label>
  <Input 
  id="skills"
  type="text"
  placeholder="Enter in comma separated form"
  className="bg-black"
  {...register("skills")}/>
  {errors.skills &&(
  <p className="text-sm text-red-600">{
  errors.skills.message}</p>
)}
 </div>

 <div>
  <Label htmlFor="bio" className="text-2xl">Bio</Label>
  <Textarea
  id="bio"
  
  placeholder="Tell us about your professional background"
  className="bg-black h-fit"
  {...register("bio")}/>
  {errors.bio &&(
  <p className="text-sm text-red-600">{
  errors.bio.message}</p>
)}
 </div>

 <div className="flex justify-center items-center w-full">
  {updateLoading?<div className="flex items-center gap-1 justify-center"> Submitting<Loader2 className="animate-spin"></Loader2></div>:
 <button type="submit" className="relative w-[6rem]  inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg  bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
   Submit
  </span>
</button>
 }
 </div>

</form>

  </CardContent>
  
</Card>

    </div>

  )
}

export default OnboardingForm
