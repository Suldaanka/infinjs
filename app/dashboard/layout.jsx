//import { checkRole } from '@/utils/roles'
import { redirect } from 'next/navigation'
//import { SignOutButton } from '@clerk/nextjs'
import React from 'react'
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from '../../components/app-sidebar'

export default async function layout({children}) {

  //const isAdmin = await checkRole('admin')
  /* if (!isAdmin) {
    redirect('/')
  } */

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          {/* <SignOutButton /> */}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
