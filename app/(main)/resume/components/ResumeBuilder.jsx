'use client'
import { Download, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import {Input} from '../../../components/ui/input'
import {Textarea} from '../../../components/ui/textarea'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {resumeSchema} from '../../../lib/schema'
import useFetch from '../../../../hooks/use-fetch'
import {saveResume} from '../../../../actions/resume'
import { useUser } from '@clerk/nextjs';
function ResumeBuilder({initialContent}) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);


  const formValues = watch();

  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  return (
    <div className='mt-10 space-y-3'>
   <div className='flex items-center justify-between w-full'>
    <h1 className='text-3xl md:text-5xl'>Resume<span className='text-purple-500'>Builder</span></h1>
    <div className='flex gap-1 items-center justify-center w-[50%]'>

    <button className=" w-fit relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
   <div className='flex gap-1 p-1'>
     <Save/>
     <span>Save</span>
   </div>
  </span>
</button>

<button className="p-[3px] relative">
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
  <div className=" px-2  md:px-8 py-0 md:py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
  <div className='flex gap-1 p-1'>
     <Download/>
     <span>DownLoad Pdf</span>
   </div>
  </div>
</button>
    </div>
   </div>


   <Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList className='bg-transparent'>
    <TabsTrigger value="edit" >Form</TabsTrigger>
    <TabsTrigger value="preview">MarkDown</TabsTrigger>
  </TabsList>
  <TabsContent value="edit">
    <form className='space-y-8'>
      <div className='space-y-4'>
        <h1 className='text-3xl'>Contact <span className='text-purple-500'>Information</span></h1>
         <div className='grid grid-cols-1 md:grid-cols-2 justify-between items-center gap-2 rounded-md border border-transparent  hover:border-violet-600 w-full p-2'>
         <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="your@email.com"
                    error={errors.contactInfo?.email}
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Twitter/X Profile
                  </label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="https://twitter.com/your-handle"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
         </div>

      </div>

      <div className='space-y-4'>
        <h1 className='text-3xl'>Professional<span className='text-purple-500'> Summary</span></h1>
        <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary..."
                    error={errors.summary}
                  />
                )}
              />
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
      </div>


      <div className="space-y-4">
              <h3 className="text-3xl">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your key skills..."
                    error={errors.skills}
                  />
                )}
              />
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Experience 
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Education 
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
            </div>

            {/* Projects 
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
            </div>*/}
    </form>


  </TabsContent>
  <TabsContent value="preview">Change your password here.</TabsContent>
</Tabs>

    </div>
  )
}

export default ResumeBuilder
