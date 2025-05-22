// API route: /api/users/update-role/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request, { params }) {
  try {
    // Get the user ID from the URL params
    const userId = params.id;
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    
    // Get the new role from the request body
    const { role } = await request.json();
    
    if (!role) {
      return NextResponse.json(
        { error: "Role is required" },
        { status: 400 }
      );
    }
    
    // Validate the role
    const validRoles = ["ADMIN", "WAITER", "STAFF", "KITCHEN", "USER"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(", ")}` },
        { status: 400 }
      );
    }
    
    // First check if the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });
    
    if (!userExists) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Update the user role in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: { 
        id: true, 
        name: true,
        email: true,
        role: true
      }
    });
    
    // Return the updated user data
    return NextResponse.json({
      message: "User role updated successfully",
      user: updatedUser
    });
    
  } catch (error) {
    console.error("Error updating user role:", error);
    
    // Handle the case when the user doesn't exist
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update user role: " + error.message },
      { status: 500 }
    );
  }
}