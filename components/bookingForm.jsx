"use client"

import { use, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Users } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUser } from "@clerk/nextjs"

// Define booking schema with proper validation
const bookingFormSchema = z.object({
  checkIn: z.string().min(1, { message: "Check-in date is required" }),
  checkOut: z.string().min(1, { message: "Check-out date is required" }),
  guests: z.string().min(1, { message: "Number of guests is required" }),
  roomType: z.string().min(1, { message: "Room type is required" }),
})

export function BookingForm() {
    const {user} = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      guests: "",
      roomType: "",

    },
  })


  // Handle form submission and database saving
  async function onSubmit(data) {


    setIsSubmitting(true)

    
    try {
        const formData = {
            checkIn: data.checkIn,
            checkOut: data.checkOut,
            guests: data.guests,
            roomType: data.roomType.toUpperCase(),
            user: user.id,
        }

        console.log(formData);

        const response =  await fetch("/api/reservation/add",{
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        

        if (!response.ok) {
            throw new Error("Failed to create reservation")

        }

        const result = await response.json()
        console.log(result)
        toast.success("Reservation created successfully")
        form.reset()
        setIsSubmitting(false)
    } catch (error) {
        console.error("Error creating reservation:", error)
        toast.error("Failed to create reservation")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Check-in Date */}
          <FormField
            control={form.control}
            name="checkIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-in Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Check-out Date */}
          <FormField
            control={form.control}
            name="checkOut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-out Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Guests */}
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guests</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Number of Guests</SelectLabel>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5 Guests</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Room Type */}
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Rooms</SelectLabel>
                        <SelectItem value="single">SINGLE</SelectItem>
                        <SelectItem value="double">DOUBLE</SelectItem>
                        <SelectItem value="suite">SUITE</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <div className="flex justify-end items-end">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className=""
          >
            {isSubmitting ? "Processing..." : "Book Now"}
          </Button>
        </div>
        </div>
      </form>
    </Form>
  )
}