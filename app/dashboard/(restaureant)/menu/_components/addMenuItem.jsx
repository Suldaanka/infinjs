"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState, useEffect } from "react"

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
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { X } from "lucide-react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, 
    { message: "Price must be a valid positive number" }
  ),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  description: z.string().optional(),
  status: z.enum(["AVAILABLE", "OUT_OF_STOCK", "HIDDEN"], {
    message: "Please select a valid status.",
  }),
})

export function AddMenuItem() {
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      status: "AVAILABLE",
    },
  })

  // Watch form values for preview
  const watchedValues = form.watch()

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length > 0) {
      // Add new files to existing files
      setImageFiles(prevFiles => [...prevFiles, ...files])
      
      // Create preview URLs for each file
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          setImagePreviews(prevPreviews => [...prevPreviews, reader.result])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index))
    
    // Reset current image index if we remove the current image or any before it
    if (index <= currentImageIndex) {
      setCurrentImageIndex(prev => Math.max(0, prev - 1))
    }
  }

  // Handle image carousel navigation
  const nextImage = () => {
    if (imagePreviews.length > 1) {
      setCurrentImageIndex(prev => (prev + 1) % imagePreviews.length)
    }
  }

  const prevImage = () => {
    if (imagePreviews.length > 1) {
      setCurrentImageIndex(prev => (prev - 1 + imagePreviews.length) % imagePreviews.length)
    }
  }

  async function onSubmit(data) {
    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image for the menu item")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create FormData for file uploads
      const formData = new FormData()
      
      // Append all images
      imageFiles.forEach((file) => {
        formData.append(`images`, file)
      })
      
      // Add other form data
      formData.append("name", data.name)
      formData.append("price", parseFloat(data.price))
      formData.append("category", data.category)
      formData.append("description", data.description || "")
      formData.append("status", data.status)
      
      // Make API request
      const response = await fetch('/api/menu/add', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to add menu item')
      }
      
      const result = await response.json()
      
      // Reset form after successful submission
      form.reset()
      setImageFiles([])
      setImagePreviews([])
      setCurrentImageIndex(0)
      
      toast.success("Menu item added successfully!")
      console.log("Menu item created:", result)
    } catch (error) {
      console.error("Error adding menu item:", error)
      toast.error(error.message || "Failed to add menu item")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case "AVAILABLE": return "bg-green-500";
      case "OUT_OF_STOCK": return "bg-yellow-500";
      case "HIDDEN": return "bg-gray-500";
      default: return "bg-blue-500";
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
      {/* Form */}
      <div className="w-full md:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chicken Burger" {...field} />
                  </FormControl>
                  <FormDescription>
                    The name of the menu item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="9.99" {...field} />
                  </FormControl>
                  <FormDescription>
                    The price of the menu item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Main Course" {...field} />
                  </FormControl>
                  <FormDescription>
                    The category this item belongs to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Delicious chicken burger with lettuce, tomato, and special sauce."
                      className="min-h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed description of the menu item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Multiple Image Upload Field */}
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <Input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                  
                  {imagePreviews.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Image Previews:</p>
                      <div className="flex flex-wrap gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={preview} 
                              alt={`Preview ${index + 1}`} 
                              className="w-24 h-24 object-cover rounded-md border" 
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              aria-label="Remove image"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload one or more images of the menu item.
              </FormDescription>
              {imageFiles.length === 0 && (
                <p className="text-sm text-red-500 mt-1">At least one image is required</p>
              )}
            </FormItem>
            
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AVAILABLE">Available</SelectItem>
                      <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                      <SelectItem value="HIDDEN">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Current availability status of the item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isSubmitting || imageFiles.length === 0}>
              {isSubmitting ? "Adding..." : "Add Menu Item"}
            </Button>
          </form>
        </Form>
      </div>
      
      {/* Preview Card */}
      <div className="w-full md:w-1/3">
        <div className="sticky top-4">
          <h2 className="text-lg font-semibold mb-4">Menu Item Preview</h2>
          <Card className="w-full overflow-hidden">
            {/* Image Preview */}
            {imagePreviews.length > 0 ? (
              <div className="relative h-48 w-full">
                <img 
                  src={imagePreviews[currentImageIndex]} 
                  alt="Menu item preview" 
                  className="h-full w-full object-cover"
                />
                {imagePreviews.length > 1 && (
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 w-8 p-0 rounded-full bg-white/80"
                      onClick={prevImage}
                    >
                      &lt;
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="h-8 w-8 p-0 rounded-full bg-white/80"
                      onClick={nextImage}
                    >
                      &gt;
                    </Button>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge 
                    className={getStatusColor(watchedValues.status)}
                  >
                    {watchedValues.status === "AVAILABLE" ? "Available" : 
                     watchedValues.status === "OUT_OF_STOCK" ? "Out of Stock" : "Hidden"}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No image uploaded</p>
              </div>
            )}
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{watchedValues.name || "Item Name"}</CardTitle>
                  <CardDescription>{watchedValues.category || "Category"}</CardDescription>
                </div>
                <div className="text-lg font-bold">
                  {watchedValues.price ? `$${parseFloat(watchedValues.price).toFixed(2)}` : "$0.00"}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-600">
                {watchedValues.description || "Item description will appear here..."}
              </p>
            </CardContent>
            
            <CardFooter>
              <div className="text-sm text-gray-500">
                {imagePreviews.length} {imagePreviews.length === 1 ? "image" : "images"} uploaded
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}