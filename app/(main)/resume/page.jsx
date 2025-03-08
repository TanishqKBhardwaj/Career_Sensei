import React from 'react'
import {getResume} from '../../../actions/resume'
import ResumeBuilder from './components/ResumeBuilder'
import NavBar from '../../components/Navbar'
async function page() {

    const resume=await getResume()
  return (
    <div>
        <NavBar/>
        <div className='max-w-6xl mx-auto'>

      <ResumeBuilder initialContent={resume?.content}/>
        </div>
    </div>
  )
}

export default page
