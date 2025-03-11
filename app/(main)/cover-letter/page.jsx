import React from 'react'
import NavBar from '../../components/Navbar'
import Link from 'next/link'
import {Button} from '../../components/ui/button'
import {getCoverLetters} from '../../../actions/cover_letter'
import CoverLetterList from './components/CoverLetterList'
import { PlusCircle } from 'lucide-react'

async function page() {
    const coverLetters=await getCoverLetters();
  return (
    <div className='space-y-10'>
        <NavBar/>
        <div className='max-w-6xl mx-auto '>
            <Link href="/cover-letter/new" >
            <Button className='space-x-2 p-1'>
             <p>Create <span className='text-purple-500'>New</span></p>
             <PlusCircle></PlusCircle>
            </Button>
            </Link>

            <CoverLetterList coverLetters={coverLetters}></CoverLetterList>

        </div>
      
    </div>
  )
}

export default page
