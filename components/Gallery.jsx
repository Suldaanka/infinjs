import Image from 'next/image'
import React from 'react'

export default function Gallery() {
  return (
    <div>
      <section id="gallery" className="bg-muted py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Hotel Gallery</h2>
              <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
              <p className="mt-6 text-lg text-muted-foreground">
                Take a visual tour of our beautiful hotel and facilities.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel lobby"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel room"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel restaurant"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel pool"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel spa"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel gym"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel bar"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Hotel exterior"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
