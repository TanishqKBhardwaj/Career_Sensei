import React from 'react'
import OnboardingForm from './components/OnboardingForm'
import {getUserOnboardingStatus} from '../../../actions/user'
import { redirect } from 'next/navigation';
async function page() {

  const {isOnBoarded}=await getUserOnboardingStatus();
  if(isOnBoarded){
      redirect('/dahsboard');
  }
  return (
    <div className='max-w-6xl mx-auto'>
      <OnboardingForm/>
    </div>
  )
}

export default page
