"use client"

import React from 'react'
import { MapPin, Star, Utensils } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutSection({ content }) {
  return (
    <div className='container mx-auto'>
      <section className="bg-background py-16">
        <div className="container px-2">

          {/* Heading */}
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {content.title}
            </h2>
            <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              {content.description}
            </p>
          </motion.div>

          {/* Features */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[content.location, content.experience, content.dining].map((item, index) => {
              const Icon = [MapPin, Star, Utensils][index]
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
