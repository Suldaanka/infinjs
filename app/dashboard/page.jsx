"use client"
import React, { use } from 'react'
import { PChart } from './_components/pieChart'
import { LnChart } from './_components/lineChart'
import { useSelector } from 'react-redux'
import { Import } from 'lucide-react'
import { useRouter } from 'next/navigation'


export default function page() {
  // Add a null check before trying to access user.role
const user = useSelector((state) => state.user.user);
console.log("user", user);
const router = useRouter();

// Only check the role if user exists
if (user && user.role !== "ADMIN") {
  router.push("/")
}


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
