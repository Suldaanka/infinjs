"use client"

import React from 'react'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from '../../components/app-sidebar'
import { ModeToggle } from '@/components/ModeToggle'
import { useSelector } from 'react-redux'
import Orderside from './(restaureant)/menu/_components/Orderside'
import { ArrowLeft } from 'lucide-react'

export default function Layout({ children }) {
  const user = useSelector((state) => state.user.user);
const path = usePathname();
const router = useRouter();
const [pageTitle, setPageTitle] = React.useState('');

React.useEffect(() => {
  if (!path) return;

  const segments = path.split('/').filter(Boolean);
  const last = segments[segments.length - 1];
  const secondLast = segments[segments.length - 2];

  if (
    segments.length >= 2 &&
    secondLast === 'orders' &&
    last.length > 10
  ) {
    setPageTitle('Order Details');
  } else if (
    segments.length >= 2 &&
    secondLast === 'profile'
  ) {
    setPageTitle('Profile');
  } else {
    // Default case
    setPageTitle(last.charAt(0).toUpperCase() + last.slice(1));
  }
}, [path]);

  return (
    <div className='flex flex-col h-screen'>
      <SidebarProvider>
        <div className='flex flex-row h-full w-full'>
          <AppSidebar />
          <SidebarInset className="flex-1 flex flex-col">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
              <div className="flex-1">{pageTitle}</div>
              <div className="flex items-center gap-2 px-4">
                <SignOutButton />
                <ModeToggle />
              </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
              <div className="flex-1 overflow-auto p-4">
                {children}
              </div>
            </div>
          </SidebarInset>

          {/* Show Orderside only on Menu page */}
          {path?.includes("/menu") && (
            <Orderside
            />
          )}
        </div>
      </SidebarProvider>
    </div>
  )
}
