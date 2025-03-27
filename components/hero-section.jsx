"use client"

import Image from 'next/image'
import React from 'react'
//import { Button } from 'react-day-picker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
//import { Calendar } from './ui/calendar'
import { Input } from './ui/input'
import { Users } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import NavBar from './nav-bar'

export default function HeroSection() {
  return (
   <div className=''>
     <section id="home" className="relative">
        <NavBar/>
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Luxury hotel lobby"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto relative z-10 py-24 md:py-32 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="mb-12 text-center text-white">
                <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Iftin Hotel <br />Hobyo
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
                  The perfect balance of luxury, comfort, and value are Iftin Hotel. Your home away from home.
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                    Explore Rooms
                  </Button>
                  <Button size="lg" variant="outline" className="border-white dark:text-white text-black hover:bg-white/10">
                    Take a Tour
                  </Button>
                </div>
              </div>

              {/* Horizontal Booking Form */}
              <div className="w-full max-w-5xl rounded-lg bg-card p-6 shadow-lg">
                <h2 className="mb-4 text-center text-2xl font-bold">Book Your Stay</h2>
                <Tabs defaultValue="reservation" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="reservation">Reservation</TabsTrigger>
                    <TabsTrigger value="availability">Check Availability</TabsTrigger>
                  </TabsList>
                  <TabsContent value="reservation" className="mt-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium">Check In</label>
                        <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                          {/* <Calendar className="mr-2 h-4 w-4 text-muted-foreground" /> */}
                          <Input
                            type="date"
                            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium">Check Out</label>
                        <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                          {/* <Calendar className="mr-2 h-4 w-4 text-muted-foreground" /> */}
                          <Input
                            type="date"
                            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium">Guests</label>
                        <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Select>
                            <SelectTrigger className="border-0 p-0 focus:ring-0 bg-transparent">
                              <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Guest</SelectItem>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="3">3 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                              <SelectItem value="5">5+ Guests</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium">Room Type</label>
                        <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                          <Select>
                            <SelectTrigger className="border-0 p-0 focus:ring-0 bg-transparent">
                              <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard Room</SelectItem>
                              <SelectItem value="deluxe">Deluxe Room</SelectItem>
                              <SelectItem value="suite">Executive Suite</SelectItem>
                              <SelectItem value="family">Family Room</SelectItem>
                              <SelectItem value="presidential">Presidential Suite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex items-end pb-2">
                        <Button className="w-full h-10 bg-amber-600 hover:bg-amber-700 text-white">Book Now</Button>
                      </div>
                    </div>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      Best rate guaranteed. No reservation fees.
                    </p>
                  </TabsContent>
                  <TabsContent value="availability" className="mt-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium">Check In</label>
                        <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                          {/* <Calendar className="mr-2 h-4 w-4 text-muted-foreground" /> */}
                          <Input
                            type="date"
                            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 flex-1">
                        <label className="text-sm font-medium">Check Out</label>
                        <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                          {/* <Calendar className="mr-2 h-4 w-4 text-muted-foreground" /> */}
                          <Input
                            type="date"
                            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex items-end pb-2">
                        <Button className="w-full h-10 bg-amber-600 hover:bg-amber-700 text-white">
                          Check Availability
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
    </section>
   </div>
  )
}
