import React from 'react'
import { cn } from "../../lib/utils";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from './ui/text-generate-effect';


function Hero() {
  return (
    <div className="max-h-lvh mt-10 rounded-lg   md:max-h-fit w-full  flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden" >


      <div className="h-full w-full p-5 bg-black  bg-grid-white/[0.09] relative flex flex-col gap-2  items-center justify-center" style={{ backgroundColor: '#070F2B' }}>

        <Spotlight
          className=" absolute -top-40 left-0 md:right-0 md:top-0"
          fill="blue"
        />

        <Spotlight
          className=" absolute -top-40 left-0 md:right-80 md:-top-20"
          fill="white"
        />
        <div className=" p-10 max-w-7xl flex flex-col md:flex-row items-center justify-between  mx-auto relative  w-full pt-20 md:pt-0">
          <div className=' md:w-[60%]'>

            <TextGenerateEffect className=' font-mono text-center md:text-start ' duration={2} filter={false} textSize='text-4xl md:text-7xl' words="Welcome," />

            <TextGenerateEffect className=' font-mono text-center md:text-start' duration={2} filter={false} textSize='text-4xl md:text-7xl '  words="To Career Sensei" />
          </div>

          <TextGenerateEffect className='text-center md:w-[40%]' textSize='text-xl md:text-2xl' duration={2} filter={true}  words="Empowering Your Career Journey with AI-Driven Guidance and Opportunities." />



        </div>
        
      </div>
    </div>
  )
}

export default Hero