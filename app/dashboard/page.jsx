"use client"
import React, { use } from 'react'
import { PChart } from './_components/pieChart'
import { LnChart } from './_components/lineChart'
import { useSelector } from 'react-redux'
import { Import } from 'lucide-react'
import { router } from 'next/navigation'


export default function page() {
  const user = useSelector((state) => state.user.user);
  console.log("user", user)


  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className='flex flex-row justify-between gap-5 mt-2'>
        <div className='w-full'>
          <LnChart />
        </div>
        <div className=''>
          <PChart />
        </div>
      </div>
    </>

  )
}
