"use client"

import { Wifi } from 'lucide-react'
import React from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'

export default function Amenities({ content }) {
  return (
    <div className='container mx-auto'>
      <section id="amenities" className="bg-background py-16">
        <div className="container px-2">
          
          {/* Section Heading */}
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
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

          {/* Amenity Items */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.amenities.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
                  <Image
                    width={30}
                    height={30}
                    src={item.icon}
                    alt={item.title}
                    style={{
                      filter:
                        'invert(65%) sepia(72%) saturate(1549%) hue-rotate(346deg) brightness(98%) contrast(92%)',
                    }}
                  />
                </div>
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
