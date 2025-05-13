"use client"

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
import { useMutate } from "@/hooks/useMutate"

const FormSchema = z.object({
    number: z.coerce.number().min(1, {
        message: "Must be a valid room number",
      }),
      price: z.coerce.number().min(2, {
        message: "Must be a valid room price",
      }),
    type: z.enum(["single", "double", "suite"], {
        message: "Must right room type",
    }),
    status: z.enum(["available", "booked", "cleaning"], {
        message: "Must right room status",
    }),
})

export function RoomsForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      number: 0,
      price: 0,
      type: "",
      status: "",
    },
  })

  const { mutate } = useMutate("/api/rooms/add", ["rooms"])

  function onSubmit(data) {
    mutate(data)
    if(mutate.isSuccess) {
      toast("Room Created Successfully")
    }
  
      console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staus </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}



