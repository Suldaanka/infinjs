import prisma from "@/lib/prisma";
import { NextResponse } from 'next/server';
export async function PUT(request, context) {
    const params = context.params;
    const id = params.id;

    const {status} = body;
    const body = request.body;
    await prisma.table.findUnique({
        where: {
            id: id,
        },
    });

    

    return NextResponse.json(
        { message: `table with ID ${id} updated successfully.` },
        { status: 200 }
    )

}