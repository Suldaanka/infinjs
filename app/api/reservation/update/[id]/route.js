// /api/reservation/update/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Validate the ID
    if (!id) {
      return NextResponse.json({ error: "Invalid reservation ID" }, { status: 400 });
    }
    
    // Get current reservation to check if it exists
    const currentReservation = await prisma.booking.findUnique({
      where: { id }
    });
    
    if (!currentReservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }
    
    // Build update data object with only fields that are provided
    const updateData = {};
    
    // Handle each field only if it's provided in the request
    if (data.fullname !== undefined) {
      updateData.fullName = data.fullname;
    }
    
    if (data.phone !== undefined) {
      updateData.phoneNumber = data.phone;
    }
    
    if (data.checkIn !== undefined) {
      updateData.checkIn = data.checkIn;
    }
    
    if (data.checkOut !== undefined) {
      updateData.checkOut = data.checkOut;
    }
    
    if (data.guest !== undefined) {
      updateData.guests = parseInt(data.guest, 10);
    }
    
   
    if (data.status !== undefined) {
      // Status transition validation could go here if needed
      updateData.status = data.status;
    }
    
    // Auto-update status based on dates if status wasn't explicitly set
    if (data.status === undefined && data.checkOut !== undefined) {
      const currentDate = new Date();
      const checkOutDate = new Date(data.checkOut);
      
      if (checkOutDate < currentDate && currentReservation.status !== 'CANCELLED') {
        updateData.status = "COMPLETED";
      }
    }
    
    console.log("Updating reservation with ID:", id, "with data:", updateData);
    
    // Update the reservation
    const updatedReservation = await prisma.booking.update({
      where: { id },
      data: updateData
    });
    
    return NextResponse.json({
      success: true,
      data: updatedReservation,
      message: "Reservation updated successfully"
    });
    
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update reservation",
      details: error.message
    }, { status: 500 });
  }
}