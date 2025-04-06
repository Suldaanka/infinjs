import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const menu = await prisma.menuItem.findUnique({where: {id: params.id}})
        return NextResponse.json({menu}, {status: 200})
    } catch (error) {
        return NextResponse.json(
            {error: "Something went wrong"},
            {status: 500}
        );
    }
}