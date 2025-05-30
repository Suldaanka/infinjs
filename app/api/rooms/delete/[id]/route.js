import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma";


export async function DELETE(request, context) {
  const params = await context.params;
  const id = params.id;

  try {
    // Simulate delete operation
    console.log(`Deleting expense with ID: ${id}`)

    // Replace with DB delete logic if needed

    const DeteleRoom = await prisma.room.delete({
      where: {
        id: id,
      },
    })

    if (!DeteleRoom) {
      return NextResponse.json(
        { error: `Rooms with ID ${id} not found.` },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: `Rooms with ID ${DeteleRoom.id} deleted successfully.` },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete room.' },
      { status: 500 }
    )
  }
}
