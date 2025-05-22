import { NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma";


export async function DELETE(request, context) {
  const params = await context.params;
  const id = params.id;

  try {
    // Simulate delete operation
    console.log(`Deleting table with ID: ${id}`)

    // Replace with DB delete logic if needed

    const Deteletable = await prisma.table.delete({
      where: {
        id: id,
      },
    })

    if (!Deteletable) {
      return NextResponse.json(
        { error: `table with ID ${id} not found.` },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: `table with ID ${Deteletable.id} deleted successfully.` },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to delete table.' },
      { status: 500 }
    )
  }
}
