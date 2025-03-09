'use client'
import { AlertTriangle, Download, Edit, Monitor, Save,Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema } from '../../../lib/schema'
import useFetch from '../../../../hooks/use-fetch'
import { saveResume } from '../../../../actions/resume'
import { useUser } from '@clerk/nextjs';
import EntryForm from './EntryForm'
import MDEditor from '@uiw/react-md-editor';
import { toast } from 'sonner'
import dynamic from "next/dynamic";
import { entriesToMarkdown } from '../../../lib/helper'
import { Button } from '../../../components/ui/button'

//const html2pdf = dynamic(() => import("html2pdf.js/dist/html2pdf.min.js"), { ssr: false });
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
function ResumeBuilder({ initialContent }) {
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
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const { summary, skills, experience, education, projects } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  const generatePDF = async () => {
    setIsGenerating(true);
  
    try {
      const element = document.getElementById("resume-pdf");
      if (!element) {
        console.error("Element #resume-pdf not found");
        return;
      }
  
      // Temporarily make the element visible
      const parentDiv = element.parentElement;
      parentDiv.style.display = "block";
  
      await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure rendering
  
      // Capture the element as a canvas
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("Canvas rendering failed: Element is empty or not visible.");
      }
  
      const imgData = canvas.toDataURL("image/png");
  
      // Create PDF
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("resume.pdf");
  
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      // Ensure element is hidden again even if an error occurs
      try {
        const parentDiv = document.getElementById("resume-pdf")?.parentElement;
        if (parentDiv) parentDiv.style.display = "none";
      } catch (hideError) {
        console.error("Error hiding element:", hideError);
      }
  
      // Ensure state is always updated
      setIsGenerating(false);
    }
  };
  
  const onSubmit = async () => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n") // Normalize newlines
        .replace(/\n\s*\n/g, "\n\n") // Normalize multiple newlines to double newlines
        .trim();

      console.log(previewContent, formattedContent);
      await saveResumeFn(previewContent);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className='mt-10 space-y-3'>
      <div className='flex items-center justify-between w-full'>
        <h1 className='text-3xl md:text-5xl'>Resume<span className='text-purple-500'>Builder</span></h1>
        <div className='flex gap-1 items-center justify-center w-[50%]'>

          <button className=" w-fit relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          onClick={handleSubmit(onSubmit)}
          disabled={isSaving}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              <div className='flex gap-1 p-1'>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save  />
                    Save
                  </>
                )}
              </div>
            </span>
          </button>

          <button className="p-[3px] relative"
          onClick={generatePDF} disabled={isGenerating}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className=" px-2  md:px-8 py-0 md:py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              <div className='flex gap-1 p-1'>
              {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download  />
                Download PDF
              </>
            )}
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
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 p-3'>
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

            {/* Experience */}
            <div className="space-y-4">
              <h1 className="text-3xl ">Work <span className='text-purple-500'>Experience</span></h1>
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

            {/* Education */}
            <div className="space-y-4">
              <h1 className="text-3xl">Education</h1>
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

            {/* Projects */}
            <div className="space-y-4">
              <h1 className="text-3xl">Projects</h1>
              <Controller className="bg-transparent"
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
            </div>
          </form>


        </TabsContent>
        <TabsContent value="preview">
          {activeTab==='preview' && (
             <Button
             variant="link"
             type="button"
             className="mb-2"
             onClick={() =>
               setResumeMode(resumeMode === "preview" ? "edit" : "preview")
             }
           >
            {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
           </Button>
          )}

          {activeTab ==='preview' && resumeMode!=='preview' && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm">
              You will lose editied markdown if you update the form data.
            </span>
          </div>
          )}

<div className="border rounded-lg">
            <MDEditor
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>

          <div className="hidden">
            <div id="resume-pdf">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default ResumeBuilder
