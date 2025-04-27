import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const galleryImages = [
  {
    src: '/imgs/park.jpg',
    alt: 'Hotel lobby',
    label: 'Lobby',
    colSpan: 'md:col-span-2',
  },
  {
    src: '/imgs/hall02.jpg',
    alt: 'Wedding Hall',
    label: 'Wedding Hall',
  },
  {
    src: '/imgs/restView.jpg',
    alt: 'Restaurant',
    label: 'Restaurant',
  },
  {
    src: '/imgs/rest.jpg',
    alt: 'Restaurent',
    label: 'Restaurent',
  },
  {
    src: '/imgs/rest02.jpg',
    alt: 'Coffee',
    label: 'Coffee',
  },
  {
    src: '/imgs/single.jpg',
    alt: 'Single Room',
    label: 'Single Room',
  },
  {
    src: '/imgs/double.jpg',
    alt: 'Double Room',
    label: 'double Room',
  },
  {
    src: '/imgs/family.jpg',
    alt: 'Family Room',
    label: 'Family Room',
  },
]

export default function Gallery({content}) {
  console.log(content)
  return (
    <section id="gallery" className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h2>
          <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
          <p className="mt-6 text-lg text-muted-foreground">
            {content.description}
          </p>
        </div>

        <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-2xl ${img.colSpan || ''} shadow-lg`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-64 md:h-80 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full py-6 px-4 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <span className="bg-black/60 text-white px-3 py- rounded-full text-sm backdrop-blur-md">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
