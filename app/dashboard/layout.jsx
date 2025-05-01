"use client"

//import { checkRole } from '@/utils/roles'
import { redirect } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import React, { use } from 'react'
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from '../../components/app-sidebar'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '@/components/ModeToggle'
import { useSelector } from 'react-redux'
export default function layout({children}) {
  const user = useSelector((state) => state.user.user);

 

/*   console.log("userdata",user)

  if (user?.role !== "ADMIN") {
    redirect("/"); 
  } */


    const [pathname, setPathname] = React.useState('')
    const path = usePathname()
    
    React.useEffect(() => {
      if (path) {
        const segments = path.split('/')
        segments.forEach((item) => {
          if (item !== '') {
            setPathname(item.charAt(0).toUpperCase() + item.slice(1))
          } else {
            setPathname(item)
          }
        })
      }
    }, [path])
  return (
    <div className='flex flex-row'>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <span>{pathname}</span>
          <SignOutButton />
          <ModeToggle />
        </header>
        <div className="flex  flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  )
}
