"use client"

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
import Orderside from './(restaureant)/menu/_components/Orderside'


export default function Layout({ children }) {
  const user = useSelector((state) => state.user.user);

  // Sample order items data - replace with your actual Redux state
  const [orderItems, setOrderItems] = React.useState([
    { id: 1, name: "Burger", price: 9.99, quantity: 2 },
    { id: 2, name: "Fries", price: 3.99, quantity: 1 }
  ]);

  // Order item handlers
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setOrderItems(orderItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

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
              <span className="flex-1">{pathname}</span>
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
          {
            pathname === 'Menu' ? (
              <Orderside
              orderItems={orderItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
            ): (null)
          }
        </div>
      </SidebarProvider>

    </div>
  )
}