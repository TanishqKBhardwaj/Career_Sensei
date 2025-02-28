"use server"

import {db} from '../lib/prisma'
import {auth} from '@clerk/nextjs/server';
import {generateAiInsights} from './dashboard'

export const updateUser=async (data) => {
  const {userId}=await auth();
  if(!userId){
    throw new Error("Unauthorized")}

    const user=await db.user.findUnique({
        where:{
            clerkUserId:userId 
        }
    })

    if(!user)
        throw new Error("User not found");

    try {
        const result=await db.$transaction(async (tx)=>{
            //find if the industry exists
            let industryInsight=await tx.industryInsight.findUnique({
                where:{
                    industry:data.industry
                }
            })
        //If it doesn't,create it (hardcode it for now , will replace by AI later)
        if (!industryInsight) {
            const insights = await generateAiInsights(data.industry);
  
            industryInsight = await db.industryInsight.create({
              data: {
                industry: data.industry,
                ...insights,
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
            });
          }
        //update user
        const updatedUser=await tx.user.update({
            where:{
                id:user.id
            },
            data:{
                industry:data.industry,
                experience:data.experience,
                bio:data.bio,
                skills:data.skills
            }

        })

        return {updatedUser,industryInsight}
        },{
            timeout:10000
        })
        return {success:true,...result};
        
    } catch (error) {
        console.error("Error updating user and industry:",error.message);
        throw new Error("Failed to update profile")
    }
   
}


export const getUserOnboardingStatus=async()=>{
    const {userId}=await auth();
  if(!userId){
    throw new Error("Unauthorized")}

    const user=await db.user.findUnique({
        where:{
            clerkUserId:userId 
        }
    })

    if(!user)
        throw new Error("User not found");

    try {
        const user=await db.user.findUnique({
            where:{
                clerkUserId:userId
            },
            select:{
                industry:true,//populating the industry
            }
        })

        return {isOnBoarded:!!user?.industry}
    } catch (error) {
        console.error("Error checking onboarding status ",error.message);
        throw new Error("Failed to check onboarding status")
    }
}