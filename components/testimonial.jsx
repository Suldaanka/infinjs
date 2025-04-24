"use client"

import React from 'react'
import { Card, CardContent } from './ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Testimonial() {
  const testimonials = [
    {
      text: `Absolutely amazing experience! The staff was incredibly attentive, the room was luxurious and
            comfortable, and the amenities were top-notch. Will definitely be returning on my next trip.`,
      name: "Sarah Johnson",
      role: "Business Traveler",
    },
    {
      text: `We celebrated our anniversary at Iftin Hotel and it exceeded all expectations. The romantic package
            was perfect, and the staff made our stay truly special. The restaurant's food was exceptional!`,
      name: "Michael & Lisa Chen",
      role: "Couple",
    },
    {
      text: `Our family vacation was perfect thanks to Iftin Hotel. The kids loved the pool, and we appreciated
            the spacious family suite. The location made it easy to explore all the attractions. Highly recommended!`,
      name: "David Williams",
      role: "Family Traveler",
    },
  ]

  return (
    <div className='container mx-auto'>
      <section id="testimonials" className="bg-background py-16">
        <div className="container">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Guest Testimonials</h2>
            <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              See what our guests have to say about their experience at Iftin Hotel.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-muted-foreground">"{t.text}"</p>
                    <div className="mt-6 flex items-center">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Guest"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
