import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { checkIn, checkOut, roomType, user, fullname, phone, guests } = body;

    console.log("Body received:", body);

    if (!checkIn || !checkOut || !roomType || !user || !fullname) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Find an available room of the requested type that is not booked in the given date range
    const availableRoom = await prisma.room.findFirst({
      where: {
        type: roomType.toUpperCase(),
        status: "AVAILABLE",
        bookings: {
          none: {
            OR: [
              {
                checkIn: {
                  lt: checkOutDate,
                },
                checkOut: {
                  gt: checkInDate,
                },
              },
            ],
          },
        },
      },
    });

    if (!availableRoom) {
      return NextResponse.json({ error: "No available rooms for selected type and dates" }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user,
        roomId: availableRoom.id,
        fullName: fullname,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guest: guests,
        status: "PENDING",
        phoneNumber: phone,
      },
    });

  

    return NextResponse.json(booking, { status: 201 });

   

  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
