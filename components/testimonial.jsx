"use client"

import React from 'react'
import { Card, CardContent } from './ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Testimonial({content}) {
 
  return (
    <div className='container mx-auto'>
      <section id="testimonials" className="bg-background py-16">
        <div className="container px-2">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h2>
            <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
            <p className="mt-6 text-lg text-muted-foreground">
             {content.description}
            </p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {content.testimonial.map((t, index) => (
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
                        <p className="text-sm text-muted-foreground">{t.review}</p>
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
