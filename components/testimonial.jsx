import React from 'react'
import { Card, CardContent } from './ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'

export default function Testimonial() {
  return (
    <div className='container mx-auto'>
      <section id="testimonials" className="bg-background py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Guest Testimonials</h2>
              <div className="mt-2 h-1 w-24 bg-amber-600 mx-auto"></div>
              <p className="mt-6 text-lg text-muted-foreground">
                See what our guests have to say about their experience at Iftin Hotel.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <Card className="bg-muted">
                <CardContent className="p-6">
                  <div className="flex text-amber-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    &quot;Absolutely amazing experience! The staff was incredibly attentive, the room was luxurious and
                    comfortable, and the amenities were top-notch. Will definitely be returning on my next trip.&quot;
                  </p>
                  <div className="mt-6 flex flex-col">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=40&amp;width=40" alt="Guest" fill className="object-cover" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Business Traveler</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted">
                <CardContent className="p-6">
                  <div className="flex text-amber-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    &quot;We celebrated our anniversary at Iftin Hotel and it exceeded all expectations. The romantic package
                    was perfect, and the staff made our stay truly special. The restaurant&apos;s food was exceptional!&quot;
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=40&amp;width=40" alt="Guest" fill className="object-cover" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Michael &amp; Lisa Chen</p>
                      <p className="text-sm text-muted-foreground">Couple</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted">
                <CardContent className="p-6">
                  <div className="flex text-amber-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    &quot;Our family vacation was perfect thanks to Iftin Hotel. The kids loved the pool, and we appreciated
                    the spacious family suite. The location made it easy to explore all the attractions. Highly
                    recommended!&quot;
                  </p>
                  <div className="mt-6 flex items-center">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image src="/placeholder.svg?height=40&amp;width=40" alt="Guest" fill className="object-cover" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">David Williams</p>
                      <p className="text-sm text-muted-foreground">Family Traveler</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
    </div>
  )
}