"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useUser } from "@clerk/nextjs"
import { useQueryClient } from "@tanstack/react-query";


const FormSchema = z.object({
    description: z.string().min(2, { message: "Description is required." }),
    category: z.string().min(1, { message: "Select a category." }),
    amount: z.coerce.number().positive({ message: "Amount must be greater than 0." }),
    type: z.enum(["income", "outcome"], {
        required_error: "Please select the expense type.",
    }),
});

export function Add() {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchCategories, setFetchCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const queryClient = useQueryClient();
    
    useEffect(() => {
        const fetchCategories = async () => {
          const response = await fetch('/api/expense/category');
          const data = await response.json();
          setFetchCategories(data);
        };
      
        fetchCategories();
      }, [newCategory]);

    

    const {user} = useUser()


    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            description: "",
            category: "",
            amount: 0,
            type: "outcome",
        },
    });

    async function onSubmit(data) {
        try {
            setIsSubmitting(true);
    
            const currentDate = new Date();
    
            // Prepare the data for the API according to your Prisma schema
            const formattedData = {
                description: data.description,
                category: data.category,
                amount: parseFloat(data.amount),
                paidById: user.id || null,
                type: data.type,
                date: currentDate,
                createdAt: currentDate,
            };
    
            console.log("Formatted data:", formattedData);
    
            // Send data to API
            const response = await fetch('/api/expense/add', {
                method: 'POST',     
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formattedData),
            });
    
            if (!response.ok) {
                // Handle error case
                throw new Error("Failed to add expense");
            }
            
            // Add these lines to invalidate and refetch the expenses query
            queryClient.invalidateQueries({ queryKey: ["expenses"] });
            await queryClient.refetchQueries({ queryKey: ["expenses"] });
    
            // If you had toast imported, you could use this
            toast.success("Expense added successfully");
    
            console.log("Expense added:", formattedData);
    
            // Reset the form
            form.reset({
                description: "",
                category: "",
                amount: 0,
                type: "outcome",
            });
    
            // Close the dialog
            setOpen(false);
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error("Failed to add expense");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleCategoryChange = (e) => {
        setNewCategory(e.target.value);
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
      
        try {
          const addNewCategory = async () => {
            const response = await fetch('/api/expense/category/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: newCategory }),
            })
      
            if (!response.ok) {
              throw new Error('Failed to add category');
            }
      
            // Fetch the updated list of categories
            const responseCategories = await fetch('/api/expense/category');
            const data = await responseCategories.json();
            setFetchCategories(data);
      
            //newCategory("");
          }
      
          addNewCategory()
            .then(() => {
              toast.success("Category added successfully");
            })
      
        } catch (error) {
          console.error("Error adding category:", error);
        }
      }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add Expense</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Expenses</DialogTitle>
                    <DialogDescription>
                        Make expenses and track them
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Rent payment" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category Select */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>

                                                {
                                                    fetchCategories.length > 0 ? (
                                                        fetchCategories.map((category) => (
                                                            <SelectItem key={category.id} value={category.id}>
                                                                {category.name}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <SelectItem disabled>No categories available</SelectItem>

                                                    )
                                                }

                                                <div>
                                                    <form onSubmit={(e) => e.preventDefault()}>
                                                        <Input placeholder="Add new category" onChange={(e) => handleCategoryChange(e)} />
                                                        <Button type="submit" onClick={handleCategorySubmit}>Add</Button>
                                                    </form>
                                                </div>

                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Amount Field */}
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="e.g. 500" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Income or Outcome */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="income" id="r1" />
                                                    <Label htmlFor="r1">Income</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="outcome" id="r2" />
                                                    <Label htmlFor="r2">Outcome</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}