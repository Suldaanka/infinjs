import React from 'react'
import { MapPin, Star, Utensils, } from "lucide-react"
export default function AboutSection() {
  return (
    <div className='container mx-auto'>
        <section className="bg-background py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Welcome to Iftin Hotel</h2>
              <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
              <p className="mt-6 text-lg text-muted-foreground">
                Nestled in the heart of the city, Iftin Hotel offers a perfect blend of elegance, comfort, and
                exceptional service. Whether you&apos;re traveling for business or leisure, our dedicated staff is committed
                to making your stay memorable.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Prime Location</h3>
                <p className="mt-2 text-muted-foreground">
                  Located in the heart of the city with easy access to major attractions, shopping, and business
                  districts.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Luxury Experience</h3>
                <p className="mt-2 text-muted-foreground">
                  Enjoy premium amenities, elegant rooms, and personalized service for an unforgettable stay.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300">
                  <Utensils className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Fine Dining</h3>
                <p className="mt-2 text-muted-foreground">
                  Savor exquisite cuisine at our restaurant featuring local and international dishes prepared by expert
                  chefs.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
