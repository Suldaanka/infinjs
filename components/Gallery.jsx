import Image from 'next/image'
import React from 'react'

export default function Gallery() {
  return (
    <div>
      <section id="gallery" className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Hotel Gallery</h2>
            <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              Take a visual tour of our beautiful hotel and facilities.
            </p>
          </div>
          
          <div className="mt-12 max-w-7xl mx-auto">
            {/* First row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Large feature image */}
              <div className="md:col-span-2 h-full relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3] md:h-full relative">
                  <Image
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Hotel lobby"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Lobby</span>
                </div>
              </div>
              
              {/* Two stacked images */}
              <div className="grid gap-4">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <Image
                      src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Hotel room"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Suite</span>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-square relative">
                    <Image
                      src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Hotel restaurant"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Restaurant</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Three equal columns */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square relative">
                  <Image
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Hotel pool"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Pool</span>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square relative">
                  <Image
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Hotel spa"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Spa</span>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-square relative">
                  <Image
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Hotel gym"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Gym</span>
                </div>
              </div>
            </div>
            
            {/* Third row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Two side-by-side images */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Hotel bar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Bar</span>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-video relative">
                  <Image
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Hotel exterior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Exterior</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}