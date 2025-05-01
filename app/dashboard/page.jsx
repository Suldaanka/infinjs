import React, { use } from 'react'
import { LnChart } from './_components/lineChart'
import { PiChart } from './_components/pieChart'

export default function page() {
  
  return (
    <div className='flex flex-row justify-between gap-5'>
      <div className='h-1/2 w-1/2'>
      <LnChart/>
      </div>
      <div className='h-1/2 w-1/2'>
      <PiChart/>
      </div>
    </div>
  )
}
