"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

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
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* Form */}
      <div className="w-full lg:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chicken Burger" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Main Course" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Delicious chicken burger with lettuce, tomato, and special sauce."
                      className="h-20"
                      {...field} 
                    />
                  </FormControl>
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
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={preview} 
                              alt={`Preview ${index + 1}`} 
                              className="w-16 h-16 object-cover rounded-md border" 
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                              aria-label="Remove image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              {imageFiles.length === 0 && (
                <p className="text-xs text-red-500">At least one image is required</p>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isSubmitting || imageFiles.length === 0} className="mt-2">
              {isSubmitting ? "Adding..." : "Add Menu Item"}
            </Button>
          </form>
        </Form>
      </div>
      
      {/* Preview Card */}
      <div className="w-full lg:w-1/3">
        <div>
          <h2 className="text-base font-medium mb-2">Preview</h2>
          <Card className="w-full overflow-hidden py-0">
            {/* Image Preview */}
            <div className={`${imagePreviews.length > 0 ? "h-32" : "h-20"} w-full`}>
              {imagePreviews.length > 0 ? (
                <div className="relative h-full w-full">
                  <img 
                    src={imagePreviews[currentImageIndex]} 
                    alt="Menu item preview" 
                    className="h-full w-full object-cover"
                  />
                  {imagePreviews.length > 1 && (
                    <div className="absolute bottom-1 right-1 flex gap-1">
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-6 w-6 p-0 rounded-full bg-white/80"
                        onClick={prevImage}
                      >
                        &lt;
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="h-6 w-6 p-0 rounded-full bg-white/80"
                        onClick={nextImage}
                      >
                        &gt;
                      </Button>
                    </div>
                  )}
                  <div className="absolute top-1 right-1">
                    <Badge 
                      className={`${getStatusColor(watchedValues.status)} text-xs px-1 py-0`}
                    >
                      {watchedValues.status === "AVAILABLE" ? "Available" : 
                      watchedValues.status === "OUT_OF_STOCK" ? "Out of Stock" : "Hidden"}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">No image</p>
                </div>
              )}
            </div>
            
            <CardHeader className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base">{watchedValues.name || "Item Name"}</CardTitle>
                  <CardDescription className="text-xs">{watchedValues.category || "Category"}</CardDescription>
                </div>
                <div className="text-sm font-bold">
                  {watchedValues.price ? `$${parseFloat(watchedValues.price).toFixed(2)}` : "$0.00"}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="py-0 px-3">
              <p className="text-xs text-gray-600 line-clamp-2">
                {watchedValues.description || "Description..."}
              </p>
            </CardContent>
            
            <CardFooter className="p-2">
              <div className="text-xs text-gray-500">
                {imagePreviews.length} {imagePreviews.length === 1 ? "image" : "images"}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}