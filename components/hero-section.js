
"use client"

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Input } from './ui/input'
import { Button } from './ui/button'
import NavBar from './nav-bar'
import { BookingForm } from './bookingForm'

export default function HeroSection({ content }) {
  return (
    <div className=''>
      <section id="home" className="relative">
        <NavBar />
        <div className="absolute inset-0">
          <Image
            src="/bg.png"
            alt="Luxury hotel lobby"
            fill
            className="object-cover brightness-30"
            priority
          />
        </div>
        <div className="container mx-auto relative z-10 py-24 md:py-32 flex items-center justify-center">
          <div className="flex flex-col items-center mt-5 px-2">

            {/* Animated title and description */}
            <motion.div
              className="mb-12 text-center text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
                {content.description}
              </p>
            </motion.div>

            {/* Animated booking form */}
            <motion.div
              className="w-full max-w-5xl rounded-lg bg-card p-6 shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-center text-2xl font-bold">Book Your Stay</h2>
              <Tabs defaultValue="reservation" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted p-1">
                  <TabsTrigger
                    value="reservation"
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    Reservation
                  </TabsTrigger>
                  <TabsTrigger
                    value="availability"
                    className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    Check Availability
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="reservation" className="mt-4">
                  <BookingForm />
                </TabsContent>

                <TabsContent value="availability" className="mt-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium">Check In</label>
                      <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                        <Input
                          type="date"
                          className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <label className="text-sm font-medium">Check Out</label>
                      <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                        <Input
                          type="date"
                          className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-end pb-2">
                      <Button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white">
                        Check Availability
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  )
}