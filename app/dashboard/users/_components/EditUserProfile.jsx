"use client";

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Save,
  ArrowLeft,
  Upload,
  Trash2
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const EditUserProfile = ({ userId }) => {
  const router = useRouter();
  
  // This would normally come from an API call using the userId
  const [userData, setUserData] = useState({
    "id": "cm9xtwvfb0005ux30r1mmdvqm",
    "clerkId": "user_2wFrghZ7WLTD7envtir9crWgojG",
    "name": "Abdikhani Hassan",
    "email": "amohahassan@gmail.com",
    "imageUrl": null,
    "role": "ADMIN",
    "createdAt": "2025-04-26T06:17:57.516Z",
    "updatedAt": "2025-04-26T06:17:57.516Z"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Get initials from name for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value) => {
    setUserData(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // In a real app, you would upload this file to a server
      // and get back a URL to save in userData.imageUrl
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    // In a real implementation, you would also clear the file input
    // and potentially delete the image from storage if it exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // In a real app, you would make an API call here to update the user
      // Example:
      // await updateUser(userData.id, userData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      // Redirect back to profile after successful update
      setTimeout(() => {
        router.push(`/users/profile/${userData.clerkId}`);
      }, 1500);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error("Error updating profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        
        
          <Button variant="outline" size="sm" className="flex items-center" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Profile
          </Button>
      </div>
      
      <Card className="overflow-hidden pt-0">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 flex flex-col items-center">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white">
              {imagePreview || userData.imageUrl ? (
                <img 
                  src={imagePreview || userData.imageUrl} 
                  alt={userData.name} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                  {getInitials(userData.name)}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="absolute -bottom-2 -right-2 flex space-x-1">
              <div className="relative">
                <input
                  type="file"
                  id="profile-image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="profile-image">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full shadow-md cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </label>
              </div>
              
              {(imagePreview || userData.imageUrl) && (
                <Button 
                  size="icon" 
                  variant="destructive" 
                  className="h-8 w-8 rounded-full shadow-md"
                  onClick={removeImage}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center text-white">
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-blue-100">{userData.email}</p>
          </div>
        </div>
        
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {success && (
            <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-md border border-green-200">
              Profile updated successfully! Redirecting...
            </div>
          )}
          
          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
              {error}
            </div>
          )}
        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  Full Name
                </Label>
                <Input 
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  Email Address
                </Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="role" className="block mb-1">
                  Role
                </Label>
                <Select
                  value={userData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="MANAGER">Manager</SelectItem>
                    <SelectItem value="WAITER">Waiter</SelectItem>
                    <SelectItem value="USER">User</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Note: Changing roles may affect system permissions
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">System Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gray-500">User ID</dt>
                  <dd className="mt-1 font-mono">{userData.id}</dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-500">Clerk ID</dt>
                  <dd className="mt-1 font-mono">{userData.clerkId}</dd>
                </div>
                
                <div>
                  <dt className="font-medium text-gray-500">Account Created</dt>
                  <dd className="mt-1">
                    {new Date(userData.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </dd>
                </div>
              </dl>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              System information cannot be edited
            </p>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <Link href={`/users/profile/${userData.clerkId}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            
            <Button 
              type="submit" 
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditUserProfile;