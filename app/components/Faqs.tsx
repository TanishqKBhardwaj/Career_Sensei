import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./ui/accordion"

  import {faqs} from '../../data/faqs'
  

function Faqs() {
  return (
    <div className='mt-10 mb-10'>
        <h1 className='font-bold text-center text-3xl md:text-5xl'>Commonly asked <span className='text-purple-500'>Faqs</span></h1>
        <div className=' flex place-content-center  '>
      <Accordion type="multiple" className='w-[40rem] mt-10 rounded-xl p-4 ' style={{ backgroundColor: '#070F2B' }} >
        { faqs.map((item,index)=>(

  <AccordionItem key={index} value={`${index}`} >
    <AccordionTrigger className='text-center'>{item.question}</AccordionTrigger>
    <AccordionContent>
      {item.answer}
    </AccordionContent>
  </AccordionItem>
        ))}
</Accordion>
</div>
      
    </div>
  )
}

export default Faqs
